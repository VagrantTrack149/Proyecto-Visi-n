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
                console.warn(`Celda ${i}${j} no encontrada.`);
            }
        }
    }
    console.log(Laberinto);
    return Laberinto;
}

function save() {

}



function tabla() {
    let Cont_table = document.getElementById("Area_T");
    let row = document.getElementById("R").value;
    let column = document.getElementById("C").value;
    let Contenido = "";
    for (let i = 0; i < column; i++) {
        Contenido += "<tr>";
        for (let j = 0; j < row; j++) {
            Contenido += `<td id="${i}${j}" onclick="pared();"></td>`;
        }
        Contenido += "</tr>";
    }

    Cont_table.innerHTML = Contenido;
}


function pared(){
    let row = document.getElementById("R").value;
    let column = document.getElementById("C").value;
    Cont_table=document.getElementById("Area_T");
    const celdas = Cont_table.querySelectorAll("td");

    celdas.forEach((celda) => {
        celda.addEventListener("click", () => {
           //const currentColor = celda.style.backgroundColor;
           const currentColor = window.getComputedStyle(celda).backgroundColor;
            //console.log(currentColor);
            /*if (currentColor=="" || currentColor=="white") {
                celda.style.backgroundColor="black";
            }
            if (currentColor =="black") {
                celda.style.backgroundColor="red";
            }
            if (currentColor== "red") {
                celda.style.backgroundColor="green";
            }
            if (currentColor=="green") {
                celda.style.backgroundColor="white";
            }*/

            switch (currentColor) {
                case "rgb(255, 255, 255)": // blanco
                case "":
                    celda.style.backgroundColor = "black";
                    break;
                case "rgb(0, 0, 0)": // negro
                    celda.style.backgroundColor = "red";
                    break;
                case "rgb(255, 0, 0)": // rojo
                    celda.style.backgroundColor = "green";
                    break;
                case "rgb(0, 128, 0)": // verde
                    celda.style.backgroundColor = "white";
                    break;
                default:
                    celda.style.backgroundColor = "white";
                    break;
            }
               
        });
    });
    data(column, row);
}