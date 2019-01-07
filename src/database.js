const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mern-tasks';

mongoose.connect(URI, { 
    useNewUrlParser:true 
})  .then(db => console.log('La DB está conectada'))
    .catch(err => console.error(error));

module.exports = module;