const Event = require("../MODEL/event");

const postEvent = async (req, res) => {
  const {
    title,
    description,
    category,
    venue,
    city,
    date,
    startAt,
    endAt,
    capacity,
    contact,
    organizer,
  } = req.body;

  if(!title || !description || !category || !venue || !city || !date || !startAt || !endAt || !capacity || !contact){
    return res.status(400).json({
        message:"Please fill all fields first"
    })
}

const event = await Event.create({
  title: title,
  description: description,
  category: category,
  venue: venue,
  city: city,
  date:date,
  startAt: startAt,
  endAt: endAt,
  capacity: capacity,
  contact: contact,
  organizer: req.user.id
});


res.status(200).json({
  message: "Event has been created",
  event,
});

};


const getEvents = async (req,res)=>{
  const allEvents = await Event.find({});
  res.send(allEvents);
}

const userEvents = async (req, res) => {
    const userEvents = await Event.find({
      organizer: req.user.id
    });
    
    res.status(200).json({
      userEvents
    })

};

module.exports = { postEvent, getEvents, userEvents };
