const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/user')
const mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'SDMlab'
})

const app = express()

// app.get('/', (request, response)=>{
//     var query = 'select * from Employee'

//     response.send('Welcome to the app')
// })

// app.post('/', (requst, response)=>{
//     var query = 'insert into Employee '

// })

// app.delete('/:id', (requst, response)=>{
//     var query = 'delete Employee '

// })

// app.put('/:id', (requst, response)=>{
//     var query = 'update Employee '

// })

app.get("/", (request, response) => {
    var query = `select * from Employee`;
    connection.query(query, (error, result) => {
                    if (error == null)
                    {
                        var data = JSON.stringify(result);
                        response.setHeader("Content-Type","application/json");
                        response.write(data);
                    }
                    else
                    {
                        console.log(error);
                        response.setHeader("Content-Type","application/json");
                        response.write(error);
                    }
                    response.end();
    })
})

app.delete("/:id", (request, response) => {
    var query = 
    `Delete from Employee where id = ${request.params.id}`;
    connection.query(query, (error, result) => {
                                    if (error == null)
                                    {
                                        var data = JSON.stringify(result);
                                        response.setHeader("Content-Type","application/json");
                                        response.write(data);
                                    }
                                    else
                                    {
                                        console.log(error);
                                        response.setHeader("Content-Type","application/json");
                                        response.write(error);
                                    }
                                    response.end();
})
})

app.use(cors('*'))
app.use(express.json())
app.use('/user', userRoute)

app.listen(4000, '0.0.0.0', ()=>{
    console.log('server is runnning on port 4000')
})