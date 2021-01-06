import time
import argparse
import signal
import sys
import socket
import socketserver
import threading
import serial
import json


HOST           = "0.0.0.0" #autorise tout le monde
UDP_PORT       = 10000 #Port 10000
MICRO_COMMANDS = ["TL" , "LT"]
FILENAME        = "values.txt" #ecrire les valeurs reçu dans ce document
LAST_VALUE      = "No Data" #si pas de data envoyer "no data"

class ThreadedUDPRequestHandler(socketserver.BaseRequestHandler):

    def handle(self):
        data = self.request[0].strip()
        data = data.decode("utf-8") #decode le message recu en byte
        socket = self.request[1]
        current_thread = threading.current_thread()
        print("{}: client: {}, wrote: {}".format(current_thread.name, self.client_address, data))
        if data != "": #si on recoit une donnée
                        if data in MICRO_COMMANDS: # Send message through UART
                                sendUARTMessage(data)
                                socket.sendto("True".encode(), self.client_address) #envoie du message true si tout c'est bien déroulé
                        elif data == "getValues()": # Sent last value received from micro-controller
                                socket.sendto(LAST_VALUE.encode(), self.client_address) 
                                print("message {} envoyé".format(LAST_VALUE))
                                # TODO: Create last_values_received as global variable      
                        else:
                                print("Unknown message: ",data)


class ThreadedUDPServer(socketserver.ThreadingMixIn, socketserver.UDPServer):
    pass


# send serial message 
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
        print ('Starting Up Serial Monitor')
        try:
                ser.open()
        except serial.SerialException:
                print("Serial {} port not available".format(SERIALPORT))
                exit()



def sendUARTMessage(msg):
    ser.write(msg.encode()) #ecrit un message dans le serial
    print("Message <" + msg + "> sent to micro-controller." )


# Main program logic follows:
if __name__ == '__main__':
        initUART()
        print ('Press Ctrl-C to quit.')
        import paho.mqtt.client as mqtt #import the client1
        #broker_address="192.168.1.184" 
        #client = mqtt.Client("emergency") #create new instance
        #client.connect(broker_address) #connect to broker

        myclient = pymongo.MongoClient("mongodb://localhost:27017/")
        mydb = myclient["iot"]
        mycol = mydb["data"]

        server = ThreadedUDPServer((HOST, UDP_PORT), ThreadedUDPRequestHandler)

        server_thread = threading.Thread(target=server.serve_forever)
        server_thread.daemon = True

        try:
                server_thread.start()
                print("Server started at {} port {}".format(HOST, UDP_PORT))
                while ser.isOpen() : 
                        time.sleep(1)
                        if (ser.inWaiting() > 0): # if incoming bytes are waiting 
                                #f= open(FILENAME,"a") #ouverture du fichier
                                data_str = ser.read(ser.inWaiting()).decode("utf-8")
                                #f.write(data_str) #ecriture dans le fichier
                                print(data_str) #ecriture dans la console, permet de vérifier la donnée reçu
                                #f.close() #fermeture du ficher 
                                previousvalue = LAST_VALUE
                                LAST_VALUE = data_str
                                try: #Transformation de la donnée reçu en JSON
                                        json_data_str = json.loads(data_str) 
                                        #print(json_data_str)
                                        try: #Insertion dans la BDD
                                                mycol.insert_one(json_data_str)
                                                #client.publish("repertoire","json_data_str")#publish
                                        except:
                                                print("erreur d'insertion dans la base de donnée")  
                                        
                                except:
                                        LAST_VALUE = previousvalue #permet de ne pas accepter les données corrompues ou incomplète
                                        print("erreur json")                     
                                
        except (KeyboardInterrupt, SystemExit):
                server.shutdown()
                server.server_close()
                ser.close()
                exit()

