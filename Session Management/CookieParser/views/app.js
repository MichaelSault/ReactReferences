const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
const PORT = 4000;

//define one day in milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "mysecretkeyisasecretsodontaskshhhdsjadhajsdbakj",
    saveUninitalized: true,
    cookie: {maxAge: oneDay},
    resave: false
}));

//parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

//cookie parser middleware
app.use(cookieParser());

//example username and password
const myusername = 'user1';
const mypassword = 'password';

//a variable to save a session
var session;


//add route to rout
app.get('/',(req, res) => {
    session = req.session;
    if(session.userid) {
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    } else {
        res.sendFile('views/index.html',{root:__dirname});
    }
});

//add route to user
app.post('/user',(req, res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session = req.session;
        session.userid = req.body.username;
        console.log(req.session);
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})

//add route to logout
app.get('/logout',(req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));

