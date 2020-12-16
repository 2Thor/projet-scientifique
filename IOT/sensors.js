/* Sensors */

radio.setGroup(99)          //  groupe radio
let receiveData             //  variable données recues en uart
let sentData                //  variable données envoyées en radio
let idMicrobit = "12345S"   //  id sensor pour envoi unicast
let idNeighbour = "12345DC" //  id datacollect pour envoi unicast
let key = 39                //  key pour cryptage


//  Fonction qui se déclenche quand des données sont reçues par UART
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serial.readUntil(serial.delimiters(Delimiters.NewLine))
    receiveData = serial.delimiters(Delimiters.NewLine)
    sentData = encrypt(idMicrobit + ";" + receiveData, key)
    radio.sendString(sentData)
})

//Cryptage 
function addKeyToStr(str: string, key: number): string {
    let signe: number;
    let codeString: number;
    let cryptedleter: string;
    let stringEncrypted = ""
    //  key = key % 100
    if (key > 0) {
        //  encrypt
        signe = 1
    } else {
        //  decrype
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
    //  stringEncrypted = stringEncrypted + cryptedleter
    return stringEncrypted
}

function encrypt(stringToEncrypt: string, key: number): string {
    let stringEncrypted2 = addKeyToStr(stringToEncrypt, key)
    return stringEncrypted2
}

function decrypt(stringToDecrypt: string, key: number): string {
    //  debut du dechifrement
    let stringDecrypted = addKeyToStr(stringToDecrypt, -key)
    //  fin du dechifrement
    return stringDecrypted
}