import React, {useState, useEffect} from 'react'

const Main = () => {
    const [num, setNum] = useState('');
    const [name, setName] = useState('');
    const [inTime, setInTime] = useState('');
    const [outTime, setOutTime] = useState('');
    const [list, setList] = useState([]);
    const capacity = 1;
    const [is, setIs] = useState(true);

    const handleClick = () => {
        let data = {
            number: num,
            name : name,
            checkin: inTime,
            checkout: outTime
        }
        setList([...list, data]);
        setName('');
        setNum('');
        setInTime('');
        setOutTime('')
    }

    const remove = (item) => {
        const rem = list.filter((ele) => ele != item)
        setList(rem);
    }

    const updateList = () => {
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes();
        list.map((item) => {
            if (item.checkout <= time) {
                remove(item);
            }
        })
    }

    const check = () => {
        updateList();
        console.log(list.length)
        if (list.length === capacity) {
         setIs(false);
        }
        else {
         setIs(true);
        }
    }

    useEffect(() => {
       check();
    }, [list])


  return (
    <div className='container'>
        <div style={{marginBottom:"20px", textAlign:"center"}}>
            <h1>Status</h1>
            <h3>Total Capacity: {capacity}</h3>
            <h3>Available Parking: {capacity - list.length}</h3>
            <button type='submit' onClick={check} style={{width:"100%"}}>Update status</button>
        </div>
        {is && <div style={{
            display:"flex",
            flexDirection:"column"
        }}>
            <label>Enter Vehicle number</label>
            <input type="text" placeholder='Enter value' onChange={e => setNum(e.target.value)} value={num}/>
            <label>Enter Driver's name</label>
            <input type="text" placeholder='Enter value' onChange={e => setName(e.target.value)} value={name}/>
            <label>Enter Checkin Time</label>
            <input type="time" onChange={e => setInTime(e.target.value)} value={inTime}/>
            <label>Enter Checkout Time</label>
            <input type="time" onChange={e => setOutTime(e.target.value)} value={outTime}/>
            <button type='submit' onClick={handleClick}>Enter</button>
        </div>}
    </div>
  )
}

export default Main