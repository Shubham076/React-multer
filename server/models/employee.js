const mongoose   = require('mongoose');

const employeeSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true
    },

    department:{
        type:String,
        required:true
    },

    contactNo:{
        type:Number,
        required:true
    },

    imgUrl:{
        type:String,
        required:true
    },

    employeeName:{
        type:String,
        required:true
    },

    address : {
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("Employee",employeeSchema);
