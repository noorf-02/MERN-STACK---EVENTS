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
    status,
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !venue ||
    !city ||
    !date ||
    !startAt ||
    !endAt ||
    !capacity ||
    !contact ||
    !organizerName
  ) {
    return res.status(400).json({
      message: "Please fill all fields first",
    });
  }

  if (description.length > 500) {
    return res.status(400).json({
      message: "Description limit exceeded",
    });
  }

  const event = await Event.create({
    title: title,
    description: description,
    category: category,
    venue: venue,
    city: city,
    date: date,
    startAt: startAt,
    endAt: endAt,
    capacity: capacity,
    contact: contact,
    organizerName: organizerName,
    organizer: req.user.id,
    status: "pending",
  });

  res.status(200).json({
    message: "Event has been created",
    event,
  });
};

// GET ALL EVENTS

const getEvents = async (req, res) => {
  const allEvents = await Event.find({
    status:'approved'
  });
  res.send(allEvents);
};

// GET EVENTS CREATED BY A SPECIFIC USER

const userEvents = async (req, res) => {
  const userEvents = await Event.find({
    organizer: req.user.id,
  });

  res.status(200).json({
    userEvents,
  });
};

// DELETE EVENTS

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    console.log("Event organizer:", event.organizer.toString());
    console.log("Logged in user:", req.user.id.toString());

    if (event.organizer.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        message: "You are not authorized to delete this event!",
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Event Deleted successfully!",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const editEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event does not exist",
      });
    }

    if (event.organizer.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this event!",
      });
    }

    if (req.body.title && req.body.title.length > 50) {
      return res.status(401).json({
        message: "Title limit exceeded",
      });
    }

    if (req.body.description && req.body.description.length > 500) {
      return res.status(401).json({
        message: "Description limit exceeded",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        venue: req.body.venue,
        city: req.body.city,
        date: req.body.date,
        startAt: req.body.startAt,
        endAt: req.body.endAt,
        capacity: req.body.capacity,
        contact: req.body.contact,
        organizerName: req.body.organizerName,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Event updated successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: "Error occured. Cannot update Event.",
    });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event does not exist",
      });
    }

    if (event.organizer.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to view this event",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const pendingEvents = async (req, res) => {
  try {
    const pending = await Event.find({
      status: "pending",
    });

    res.status(200).json({
      pending,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch pending events!",
    });
  }
};

const approvedEvents = async(req,res)=>{
  try{
    const event = await Event.findById(req.params.id);
    if(!event){
      return res.status(401).json({
        message:'Event not found'
      })
    }

    event.status = 'approved';
    await event.save();

    res.status(200).json({
      message:'Event approved successfully'
    })
  } catch(error){
    res.status(500).json({
      message:'Could not approve Event'
    })
  }
}

module.exports = {
  postEvent,
  getEvents,
  userEvents,
  deleteEvent,
  editEvent,
  getSingleEvent,
  pendingEvents, approvedEvents
};
