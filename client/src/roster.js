import React from 'react'
import axios from 'axios'
import './App.css'


class Roster extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            listCards: [],

        }
    }


    componentDidMount(){
        axios.get('http://localhost:3001/get/users').then((response)=>{
            this.setState(state=>({
                listCards: response.data,
            }))
                        
          })
          console.log(this.state.listCards);
          
    }
  
    
    render(){
    
        return (
            <div>                         
                {this.state.listCards.map((val,i) => {
                    return(
                    <div className ="roster-card" key={i} style={val.id%2===1 ? {background:"rgb(216, 211, 211)", border:"1px dotted black"} : {background:"rgb(220, 188, 188)", border:"1px dotted black"}}>
                        <span >USERNAME:  {val.username}</span>
                        <span style={{textAlign: "center", position: "absolute", width: "100%"}}> EMPLOYEE ROLE:  {val.usertype}</span>   
                        <span >NUMBER OF POSTS: {val.id}</span>
                    </div>
                    )
                })
            }
          </div>
        )
    }
}

export default Roster;

