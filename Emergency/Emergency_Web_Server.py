import serial, json, time

#Ce script python lit les donnees recues sur ttyACM0 puis les ecrit dans un fichier
#To do : Envoyer les donnees sur l'API Rest
#To do : Verifier integrite des donnees
#A lancer en sudo, a besoin de pyserial pour fonctionner (sudo pip install pyserial)

SERIALPORT = "/dev/ttyACM0"
#SERIALPORT = "/dev/tty.usbserial-DA00G4XZ"
BAUDRATE = 115200
ser = serial.Serial()

def initUART():
    # ser = serial.Serial(SERIALPORT, BAUDRATE)
    ser.port=SERIALPORT
    ser.baudrate=BAUDRATE
    ser.bytesize = serial.EIGHTBITS #number of bits per bytes
    ser.parity = serial.PARITY_NONE #set parity check: no parity
    ser.stopbits = serial.STOPBITS_ONE #number of stop bits
    ser.timeout = None          #block read
    # ser.timeout = 0             #non-block read
    # ser.timeout = 2              #timeout block read
    ser.xonxoff = False     #disable software flow control
    ser.rtscts = False     #disable hardware (RTS/CTS) flow control
    ser.dsrdtr = False       #disable hardware (DSR/DTR) flow control
    #ser.writeTimeout = 0     #timeout for write
    print ("Starting Up Serial Monitor")
    try:
        ser.open()
    except serial.SerialException:
        print("Serial {} port not available".format(SERIALPORT))
        exit()        

initUART()

while ser.isOpen() : 
    time.sleep(1)
    if (ser.inWaiting() > 0): # if incoming bytes are waiting 
        f= open("uart.log","a") #ouverture du fichier
        data_str = ser.read(ser.inWaiting()).decode("utf-8")
        f.write(data_str) #ecriture dans le fichier
        print(data_str) #ecriture dans la console, permet de vérifier la donnée reçu


        