const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT= 3000;

app.set('views',path.join(__dirname,'Vistas'));
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('juego');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/datos',(req,res)=>{
    const filepath=path.join(__dirname,'datos.json');
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).send('Error al leer el archivo');
        }
        res.send(`${data}`);
    });        
});
/*
app.get('/Juego',(req,res)=>{
    res.render('juego');
})*/

app.get('/maker',(req,res)=>{
    res.render('maker');
})

app.post('/Guardar', (req, res) => {
    console.log("Datos recibidos:", req.body); 
    const { nombre, dimensiones, matriz } = req.body;
    const filepath=path.join(__dirname,'public/txt/laberintos.json');

    if (!nombre || !dimensiones || !matriz) {
        return res.status(400).send("Los datos enviados son incompletos. Se requiere nombre, dimensiones y matriz.");
    }


    const tieneRojo = matriz.some(row => row.includes(3));
    const tieneVerde = matriz.some(row => row.includes(2));

    if (!tieneRojo || !tieneVerde) {
        return res.status(400).send("El laberinto debe contener una casilla roja y una verde.");
    }

    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send("Error al leer el archivo de laberintos.");
        }

        let laberintos = [];
        if (data) {
            try {
                laberintos = JSON.parse(data);
            } catch (parseError) {
                return res.status(500).send("Error al procesar el archivo de laberintos.");
            }
        }

        laberintos.push({ nombre, dimensiones, matriz });

        fs.writeFile(filepath, JSON.stringify(laberintos, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).send("Error al guardar el laberinto.");
            }
            res.status(200).send("Laberinto guardado con éxito.");
        });
    });
});


app.get('/Laberinto',(req,res)=>{
    const filepath=path.join(__dirname,'public/txt/laberintos.json');
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).send("Error al leer el archivo");
        }
        res.send(`${data}`);
    });        
})
app.listen(PORT,()=>{
    console.log('Servidor en puerto :'+PORT);
});
