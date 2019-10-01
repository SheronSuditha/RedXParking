const express = require('express')
const db = require('mysql');
const api = express();

var connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'redx',
    database: 'redxapi'
})

let apidbStatus = "OFFLINE";

api.listen(3000, () => {
    console.log("Starting up API in port 3000")
})

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      apidbStatus = err;
      return;
    }
    apidbStatus = "ONLINE"
    console.log('connected as id ' + connection.threadId);
  });

api.get('/', (reg, res) => {
    res.send({
        Title: "REDXPARKING API",
        Status: "Live",
        DatabaseStatus: `${apidbStatus}`,
        Navigation: "./getData"
    })
})

api.get('/getData', (req, res) => {
    var query = "SELECT * FROM sensorData";
    connection.query(query, function(e,r,f) {
        if(e) {
            res.json("ERROR on tables")
        }
        res.status(200).json(r);
    })
})


let runtime = null;
let check = true;

api.get('/stream/:bay_id/:status/:lat/:lon', (req, res) => {
    setData(req.params.bay_id,req.params.status,req.params.lat,req.params.lon, req, res)
})

function setData(dataset1, dataset2, dataset3, dataset3, req, res) {
    const d1 = dataset1;
    const d2 = dataset2;
    const d3 = dataset3;
    const d4 = dataset3;

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