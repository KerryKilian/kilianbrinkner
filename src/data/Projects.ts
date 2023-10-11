export const projectsData = [
    {
        title: "SpyFinder",
        shortDescription: "Eine Android-App, die Wanrungen gibt, wenn man sich in der Nähe einer Überwachungskamera befindet",
        longDescription: "Die App nutzt das Geofencing von Google, um dauerhaft zu schauen, ob der User sich in der Nähe einer Überwachungskamera befindet. Die Daten kommen von der OpenStreetMap. " + 
        "Zunächst muss die Region ausgewählt werden, da die Standorte der Kameras statisch in der App gespeichert sind. In der Kartenansicht werden entweder alle Kameras in der Reguib oder nur alle Kameras in der Nähe angezeigt. " +
        "Da dies meine erste App ist, gibt es viele Optimierungsmöglichkeiten, zum Beispiel kann man die Standorte dynamisch jederzeit abfragen über die Overpass-API. " +
        "Die Geofencing-Bibliothek ist leider nicht sehr zuverlässig, da die App nicht unnötig viel Akku ziehen soll. Somit kann es sein, dass der User an Kameras vorbeiläuft, aber keine Benachrichtigung erhält. " + 
        "Außerdem funktioniert die Mapbox SDK zur Kartendarstellung nicht bei neueren Android-Versionen.",
        language: "Java (Android Studio)",
        github: "https://github.com/KerryKilian/SpyFinder",
        images: [
            {
                image: "kilianbrinkner/images/SpyFinder/SpyFinder1.png",
                description: "Startseite",
            },
            {
                image: "kilianbrinkner/images/SpyFinder/SpyFinder2.png",
                description: "Karte mit allen Kameras in der Nähe",
            },
            {
                image: "kilianbrinkner/images/SpyFinder/SpyFinder3.png",
                description: "Benachrichtigungen",
            }
        ]
    },
    {
        title: "GeoContentProvider",
        shortDescription: "Bachelorarbeit zur Offline-Bereitstellung von Geodaten.",
        longDescription: "In meiner Bachelorarbeit habe ich eine Android-App entwickelt, die auf dem Gerät lokal Geodaten besitzt. Andere Apps sollen die Möglichkeit haben, auf diese Geodaten zuzugreifen. " + 
        "In der Theorie könnte so jede beliebige App offline Daten von dieser App beziehen anstatt sich auf eine Interverbindung und Server zu verlassen." + 
        "Die App nutzt die Androd ContentProvider API zur Bereitstellung von Daten. Die Daten können ähnlich wie bei http abgefragt werden und als GeoJson, Json oder xml erhalten werden. " +
        "Es können Geodaten von einer Region abgefragt werden. Dabei können Parameter wie Koordinaten oder beliebige OSM-Eigenschaften übergeben werden, nach denen die App im internen Datensatz suchen wird. " + 
        "Es können aber auch Geodaten von einer App gespeichert werden und anschließend wieder abgefragt werden. Sozusagen als externer Speicher." + 
        "Die App kann außerdem den User Standortverlauf aufzeichnen und an andere Apps zur Verfügung stellen, die Abfragen nach Zeit durchführen können." + 
        "Auf der Github-Seite unter dem Branch 'Bachelor' sind die einzelnen Funktionen genauer erklärt. " +
        "Eine Schwierigkeit lag darin, wie die Daten gespeichert werden. Eine relationale Datenbank bietet sich bei Geodaten nicht an, deswegen wurden PBF-Dateien genutzt, die mit Hilfe von Bibliotheken ausgelesen werden können. " +
        "Das Suchen von Nodes mit gewünschten Eigenschaften stellte auch eine Herausforderung dar, insbesondere die Abfrage nach der gewünschten Bounding Box. " + 
        "Letztendlich musste auch eine geeignete Schnittstelle geschaffen werden, die der Komplexität der App gerecht wird.",
        language: "Java (Android Studio)",
        framework: "Android Studio",
        github: "https://github.com/KerryKilian/GeoContentProvider-Android/tree/bachelor",
        images: [
            {
                image: "kilianbrinkner/images/GeoContentProvider/Geo1.png",
                description: "Verarbeitung der Anfrage mit Bundle und der ContentProvider API",
            },
            {
                image: "kilianbrinkner/images/GeoContentProvider/Geo2.png",
                description: "Die Komplexität der App",
            },
        ]
    },
    {
        title: "Chat-App",
        shortDescription: "Flutter Chat App zum Schreiben und Verschicken von Nachrichten",
        longDescription: "Die App ist mit einer Firebase-Datenbank verknüpft, um Nachrichten über den Server an andere registriete Nutzer zu versenden und zu empfangen.",
        language: "Flutter",
        github: "https://github.com/KerryKilian/ChatApp_Flutter",
        database: "Firebase",
        images: [
            {
                image: "kilianbrinkner/images/ChatApp/ChatApp1.png",
                description: "Alle Chats anzeigen lassen",
            },
            {
                image: "kilianbrinkner/images/ChatApp/ChatApp2.png",
                description: "Im Chat mit anderen Usern",
            },
            {
                image: "kilianbrinkner/images/ChatApp/ChatApp3.png",
                description: "Mein Profil",
            },
            {
                image: "kilianbrinkner/images/ChatApp/ChatApp4.png",
                description: "Andere User finden",
            },
           
        ]
    },
    {
        title: "Schule-des-Friedens-Webseite",
        shortDescription: "Online-Auftritt der Schule des Friedens",
        longDescription: "In erster Linie ist die Webseite dafür da, Werbung zu machen für die ehrenamtliche Arbeit. Dazu gibt es verschiedene Reiter. Außerdem existiert die Möglichkeit für interne Personen, News hinzuzufügen. "+
        "Dazu müssen die Personen das richtige Passwort kennen. Das Backend besitzt auch Validierung, Logs sowie das Speichern der IP Adresse, sodass ungewünschte Zugriffe geblockt werden können. Die Daten sind in einer Firebase-Datenbank gespeichert.",
        language: "NextJS",
        github: "https://github.com/KerryKilian/Schule-des-Friedens-Webseite-Public",
        database: "Firebase",
        available: "https://schule-des-friedens-berlin.vercel.app/",
        images: [
            {
                image: "kilianbrinkner/images/SDF-Web/SDF1.png",
                description: "Ein Teil der Webseite mit Informationen über die Schule des Friedens",
            },
            {
                image: "kilianbrinkner/images/SDF-Web/SDF2.png",
                description: "News anzeigen lassen",
            },
            {
                image: "kilianbrinkner/images/SDF-Web/SDF3.png",
                description: "Login",
            },
            {
                image: "kilianbrinkner/images/SDF-Web/SDF4.png",
                description: "Nach dem Login kann man News hinzufügen.",
            },
        ]
    },
    {
        title: "Taschenrechner-App",
        shortDescription: "Ein einfacher Taschenrechner",
        longDescription: "In einem Uni-Modul mussten wir eine Taschenrechner-App programmieren. Dort kann man mit Grundrechenarten rechnen, mit negativen Zahlen, quadratisch als auch die Wurzel ziehen. ",
        language: "Java (Android Studio)",
        github: "https://github.com/KerryKilian/calculator",
        images: [
            {
                image: "kilianbrinkner/images/Calculator/Calculator1.png",
                description: "Addition",
            },
            {
                image: "kilianbrinkner/images/Calculator/Calculator2.png",
                description: "Quadrat",
            },
            {
                image: "kilianbrinkner/images/Calculator/Calculator3.png",
                description: "Wurzel",
            },
            {
                image: "kilianbrinkner/images/Calculator/Calculator4.png",
                description: "Division",
            },
        ]
    },
    {
        title: "GPS-Tracker-App",
        shortDescription: "GPS Tracking und Darstellung des Pfads",
        longDescription: "In einem Uni-Modul mussten wir eine App programmieren, die den Standortverlauf trackt und in einer GPX-Datei speichert. " +
        "Dieser Pfad wurde dann auf dem Bildschirm angezeigt, jedoch nicht auf einer Karte, sondern auf dem Bildschirm direkt gezeichnet. " +
        "Zusätzlich wurden Hilfslinien, welche Meridiane in UTM-Koordinaten darstellen. ",
        language: "Java (Android Studio)",
        github: "https://github.com/KerryKilian/GPSTracker",
        images: [
            {
                image: "kilianbrinkner/images/GPSTracker/GPSTracker1.png",
                description: "Bildschirm mit getrackter Kurve und Hilfslinien",
            },
            {
                image: "kilianbrinkner/images/GPSTracker/GPSTracker2.png",
                description: "Dieselbe Route auf OpenStreetMap dargestellt",
            },
        ]
    },
    {
        title: "Room-Datenbank-App",
        shortDescription: "App zum Anlegen und Speichern von Daten",
        longDescription: "In einem Uni-Modul mussten wir eine App programmieren, die Daten in einer Room Datenbank speichern kann. Ich habe mich für Universitäten und Studenten entschieden. "+
        "Das Ziel war es, mit ViewModel, ViewHolder, Repository und Dao umgehen zu können. Somit wurde die Datenbank nicht so einfach wie möglich, dafür aber so strukturiert wie möglich. " +
        "Außerdem wurde das Aufnehmen von Bildern mit der Kamera und das Speichern der Bilder im Dateisystem des Smartphones eingebaut.",
        language: "Java (Android Studio)",
        github: "https://github.com/KerryKilian/UniversitiesRoomDatabase",
        images: [
            {
                image: "kilianbrinkner/images/RoomDB/RoomDB1.png",
                description: "Alle Universitäten aufgelistet",
            },
            {
                image: "kilianbrinkner/images/RoomDB/RoomDB2.png",
                description: "Details einer Universität",
            },
            {
                image: "kilianbrinkner/images/RoomDB/RoomDB3.png",
                description: "Universität hinzufügen",
            },
            {
                image: "kilianbrinkner/images/RoomDB/RoomDB4.png",
                description: "Studenten hinzufügen",
            },
        ]
    },
    {
        title: "Digital Business Cards-App",
        shortDescription: "App zum Erstellen und Verbreiten von QR Codes in Flutter",
        longDescription: "User können in der App Daten eingeben, mit denen ein QR Code erzeugt wird. Dieser Code kann von Personen mit derselben App gescannt und gespeichert werden. Die gespeicherten QR Codes können in einer Liste angesehen werden.",
        language: "Flutter",
        github: "https://github.com/KerryKilian/DigitalBusinessCards",
        images: [
            {
                image: "kilianbrinkner/images/DigitalBusinessCards/Cards1.png",
                description: "Eigene Karte bearbeiten",
            },
            {
                image: "kilianbrinkner/images/DigitalBusinessCards/Cards2.png",
                description: "Eigene Karte bearbeiten mit Bild URLs",
            },
            {
                image: "kilianbrinkner/images/DigitalBusinessCards/Cards3.png",
                description: "Eigene Karte anzeigen lassen",
            },
            {
                image: "kilianbrinkner/images/DigitalBusinessCards/Cards4.png",
                description: "Andere Karte scannen",
            },
            {
                image: "kilianbrinkner/images/DigitalBusinessCards/Cards5.png",
                description: "Mit Kamera QR Code scannen",
            },
            {
                image: "kilianbrinkner/images/DigitalBusinessCards/Cards6.png",
                description: "Liste von gespeicherten QR Codes",
            },
            {
                image: "kilianbrinkner/images/DigitalBusinessCards/Cards7.png",
                description: "Gespeicherte Karte anzeigen lassen",
            },
           
        ]
    },
    {
        title: "React Shop Webseite",
        shortDescription: "Im Unterricht entwickelte Webseite zum Anlegen, editieren und löschen von Daten",
        longDescription: "Im Modul Web Engineering 2 haben wir eine komplette Web-Anwendung mit Backend und Frontend unter Leitung unseres Dozenten gebaut. Die Anwendung dient lediglich dazu, User, Listen und Items anzulegen, zu editieren und zu löschen. Im Frontend wird mit React, im Backend mit NodeJS und Express gearbeitet. Hier wurden viele Konzepte wie Validierung als auch Json Web Tokens behandelt. Das Github-Projekt ist aus Lizenzgründen nicht sichtbar",
        language: "React",
        images: [
            {
                image: "kilianbrinkner/images/ReactShop/ReactShop1.png",
                description: "Anzeigen öffentlicher Listen",
            },
            {
                image: "kilianbrinkner/images/ReactShop/ReactShop2.png",
                description: "Anzeigen der Items in der öffentlichen Liste",
            },
            {
                image: "kilianbrinkner/images/ReactShop/ReactShop3.png",
                description: "Anzeige eines Items",
            },
            {
                image: "kilianbrinkner/images/ReactShop/ReactShop4.png",
                description: "Neuen Store erstellen",
            },
            {
                image: "kilianbrinkner/images/ReactShop/ReactShop5.png",
                description: "Nach Login sieht User auch private Stores",
            },
            {
                image: "kilianbrinkner/images/ReactShop/ReactShop6.png",
                description: "Eingeloggte User können Stores editieren und löschen",
            },
           
        ]
    },
    
    
    
]
