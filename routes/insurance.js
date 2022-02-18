const express = require("express");
const multer = require("multer");
const insurances = express.Router();

const Insurance = require("../database/models/Insurance");
const Type_insurance = require("../database/models/Type_insurance");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/pdf-storage/");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    const fileArray = originalname.split(".");
    const filetype = fileArray[fileArray.length - 1];
    const fileName = Math.floor(Date.now() / 1000) + "." + filetype;
    req.fileName = fileName;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });
insurances.post(
  "/post-insurance",
  upload.single("insurance_file"),
  (req, res) => {
    const insurancesData = {
      insurance_id: req.body.insurance_id,
      insurance_name: req.body.insurance_name,
      insurance_file: req.fileName,
      type_insurance_id: req.body.type_insurance_id,
    };

    console.log(req.body);
    Insurance.findOne({
      where: {
        insurance_name: req.body.insurance_name,
      },
    })
      .then((data) => {
        if (!data) {
          Insurance.create(insurancesData)
            .then((data) => {
              return res.status(200).json({
                insurance_name: data.insurance_name + "Create Success",
              });
            })
            .catch((err) => {
              res.send("error :" + err);
            });
        } else {
          return res.status(200).send("insurance already !!");
        }
      })
      .catch((err) => {
        res.send("error :" + err);
      });
  }
);

insurances.get("/get-insurance", (req, res) => {
  {
    Insurance.findAll().then((data) => {
      res.status(200).json(data);
    });
  }
});
insurances.get("/get-insurance/:id", (req, res) => {
  {
    Insurance.findOne({
      where: {
        insurance_id: req.params.id,
      },
    }).then((data) => {
      res.status(200).json(data);
    });
  }
});

insurances.delete("/del-insurance", (req, res) => {
  Insurance.findOne({
    where: { insurance_id: req.body.insurance_id },
  }).then((data) => {
    Insurance.destroy({ where: { insurance_id: req.body.insurance_id } })
      .then((call) => {
        res.status(200).send(call + "Delete Success!!");
      })
      .catch((err) => {
        res.status(400).json("err: " + err);
      });
  });
});

insurances.put("/put-insurance", (req, res) => {
  const insurancesData = {
    insurance_id: req.body.insurance_id,
    insurance_name: req.body.insurance_name,
    insurance_file: req.body.insurance_file,
    type_insurance_id: req.body.type_insurance_id,
  };
  Insurance.findOne({
    where: {
      insurance_id: req.body.insurance_id,
    },
  }).then((data) => {
    if (data) {
      Insurance.update(insurancesData, {
        where: { insurance_id: req.body.insurance_id },
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

module.exports = insurances;
