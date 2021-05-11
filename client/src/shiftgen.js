// eslint-disable-next-line
import React, {useState, useEffect} from 'react';
import './App.css'
// import CreatePost from './CreatePost';
import { Link } from 'react-router-dom';
import axios from 'axios';


//when logged in, put it in it's own database, then get the information


class  Shiftgen extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            listCards:[],
            clicked: false,
            shiftDate: '',
            startTime: '',
            endTime: '',
            comments: '',
            name: props.Name,
            nn: '',
            ut: '',
        }
    }
    componentWillMount() {

        axios.get('http://localhost:3001/get').then((response)=>{
            this.setState(state=>({
                listCards: response.data,
            }))
                        
          })
          axios.get('http://localhost:3001/get/login').then((resp) => {
              this.setState(state=>({
                  nn: resp.data[0].username,
                  ut: resp.data[0].usertype,
              }))
            //   console.log(resp.data[0].username);
              
               
          })
    }


        postShift = () => {   
            axios.post("http://localhost:3001/postForm/", {
                shiftstart: this.state.startTime,
                shiftend:  this.state.endTime,
                date: this.state.shiftDate,
                comments: this.state.comments,
                username: this.state.name,
            }).then((resp) => {
            })
            
            this.setState(state=>({
                listCards: {
                    shiftstart: this.state.startTime,
                    shiftend:  this.state.endTime,
                    date: this.state.shiftDate,
                    comments: this.state.comments,
                    username: this.state.nn,
                },
                clicked: true,
            }))
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
        setComments =(e) => {
            this.setState(state=>({
                comments: e.target.value,
            }))
        };
        
        
        // console.log(nn);
        render () {
            // console.log(this.state.name);
        return ( 
            <div className= 'shift-container'>
                  <h3>This is the GENERAL Manager Page, where you can approve, delete and comment on your employee's shift posts! You can also see what your managers are doing as well!</h3>
                <Link to='/' ><button className='logout'>logout</button></Link>
                <h2>Hey, ({this.state.ut}) {this.state.nn } Welcome to allon's shift app!</h2>
                <div className='button-div'>
                    <button className='button-pick'onClick={this.PostClick}> Post new shift </button>
                    <button className='button-pick'onClick={this.PickClick}> Pick up shift</button>
                 </div>
                 {
                    !this.state.clicked 
                    ?
                        <div>
                            {
                                this.state.listCards.slice(0).reverse().map((val,i) => {
                                    return (
                                        <div className ="card" key={i}>
                                            <span>{this.dateChange(val.date)}</span>
                                            <span>{val.shiftstart} - {val.shiftend}</span>
                                            <span className='name'>{val.username}</span>
                                            <span><input style={{fontSize:"14px", borderRadius: "15px"}}placeholder={"comments:  " + val.comments}/></span>
                                            <div style={{display:"flex", justifyContent:"space-evenly"}}>
                                                <button>delete shift</button>
                                                <button>approve shift</button>
                                                <button>deny shift</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    :   
                        <div className= 'create-post'>
                            <h3> Enter your shift information to post to your co-workers!</h3>
                            {/* <label>full name</label>
                            <input required type="text" placeholder="full name..." onChange = {(e) => setName(e.target.value)}/> */}
                            <label>Shift date </label>
                            <input required type="date" onChange={(e) => this.setShiftDate(e)}/>
                            <label>Start time </label>
                            <input required type="time" onChange={(e) => this.setStartTime(e)}/>
                            <label>End time</label>
                            <input required type="time" onChange={(e) => this.setEndTime(e)}/> 
                            <label>Comments</label>
                            <input className='comment' type="text" onChange={(e) => this.setComments(e)}/>
                            <button onClick={this.postShift} style={{marginTop: '15px'}}>Post Shift</button>
                        </div>
                 }
            </div>
        )
                }
    
}

export default Shiftgen;