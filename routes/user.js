const express = require("express");
const user = express.Router();
const User = require("../database/models/User");
const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
user.post("/post-user", (req, res) => {
  const userData = {
    user_id: req.body.user_id,
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_email: req.body.user_email,
    user_phone: req.body.user_phone,
    user_fax: req.body.user_fax,
    user_county: req.body.user_county.province,
  };
  console.log(userData);
  User.findOne({
    where: {
      user_email: req.body.user_email,
    },
  })
    .then((result) => {
      if (!result) {
        User.create(userData)
          .then((data) => {
            return res
              .status(200)
              .json({ user_firstname: data.user_firstname + "Create Success" });
          })
          .catch((err) => {
            res.send("error :" + err);
          });
      } else {
        return res.status(400).json({ error: "user already !!" });
      }
    })
    .catch((err) => {
      res.send("error :" + err);
    });
});

user.get("/get-user", (req, res) => {
  {
    User.findAll().then((data) => {
      res.status(200).json(data);
    });
  }
});

user.delete("/del-user", (req, res) => {
  User.findOne({
    where: { user_id: req.body.user_id },
  }).then((data) => {
    User.destroy({ where: { user_id: req.body.user_id } })
      .then((call) => {
        res.status(200).send(call + "Delete Success!!");
      })
      .catch((err) => {
        res.status(400).json("err: " + err);
      });
  });
});

// user.delete('/del-user',(req,res)=>{
//     User.findOne({
//         where: {user_id:req.body.user_id}
//     })
//     .then(data=>{
//         User.destroy({where:{user_id:req.body.user_id}})
//         .then((call)=>{
//             res.status(200).send(call+ "Delete Success!!")
//         })
//         .catch(err=>{
//             res.status(400).json("err: "+err)
//         })
//     })
// })

// user.put('/put-user',(req,res)=>{
//     const userData = {
//         user:req.body.user
//     }
//     User.findOne({
//         where:{
//             user_id:req.body.user_id
//         }
//     })
//     .then(data =>{
//         if(data){
//             User.update(userData,{where:{user_id:req.body.user_id}})
//             .then((call)=>{
//                 res.status(200).json("update Success!!")
//             })
//             .catch(err=>{
//                 res.status(400).json("error:"+err)
//             })
//         }else{
//             res.status(400).json("Data not found")
//         }
//     })
// })

user.post("/send-email", (req, res) => {
  const data = req.body;
  ejs.renderFile(
    path.join(__dirname, "../templates/mail.ejs"),
    { data },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ err: JSON.stringify(err) });
      } else {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "ammdekcomsci@gmail.com",
            pass: "ammlovemat",
          },
        });
        const option = {
          from: "ammdekcomsci@gmail.com",
          to: "matchersmp@gmail.com",
          subject: "Test Nodemailer",
          html: result,
        };
        transporter.sendMail(option, (err, info) => {
          if (err) {
            console.log("err", err);
            return res.status(200).json({
              RespCode: 400,
              ResMessage: "bad",
              RespError: err,
            });
          } else {
            console.log("Send : " + info.response);
            return res.status(200).json({
              RespCode: 200,
              ResMessage: "good",
            });
          }
        });
      }
    }
  );
});

module.exports = user;
