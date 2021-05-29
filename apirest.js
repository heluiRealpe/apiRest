const express = require('express');
const app = express();
const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2417906',
    database: 'angular'
});
connection.connect((error) => {
    if(error) log.error(error);
    else console.log('connection created');
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    let respuesta = { error: true, codigo: 200, mensaje: 'Punto de partida' };
    res.send(respuesta)
});

app.get('/discos', (req, res) => {
    let id = req.query.id;
    if(id == null) {
        let sql = 'SELECT * FROM angular.discos;';
        connection.query(sql, id, (err, result) => {
            if(err) throw res.send({ error: true, codigo: 200, mensaje: 'error', resultado: err });
            res.send({ error: false, codigo: 200, mensaje: 'Todos los discos de la base de datos angular:', resultado: result });
        });
    } else if(id != null) {
        let sql = 'SELECT * FROM angular.discos WHERE id = ?;';
        connection.query(sql, id, (err,result) => {
            if(err) throw res.send({ error: true, codigo, mensaje: 'error', resulado: err });
            else res.send({ error: false, codigo: 200, mensaje: `El disco con el id = ${id} de la base de datos angular:`, resultado: result });
        });
    }
});

app.post('/discos', (req, res) => {
    let params = [req.body.id, req.body.titulo, req.body.interprete, req.body.anyoPublicacion];
    let sql = 'INSERT INTO angular.discos (id, titulo, interprete, anyoPublicacion) VALUES (?,?,?,?);';
    connection.query(sql, params, (err, result) => {
        if(err) throw res.send({ error: true, codigo: 200, mensaje: 'error', resultado: err});
        res.send({error: false, codigo: 200, mensaje: 'Nuevo disco añadido a la base de datos angular', resultado: result});
    });
});

app.put('/discos', (req, res) => {
    let params = [req.body.anyoPublicacion, req.body.id]
    let sql = 'UPDATE angular.discos SET anyoPublicacion = ? WHERE (id = ?);';
    connection.query(sql, params, (err, result) => {
        if (err) throw res.send({error: true, codigo: 200, mensaje: 'En el body tiene que haber el id que se desea cambiar y el anyoPublicación que será cambiado', resultado: err});
        res.send({error: false, codigo: 200, mensaje: 'anyoPublicacion del disco cambiado', resultado: result});
    });
});

app.delete('/discos', (req, res) => {
    let params = [req.body.id];
    let sql = "DELETE FROM angular.discos WHERE (id = ?);";
    connection.query(sql, params, (err, result) => {
        if (err) throw res.send({error: true, codigo: 200, mensaje: 'En el body tiene que estar el id que será eliminado', resultado: err});
        res.send({error: false, codigo: 200, mensaje: "El disco ha sido eliminado", resultado: result});
    })
});

app.use((req, res) => {
    respuesta = { error:true, codigo: 200, mensaje: 'URL not found'};
    res.status(404).send(respuesta);
});
app.listen(3000, () => {
    console.log('App listening on port 3000');
    
});