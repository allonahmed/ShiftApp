const express = require("express"); //express dependency middleware
const app = express();
// const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

app.use(express.json());


app.use(express.urlencoded());


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));




var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', 
    database: 'logindb',
    port: '3306'
});

const manager = (arr, gm, username) => {
    let type = "Employee";
    if (gm === username)
    {
        type = "General Manager"
    }
    for(let i = 0; i < arr.length; i ++ ) 
    {
        if ( arr[i] === username)
        {
            type = "Manager";
        }
    }
    return type;
}

const managerList = ["allonahmed", "andrewbristow", "kanyewest"];
const general = "elonmusk";

let hashedPass ='';
app.post('/register/', (req, res)=> {

        hashedPass = bcrypt.hashSync(req.body.password, 10);
        const username1= req.body.username;
        const password1 = req.body.password;
        console.log(username1,password1);
        const type = "Employee"
        db.query("INSERT INTO logindb.users (username, password, usertype) VALUES (?,?,?)", [username1, password1, type], (err, result) =>{
            if (err) 
            {
                console.log(err);
                res.send({message: "Username taken!"})
            }    
            else {
                console.log(result);
                res.send({username: username1, password: password1, hashedpassword: hashedPass, usertype: type});
                
            }
        });

});

app.get('/get/', (req,res) => {
    db.query("SELECT * FROM shifts", (err, results)=> {
        if(err) console.log(err);
        else res.send(results)    
    })
})

app.get('/get/login/', (req,res) => {
    db.query("SELECT * FROM logindb.loggedin", (err,result) => {
        if (err) console.log(err);
        else res.send(result);        
    })
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
    const username3 = req.body.username;
    const password3 = req.body.password;
    console.log(username3, password3);
    

    // const vp = bcrypt.compareSync(hashedPass, password3);
    // console.log(typeof vp);
    // if(vp===false)
    // {
    //     res.send({message: "Invalid Password!"})
    // }
    
    //  if(password3 && username3){
        db.query("SELECT * FROM logindb.users WHERE username = ? AND password = ?", [username3, password3], (error, result) =>{
            if (result.length > 0) 
            {
                res.send(result);
                console.log(result); 
            }
            else {
                res.send({message: "Invalid Username/Password!"});
                console.log(error);
            }

            
        })
    // }
    const man = manager(managerList, general, username3) ;
    db.query( "DELETE FROM logindb.loggedin", (err2,res2)=> {
        if (err2) console.log(err2);
    })
    db.query(" INSERT INTO logindb.loggedin (username, password, usertype) VALUES (?,?,?);", [username3, password3, man], (err1, result1) => {
        if (err1){
            console.log({err1: err});
        }
    })
})

// response.redirect('/home');


app.post('/postForm/', (req,res) => {
    const shiftstart = req.body.shiftstart;
    const shiftend = req.body.shiftend;
    const date = req.body.date;
    const comments = req.body.comments;
    const user = req.body.username;

    // db.query("Select")
    db.query("INSERT INTO shifts (username, shiftstart, shiftend, date, comments) VALUES (?,?,?,?,?)", [user, shiftstart, shiftend, date, comments], (err, results) => {
        if (err) console.log(err);
        else res.send(results);
    })
})

app.get('/get', (req,res)=>{
    const selectAll = "SELECT * from users";
    db.query(selectAll, (err, results)=>{
        if (err) console.log(err + "errorororororo");
        
    })
})

app.listen (3001, ()=> {
    console.log("server running on port 3001");
})
