const express = require("express");
const Admin = require("../database/models/admin");
const router = express.Router();
const bcrypt = require("bcrypt");
const webToken = require("jsonwebtoken");
require("dotenv").config();
// router.post("/login", async (request, response) => {
//   try {
//     const { username, password } = request.body;
//     const admin = await Admin.findOne({
//       where: {
//         username,
//         password,
//       },
//     });

//     if (admin) {
//       return response.status(200).json({
//         data: admin,
//       });
//     }
//     return response.status(403).json({
//       error: "Username or Password is incorrect!",
//     });
//   } catch (e) {
//     console.log(e);
//     return response.json({
//       error: "something went wrong!",
//     });
//   }
// });
// router.get('/admin',(req,res)=>{
//     Admin.findAll().then(x=>{
//       return res.json(x);
//     }).catch(e=>{
//       return res.json({e})
//     })

// })
// router.post("/add-admin", async (request, response) => {
//   try {
//     const admin = request.body;
//     const result = await Admin.create(admin);
//     return response.json({
//       result,
//     });
//   } catch (e) {
//     console.log(e);
//     return response.json({
//       error: "something went wrong!",
//     });
//   }
// });

// require("dotenv").config()

// router.post("/register",(req,res) =>{
//   const{username,password} = req.body;

//   if(username == undefined || username == "|| password == undefined || password"){
//     res.status(401).json({
//       message: "Fill all Fields",
//       status:res.statusCode
//     });
//   }else{
//     // check username

//     Admin.findOne({
//       attributes:["user_name"],
//       where:{
//         username
//       }
//     }).then((value) =>{
//       if(value === null){
//         bcrypt.genSalt(10, function(err, salt){
//           bcrypt.hash(password,salt,(err,hash) =>{
//             Admin.create({
//             // create record
//             user_name:username,
//             password:hash
//             })
//           }).then((value) =>{

//             res.status(201).json({
//               message:"Account has Created Successfully",
//               status:res.statusCode
//             })
//           }).catch(err => res.status(404).json({ message:"something went wrong"
//         }))
//         })
//       }else{
//         res.status(401).json({message:"Email already Token",status:res.statusCode})
//       }
//     })
//   }
// })

// Register APi
router.post("/register", function (req, res) {
  const {
    username,
    password,
    email
  } = req.body;
  if (
    username == undefined ||
    username == "" ||
    password == undefined ||
    password == "" ||
    email == undefined ||
    email == ""
  ) {
    res.status(401).json({
      message: "Fill All Fields",
      status: res.statusCode,
    });
  } else {
    Admin.findOne({
      attributes: ["username"],
      where: {
        email,
      },
    }).then((value) => {
      if (value === null) {
        //HASH THE PASSWORD
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            // CRETAE RECORD IN DB
            Admin.create({
              username: username,
                email: email,
                password: hash,
              })
              .then((value) =>
                res.status(201).json({
                  message: "Account Has Created Successfully",
                  status: res.statusCode,
                })
              )
              .catch((err) =>
                res.status(404).json({
                  message: "Something went wrong",
                  status: res.statusCode,
                })
              );
          });
        });
      } else {
        res.status(401).json({
          message: "Email already Taken",
          status: res.statusCode,
        });
      }
    });
  }
});

// Login API
router.post("/login", function (req, res) {
  // const {
  //   password,
  //   email
  // } = req.body;
  const password = req.body.password
  const email = req.body.email
  console.log(password);
  console.log(email);

  if (
    password == "" ||
    password == undefined ||
    email == "" ||
    email == undefined
  ) {
    res.status(401).json({
      message: "Fill All Fields",
      status: res.statusCode,
    });
  } else {
    // check mail in db or not

    Admin.findOne({
      where: {
        email,
      },
    }).then((value) => {
      if (value === null) {
        res.status(401).json({
          message: "Email is not Registered Please SignUp",
          status: res.statusCode,
          token: ''
        });
      } else {
        // if mail is there check the password is correct or wrong
        const dbPassword = value.getDataValue("password");

        const userDetail = {
          name: value.getDataValue("username"),
          id: value.getDataValue("id"),
        };

        bcrypt.compare(password, dbPassword, function (err, result) {
          if (result) {
            const token = webToken.sign(userDetail, process.env.secret_key, {
              expiresIn: "48h",
            });
            res.status(200).json({
              message: "Logged In successfully",
              status: res.statusCode,
              token,
            });
          } else {
            res.status(401).json({
              message: "Invalid Crendential given",
              status: res.statusCode,
              token: ''
            })
          }
        });
      }
    });
  }
});

// get UserProfil API
router.get("/profile", function (req, res) {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.substr("Bearer".length + 1);
    webToken.verify(token, process.env.secret_key, (err, user) => {
      if (user) {
        return res
          .status(200)
          .json({
            status: res.statusCode,
            data: user,
            message: "success"
          });
      }
      res.status(401).json({
        status: res.statusCode,
        message: "please Login"
      });
    });
  } else {
    res.status(401).json({
      status: res.statusCode,
      message: "Please Login"
    });
  }
});

function verifyToken(req,res, next){
  if(!req.headers.authorization) return res.status(401).json('No autorizado');

  const token = req.headers.authorization.substr(7);
  if(token!==''){
    const content = jwt.verify(token,'stil');
    req.data = content;
    next();
  }else{
    res.status(401).json('Token vacio');
  }
}

module.exports = router;
