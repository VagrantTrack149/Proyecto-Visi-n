const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT= 3000;

app.set('views',path.join(__dirname,'Vistas'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/datos',(req,res)=>{
    const filepath=path.join(__dirname,'datos.txt');
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).send('Error al leer el archivo');
        }
        res.send(`${data}`);
    });        
});

app.get('/Juego',(req,res)=>{
    res.render('juego');
})
app.listen(PORT,()=>{
    console.log('Servidor en puerto :'+PORT);
});
