import requests as rq
import serial, time, json

myobj = "{\"x\": 7, \"y\": 7, \"i\": 7}"


datajson = json.loads(myobj) #sendPost(datajson) # requete post
r = rq.post("http://127.0.0.1:8080/api/real_data/feu", data=datajson)
print(r.text)