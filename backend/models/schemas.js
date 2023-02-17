const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: {type:String, require:true},
    lastName: {type:String, require:true},
    email:{type:String, require:true, unique: true},
    password:{type:String, require:true}
},{
    collection: "user",
});

mongoose.model('user', userSchema);

const calendarSchema = new Schema({
    year: {type:String, require:true},
    date: {type:String, require:true},
    month: {type:String, require:true},
    clock: {type:String, require: true},
},{
    collection: "calendar",
});

mongoose.model('calendar', calendarSchema);
