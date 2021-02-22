const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// create and save a new tutorial 
exports.create = (req, res) => {
    // variable request
    if(!req.body.title) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }

    // create a tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // save tutorial in the database
    Tutorial.create(tutorial).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the tutorial!'
        });
    });
};

// retrieve all tutorials from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: { [Op.iLike]: `%${title}%` }} : null;

    Tutorial.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Somme error occured while retrieving tutorials.'
        });
    });
};

// find a single tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Tutorial with id=' + id
            });
        });
};

// update a tutorial by its id 
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, { where: {id: id} })
        .then( num => {
            if(num == 1) {
                res.send({
                    message: 'Tutorial was updated succesfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch( err => {
            res.status(500).send({
                message: 'Error updating tutorial with id=' + id
            });
        });
};

// delete a tutorial with the specified id
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({message: 'Tutorial was delete successfully!'});
            } else {
                res.send({message: `Can not delete Tutorial with id=${id}. Maybe Tutorial was not found!`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Tutorial id=' + id
            });
        })
};

// delete all tutorials
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!`});
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while removing all tutorial.'
            });
        });
};

// find all published tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: {published: true }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: err.message || 'Some error occured while retrieving tutorials.'
            });
        });
};