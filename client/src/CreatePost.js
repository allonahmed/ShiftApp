// import React, {useState} from 'react';
// import './App.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const CreatePost = (props) => {

//         const [shiftDate, setShiftDate] = useState('');
//         const [startTime, setStartTime] = useState('');
//         const [endTime, setEndTime] = useState('');
//         const [comments, setComments] = useState('');
//         const [name, setName] = useState('');

//         const postShift = () => {
//             setName(props.Name);
//             console.log(name);
            
//             axios.post("http://localhost:3001/postForm/", {
//                 shiftstart: startTime,
//                 shiftend:  endTime,
//                 date: shiftDate,
//                 comments: comments,
//                 username: name,
//             }).then((resp) => {
//                 console.log(resp.data);
//             })
//             console.log(typeof startTime, typeof endTime, shiftDate.type, comments.type, name);
            
//         }

//         return ( 
//             <div className= 'create-post'>
//                 <h3>{props.Name}, Enter your shift information to post to your co-workers!</h3>
//                 <label>Shift date </label>
//                 <input required type="date" onChange={(e) => setShiftDate(e.target.value)} />
//                 <label>Start time </label>
//                 <input required type="time" onChange={(e) => setStartTime(e.target.value)}/>
//                 <label>End time</label>
//                 <input required type="time" onChange={(e) => setEndTime(e.target.value)}/>
//                 <label>Comments</label>
//                 <input className='comment' type="text" onChange={(e) => setComments(e.target.value)}/>
//                 <Link to ='/shift'><button onClick={postShift} style={{marginTop: '15px'}}>Post Shift</button></Link>
//             </div>
//         )
    
// }

// export default CreatePost;