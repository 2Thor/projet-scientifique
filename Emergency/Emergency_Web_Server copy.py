import paho.mqtt.client as mqtt
from flask import Flask, render_template #map on Web page


    
MQTT_ADDRESS = '1.1.1.1'
MQTT_USER = 'mqtt'
MQTT_PASSWORD = 'n0t3sy'
MQTT_TOPIC = 'Emergency/test'
MQTT_CLIENT_ID = 'MQTTInfluxDBBridge'

def on_connect(client, userdata, flags, rc):
    #Callback when receives a CONNACK response
    print('Connected, returned code :' + str(rc))
    client.subscribe(MQTT_TOPIC)
    
# Main program logic follows:
if __name__ == '__main__':
    app = Flask(__name__)

    @app.route('/')
    def map_func():
	    return render_template('map.html')

    mqtt_client = mqtt.Client(MQTT_CLIENT_ID)
    mqtt_client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
    mqtt_client.on_connect = on_connect
    mqtt_client.connect(MQTT_ADDRESS, 1883)

    print ('Press Ctrl-C to quit.')
    try:
        print('Publishing...')
        mqtt_client.publish(MQTT_TOPIC, '{ x: "1",y: "2",i: "7" }') 

    except (KeyboardInterrupt, SystemExit):
        ser.close()
        exit()


 

        