import requests as rq
import serial, time, json

r = rq.get("http://127.0.0.1:8080/api/real_data/feu")
print(r.text)