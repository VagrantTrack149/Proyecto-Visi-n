const fs = require('fs');
const path = require('path');

function save() {
    let row = document.getElementById("R").value;
    let column = document.getElementById("C").value;
    let name = document.getElementById("N").value;
    
    let laberinto = data(column, row); 

    let laberintoData = {
        name: name,
        laberintos: laberinto
    };

    const folderPath = path.join(__dirname, 'txt');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    const filePath = path.join(folderPath, `${name}.json`);

    fs.writeFile(filePath, JSON.stringify(laberintoData, null, 2), (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
        } else {
            console.log('Archivo guardado con éxito:', filePath);
        }
    });
}

