import requests as rq
import serial, time, json

datajson={'x' : 20, 'y' : 30, 'i' : 10}
r = rq.get("http://127.0.0.1:8080/api/real_data/get_feu")
print(r.text)