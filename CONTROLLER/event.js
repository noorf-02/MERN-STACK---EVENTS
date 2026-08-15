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
    organizerName,
  } = req.body;

  if(!title || !description || !category || !venue || !city || !date || !startAt || !endAt || !capacity || !contact || !organizerName){
    return res.status(400).json({
        message:"Please fill all fields first"
    })
}

if(description.length>500){
    return res.status(400).json({
      message:'Description limit exceeded'
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
  organizerName: organizerName,
  organizer: req.user.id
});


res.status(200).json({
  message: "Event has been created",
  event,
});

};
 
// GET ALL EVENTS 

const getEvents = async (req,res)=>{
  const allEvents = await Event.find({});
  res.send(allEvents);
}

// GET EVENTS CREATED BY A SPECIFIC USER 

const userEvents = async (req, res) => {
    const userEvents = await Event.find({
      organizer: req.user.id
    });
    
    res.status(200).json({
      userEvents
    })

};

// DELETE EVENTS 

const deleteEvent = async (req,res)=>{
  try{
    const event = await Event.findById(req.params.id);
    
    if(event.organizer.toString!==req.user.id){
      return res.status(401).json({
        message:'You are not authorized to delete this event!'
      })
    }

    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message:'Event Deleted successfully!'
    })
  } catch(error){
    res.status(500).json({
      message:'Something went wrong!',
      error: error.message
    })
  }
}



module.exports = { postEvent, getEvents, userEvents, deleteEvent };
