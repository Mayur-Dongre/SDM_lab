const express = require('express')
const appUser = express.Router()
const mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'SDMlab'
})

appUser.get("/", (request, response) => {
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

appUser.post("/", (request, response) => {
    var query = `insert into Employee values(${request.body.id}, ${request.body.e_name}, ${request.body.email},
                ${request.body.password}, ${request.body.emp_id}, ${request.body.dname}, ${request.body.doj}`;
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

appUser.put("/:id", (request, response) => {
    var query = 
        `Update Employee e_name = '${request.body.e_name}', email = '${request.body.email}', 
        password = '${request.body.password}', emp_id='${request.body.emp_id}', dname='${request.body.dname}', 
        doj='${request.body.doj}'
                    where id = ${request.params.id}`;
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

appUser.delete("/:id", (request, response) => {
    var query = 
    `Delete Employee where id = ${request.params.id}`;
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

module.exports = appUser;
