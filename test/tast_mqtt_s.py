import paho.mqtt.client as mqtt

MQTT_ADDRESS = '1.1.1.1'
MQTT_PORT = 1883
MQTT_USER = 'mqtt'
MQTT_PASSWORD = 'n0t3sy'
MQTT_TOPIC = 'Emergency/test'

def on_connect(client, userdata, flags, rc):
    #Callback when receives a CONNACK response
    print('Connected, returned code :' + str(rc))
    client.subscribe(MQTT_TOPIC)

def on_publish(client,userdata,result): #create function for callback
    print("data published \n")
    pass
    
if __name__ == '__main__':
    print('MQTT Emergency to cloud')

    mqtt_client= mqtt.Client("control1") #create client object
    mqtt_client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
    mqtt_client.on_publish = on_publish #assign function to callback
    mqtt_client.connect(MQTT_ADDRESS, MQTT_PORT) #establish connection

    mqtt_client.publish(MQTT_TOPIC,"{\"id\": 1, \"location\":[45.75231328094806, 4.8564025543870155], \"intensity\": 50}") #publish