const {createServer} = require('http');
const fs = require('fs').promises

const student = {
    id:123,
    name: "Moshe Ben Zakn",
    city:"Modiin"
}

const gradesCsv = `
studentName,class,grade
Lior, Math, 100
Moshe,History,98
Shira,Geography,66
`

const requestHandler = async (req, res) => {
    if(req.url === '/student') {
        if(req.method === 'GET') {
            res.end(JSON.stringify(student));
        }
    }

    if(req.url === '/grades') {
        if(req.method === 'GET') {
            res.setHeader("Content-Type", "text/csv")
            res.end('customers.csv').end(gradesCsv)
        }
    }
}

const server = createServer(requestHandler);
server.listen(3000, () => console.log('server started....'));