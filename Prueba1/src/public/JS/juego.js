let Laberinto = [
    [0, 0, 0, 0], 
    [0, 2, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [3, 1, 0, 0],
    [0, 0, 0, 0]
];
let posX = 1;
let posY = 1; 
let tabla = "<table border='1' style='width:100%; height: 100%;'>";

function Cargar_lab(){
    tabla = "<table border='1' style='width:100%; height: 100%;'>";
    Laberinto.forEach(fila => {
       tabla += "<tr>";
       fila.forEach(element=>{
            if (element == 1) {
                tabla += "<td style='background-color: white;'> </td>";
            }
            if (element == 0) {
                tabla += "<td style='background-color: black;'> </td>";
            }
            if (element == 2) {
                tabla += "<td style='background-color: green;'><span class='dot'></span></td>";
            }
            if (element == 3) {
                tabla += "<td style='background-color: red;'> </td>";
            }
       });
       tabla += "</tr>"; 
    });
    tabla += "</table>";
    document.getElementById("Laberinto").innerHTML = tabla;
}

function allowDrop(event) {
    event.preventDefault(); 
}

function drag(event) {
    event.dataTransfer.setData("id", event.target.id);
}

function drop(event) {
    event.preventDefault(); 
    const id = event.dataTransfer.getData("id");
    const draggedElement = document.getElementById(id).cloneNode(true);

    draggedElement.removeAttribute("ondragstart");
    draggedElement.removeAttribute("draggable");

    event.target.appendChild(draggedElement); 
}
function limpiar(){
    const tablero=document.getElementById("Tablero");
    const tabla="";
    tablero.innerHTML=tabla;
}
function resolver() {
    const moves = Array.from(document.getElementById("Tablero").children);
    let delay = 0;

    moves.forEach((move) => {
        if (move.tagName === "IMG" && move.id) {
            const direction = move.id;
            setTimeout(() => {
                moverDot(direction); 
                Cargar_lab(); 
            }, delay);

            delay += 300;
        }
    });

}

function moverDot(direction) {
    let newX = posX;
    let newY = posY;

    switch(direction) {
        case "Der": newY += 1; break;
        case "Izq": newY -= 1; break;
        case "Up":  newX -= 1; break;
        case "Down": newX += 1; break;
    }

    if (newX < 0 || newX >= Laberinto.length || newY < 0 || newY >= Laberinto[0].length) {
        console.log("Movimiento fuera de límites");
        return;
    }

    const cellValue = Laberinto[newX][newY];

    if (cellValue == 0) {
        console.log("Error: casilla negra");
        alert("ERROR"); 
        return;
    }
    if (cellValue == 3) {
        console.log("Exitoso: casilla roja");
        setTimeout(() => {
            alert("RESUELTO CORRECTAMENTE");
        }, 300);
         
    }

    Laberinto[posX][posY] = 1; 
    Laberinto[newX][newY] = 2; 
    posX = newX;
    posY = newY;
}
