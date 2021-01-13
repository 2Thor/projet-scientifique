from json import encoder
from json.decoder import JSONDecoder
import paho.mqtt.client as mqtt
from influxdb import InfluxDBClient, client
import json

INFLUXDB_ADDRESS = 'localhost'
INFLUXDB_USER = 'mqtt'
INFLUXDB_PASSWORD = 'N0tC0mpl1c4t3d'
INFLUXDB_DATABASE = 'test' #'Gestion_Feu'

MQTT_ADDRESS = '1.1.1.1'
MQTT_USER = 'mqtt'
MQTT_PASSWORD = 'n0t3sy'
MQTT_TOPIC = 'Emergency/test'

influxdb_client = InfluxDBClient(INFLUXDB_ADDRESS, 8086, INFLUXDB_USER, INFLUXDB_PASSWORD, None)

def on_connect(client, userdata, flags, rc):
    """ The callback for when the client receives a CONNACK response from the server."""
    print('Connected with result code ' + str(rc))
    client.subscribe(MQTT_TOPIC)

def init_influxdb_database():
    databases = influxdb_client.get_list_database()
    if len(list(filter(lambda x: x['name'] == INFLUXDB_DATABASE, databases))) == 0:
        influxdb_client.create_database(INFLUXDB_DATABASE)

    print(influxdb_client.get_list_database())
    influxdb_client.switch_database(INFLUXDB_DATABASE)

def send_data_to_influxdb(fire_data):
    fire_data = json.loads(fire_data)

    json_body = [{
        "measurement": "capteurs",
        "tags": {
            "lat": fire_data["x"],
            "lon": fire_data["y"]
        },
        "fields": {
            "intensity": fire_data["i"]
        }
    }]

    print(influxdb_client.write_points(json_body))
    
def on_message(client, userdata, msg):
    #Callback when PUBLISH message is received from the server
    fire_data = str(msg.payload.decode("utf-8"))

    print('données:', fire_data)

    if fire_data is not None:
        send_data_to_influxdb(fire_data)
        print('\nmsg: ', fire_data, 'sent to bdd')

def main():
    init_influxdb_database()

    mqtt_client = mqtt.Client("mqtt")
    mqtt_client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
    mqtt_client.on_connect = on_connect
    mqtt_client.on_message = on_message

    mqtt_client.connect(MQTT_ADDRESS, 1883)
    mqtt_client.loop_forever()

if __name__ == '__main__':
    print('MQTT to InfluxDB bridge')
    main()