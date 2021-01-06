//On définit un entier commun et la clé privée du DC
let SpublicKey = 0      //clé publique Sensor
let publicInt = 69      //entier partagé
let DCprivateKey = 31   //clé privée DataCollect
let DCpublicKey = publicInt * Math.exp(DCprivateKey)    //clé publique DataCollect
let secretKey = 0       //clé secrête pour le chiffrement/déchiffrement des messages
let radio = 99

radio.setGroup(radio)      //groupe radio
 
//On envoi l’entier partagé et la clé publique du DataCollect jusqu’à ce qu’il ai la clé publique du sensor
basic.forever(function () {
    if(SpublicKey == 0) {
        let envoi = "INIT;" + publicInt + ";" + DCpublicKey
        radio.sendString(envoi)
    }
    else{
        //Change le groupe radio pour toujours plus de sécurité
        if(radio == 99) {
            //Selectionne une radio entre 1 et 100
            radio = Math.floor(Math.random() * 100) + 1;
            let selRadio = "ChgmtRADIO" + radio
            radio.sendString(secureMsg(selRadio, secretKey, "encode"))
        }
        radio.sendString(secureMsg("coucou Sensor", secretKey, "encode"))
    }
})

//Réception de la clé publique du sensor
radio.onReceivedValue(function (name: string, value: number) {
    if(name == "SensorKEY") {
        SpublicKey = value
	    secretKey = SpublicKey * Math.exp(DCprivateKey)
    }
})

radio.onReceivedString(function (receivedString: string) {
    if(secureMsg(receivedString, secretKey, "decode") == "coucou DataCollect") {
        basic.showIcon(IconNames.Heart)
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