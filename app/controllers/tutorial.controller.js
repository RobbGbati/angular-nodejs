const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// create and save a new tutorial 
exports.create = (req, res) => {};

// retrieve all tutorials from the database
exports.findAll = (req, res) => {};

// find a single tutorial with an id
exports.findOne = (req, res) => {};

// update a tutorial by its id 
exports.update = (req, res) => {};

// delete a tutorial with the specified id
exports.delete = (req, res) => {};

// delete all tutorials
exports.deleteAll = (req, res) => {};

// find all published tutorials
exports.findAllPublished = (req, res) => {};