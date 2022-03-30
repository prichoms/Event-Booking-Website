const Router  = require("express");
const Event = require("../models/Events")

const router = Router()

// Get collection for Event
router.get("/", async (req, res) =>{
    try {
        const data = await Event.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Create new individual
router.post("/", async (req, res) =>{
    const data = new Event({
        name: req.body.name,
        location: req.body.location,
        feedback: req.body.feedback,
        is_popular: req.body.is_popular,
        genre: req.body.genre,
        about: req.body.about,
        banner_image_url: req.body.banner_image_url,
        languages: req.body.languages,
        grade: req.body.grade,
        rating: req.body.rating,
        is_premier: req.body.is_premier,
        release_date: req.body.release_date,
        cast: req.body.cast,
        duration: req.body.duration
    })
    try {
        const newData = await data.save()
        res.status(200).json("Event Added!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get individual
router.get("/:id", getEvent, (req, res) =>{
    res.status(200).json(res.events)
})


//update individual
router.patch("/:id", getEvent, async (req, res) =>{
    if(req.body.name != null){
        res.events.name = req.body.name
    }
    if(req.body.location != null){
        res.events.location = req.body.location
    }
    if(req.body.feedback != null){
        res.events.feedback = req.body.feedback
    }
    if(req.body.is_popular != null){
        res.events.is_popular = req.body.is_popular
    }
    if(req.body.duration != null){
        res.events.duration = req.body.duration
    }
    if(req.body.about != null){
        res.events.about = req.body.about
    }
    if(req.body.genre != null){
        res.events.genre = req.body.genre
    }
    if(req.body.banner_image_url != null){
        res.events.banner_image_url = req.body.banner_image_url
    }
    if(req.body.languages != null){
        res.events.languages = req.body.languages
    }
    if(req.body.grade != null){
        res.events.grade = req.body.grade
    }
    if(req.body.rating != null){
        res.events.rating = req.body.rating
    }
    if(req.body.is_premier != null){
        res.events.is_premier = req.body.is_premier
    }
    if(req.body.release_date != null){
        res.events.release_date = req.body.release_date
    }
    if(req.body.cast != null){
        res.events.cast = req.body.cast
    }

    

    try {
        const updatedEvent = await res.events.save()
        res.status(200).json("Event Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//delete individual
router.delete("/:id", getEvent, async (req, res) =>{
    try {
        await res.events.remove()
        res.status(200).json({message: "Event Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
async function getEvent(req,res,nxt) {
    let events;
    try {
        events = await Event.findById(req.params.id)
        if(events == null){
            return res.status(400).json({message: "Event does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.events = events
    nxt()
}
module.exports = router;
