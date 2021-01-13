import paho.mqtt.client as mqtt
import math

import time
import random

MQTT_ADDRESS = '1.1.1.1'
MQTT_PORT = 1883
MQTT_USER = 'mqtt'
MQTT_PASSWORD = 'n0t3sy'
MQTT_TOPIC = 'Emergency/test'
MQTT_CLIENT_ID = "Emergency1"

def on_connect(client, userdata, flags, rc):
    #Callback when receives a CONNACK response
    print('Connected, returned code :' + str(rc))
    client.subscribe(MQTT_TOPIC)

def on_publish(client,userdata,result): #create function for callback
    print("data published \n")
    pass

if __name__ == '__main__':
    print('MQTT Emergency to cloud')

    mqtt_client= mqtt.Client(MQTT_CLIENT_ID) #create client object
    mqtt_client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
    mqtt_client.on_publish = on_publish #assign function to callback
    mqtt_client.connect(MQTT_ADDRESS, MQTT_PORT) #establish connection

    data = "{\"x\": 45.75231328094806, \"y\": 4.8564025543870155, \"i\": 50}"

    while(1):
        
        mqtt_client.publish(MQTT_TOPIC,data) #publish
        lat = 45.75231328094806 + (random.random()-0.5)*0.05
        lon = 4.8564025543870155 + (random.random()-0.5)*0.05
        i = int(100*random.random())
        data = "{\"x\":" + str(lat) + ",\"y\":" + str(lon) + ",\"i\":" + str(i) + "}"
     
        time.sleep(4)