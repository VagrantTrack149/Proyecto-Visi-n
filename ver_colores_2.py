import cv2 as cv
import numpy as np
import json
import os

os.makedirs("Prueba1/src", exist_ok=True)

cap = cv.VideoCapture(1)
if not cap.isOpened():
    print("Error al abrir la cámara")
    exit()

def encontrar_regiones_filtradas(mask, color_name, area_minima=400):
    """
    Encuentra las regiones significativas en la máscara, eliminando ruido.
    """
    contornos, _ = cv.findContours(mask, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    regiones = []
    for contorno in contornos:
        if cv.contourArea(contorno) > area_minima:
            x, _, _, _ = cv.boundingRect(contorno)
            regiones.append((color_name, x)) 
    return regiones

def ordenar_colores(mask_rojo, mask_verde, mask_azul, mask_amarillo):
    """
    Detecta regiones significativas por color y las ordena por posición horizontal.
    """
    colores = (
        encontrar_regiones_filtradas(mask_rojo, 'Red') +
        encontrar_regiones_filtradas(mask_verde, 'Green') +
        encontrar_regiones_filtradas(mask_azul, 'Blue') +
        encontrar_regiones_filtradas(mask_amarillo, 'Yellow')
    )
    colores_ordenados = sorted(colores, key=lambda x: x[1])
    nombres_ordenados = [color[0] for color in colores_ordenados]
    print(nombres_ordenados)
    return nombres_ordenados

def guardar_archivo(orden):
    """
    Guarda la orden en un archivo JSON.
    """
    datos_json = {"orden": orden}
    with open("Prueba1/src/datos.json", "w") as file:
        json.dump(datos_json, file, indent=4)

while True:
    ret, frame = cap.read()
    if ret:
        frameRGB = cv.cvtColor(frame, cv.COLOR_BGR2RGB)

        rojo_bajo1 = np.array([170, 70, 75], np.uint8)  
        rojo_alto1 = np.array([210, 100, 110], np.uint8)

        verde_bajo = np.array([0, 120, 0], np.uint8)
        verde_alto = np.array([120, 255, 120], np.uint8)

        azul_bajo = np.array([107, 140, 159], np.uint8)
        azul_alto = np.array([148, 167, 182], np.uint8)

        amarillo_bajo = np.array([180, 130, 0], np.uint8)
        amarillo_alto = np.array([255, 255, 100], np.uint8)

        mask_rojo = cv.inRange(frameRGB, rojo_bajo1, rojo_alto1)
        mask_verde = cv.inRange(frameRGB, verde_bajo, verde_alto)
        mask_azul = cv.inRange(frameRGB, azul_bajo, azul_alto)
        mask_amarillo = cv.inRange(frameRGB, amarillo_bajo, amarillo_alto)

        mask_colores = mask_rojo | mask_verde | mask_azul | mask_amarillo
        colores_detectados = cv.bitwise_and(frame, frame, mask=mask_colores)

        cv.imshow('frame', frame)
        cv.imshow('colores detectados', colores_detectados)

        orden = ordenar_colores(mask_rojo, mask_verde, mask_azul, mask_amarillo)
        guardar_archivo(orden)

        if cv.waitKey(1) & 0xFF == ord('s'):
            break

cap.release()
cv.destroyAllWindows()
