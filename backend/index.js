const express = require("express");
const cors = require('cors');
const mongoose =require('mongoose');


require('dotenv').config();

const app = express();
app.use(cors());
app.get("/", (req, res) => {
res.send("Hello World!");
});
app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });
const port = process.env.port || 4000 ;

app.listen(port, console.log(`Server started on port ${port}`));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDb Connection is Successful");
});

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