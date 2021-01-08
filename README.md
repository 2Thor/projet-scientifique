# projet-scientifique
## Projet semestre 7 CPE Lyon Gestion de feux

<p>Groupe 13 :<br>

Bruno Loïc<br>
Bugand-Bugandet Jean-Sébastien<br>
Chateauneuf Grégoire<br>
Dethoor Clément</P>

## Sensors
<p>Ce Micro:Bit est connecté en USB (liaison série) au Simulator Web Server qui lui envoie par USB les données des feux au format (colonne, ligne, intensité), ces données proviennent de la base de donée simulator. Il envoie ces données via la liaison RF vers le DataCollect, en utilisant un protocole sécurisé. Le Micro:Bit est programmé en Python. Les données envoyé sont sous formes de matrices avec les coordonnés et une intensités allant de 0 à 100.</p>

## Data Collect
<p> Receptionne les données du Sensors via liaison RF, via protocole sécurisé, les informations des intensités et emplacement des feux. Ce Micro:Bit est connecté en USB ( Liaison Série ) au Emergency's Web Server, il lui envoie les données qu'il reçoit après les avoir transformés au format JSON.</p>

## Emergency's web server
<p>Le rôle de ce serveur, en python avec flask, est de lire les données provenant du Data Collect via la liaison UART, au format JSON. Il a ensuite une triple fonction : <br>
 - Appel DATABSE API pour enregistrer dans la base de données réelle les valeurs et emplacements des intensités des feux reçus.<br>
 - Envoyer par messages MQTT les valeurs des instensités des feux au Dashboard dans le cloud. Broker : Mosquitto. Socket_io pour la connection bidirectionnelle avec peu de latence<br>
 - Permet l'Emergency's view</p>

## Dashboard
<p>Le dashboard dans le cloud reçoit des messages MQTT contenant les données d'intensités des feux, il les stockes dans sa base de donnée InfluxDB puis les met à disposition dans le service WEB Grafana pour afficher les données</p>

## Emergency View
<p>Affiche sur un service web les données sur un Leaflet les informations concernants les feux et les camions sur une map (OpenStreetMap). Ces données sont récupérées depuis le Emergency's web server</p>

## Emergency manager
<p>Application JAVA gérant l'envoie des camions sur les différents feux captés par le Data Collect et remontés par l'Emergency's web server dans la base de données. Les informations concernant la prise en charge des feux sont écritent sur la base de données grâce à la DATABASE API.</p>

## Simulator
<p>Cette application Java gère le changement d'intensité des feux, leurs positions. Les informations d'intensités de feu et de positions des feux sont envoyées dans la base de données via DATABASE API. Via cette API en lisant l'affectation des camions, il pourra en effectuer le déplacement. Lorsqu'un camion est proche d'un feu, le feu concerné réduit d'intensité. </p>

## Simulator web server
<p>Serveur en python avec Flask, il récupère les données de position et d'intensité des feux. Il heberge aussi le service pour la Simulation View </p>

## Simulation View
<p>Cette partie du Simulator's web server affiche sur Leaflet les informations concernant la position des feux et leur intensité sur une map (OpenStreetMap)</p>

## DATABASE API
<p>Cette API a pour rôle de d'enregistrer et d'envoyer les données dans la base de données (PostGreSQL). Le Simulator's Web server, le Simulator, l'Emergency's web server et l'Emergency manager s'en servent pour leurs requêtes.</p>

## DATABASE
<p>La base de donnée est divisée en 2 parties :<br>
- la partie Simulation (données provenant de Simulator)<br>
- la partie réelle ( données récupérer via les Micro:Bit ainsi que les camions,casernes,etc)</p>