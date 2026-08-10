const Event = require('../MODEL/event');

const postEvent = async (req,res)=>{
    res.send('post Event');
};

const getEvents = async (req,res)=>{
    res.send('get events');
};

module.exports = { postEvent, getEvents }