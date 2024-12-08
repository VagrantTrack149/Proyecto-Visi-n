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
    contornos, _ = cv.findContours(mask, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    regiones = []
    for contorno in contornos:
        if cv.contourArea(contorno) > area_minima:
            x, _, _, _ = cv.boundingRect(contorno)
            regiones.append((color_name, x)) 
    return regiones


def depurar_contornos(frame, contornos):
    for contorno in contornos:
        if cv.contourArea(contorno) > 400:
            x, y, w, h = cv.boundingRect(contorno)
            cv.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)


def ordenar_colores(mask_rojo, mask_verde, mask_azul, mask_amarillo):
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
    datos_json = {"orden": orden}
    with open("Prueba1/src/datos.json", "w") as file:
        json.dump(datos_json, file, indent=4)

while True:
    ret, frame = cap.read()
    if ret:
        """""
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
        """""
        rojo_bajo1 = np.array([0, 50, 50], np.uint8)
        rojo_alto1 = np.array([10, 255, 255], np.uint8)
        rojo_bajo2 = np.array([170, 50, 50], np.uint8)
        rojo_alto2 = np.array([180, 255, 255], np.uint8)

        verde_bajo = np.array([35, 50, 50], np.uint8)
        verde_alto = np.array([85, 255, 255], np.uint8)

        azul_bajo = np.array([100, 50, 50], np.uint8)
        azul_alto = np.array([140, 255, 255], np.uint8)

        amarillo_bajo = np.array([20, 100, 100], np.uint8)
        amarillo_alto = np.array([30, 255, 255], np.uint8)

        frameHSV = cv.cvtColor(frame, cv.COLOR_BGR2HSV)

        mask_rojo1 = cv.inRange(frameHSV, rojo_bajo1, rojo_alto1)
        mask_rojo2 = cv.inRange(frameHSV, rojo_bajo2, rojo_alto2)
        mask_rojo = cv.bitwise_or(mask_rojo1, mask_rojo2)

        mask_verde = cv.inRange(frameHSV, verde_bajo, verde_alto)
        mask_azul = cv.inRange(frameHSV, azul_bajo, azul_alto)
        mask_amarillo = cv.inRange(frameHSV, amarillo_bajo, amarillo_alto)
        
        mask_colores = mask_rojo | mask_verde | mask_azul | mask_amarillo
        colores_detectados = cv.bitwise_and(frame, frame, mask=mask_colores)

        contornos_rojo, _ = cv.findContours(mask_rojo, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        depurar_contornos(frame, contornos_rojo)

        contornos_amarillo, _ = cv.findContours(mask_amarillo, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        depurar_contornos(frame, contornos_amarillo)
        
        contornos_verde, _ = cv.findContours(mask_verde, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        depurar_contornos(frame, contornos_verde)

        contornos_azul, _ = cv.findContours(mask_azul, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        depurar_contornos(frame, contornos_azul)

        cv.imshow('frame', frame)
        cv.imshow('colores detectados', colores_detectados)

        orden = ordenar_colores(mask_rojo, mask_verde, mask_azul, mask_amarillo)
        guardar_archivo(orden)

        if cv.waitKey(1) & 0xFF == ord('s'):
            break

cap.release()
cv.destroyAllWindows()
