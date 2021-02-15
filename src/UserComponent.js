import React, {useState, useEffect} from 'react'
import logo from './profile-img.jpg';
import './App.css';
import Modal from 'react-modal';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';

Modal.setAppElement('#root')


 function UserComponent() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [users, setUsers] = useState([])
    const [selectedDate, setSelectedDate] = useState( new Date())
    const [display, setDisplay] = useState(false)
    const [changedDay, setChangedDay] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3000/members')
          .then(res => {
              console.log(res.data);
              setUsers(res.data)
          })
          .catch(error => {
            console.log("err"+error)
          })
    },[])
    
    const CallFunctionTwo = (id) => {       

         users
            .filter(user =>  user.id === id)
            .map(info => {
                //console.log(info)
                console.log("selected"+selectedDate.toDateString().slice(4,15))
                info.activity_periods.map(time => {
                    //console.log("database"+time.start_time.slice(0,11));
                        if(selectedDate.toDateString().slice(4,15) === time.start_time.slice(0,11)){
                            setDisplay(true)
                            console.log(time.start_time.slice(0,11))
                        }
                        if(selectedDate.toDateString().slice(4,15) !== time.start_time.slice(0,11)){
                            setDisplay(false)                      
                            }
                })
                return (
                    <li key={info.id}>
                      <h2>{info.real_name}</h2>                   
                  </li>
                )
             })

}

const dateChanged = () => {
       // console.log("user.id")
        return(
            CallFunctionTwo()
        )
}

   return (
        <div className="card">
                <h1>Welcome to list</h1>
            {users && users.map(user => {
            return(
                <div key={user.id} className='data'>
                <div><img src={logo} alt='profile' width='60' height='60'></img></div>
                <h2>{user.real_name}</h2>
                <button onClick={() => {setModalIsOpen(true);CallFunctionTwo(user.id)}}>View more</button>
                {/* {changedDay && dateChanged()} */}
                </div>
            )
        })}
     
        <Modal isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
            overlay: {
                backgroundColor: 'grey'
            },
            content: {
                left: '25%',
                right: '25%',
                width: '50%',
            }
            }}
            >
        {display ? <div className='activity1'>This User is active on this day</div>:<div className='activity2'>The user is not active on this day</div>}
        
        <p>Choose a day from the calendar to check user's active day</p>
        <DatePicker
            className='date'
            selected={selectedDate}
             onChange={
                date => {setChangedDay(true);setSelectedDate(date)}  
            }
            dateFormat='dd/MM/yyyy'
            showYearDropdown
            scrollableYearDropdown
        />
        <button className='close' onClick={() => setModalIsOpen(false)}>close</button>
        </Modal>
    </div>
)}

export default UserComponent
