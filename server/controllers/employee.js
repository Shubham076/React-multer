const employee = require("../models/employee")
const fs = require('fs')

exports.getEmployees = async(req,res,next)=>{

    try{
        let employeeData = await employee.find();
        res.status(200).json({
            employeeData:employeeData
        })
    }

    catch (err){
        next(err)
    }
}


exports.addEmployee = async (req,res,next) =>{



    let Employee = new employee({
        employeeName:req.body.name,
        email:req.body.email,
        department:req.body.department,
        contactNo:req.body.contactNo,
        address:req.body.address,
        imgUrl:req.file.path,
        position:req.body.position
    })

    try{

        let newEmployee = await Employee.save();
        res.status(201).json({
            message:"Employee created successfully",
            id:newEmployee._id
        })

    }
    catch(err){
        next(err);
    }



    
}

exports.deleteEmployee = async (req,res,next)=>{

    let id = req.params.id;
    

    try{
        let Employee= await employee.findByIdAndDelete(id);
        let path = Employee.imgUrl
        fs.unlink(path, function(err) {
            if (err) {
              throw err
            } else {
                res.status(200).json({
                    message:"Successfully deleted employee"
                })
            }
          })

      
    }

    catch(err){
        next(err);
    }
}

exports.updateEmployee = async(req,res,next)=>{


    try{

        let updatedEmployee =await employee.findByIdAndUpdate(req.params.id,req.body.employee)

        res.status(200).json({
            message:`Succesfully updated ${updatedEmployee._id} `
        })
    }
    catch(err){
        next(err);
    }    


}