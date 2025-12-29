require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//middleware to cors
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}));

//middleware to parse json
app.use(express.json());

//Routes

//Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}));

//Start Server 
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));