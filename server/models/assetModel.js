const {Schema}=require('mongoose');
const {model}=require('mongoose');

const assetsDetails=new Schema({
    userId:{type:String,required:true,unique:true},
    username:{type:String,required:true},
    userplace: { type: String, required: true },
    userphone:{type:String,required:true},

})

const assetDetails=model('assetdetails',assetsDetails);
module.exports=assetDetails;