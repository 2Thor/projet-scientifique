# projet-scientifique
## Projet semestre 7 CPE Lyon Gestion de feux

<p>Groupe 13 :<br>

Bruno Loïc<br>
Bugand-Bugandet Jean-Sébastien<br>
Chateauneuf Grégoire<br>
Dethoor Clément</P>

## Sensors

<p>Ce Micro:Bit est connecté en USB (liaison série) au Simulator Web Server qui lui envoie par USB les données des feux au format (colonne, ligne, intensité), ces données proviennent de la base de donée simulator. Il envoie ces données via la liaison RF vers le DataCollect, en utilisant un protocole sécurisé. Le microcontroleur est programmé en Python. Les données envooyé sont une matrice de coordonnées avec des intensités allant de 0 à 100.</p>

## Data Collect
<p> Receptionne les données du Sensors via liaison RF, via protocole sécurisé, les informations des intensités et emplacement des feux. Ce Micro:Bit est connecté en USB ( Liaison Série ) au Emergency's Web Server, il lui envoie les données qu'il reçoit après les avoir transformés au format JSON.</p>

## Emergency's web server
<p>Le rôle de ce serveur, en python avec flask, est de lire les données provenant du Data Collect via la liaison UART, au format JSON. Il a ensuite une triple fonction : <br>
 <span style="color:blue"> - Appel une API REST  pour enregistrer dans la base de données réelle les valeurs et emplacements des intensités des feux reçus.<br> </span>
 - Envoyer par messages MQTT les valeurs des instensités des feux à une base de données InfluxDB, ce qui permettra de faire le dashboard.<br>
 - Permet l'Emergency's view</p>


