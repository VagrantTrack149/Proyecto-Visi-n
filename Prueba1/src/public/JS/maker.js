function data(X, Y) { 
    let Laberinto = Array.from({ length: X }, () => Array(Y).fill(0));
    let Cont_table = document.getElementById("Area_T");

    for (let i = 0; i < X; i++) {
        for (let j = 0; j < Y; j++) {
            let celda = document.getElementById(`${i}${j}`);

            if (celda) {
                const currentColor = window.getComputedStyle(celda).backgroundColor;

                if (currentColor === "rgb(255, 255, 255)" || currentColor === "") { // Blanco
                    Laberinto[i][j] = 1;
                } else if (currentColor === "rgb(0, 0, 0)") { // Negro
                    Laberinto[i][j] = 0;
                } else if (currentColor === "rgb(255, 0, 0)") { // Rojo
                    Laberinto[i][j] = 3;
                } else if (currentColor === "rgb(0, 128, 0)") { // Verde
                    Laberinto[i][j] = 2;
                }
            } else {
                console.warn('Celda'+ i+j +'no encontrada.');
            }
        }
    }
    console.log(Laberinto);
    return Laberinto;
}

function save() {
    const rows = parseInt(document.getElementById("R").value);
    const cols = parseInt(document.getElementById("C").value);
    const matriz = data(rows, cols); 
    const nombre = document.getElementById("N").value;

    if (!nombre.trim()) {
        alert("El nombre del laberinto es obligatorio.");
        return;
    }

    const laberinto = {
        nombre,
        dimensiones: [rows, cols],
        matriz
    };

    fetch('/Guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(laberinto),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.text();
    })
    .then(message => {
        alert(message);
    })
    .catch(err => {
        alert("Error al guardar el laberinto: " + err.message);
    });
}


function tabla() {
    const Cont_table = document.getElementById("Area_T");
    const row = document.getElementById("R").value;
    const column = document.getElementById("C").value;

    let Contenido = "";
    for (let i = 0; i < column; i++) {
        Contenido += "<tr>";
        for (let j = 0; j < row; j++) {
            Contenido += `<td id="${i}${j}"></td>`;
        }
        Contenido += "</tr>";
    }

    Cont_table.innerHTML = Contenido;
    pared(); 
}

function pared() {
    const Cont_table = document.getElementById("Area_T");
    const celdas = Cont_table.querySelectorAll("td");

    celdas.forEach((celda) => {
        celda.addEventListener("click", () => {
            const currentColor = window.getComputedStyle(celda).backgroundColor;

            const existeRoja = Array.from(celdas).some(c => window.getComputedStyle(c).backgroundColor === "rgb(255, 0, 0)");
            const existeVerde = Array.from(celdas).some(c => window.getComputedStyle(c).backgroundColor === "rgb(0, 128, 0)");

            switch (currentColor) {
                case "rgb(255, 255, 255)": // Blanco
                case "": // Sin color
                    celda.style.backgroundColor = "black";
                    break;
                case "rgb(0, 0, 0)": // Negro
                    if (!existeRoja) {
                        celda.style.backgroundColor = "red";
                    } else {
                        celda.style.backgroundColor = "green";
                    }
                    break;
                case "rgb(255, 0, 0)": // Rojo
                    celda.style.backgroundColor = "white";
                    break;
                case "rgb(0, 128, 0)": // Verde
                    celda.style.backgroundColor = "white";
                    break;
                case "rgb(255, 255, 255)": // Blanco
                default:
                    if (!existeVerde) {
                        celda.style.backgroundColor = "green";
                    } else {
                        alert("Ya existe una casilla verde. No puedes colocar otra.");
                    }
                    break;
            }
        });
    });
}

