import cv2 as cv
import numpy as np

cap= cv.VideoCapture(0)

while True:
    ret,frame = cap.read()
    if ret==True:
        frameHSV=cv.cvtColor(frame,cv.COLOR_BGR2HSV)
        cv.imshow('frame',frame)
        if cv.waitKey(1) & 0xFF==ord('s'):
            break
    
cap.release()
cv.destroyAllWindows()