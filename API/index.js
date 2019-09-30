const express = require('express')
const db = require('mysql');
const api = express();

var connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'redxparking'
})

api.listen(3000, () => {
    console.log("Starting up API in port 3000")
})

api.get('/', (reg, res) => {
    res.send("API Live")
})

api.get('/getData', (req, res) => {
    var query = "SELECT * FROM sensorData";
    connection.query(query, function(e,r,f) {
        if(e) {
            res.status(404).statusMessage("ERROR on tables")
        }
        res.status(200).json(r);
    })
})

api.post('/addData/:dataSet0/:dataSet1/:dataSet2/:dataSet3', (req, res) => {
    const d1 = req.params.dataSet0;
    const d2 = req.params.dataSet1;
    const d3 = req.params.dataSet2;
    const d4 = req.params.dataSet3;
    
    connection.query(`INSERT INTO sensordata VALUES (${d1}, ${d2}, ${d3}, ${d4})`, function(e,r,f) {
        if(e) {
            res.status(404).send("ERROR on database")
        }
        res.status(200).send({
            Message: "Success"
        })
    }) 
})

let runtime = null;
let check = true;

api.get('/another/:datetime/:test/:test2/:test3', (req, res) => {
    setData(req.params.datetime,req.params.test,req.params.test2,req.params.test3, req, res)
})

function setData(dataset1, dataset2, dataset3, dataset3, req, res) {
    const d1 = dataset1;
    const d2 = dataset2;
    const d3 = dataset3;
    const d4 = dataset3;

    console.log(d1 + d2 + d3 + d4 + "RUNNING");
    var query = `INSERT INTO sensordata VALUES (${d1}, ${d2}, ${d3}, ${d4})`;
    connection.query(query, function(e,r,f) {
        if(e) {
            return _continueonError(req, res, e);
        }
        return _continueonAddition(req, res);
        
    }) 
}

function _continueonError(req, res, e) {
    res.json(e)
}

function _continueonAddition(req, res) {
    res.json("ADDED")
}