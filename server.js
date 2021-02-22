const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions =  {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content type -application/json
app.use(bodyParser.json());

// parse requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Robb's Application."});
});

// tutorial apis
require('./app/routes/tutorial.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const db = require("./app/models");
const Role = db.role;
//db.sequelize.sync();
// in developpement mode, we can drop and re-sync
db.sequelize.sync({ force: true}).then(() => {
    console.log('Drop and re-sync db.');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "USER"
    });

    Role.create({
        id: 2,
        name: "MODERATOR"
    });

    Role.create({
        id: 3,
        name: "ADMIN"
    });
}

