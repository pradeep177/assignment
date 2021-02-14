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
                console.log(info)
                console.log(selectedDate)
                info.activity_periods.map(time => (
                    console.log(time)
                   
                ))
                
                return (
                    <li key={info.id}>
                      <h2>{info.real_name}</h2>                   
                  </li>
                )
            })

}


const GetInfo = () => {
    console.log("hello");
    return (
        <div >hello</div>
    );

}

   return (
        <div className="card">
            {users && users.map(user => {
            return(
                <div key={user.id} className='data'>
                <div><img src={logo} alt='profile' width='60' height='60'></img></div>
                <h2>{user.real_name}</h2>
                <button onClick={() => {setModalIsOpen(true);CallFunctionTwo(user.id)}}>View more</button>
                </div>
            )
        })}

     
        <Modal isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            //onAfterOpen={()=>getInfo()}
           
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




          
           <GetInfo/>
        
        <p>Choose a day from the calendar</p>
        <DatePicker
            className='date'
            selected={selectedDate}
            onChange={
                date => {console.log({date});
                setSelectedDate(date)}
            }
            dateFormat='dd/MM/yyyy'
            showYearDropdown
            scrollableYearDropdown
        />
        <button className='close' onClick={() => setModalIsOpen(false)}>close</button>
        </Modal>
       
    </div>
)
}

export default UserComponent

