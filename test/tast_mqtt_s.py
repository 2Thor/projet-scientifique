import paho.mqtt.client as mqtt

MQTT_ADDRESS = '1.1.1.1'
MQTT_USER = 'mqtt'
MQTT_PASSWORD = 'n0t3sy'
MQTT_TOPIC = 'Emergency/test'
MQTT_CLIENT_ID = 'MQTTInfluxDBBridge'


def on_connect(client, userdata, flags, rc):
    #Callback when receives a CONNACK response
    print('Connected, returned code :' + str(rc))
    client.subscribe(MQTT_TOPIC)


def main():
    mqtt_client = mqtt.Client(MQTT_CLIENT_ID)
    mqtt_client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
    mqtt_client.on_connect = on_connect

    mqtt_client.connect(MQTT_ADDRESS, 1883)

    mqtt_client.publish(MQTT_TOPIC, 'test reussi')

    mqtt_client.loop_forever()

if __name__ == '__main__':
    print('MQTT Emergency to cloud')
    main()