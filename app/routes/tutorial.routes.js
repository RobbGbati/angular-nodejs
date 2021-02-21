module.exports = app => {
    const tutorials = require('../controllers/tutorial.controller');

    var router = require('express').Router();

    // creare a new Tutorial
    router.post('/', tutorials.create);

    // retrieve all tutorails
    router.get('/', tutorials.findAll);
}