const express = require('express');
const server = express();
const {toXML} = require('jstoxml')

const fetchUsers = async (req, res, next) => {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    req.data = await users.json();
    next()
}

const filterData = (req, res, next) => {
    const users = req.data;
    const { search } = req.query;
    const filteredUsers =  search ? users.filter((user) => user.username.includes(search)) : users;
    req.data = filteredUsers;
    next();

}


const respond  = async (req, res, next) => {
    const {format} = req.query;
    const users = req.data;
    if(format && format.toLowerCase() === 'xml') {
        res.set('Content-Type', 'text/xml');
        res.send(toXML(users))
    }
    else {
        res.send(users)    
    }
}


server.get('/users',fetchUsers, filterData, respond);
// server.get('/users', filterData);
// server.get('/users', respond);

server.listen(3000, () => console.log("server started..."));