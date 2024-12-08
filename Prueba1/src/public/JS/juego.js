let Laberinto;
let labs;
function GetLab() {
    fetch('/Laberinto') 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener los datos: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.matriz && Array.isArray(data.matriz)) {
                const { nombre, dimensiones, matriz } = data;
                console.log("Datos obtenidos");
                //console.log('Nombre:'+nombre);
                //console.log('Dimensiones:'+ dimensiones[0]+'x'+dimensiones[1]);
                //console.log('Matriz:'+matriz)
                Laberinto = JSON.parse(JSON.stringify(matriz)); 
                labs = JSON.parse(JSON.stringify(matriz));     
                return Laberinto;
            } else {
                console.error("El formato de los datos no es válido:", data);
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}


function recargar_lab() {
    if (Laberinto == labs) {
        console.log("error");
    }else{
        console.log(Laberinto);
        console.log(labs);
    }
    Cargar_lab_2(labs);
}
let posX = 1;
let posY = 1; 
let tabla = "<table border='1' style='width:100%; height: 100%;'>";

function Cargar_lab_primera_vez(){
    GetLab();
    setTimeout(() => {
    tabla = "<table border='1' style='width:100%; height: 100%;'>";
    Laberinto.forEach(fila => {
       tabla += "<tr>";
       fila.forEach(element=>{
        if (element == 1) {
            tabla += "<td style='background-color: white;'> </td>";
        }
        if (element == 0) {
            tabla += "<td style='background-color: #51606b;'> </td>";
        }
        if (element == 2) {
            tabla += "<td style='background-color: #8eff8e;'><span class='dot'></span></td>";
        }
        if (element == 3) {
            tabla += "<td style='background-color: #ff6b6b;'> </td>";
        }
       });
       tabla += "</tr>"; 
    });
    tabla += "</table>";
    document.getElementById("Laberinto").innerHTML = tabla;
    }, 200); 
}
function Cargar_lab(){
    tabla = "<table border='1' style='width:100%; height: 100%;'>";
    Laberinto.forEach(fila => {
       tabla += "<tr>";
       fila.forEach(element=>{
        if (element == 1) {
            tabla += "<td style='background-color: white;'> </td>";
        }
        if (element == 0) {
            tabla += "<td style='background-color: #51606b;'> </td>";
        }
        if (element == 2) {
            tabla += "<td style='background-color: #8eff8e;'><span class='dot'></span></td>";
        }
        if (element == 3) {
            tabla += "<td style='background-color: #ff6b6b;'> </td>";
        }
       });
       tabla += "</tr>"; 
    });
    tabla += "</table>";
    document.getElementById("Laberinto").innerHTML = tabla;
}


function Cargar_lab_2(Laberinto){
        tabla = "<table border='1' style='width:100%; height: 100%;'>";
        Laberinto.forEach(fila => {
           tabla += "<tr>";
           fila.forEach(element=>{
                if (element == 1) {
                    tabla += "<td style='background-color: white;'> </td>";
                }
                if (element == 0) {
                    tabla += "<td style='background-color: #51606b;'> </td>";
                }
                if (element == 2) {
                    tabla += "<td style='background-color: #8eff8e;'><span class='dot'></span></td>";
                }
                if (element == 3) {
                    tabla += "<td style='background-color: #ff6b6b;'> </td>";
                }
           });
           tabla += "</tr>"; 
        });
        tabla += "</table>";
        document.getElementById("Laberinto").innerHTML = tabla;
        console.log("Logrado");
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
                if (control==0) {
                    Cargar_lab();
                    move.classList.add("Bien"); 
                }
                if (control==1) {
                    Cargar_lab_2(labs);
                    move.classList.add("Mal");  
                }
                if (control==2) {
                    Cargar_lab_2(labs);    
                    move.classList.add("Perfecto");  
                }
            }, delay);
            delay += 300;
        }
    });
}
let control = 0;
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
    console.log("x:"+newX+"y:"+newY);

    var cellValue = Laberinto[newX][newY];

    if (cellValue == 0) {
        console.log("Error: casilla negra");
        alert("ERROR"); 
        control=1;
        Laberinto=labs.slice(0);
        return;
    }
    if (cellValue == 3) {
        console.log("Exitoso: casilla roja");
        alert("RESUELTO CORRECTAMENTE");
        control=2;
        Laberinto=labs.slice(0);
        return;
         
    }

    Laberinto[posX][posY] = 1; 
    Laberinto[newX][newY] = 2; 
    posX = newX;
    posY = newY;
}

function leer(){
    Tablero= document.getElementById("Tablero");
    Datos="";
    fetch('/datos')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
        }
        return response.json(); 
        })
    .then(data => {
        if (data && Array.isArray(data.orden)) {
        data.orden.forEach(color => {
            //console.log(color);
            switch (color) {
                case "Red":
                    Datos+='<img id="Der" src="images/Der_1.jpg" alt="Derecha">'
                    break;
                case "Blue":
                    Datos+='<img id="Izq" src="images/Izq_1.jpg" alt="Izquierda">'
                    break;
                case "Green":
                    Datos+='<img id="Up" src="images/Up_1.jpg" alt="Arriba">'
                    break;
                case "Yellow":
                    Datos+='<img id="Down" src="images/Down_1.jpg" alt="Abajo">'
                    break;
                default:
                    break;
            }
        });
        Tablero.innerHTML=Datos;
        } else {
        console.error('El formato de los datos no es válido:', data);
        }
    })
    .catch(error => {
    console.error('Error en la solicitud:', error);
});
}