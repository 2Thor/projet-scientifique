import time
import socketserver
import threading
import serial
import json


HOST           = "0.0.0.0" #autorise tout le monde
UDP_PORT       = 10000 #Port 10000salit
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
                print("msg recu ",data)


class ThreadedUDPServer(socketserver.ThreadingMixIn, socketserver.UDPServer):
    pass





# Main program logic follows:
if __name__ == '__main__':
        print ('Press Ctrl-C to quit.')


        server = ThreadedUDPServer((HOST, UDP_PORT), ThreadedUDPRequestHandler)

        server_thread = threading.Thread(target=server.serve_forever)
        server_thread.daemon = True

        try:
                server_thread.start()
                print("Server started at {} port {}".format(HOST, UDP_PORT))
                while True :
                        pass

                
                                
        except (KeyboardInterrupt, SystemExit):
                server.shutdown()
                server.server_close()
                print ('Serv ferme')
                exit()

