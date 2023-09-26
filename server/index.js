const express = require('express');
const app = express();
require ("dotenv").config();
const port = process.env.PORT || 5060;
const mongoose = require("mongoose");

app.use(require("express").json());
app.use(require("express").urlencoded());
app.use(require("cors")());

async function connecting(){
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to the DB')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
    }

connecting()

app.use("/tasks", require ("./routes/tasksRoutes"));
app.use("/users", require ("./routes/usersRoutes"));


    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });