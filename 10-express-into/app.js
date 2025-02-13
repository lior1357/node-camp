const express = require('express');
const studentRouter = require('./routers/student');
const server = express();


const gradesCsv = `
studentName,class,grade
Lior, Math, 100
Moshe,History,98
Shira,Geography,66
`


const logRequest = (req, res, next) => {
    console.log(`a ${req.method} request for ${req.url} occured`);
    next();
}


const connectToRedis = (req, res, next) => {
    console.log("connecting to Redis");
    const connection = Math.random() > 0.5 ? 'REDIS::CONNECTION' : 'redisUnavailable'

    if(connection === 'REDIS::CONNECTION') {
        req.connection = connection;
        next();
    } else {
        next("could not connect to Redis")
    }
    
}


const notFound = ()=> {
    res.status(404).send("The page you requested was not found");
}

const getGrades = (req, res, next) => {
    console.log(`getting grades student using ${req.connection}`);
    res.set("Content-Type", "text/csv");
    res.send(gradesCsv);
}

const addGrade = (req, res, next) => {
    res.end(`adding a grade to the db using ${req.connection}`)
}

const pagerDuty = (err, req, res, next) => {
    console.log(`sending pageduty...`);
    next(err)
}

const errorLogger = (err, req, res, next) => {
    console.log(`There has been an errorL ${err}`);
    next(err);
}

const errorResponder = (err, req, res, next)=> {
    res.status(500).send(err);
}

server.use(logRequest);
server.use('/student', studentRouter);

server.use('/grades', connectToRedis);
server.get('/grades', getGrades);
server.post('/grades', addGrade);

server.use(notFound);

server.use('/grades',pagerDuty);
server.use(errorLogger);
server.use(errorResponder);

server.listen(3000, () => console.log("server started..."));