const {Schema}=require('mongoose');
const {model}=require('mongoose');

const usersDetails=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password: { type: String, required: true },
})

const userDetails=model('userdetails',usersDetails);
module.exports=userDetails;