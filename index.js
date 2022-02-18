const express = require("express");
const server = express();
const cors = require("cors");
const { json, urlencoded } = require("body-parser");


//v---------------
// const path = require('path');
// server.set("view engine", "ejs");
// server.set("views", path.join(__dirname,"./templates"));
// server.get("/mail", (req, res) => {
//   const data={
//     user_firstname: 'แอมเอง',
//     user_lastname: 'เทพๆ',
//     user_fax: '-',
//     user_county: 'กาฬสินธุ์',
//     user_phone: '111'
//   }
//   return res.render("mail.ejs",{data});
// });
//v---------------
server.use(cors());
server.use(json());
server.use(urlencoded({ extended: false }));
const config = {
  PORT: 3000,
  HOST: "127.0.0.1",
};

server.use("/api", require("./routes"));

server.listen(config.PORT, config.HOST, () => {
  console.log(`server is running on ${config.HOST}:${config.PORT}`);
});
