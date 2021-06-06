const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

let port = process.env.PORT || 300;

let connection = mysql.createConnection({
    host: 'angular.c7kcymgv2b7c.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'BJ77-Bp.gQFwspJ',
    database: 'angular'
});

connection.connect((error) => {
    if(error) log.error(error);
    else console.log('connection created');
});

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    let respuesta = { error: true, codigo: 200, mensaje: 'Punto de partida' };
    res.send(respuesta)
});

app.get('/discos', (req, res) => {
    let id = req.query.id;
    if(id) {
        let sql = 'SELECT * FROM angular.discos WHERE id = ?;';
        connection.query(sql, id, (err,result) => {
            if(err) throw res.send(err);
            else res.send(result);
        });
    } else {
        let sql = 'SELECT * FROM angular.discos;';
        connection.query(sql, id, (err, result) => {
            if(err) throw res.send(err);
            res.send(result);
        });
    }
});

app.post('/discos', (req, res) => {
    let params = [req.body.titulo, req.body.interprete, req.body.anyoPublicacion];
    let sql = 'INSERT INTO angular.discos (titulo, interprete, anyoPublicacion) VALUES (?,?,?);';
    connection.query(sql, params, (err, result) => {
        if(err) throw res.send(err);
        res.send(result);
    });
});

app.put('/discos', (req, res) => {
    let params = [req.body.titulo, req.body.interprete, req.body.anyoPublicacion, req.body.id];
    let sql = 'UPDATE angular.discos AS d SET d.titulo=COALESCE(?, titulo), d.interprete=COALESCE(?, interprete), d.anyoPublicacion=COALESCE(?, anyoPublicacion) WHERE (id = ?);';
    connection.query(sql, params, (err, result) => {
        if (err) throw res.send(err);
        res.send(result);
    });
});

app.delete('/discos', (req, res) => {
    let params = [req.body.id];
    let sql = "DELETE FROM angular.discos WHERE (id = ?);";
    connection.query(sql, params, (err, result) => {
        if (err) throw res.send(err);
        res.send(result);
    })
});

app.use((req, res) => {
    respuesta = { error:true, codigo: 200, mensaje: 'URL not found'};
    res.status(404).send(respuesta);
});
app.listen(port, () => {
    console.log('App listening on port 300');
    
});