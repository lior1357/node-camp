const {Router} = require('express');

const router = Router();

const student = {
    id:123,
    name: "Moshe Ben Zakn",
    city:"Modiin"
}

const connectToMySql = (req, res, next) => {
    console.log("connecting to mysql");
    const connection = 'this is a connection to mysql'
    req.connection = connection;
    next();
}


const getStudent = (req, res, next) => {
    res.json(student);
    console.log(req.connection);
}

const addStudent = (req, res, next) => {
    res.end("adding a stident to the database");
}

router.use(connectToMySql);
router.get('/', getStudent);
router.post('/', addStudent);

module.exports = router;