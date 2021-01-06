import serial
import time

SERIALPORT = "/dev/ttyACM0"
BAUDRATE = 115200

ser = serial.Serial(SERIALPORT, BAUDRATE)

def sendUARTMessage(msg):
    ser.write(msg.encode())
    print("Message <" + msg + "> sent to micro-controller." )

ser.close()
ser.open()

while True:
    sendUARTMessage("Ooooooook")
    time.sleep(5)
ser.close()