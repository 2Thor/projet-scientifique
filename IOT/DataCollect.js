/* DataCollect */

radio.setGroup(99)          //  groupe radio
let receiveData             //  variable données recues en radio
let sentData                //  variable données envoyées en uart
let idNeighbour = "12345S"  //  id sensor pour envoi unicast
let idMicrobit = "12345DC"  //  id datacollect pour envoi unicast
let key = 39                //  key pour cryptage

//  Fonction qui se déclenche quand elle reçoit une string par radio
radio.onReceivedString(function (receivedString: string) {
    receiveData = decrypt(receivedString, key)
    let data = splitData(receiveData,";")
    if (dataVerification(data) == 1) {
        //Envoi en UART
        serial.writeString(formJson(data))
    }
    else {
        basic.showIcon(IconNames.No)
    }

})


//Convertion en Json
function formJson(str: string[]): string{

    str[1]=str[1].replace("(", "")
    str[1]=str[1].replace(")", "")
    let data = splitData(str[1], ",")
    let sentJson = "{ "
    sentJson += "'x': " + "\'" + data[0] + "\'" + ","
    sentJson += "'y': " + "\'" + data[1] + "\'" + ","
    sentJson += "'i': " + "\'" + data[2] + "\'"
    sentJson += " }"
    return sentJson

}

//Segmentation
function splitData(str: string, separator: string): string[] {

    let data = str.split(separator);
    return data
}

//Verification
function dataVerification(str: string[]): any {

    let check = 1
    if (str[0]!=idNeighbour) {
        check = 0
    }
    return check
}

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
