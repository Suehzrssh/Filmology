const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'movies'
});

app.get('/api/select', (req, res) => {
    const sqlSelect = "SELECT * FROM moviesinfo";
    db.query(sqlSelect, (err, result) => {
        res.json(result);
    })
})

app.post('/api/insert', (req, res) => {
    const moviename = req.body.moviename;
    const director = req.body.director;
    const year = req.body.year;
    const imdb = req.body.imdb;

    const sqlInsert = "INSERT INTO moviesinfo (moviename, director, year, imdb) VALUES (?,?,?,?)";
    db.query(sqlInsert, [moviename, director, year, imdb], (err, result) => {
        console.log(result);
        
    })
});
app.delete('/api/delete/:moviename', (req, res) => {
    const name = req.params.moviename;
    const sqlDelete = "DELETE FROM moviesinfo WHERE moviename = ?";

    db.query(sqlDelete, name, (err, result) => {
        if(err) console.log(err);
    });
});


app.listen(3001, () => {
    console.log("server is running on port 3001");
});