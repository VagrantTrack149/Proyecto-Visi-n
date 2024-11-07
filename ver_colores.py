# -*- coding: utf-8 -*-
"""
Created on Wed Oct 16 18:55:17 2024

@author: NeilO
"""

import cv2 as cv
import numpy as np

# Función para detectar y mostrar colores
def detectar_color(frameHSV, lower_bound, upper_bound, color_name):
    mask = cv.inRange(frameHSV, lower_bound, upper_bound)
    result = cv.bitwise_and(frame, frame, mask=mask)
    cv.imshow(f'{color_name}', result)

cap = cv.VideoCapture(0)

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

        negro_bajo = np.array([0, 0, 0], np.uint8)
        negro_alto = np.array([180, 255, 30], np.uint8)

        detectar_color(frameHSV, rojo_bajo2, rojo_alto2, 'Rojo 2')
        detectar_color(frameHSV, verde_bajo, verde_alto, 'Verde')
        detectar_color(frameHSV, azul_bajo, azul_alto, 'Azul')
        detectar_color(frameHSV, negro_bajo, negro_alto, 'Negro')


        cv.imshow('frame', frame)

        if cv.waitKey(1) & 0xFF == ord('s'):
            break

cap.release()
cv.destroyAllWindows()
