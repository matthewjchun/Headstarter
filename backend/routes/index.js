const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const routesHandler = require('./handler');
require("../models/schemas")
require('dotenv/config');
const cors = require("cors");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
module.exports = router;

const JWT_SECRET = "mysecretkey";
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

//DB Connection
mongoose.set('strictQuery', false);
const mongourl = "mongodb+srv://user:Nj1L6Ty8JRdhF2qL@calender.tarsclc.mongodb.net/headstarter?retryWrites=true&w=majority";
mongoose.connect(mongourl, {
  useNewUrlParser:true,
})
.then( () => {
  console.log('DB Connected');
})
.catch( (err) => { 
  console.log("error" + err);
});


const user = mongoose.model("user");

app.post("/register", async(req, res) =>{
  const{ firstName, lastName, email, password} = req.body;
  const encrytedPassword = await bcryptjs.hash(password, 10)
  try{
    const oldUser = await user.findOne({email});
    if(oldUser){
      return res.json({error: "User Exists"});
    }
    await user.create({
      firstName,
      lastName,
      email,
      password: encrytedPassword,
    });
    res.send({status: "ok"});
  
  }catch (error){
    res.send({status: "error"});
  }

});

//LogIn Authentication
app.post("/login", async(req, res) => {
  const {email, password} = req.body;
  const userdb = await user.findOne({email});
  if(!userdb){
    return res.json({error: "User Not Found"});
  }
  if(await bcryptjs.compare(password, userdb.password)){
    const token = jwt.sign({}, JWT_SECRET);
    if(res.status(201)){
      return res.json({status: "ok", data: token});
    }else{
      return res.json({error: "error"});
    }
  }
  res.json({status: "error", error: "Incalid Password"});
});

//get user information for the frontend
app.get("/profile", async(req, res)=>{
  const {token} = req.body;
  try{
    const User = jwt.verify(token, JWT_SECRET);
    const useremail = User.email;
    user.findOne({email:useremail}).then((data) =>{
      res.send({status: "ok", data: data});
    })
    .catch((error) => {
      res.send({status: "error", data: error});
    });
  }catch(error){}
});

const calendar = mongoose.model("calendar");
//Calender
app.post("/calendar", async(req, res) =>{
  const{ year, date, month, clock} = req.body;
  console.log(year, date, month, clock);
  try{
    await calendar.create({
      year,
      date,
      month,
      clock,
    });
    res.send({status: "ok"});
  
  }catch (error){
    res.send({status: "error"});
  }

});


app.post("/calendar", async(req, res) =>{
  const{ year, date, month, clock} = req.body;
  console.log(year, date, month, clock);
  try{
    await calendar.create({
      year,
      date,
      month,
      clock,
    });
    res.send({status: "ok"});
  
  }catch (error){
    res.send({status: "error"});
  }

});

app.get("/getCalendar", async(req, res) =>{
  try{
    const allCalendar = await calendar.find({});
    res.send({status: "ok", data: allCalendar});
  }catch(err){
    console.log(err);
  }
});

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});

