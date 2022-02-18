const express = require("express");

const hospital = express.Router();

const Hospital = require("../database/models/Hospital");

hospital.post("/post-hospital", (req, res) => {
  console.log(req.body.hospital);
  const hospitalData = {
    hospital_id: req.body.hospital_id,
    hospital_name: req.body.hospital_name,
    hospital_location: req.body.hospital_location,

    hospital_phone: req.body.hospital_phone,
  };
  console.log(hospitalData);
  Hospital.findOne({
    where: {
      hospital_name: req.body.hospital_name,
    },
  })
    .then((result) => {
      if (!result) {
        Hospital.create(hospitalData)
          .then((data) => {
            return res
              .status(200)
              .json({ hospital_name: data.hospital_name + "Create Success" });
          })
          .catch((err) => {
            res.send("error :" + err);
          });
      } else {
        return res.status(200).send("hospital already !!");
      }
    })
    .catch((err) => {
      res.send("error :" + err);
    });
});

hospital.get("/get-hospital", (req, res) => {
  {
    Hospital.findAll().then((data) => {
      res.status(200).json(data);
    });
  }
});

hospital.delete("/del-hospital/:id", (req, res) => {
  Hospital.destroy({ where: { hospital_id: req.params.id } })
    .then((call) => {
      res.status(200).send(call + "Delete Success!!");
    })
    .catch((err) => {
      res.status(400).json("err: " + err);
    });
});

hospital.put("/put-hospital/:hospital_id", (req, res) => {
  const hospitalData = {
    hospital_id: req.body.hospital_id,
    hospital_name: req.body.hospital_name,
    hospital_location: req.body.hospital_location,
    hospital_phone: req.body.hospital_phone,
  };
  Hospital.findOne({
    where: {
      hospital_id: req.params.hospital_id,
    },
  }).then((result) => {
    if (result) {
      Hospital.update(hospitalData, {
        where: { hospital_id: req.params.hospital_id },
      })
        .then((call) => {
          res.status(200).json("update Success!!");
        })
        .catch((err) => {
          res.status(400).json("error:" + err);
        });
    } else {
      res.status(400).json("Data not found");
    }
  });
});

hospital.get("/get-hospital/:id", (request, response) => {
  Hospital.findOne({
    where: {
      hospital_id: request.params.id,
    },
  })
    .then((result) => {
      return response.json(result);
    })
    .catch((e) => {
      return response.json({ e });
    });
});

module.exports = hospital;
