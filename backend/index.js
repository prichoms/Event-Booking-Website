const express = require("express");
const path = require('path');
const http = require('http');
const port = process.env.port || 4000 ;
const cors = require('cors');
const mongoose =require('mongoose');
const cookieParser = require('cookie-parser');
const bparser = require('body-parser')
var csrf = require('csurf')
const fs = require('fs');
const fsr = require('file-stream-rotator');
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = yaml.load('./swagger.yaml');
const morgan = require('morgan')
const multer = require('multer')


require('dotenv').config();

const app = express();
app.use(cors());

var parseForm = bparser.urlencoded({ extended: false });
var csrfProtect = csrf({ cookie: true })

app.use(bparser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)
app.get("/", (req, res) => {
res.send("Hello World!");
});
app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });


app.listen(port, console.log(`Server started on port ${port}`));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDb Connection is Successful");
});
let logsinfo = fsr.getStream({ filename: "text.log", frequency: "1h", verbose: true });
app.use(morgan('combined', { stream: logsinfo })) //tiny,dev,common,combined
app.use(express.json())

const FeedRouter = require('./routes/feedroutes')
app.use('/feed', FeedRouter)

const FoodRouter = require('./routes/foodroutes')
app.use('/food', FoodRouter)

const UserRouter = require('./routes/userroutes')
app.use('/users', UserRouter)

const OrganizerRouter = require('./routes/organizerroutes')
app.use('/organizers', OrganizerRouter)

const BookingRouter = require('./routes/bookingroutes')
app.use('/booking', BookingRouter)

const VenueRouter = require('./routes/venueroutes')
app.use('/venue', VenueRouter)

const EventRouter = require('./routes/eventroutes')
app.use('/events', EventRouter)