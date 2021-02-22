const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;
/**
 *  verify signup action
 * we have to check username or email is duplicate or not
 * check roles in the request is existed or not
 */
checkDuplicateUsernameOrEmail = (req, res, next) => {
    // USERNAME
    User.findOne({
        where: { username: req.body.username }
    }).then( user => {
        if (user) {
            res.status(400).send({
                message: 'Failed! Username is already in use!'
            });
            return;
        }

        // email
        User.findOne({
            where: { email: req.body.email }
        }). then( user => {
            if (user) {
                res.status(400).send({
                    message: 'Failded! Email is already in use!'
                });
                return;
            }
            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: 'Failed! Role does not exits = ' + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;