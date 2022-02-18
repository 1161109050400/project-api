const express = require('express');

const type_insurance =  express.Router();

const Type_insurance = require('../database/models/Type_insurance');

type_insurance.post('/post-type_insurance',(req,res)=>{
    console.log(req.body.type_insurance);
    const type_insuranceData = {
        type_insurance_id: req.body.type_insurance_id,
        type_insurance_name: req.body.type_insurance_name,
        
    }
    console.log(type_insuranceData);
    Type_insurance.findOne({
        where: {
            type_insurance_name: req.body.type_insurance_name,
        }
    })
    .then(data => {
        if(!data){
            Type_insurance.create(type_insuranceData)
                .then(data => {
                    return res.status(200).json({type_insurance_name: data.type_insurance_name + "Create Success"});
                })
                .catch(err =>{
                    res.send('error :' +err);
                });
        }else{
            return res.status(200).send("Type Insurance already !!");
        }
    })
    .catch(err =>{
        res.send('error :' +err);
    })
});

type_insurance.get('/get-type_insurance' , (req, res) => {{
    Type_insurance.findAll()
    .then(data => {
        res.status(200).json(data);
    })
}})

type_insurance.delete('/del-type_insurance',(req,res)=>{
    Type_insurance.findOne({
        where: {type_insurance_id:req.body.type_insurance_id}
    })
    .then(data=>{
        Type_insurance.destroy({where:{type_insurance_id:req.body.type_insurance_id}})
        .then((call)=>{
            res.status(200).send(call+ "Delete Success!!")
        })
        .catch(err=>{
            res.status(400).json("err: "+err)
        })
    })
})

type_insurance.put('/put-type_insurance',(req,res)=>{
    const type_insuranceData = {
        type_insurance_id: req.body.type_insurance_id,
        type_insurance_name: req.body.type_insurance_name,
    }
    Type_insurance.findOne({
        where:{
            type_insurance_id: req.body.type_insurance_id
        }
    })
    .then(data =>{
        if(data){
            Type_insurance.update(type_insuranceData,{where:{type_insurance_id:req.body.type_insurance_id}})
            .then((call)=>{
                res.status(200).json("update Success!!")
            })
            .catch(err=>{
                res.status(400).json("error:"+err)
            })
        }else{
            res.status(400).json("Data not found")
        }
    })
})


module.exports = type_insurance;