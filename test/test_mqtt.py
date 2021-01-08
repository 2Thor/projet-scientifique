from flask import Flask, render_template
from flask_mqtt import Mqtt

app = Flask(__name__)
app.config['MQTT_BROKER_URL'] = '1.1.1.1'
app.config['MQTT_BROKER_PORT'] = 1883

mqtt = Mqtt(app)

@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    print('Connecting...')
    mqtt.subscribe('Emergency/test')
    print('Connected')

print('Publishing...')
mqtt.publish('Emergency/test', 'ca marche !!')