// eslint-disable-next-line
import React, {useState, useEffect} from 'react';
import './App.css'
// import CreatePost from './CreatePost';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


//when logged in, put it in it's own database, then get the information


class  Shift extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            listCards:[],
            clicked: false,
            shiftDate: '',
            startTime: '',
            endTime: '',
            comment: '',
            name: props.Name,
            nn: '',
            ut: '',
            newPost: false,
            cover:"cover",
            notDone:"",
        }
        this.ClickCover = this.ClickCover.bind(this);
    }
    ClickCover= (username, start, end, date) =>{
        axios.post("http://localhost:3001/update-shift-cover", {
            shiftstart: start,
            shiftend:  end,
            date: date,
            username: username,
            cover: "pending shift for " + this.state.nn,
        }).then((resp) => {
            axios.get('http://localhost:3001/get-shifts').then((re) => {
                this.setState(state=>({
                    listCards: re.data,
                }))
            })
        })
    }
    
    // eslint-disable-next-line
    componentWillMount() {

        axios.get('http://localhost:3001/get-shifts').then((response)=>{
            this.setState(state=>({
                listCards: response.data,
            }))
                        
          })
          axios.get('http://localhost:3001/get/login').then((resp) => {
              this.setState(state=>({
                  nn: resp.data.username,
                  ut: resp.data.usertype,
              }))
            //   console.log(resp.data.username);
              
               
          })
    }
        postShift = () => {   
            if(this.state.shiftDate.length === 0 || this.state.startTime.length===0 || this.state.endTime.length === 0)
            {
                this.setState(state=>({
                    notDone: "Complete all required fields before posting!"
                }))
            }
            else {
                axios.post("http://localhost:3001/postForm/", {
                    shiftstart: this.state.startTime,
                    shiftend:  this.state.endTime,
                    date: this.state.shiftDate,
                    comment: this.state.comment,
                    username: this.state.nn,
                    cover: this.state.cover,
                }).then((resp) => {
                    axios.get('http://localhost:3001/get-shifts').then((response)=>{
                        this.setState(state=>({
                            listCards: response.data,
                        }))
                                    
                    })
                
                
                this.setState(state=>({
                    listCards: [...this.state.listCards,{
                        shiftstart: this.state.startTime,
                        shiftend:  this.state.endTime,
                        date: this.state.shiftDate,
                        comment: this.state.comment,
                        username: this.state.name,
                        cover: this.state.cover,
                    }],
                    clicked: false,
                    newPost: true,
                }))
            })
        }
        }


       PostClick = () => {
           
                this.setState(state=> ({
                    clicked: true,
                }))
           
        }
        PickClick = () => {
            this.setState(state=> ({
                clicked: false,
            }))
        }
        dateChange = (date) => {
            var myDate = new Date(date);
            return myDate.toDateString();
        }
        setShiftDate =(e) => {
            this.setState(state=>({
                shiftDate: e.target.value,
            }))
        }
        setStartTime =(e) => {
            this.setState(state=>({
                startTime: e.target.value,
            }))
        }
        setEndTime =(e) => {
            this.setState(state=>({
                endTime: e.target.value,
            }))
        }
        setcomment =(e) => {
            this.setState(state=>({
                comment: e.target.value,
            }))
        };

        
        render () {
        return ( 
            <div className= 'shift-container'>
                
                <div className='intro-but'>  
            <Link to = '/chat'><button className='logout'>Team Chat</button></Link>

                <Link to='/' ><button className='logout'>logout</button></Link>
                </div>
     
                <h2>Hey, ({this.state.ut}) {this.state.nn } Welcome to allon's shift app!</h2>
                <div className='button-div'>
                    <button className='button-pick' onClick={() =>{ this.PostClick() }}> Post new shift </button>
                    <button className='button-pick' onClick={() =>{ this.PickClick() }}> Pick up shift</button>
                 </div>
                 {
                    this.state.clicked === false
                    ?
                    <div>
                    {
                        this.state.listCards.slice(0).reverse().map((val,i) => {
                            return (
                                <div className ="card" key={i}>
                                    <span>{this.dateChange(val.date)}</span>
                                    <span>{val.shiftstart} - {val.shiftend}</span>
                                    <span className='name'>{val.username}</span>
                                    <span><input style={{fontSize:"14px", borderRadius: "15px"}}placeholder={"comment:  " + val.comment}/></span>
                                    <button style={this.state.nn === val.username ? { display:"none" } :null} onClick={() => {this.ClickCover(val.username,val.shiftstart, val.shiftend, val.date,this.state.cover)}}>{val.status}</button>
                                    <button style={ this.state.nn === val.username ? null: { display:"none" } }>delete</button>
                                    
                                </div>
                            )
                        })
                    }
                </div>

                    :   
                        <div className= 'create-post'>
                            <h3> Enter your shift information to post to your co-workers!</h3>
                            {this.state.notDone.length===0 ? null : this.state.notDone}
                            {/* <label>full name</label>
                            <input required type="text" placeholder="full name..." onChange = {(e) => setName(e.target.value)}/> */}
                            <label style={this.state.notDone!==0?{color: "red"}:{color:"black"}}>Shift date </label>
                            <input required type="date" onChange={(e) => this.setShiftDate(e)}/>
                            <label style={this.state.notDone!==0?{color: "red"}:{color:"black"}}>Start time </label>
                            <input required type="time" onChange={(e) => this.setStartTime(e)}/>
                            <label style={this.state.notDone!==0?{color: "red"}:{color:"black"}}>End time</label>
                            <input required type="time" onChange={(e) => this.setEndTime(e)}/> 
                            <label >comment</label>
                            <input className='comment' type="text" onChange={(e) => this.setcomment(e)}/>
                            <button onClick={this.postShift} style={{marginTop: '15px'}}>Post Shift</button>
                            {this.state.newPost ? <Redirect to="/shift"/> : null }
                        </div>
                 }
            </div>
        )
                }
    
}

export default Shift;