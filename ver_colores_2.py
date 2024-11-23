# -*- coding: utf-8 -*-
"""
Created on Wed Oct 16 18:58:21 2024

@author: NeilO
"""


import cv2 as cv
import numpy as np
import json

cap = cv.VideoCapture(0)
def encontrar_primera_aparicion(mask, color_name):
            coords = np.where(mask != 0)
            if coords[0].size > 0 and coords[1].size > 0:
                primera_y = coords[0][0]
                primera_x = coords[1][0]
                #print(f"Primera aparición de {color_name}: ({primera_x}, {primera_y})")
                return color_name,primera_x,primera_y
            else:
                #print("Sin colores detectados")
                return color_name,None,None

def ordenar(mask_rojo,mask_verde,mask_azul,mask_amarillo):
           Rojo,rojo_x,rojo_y= encontrar_primera_aparicion(mask_rojo, 'red')
           Verde,verde_x,verde_y= encontrar_primera_aparicion(mask_verde, 'green')
           Azul,azul_x,azul_y= encontrar_primera_aparicion(mask_azul, 'blue')
           Amarillo,amarillo_x,amarillo_y=encontrar_primera_aparicion(mask_amarillo, 'yellow')
           colores = [
               (Rojo, rojo_x, rojo_y) if rojo_x is not None else None,
               (Verde, verde_x, verde_y) if verde_x is not None else None,
               (Azul, azul_x, azul_y) if azul_x is not None else None,
               (Amarillo, amarillo_x, amarillo_y) if amarillo_x is not None else None
               ]
           colores = [color for color in colores if color is not None]
           #colores_ordenados = sorted(colores, key=lambda color: color[1] if color[1] is not None else float('inf'))
           colores_ordenados = sorted(filter(None, colores), key=lambda x: x[1] if x[1] is not None else float('inf'))
           #print("Colores ordenados por valor de x:")
           #for color in colores_ordenados:
           #print(f"{color[0]}: ({color[1]}, {color[2]})")
           nombres_ordenados = [color[0] for color in colores_ordenados]
           print(nombres_ordenados)
           return nombres_ordenados

def archivo(orden):
    datos_json = {"orden": orden}
    with open("Prueba1/src/datos.json", "w") as file: 
        json.dump(datos_json, file, indent=4)  
    
while True:
    ret, frame = cap.read()
    if ret:
        frameHSV = cv.cvtColor(frame, cv.COLOR_BGR2HSV)

        rojo_bajo1 = np.array([0, 100, 20], np.uint8)
        rojo_alto1 = np.array([10, 255, 255], np.uint8)
        rojo_bajo2 = np.array([170, 100, 20], np.uint8)
        rojo_alto2 = np.array([180, 255, 255], np.uint8)

        verde_bajo = np.array([36, 100, 20], np.uint8)
        verde_alto = np.array([86, 255, 255], np.uint8)

        azul_bajo = np.array([100, 100, 20], np.uint8)
        azul_alto = np.array([140, 255, 255], np.uint8)

        # Rango para color amarillo
        amarillo_bajo = np.array([20, 100, 100], np.uint8)
        amarillo_alto = np.array([30, 255, 255], np.uint8)

        #negro_bajo = np.array([0, 0, 0], np.uint8)
        #negro_alto = np.array([180, 255, 30], np.uint8)

        mask_rojo = cv.inRange(frameHSV, rojo_bajo1, rojo_alto1) | cv.inRange(frameHSV, rojo_bajo2, rojo_alto2)
        mask_verde = cv.inRange(frameHSV, verde_bajo, verde_alto)
        mask_azul = cv.inRange(frameHSV, azul_bajo, azul_alto)
        #mask_negro = cv.inRange(frameHSV, negro_bajo, negro_alto)
        mask_amarillo = cv.inRange(frameHSV, amarillo_bajo, amarillo_alto)
        #mask_colores = mask_rojo | mask_verde | mask_azul | mask_negro
        mask_colores = mask_rojo | mask_verde | mask_azul | mask_amarillo

        colores_detectados = cv.bitwise_and(frame, frame, mask=mask_colores)

        cv.imshow('frame', frame)  
        cv.imshow('colores detectados', colores_detectados)
        
        #encontrar_primera_aparicion(mask_rojo, 'rojo')
        #encontrar_primera_aparicion(mask_verde, 'verde')
        #encontrar_primera_aparicion(mask_azul, 'azul')
        #encontrar_primera_aparicion(mask_amarillo, 'amarillo')
        orden=ordenar(mask_rojo,mask_verde,mask_azul,mask_amarillo)
        archivo(orden)
        if cv.waitKey(1) & 0xFF == ord('s'):
            break
        

cap.release()
cv.destroyAllWindows()
