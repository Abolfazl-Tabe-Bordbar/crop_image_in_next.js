const express = require("express");
const app = express();

const path = require('path');
const cookieParser = require("cookie-parser");
app.use(cookieParser());




// ----------------------------------------------------------
var cors = require('cors')


let corsOptions = {
    origin: '*',
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// ----------------------------------------------------------


// ----------------------------------------------------------
const routes = require("./modules/routes/index.js");
app.use("/",cors(corsOptions) ,routes);
app.use('/upload', express.static(path.join(__dirname, 'upload')))

// ----------------------------------------------------------


app.use((req, res) => {
    res.json({
        status: false,
        message: "This route is not in my api"
    });
});



app.listen(4000);
