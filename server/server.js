const express = require("express"); //express dependency middleware
const app = express();
// const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
// const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

const Datastore = require('nedb');

var blog = new Datastore({ filename: 'database/blog.db', autoload: true });
//username
//comment
//time 

var users = new Datastore({ filename: 'database/users.db', autoload: true , corruptAlertThreshold: 1});
//username
//password <- encrypted
//usertype [e,m,g]


var loggedin = new Datastore({ filename: 'database/loggedin.db', autoload: true });
//username
//password <- encrypted
//usertype [e,m,g]

var shifts = new Datastore({ filename: 'database/shifts.db', autoload: true });
//username
//shiftstart
//shift end
//date 
//comment  --null
//status   [cover(nobody took it yet),pending(some1 took it),approved]

//this is for before we immplement cookies
var currenUser={};



app.use(express.json());

app.use(express.urlencoded());

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));



const managerList = ["allonahmed", "andrewbristow", "kanyewest"];
const general = "elonmusk";

let hashedPass ='';
app.post('/register/', (req, res)=> {
        // hashedPass = bcrypt.hashSync(req.body.password, 10);
        hashedPass = req.body.password;
        const username1= req.body.username;
        const password1 = req.body.password;
        console.log(username1,password1);
        const type = "Employee"
        users.findOne({username:username1},function(error,doc){
            if(doc){res.send("username already exist")}
            else{
                adduser(username1,hashedPass)
            }

        });
        
});
function adduser(un,hashed,ut= 'employee'){
    newuser = {
        username: un,
        password: hashed,
        usertype: ut
    }
    users.insert(newuser,function(err, docs) {
        console.log('Saved user:', docs.username);
    });
}
app.get('/get-shifts/', (req,res) => {
    shifts.find({}, function (err, docs) {
        if(docs){
            res.send(docs)
        }
    });
})

app.get('/get/login/', (req,res) => {
    if(currenUser)
    res.send(currenUser)
    else{
        res.send({
            username:"allon",
            password:"1221",
            usertype:"employee"
        })
    }
})

// app.get('/login', (req, res) => {
//     if (req.session.user){
//         res.send({loggedIn:true, user: req.session.user})
//     }
//     else {
//         res.send({loggedIn: false})
//     }
// })

app.post('/login/',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    // const vp = bcrypt.compareSync(hashedPass, password3);
    // console.log(typeof vp);
    // if(vp===false)
    // {
    //     res.send({message: "Invalid Password!"})
    // }
    
    //  if(password3 && username3){

    users.findOne({username:username},function(error,user){
        if(user && password == user.password){
            currenUser = user;
            console.log(user)
            res.send(user)
        }else{
            res.send({message: "Invalid Username/Password!"});
        }
    })
       
    
})

// response.redirect('/home');


app.post('/postForm/', (req,res) => {
    let newshift = {
        username : req.body.username,
        shiftstart : req.body.shiftstart,
        shiftend:req.body.shiftend,
        date : req.body.date,
        comment : req.body.comment,
        status: "cover"
    }
    shifts.insert(newshift,function(err,shift){
        if(shift){
            console.log("shiftadded: ",shift)
            res.send(shift)
        }
    });

})

app.post('/update-shift-cover', (req,res)=> {
    
    let newshift = {
        username : req.body.username,
        shiftstart : req.body.shiftstart,
        shiftend:req.body.shiftend,
        date : req.body.date,
    }
    updatecover(newshift,req.body.cover)
    res.sendStatus(200)
})

function updatecover(basedata,newcover){
    shifts.findOne(basedata,function(error,doc){
       doc["status"]= newcover
       shifts.remove(basedata)
       shifts.insert(doc)
       console.log(doc)
    });
}



app.get('/get/users', (req,res)=>{
    users.find({},function(err,users){
        res.send(users)
    })
})

app.post('/chat', (req,res)=> {
    let newblog = {
        username : req.body.username,
        comment: req.body.comment,
        time : req.body.time,
        type : req.body.usertype
    }
    blog.insert(newblog)
    res.sendStatus(200)
})

app.get('/chatget', (req,res)=> {
    blog.find({},function(err,chat){
        res.send(chat)
    })
})

app.listen (3001, ()=> {
    console.log("server running on port 3001");
})



