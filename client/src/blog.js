import React from 'react'
import axios from 'axios'
import {Redirect, Link} from "react-router-dom"
import './App.css'

class Blog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            blogList:[],
            name:'',
            type:'',
            posted: false,
            clicked: false,
            text:'',
            time: '',
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/get/login').then((resp) => {
            this.setState(state=>({
                name: resp.data.username,
                type: resp.data.usertype,
            }))            
             
        })
        axios.get("http://localhost:3001/chatget").then((resp)=> {
            this.setState(state=>({
                blogList: resp.data,
            }))
        })
    }
    CreateBlog = () => {
        if (this.state.text.length !== 0 )
        {
            axios.post("http://localhost:3001/chat", {
                username: this.state.name,
                comment: this.state.text,
                time: Date(),
                usertype: this.state.type,
            }).then((response)=> {
                axios.get("http://localhost:3001/chatget").then((resp)=> {
                    this.setState(state=>({
                        blogList: resp.data,
                    }))
                })

            })
        }


        this.setState(state=>({
            clicked:false,
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
    UpdateText =(e) => {
        this.setState(state=>({
            text: e.target.value,
        }))
    }

    render(){
        return (
            <div className="cont">
                <Link to='/'><button className="logout1">logout</button></Link>
                
                {this.state.posted ? <Redirect to="/chat" />: null}
                {
                    !this.state.clicked
                    ? 
                    <button className='button-pick'onClick={this.PostClick}> Post new message </button>
                    :
                        <div className= 'create-post'>

                            <h3>{this.state.name}, what would you like to say to the rest of your teammates?</h3>
                            <input type="text" onChange={(e) => this.UpdateText(e)}/>
                            <button onClick={this.CreateBlog}>{this.state.text.length===0 ? "Go back" : "Submit"}</button>
  
                        </div>
                 }
                 {
                        this.state.blogList.slice(0).reverse().map((val, i) => {
                            return (
                                <div key={i} class="blog-card">
                                    <h3>{val.username} [{val.usertype}] </h3>
                                    <p>{val.comment}</p>
                                    <time>{val.time}</time>
                                </div>
                            )
                        })
                     
                     } 


            </div>
        )
    }

}
export default Blog;