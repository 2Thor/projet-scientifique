let DCpublicKey = 0;     //clé publique DataCollect
let publicInt = 0;       //entier partégé
let SprivateKey = 84;    //clé privée Sensor
let SpublicKey = 0;      //clé publique Sensor
let secretKey = 0;       //clé de chiffrement

radio.setGroup(99);     //groupe radio

//Sécurisation des données
function secureMsg(str: string, key: number, mode: string): string {
    let stringEncrypted = "";

    /*Cesar*//*
    let signe: number;
    let codeString: number;
    let cryptedleter: string;

    if (mode == "encode") {
        signe = 1;
    }
    else{
        signe = -1;
    }
    
    let limit = 1000
    for (let index = 0; index < str.length; index++) {
        key = key % (limit * signe)
        codeString = str.charCodeAt(index)
        cryptedleter = String.fromCharCode(codeString + key)
        stringEncrypted = stringEncrypted + cryptedleter

        if (key > 0) {
            key = key + codeString;
        } else {
            key = -codeString;
        }
        
    }*/

    /*AES <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>*/
    var CryptoJS = require("crypto-js");

    if (mode == "encode") {
        stringEncrypted = CryptoJS.AES.encrypt(str, key);
    }
    else{
        stringEncrypted = CryptoJS.AES.decrypt(str, key);
    }

    return stringEncrypted;
}

//  Etablissement de la connexion sécurisée

//Réception de la clé publique du DC
radio.onReceivedString(function (receivedString: string) {
    //segmentation des données reçues
    let data = receivedString.split(";");

    if(data[0] == "INIT") {
        //récupération des valeurs
        publicInt = parseInt(data[1]);
        DCpublicKey = parseInt(data[2]);
        
        //Calcul des clés
        SpublicKey = publicInt * Math.exp(SprivateKey);
        secretKey = DCpublicKey * Math.exp(SprivateKey);
        
        //Envoi de la clé publique du Sensor au DataCollect
        radio.sendValue("SensorKEY", SpublicKey);
    }
    else {
        let message = secureMsg(receivedString, secretKey, "decode")
        if(message == "coucou Sensor") {
            basic.showIcon(IconNames.Heart);
        }

        //Changement de groupe radio
        message.split(";");
        if(message[0] == "ChgmtRADIO") {
            radio.setGroup(message[1]);
        }
    }
})


//  Fonctionnement continu

//Fonction déclenchée lors d'une réception de données par UART
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    //Attente de réception de données
    serial.readUntil(serial.delimiters(Delimiters.NewLine));

    //Récupération des données
    receiveData = serial.delimiters(Delimiters.NewLine);

    //Sécurisation des données
    sentData = encrypt(idMicrobit + ";" + receiveData, key);

    //Transmission des données par radio
    radio.sendString(sentData);
})