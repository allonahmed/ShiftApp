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
            comments: '',
            name: props.Name,
            nn: '',
            ut: '',
            newPost: false,
            cover:"cover",
        }
    }
    // eslint-disable-next-line
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
                username: this.state.nn,
            }).then((resp) => {
            
            
            this.setState(state=>({
                listCards: {
                    shiftstart: this.state.startTime,
                    shiftend:  this.state.endTime,
                    date: this.state.shiftDate,
                    comments: this.state.comments,
                    username: this.state.name,
                },
                clicked: false,
                newPost: true,
            }))
        })
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

            const styleCover = {
                display:"none",
            }
            const Card = (props) => {
                return (
                    <div className ="card" >
                    <span>{this.dateChange(props.date)}</span>
                    <span>{props.shiftstart} - {props.shiftend}</span>
                    <span className='name'>{props.username}</span>
                    <span>comments: {props.comments}</span>
                    <button style={this.state.nn === props.username ? styleCover: null} onClick={clickCover}>{this.state.cover}</button>
                    <button style={ this.state.nn === props.username ? null: { display:"none" } }>delete</button>
                </div>
                )
            }
            const clickCover = () => {
                this.setState(state=>({
                    cover: "pending manager approval ✅"
                }))
            }
            const List  = this.state.listCards.map((val,i) => (
                <Card key={i}  date = {val.date} shiftstart= {val.shiftstart} shiftend={val.shiftend} username={val.username} comments={val.comments}/>
            ))
        return ( 
            <div className= 'shift-container'>
                
                <Link to='/' ><button className='logout'>logout</button></Link>
                <h2>Hey, ({this.state.ut}) {this.state.nn } Welcome to allon's shift app!</h2>
                <div className='button-div'>
                    <button className='button-pick'onClick={this.PostClick}> Post new shift </button>
                    <button className='button-pick'onClick={this.PickClick}> Pick up shift</button>
                 </div>
                 {
                    this.state.clicked === false
                    ?
                        <div>
                            {
                                List
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
                            {this.state.newPost ? <Redirect to="/shift.js"/> : null }
                        </div>
                 }
            </div>
        )
                }
    
}

export default Shift;