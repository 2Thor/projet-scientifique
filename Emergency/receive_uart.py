import serial, time, json
import requests as rq
import paho.mqtt.client as mqtt

#Ce script python lit les donnees recues sur ttyACM0 puis les ecrit dans un fichier
#Fait : Envoyer les donnees sur l'API Rest
#Fait : Verifier integrite des donnees
#A lancer en sudo, a besoin de pyserial pour fonctionner (sudo pip install pyserial)

#MQTT
MQTT_ADDRESS = '192.168.1.89'
MQTT_PORT = 1883
MQTT_USER = 'mqtt'
MQTT_PASSWORD = 'n0t3sy'
MQTT_TOPIC = 'Emergency/test'
MQTT_CLIENT_ID = "Emergency1"

#UART
FILENAME = "uart.log"
SERIALPORT = "/dev/ttyACM0"
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

# lecture de la liaison serie
def readUARTMessage(): 
    data_str = ser.read(ser.inWaiting()).decode("utf-8")
    return data_str

# ecriture dans le fichier uart.log
def writeFile(data_str):
    f= open(FILENAME,"a") #ouverture du fichier
    f.write(data_str) #ecriture dans le fichier

def on_connect(client, userdata, flags, rc):
    #Callback when receives a CONNACK response
    print('Connected, returned code :' + str(rc))
    client.subscribe(MQTT_TOPIC)

def on_publish(client,userdata,result): #create function for callback
    print("data published \n")
    pass

# requete post
def sendPost(data_json):
    datajson = json.loads(data_json) #string to dict
    r = rq.post("http://127.0.0.1:8080/api/real_data/feu", data=datajson)
    print("Reponse de l'api :" + r.text)
 
# Main program logic follows:
if __name__ == '__main__':
    initUART()

    #init mqtt
    mqtt_client = mqtt.Client(MQTT_CLIENT_ID) #create client object
    mqtt_client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
    mqtt_client.on_publish = on_publish #assign function to callback
    mqtt_client.connect(MQTT_ADDRESS, MQTT_PORT) #establish connection

    print ('Press Ctrl-C to quit.')
    try:
        while ser.isOpen() : 
            time.sleep(1)
            if (ser.inWaiting() > 0): # if incoming bytes are waiting
                data = readUARTMessage() # read l'uart
                print("Donnees recues du DataCollect : " + data)

                #Envoi des données au MQTT
                try:
                    mqtt_client.publish(MQTT_TOPIC,data) #publish
                except:
                    print("Erreur d'envoi MQTT") 

                #Envoi des données a la BDD
                try:
                    sendPost(data) # requete post
                except:
                    print("Erreur d'insertion dans la base de donnée")  
                
                writeFile(data) #log

    except (KeyboardInterrupt, SystemExit):
        ser.close()
        exit()


 

        