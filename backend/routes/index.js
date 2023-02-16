const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const routesHandler = require('./handler');
require('dotenv/config');
const cors = require("cors");
const bcryptjs = require("bcryptjs")

module.exports = router;

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

require("../models/schemas")
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
 // backend routing port

 app.listen(4000, () => {
    console.log(`Server is running on port 4000.`);
});

