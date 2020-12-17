let DCpublicKey = 0     //clé publique DataCollect
let publicInt = 0       //entier partégé
let SprivateKey = 84    //clé privée Sensor
let SpublicKey = 0      //clé publique Sensor
let secretKey = 0       //clé de chiffrement

radio.setGroup(99)      //groupe radio

//Réception de la clé publique du DC
radio.onReceivedString(function (receivedString: string) {
    //segmentation des données reçues
    let data = receivedString.split(";")

    if(data[0] == "INIT") {
        //récupération des valeurs
        publicInt = parseInt(data[1])
        DCpublicKey = parseInt(data[2])
        
        //Calcul des clés
        SpublicKey = publicInt * Math.exp(SprivateKey)
        secretKey = DCpublicKey * Math.exp(SprivateKey) 
        
        //Envoi de la clé publique du Sensor au DataCollect
        radio.sendValue("SensorKEY", SpublicKey)
    }
    else {
        let message = secureMsg(receivedString, secretKey, "decode")
        if(message == "coucou Sensor") {
            basic.showIcon(IconNames.Heart)
            radio.sendValue(secureMsg("coucou DataCollect", secretKey, "encode"))
        }

        //Changement de groupe de radio
        message.split(";")
        if(message[0] == "ChgmtRADIO") {
            radio.setGroup(message[1])
        }
    }
})

function secureMsg(str: string, key: number, mode: string): string {
    let signe: number;
    let codeString: number;
    let cryptedleter: string;
    let stringEncrypted = ""

    if (mode == "encode") {
        signe = 1
    }
    else{
        signe = -1
    }
    
    let limit = 1000
    for (let index = 0; index < str.length; index++) {
        key = key % (limit * signe)
        codeString = str.charCodeAt(index)
        cryptedleter = String.fromCharCode(codeString + key)
        stringEncrypted = stringEncrypted + cryptedleter

        if (key > 0) {
            key = key + codeString
        } else {
            key = -codeString
        }
        
    }

    return stringEncrypted
}