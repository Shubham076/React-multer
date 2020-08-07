const express  = require('express'),
        router = express.Router(),
        {getEmployees , addEmployee , updateEmployee , deleteEmployee} = require("../controllers/employee"),
        isAuth = require("../middleware/isAuth"),
        imgUpload = require("../middleware/uploadImage")



router.get("/employees",getEmployees);
router.post("/employee" ,isAuth , imgUpload , addEmployee)
router.put("/employee/:id", isAuth , updateEmployee);
router.delete("/employee/:id", isAuth , deleteEmployee);

module.exports = router;


