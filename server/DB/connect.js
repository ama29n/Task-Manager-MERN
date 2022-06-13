const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://ama29n:MsIYt5IIVFGmDQS1@nodeexpress.0yobt.mongodb.net/Remake_Task_Manager?retryWrites=true&w=majority';

const connect = (url) => {
    return mongoose.connect(connectionString);
}

module.exports = connect;


