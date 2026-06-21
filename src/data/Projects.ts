type Lang = 'de' | 'en';

interface ProjectImage {
  image: string;
  description: Record<Lang, string>;
}

interface ProjectTranslation {
  shortDescription: string;
  longDescription: string;
}

interface ProjectItem {
  title: string;
  language: string;
  github?: string;
  available?: string;
  images: ProjectImage[];
  de: ProjectTranslation;
  en: ProjectTranslation;
}

export interface ResolvedImage {
  image: string;
  description: string;
}

export interface ResolvedProjectItem {
  title: string;
  language: string;
  github?: string;
  available?: string;
  images: ResolvedImage[];
  shortDescription: string;
  longDescription: string;
}

export function getProjectsData(lang: string): ResolvedProjectItem[] {
  const l: Lang = lang.startsWith('en') ? 'en' : 'de';
  return projectsData.map(p => ({
    title: p.title,
    language: p.language,
    github: p.github,
    available: p.available,
    images: p.images.map(img => ({ image: img.image, description: img.description[l] })),
    ...p[l],
  }));
}

const projectsData: ProjectItem[] = [
  {
    title: "SpyFinder",
    language: "Java (Android Studio)",
    github: "https://github.com/KerryKilian/SpyFinder",
    images: [
      {
        image: "images/SpyFinder/SpyFinder1.png",
        description: { de: "Startseite", en: "Home screen" },
      },
      {
        image: "images/SpyFinder/SpyFinder2.png",
        description: { de: "Karte mit allen Kameras in der Nähe", en: "Map showing all nearby cameras" },
      },
      {
        image: "images/SpyFinder/SpyFinder3.png",
        description: { de: "Benachrichtigungen", en: "Notifications" },
      },
    ],
    de: {
      shortDescription:
        "Eine Android-App, die Warnungen gibt, wenn man sich in der Nähe einer Überwachungskamera befindet",
      longDescription:
        "Die App nutzt das Geofencing von Google, um dauerhaft zu schauen, ob der User sich in der Nähe einer Überwachungskamera befindet. Die Daten kommen von der OpenStreetMap. " +
        "Zunächst muss die Region ausgewählt werden, da die Standorte der Kameras statisch in der App gespeichert sind. In der Kartenansicht werden entweder alle Kameras in der Region oder nur alle Kameras in der Nähe angezeigt. " +
        "Da dies meine erste App ist, gibt es viele Optimierungsmöglichkeiten, zum Beispiel kann man die Standorte dynamisch jederzeit abfragen über die Overpass-API. " +
        "Die Geofencing-Bibliothek ist leider nicht sehr zuverlässig, da die App nicht unnötig viel Akku ziehen soll. Somit kann es sein, dass der User an Kameras vorbeiläuft, aber keine Benachrichtigung erhält. " +
        "Außerdem funktioniert die Mapbox SDK zur Kartendarstellung nicht bei neueren Android-Versionen.",
    },
    en: {
      shortDescription:
        "An Android app that alerts you when you are near a surveillance camera",
      longDescription:
        "The app uses Google Geofencing to continuously monitor whether the user is near a surveillance camera. Data is sourced from OpenStreetMap. " +
        "The user first selects a region, as camera locations are stored statically in the app. The map view displays either all cameras in the region or only those nearby. " +
        "As this was my first app, there are many areas for improvement — for example, locations could be fetched dynamically via the Overpass API. " +
        "The Geofencing library is not fully reliable, since the app is designed to minimise battery usage, meaning the user may pass cameras without receiving a notification. " +
        "Additionally, the Mapbox SDK used for map rendering no longer works on newer Android versions.",
    },
  },
  {
    title: "GeoContentProvider",
    language: "Java (Android Studio)",
    github: "https://github.com/KerryKilian/GeoContentProvider-Android/tree/bachelor",
    images: [
      {
        image: "images/GeoContentProvider/Geo1.png",
        description: {
          de: "Verarbeitung der Anfrage mit Bundle und der ContentProvider API",
          en: "Processing a request using Bundle and the ContentProvider API",
        },
      },
      {
        image: "images/GeoContentProvider/Geo2.png",
        description: { de: "Die Komplexität der App", en: "The complexity of the app" },
      },
    ],
    de: {
      shortDescription: "Bachelorarbeit zur Offline-Bereitstellung von Geodaten.",
      longDescription:
        "In meiner Bachelorarbeit habe ich eine Android-App entwickelt, die auf dem Gerät lokal Geodaten besitzt. Andere Apps sollen die Möglichkeit haben, auf diese Geodaten zuzugreifen. " +
        "In der Theorie könnte so jede beliebige App offline Daten von dieser App beziehen anstatt sich auf eine Internetverbindung und Server zu verlassen. " +
        "Die App nutzt die Android ContentProvider API zur Bereitstellung von Daten. Die Daten können ähnlich wie bei http abgefragt werden und als GeoJson, Json oder xml erhalten werden. " +
        "Es können Geodaten von einer Region abgefragt werden. Dabei können Parameter wie Koordinaten oder beliebige OSM-Eigenschaften übergeben werden, nach denen die App im internen Datensatz suchen wird. " +
        "Es können aber auch Geodaten von einer App gespeichert werden und anschließend wieder abgefragt werden. Sozusagen als externer Speicher. " +
        "Die App kann außerdem den User Standortverlauf aufzeichnen und an andere Apps zur Verfügung stellen, die Abfragen nach Zeit durchführen können. " +
        "Auf der Github-Seite unter dem Branch 'Bachelor' sind die einzelnen Funktionen genauer erklärt. " +
        "Eine Schwierigkeit lag darin, wie die Daten gespeichert werden. Eine relationale Datenbank bietet sich bei Geodaten nicht an, deswegen wurden PBF-Dateien genutzt, die mit Hilfe von Bibliotheken ausgelesen werden können. " +
        "Das Suchen von Nodes mit gewünschten Eigenschaften stellte auch eine Herausforderung dar, insbesondere die Abfrage nach der gewünschten Bounding Box. " +
        "Letztendlich musste auch eine geeignete Schnittstelle geschaffen werden, die der Komplexität der App gerecht wird.",
    },
    en: {
      shortDescription: "Bachelor thesis on offline provision of geospatial data.",
      longDescription:
        "For my bachelor thesis I developed an Android application that stores geospatial data locally on the device. Other apps can access this data through a standardised interface. " +
        "In theory, any app could retrieve offline geodata from this app instead of relying on an internet connection and remote servers. " +
        "The app uses Android's ContentProvider API to expose data. Queries can be made in a manner similar to HTTP requests, with responses available in GeoJSON, JSON or XML. " +
        "Geodata can be requested for a given region, with optional parameters such as coordinates or OSM properties for filtering. " +
        "Apps can also store their own geodata in the provider and retrieve it later — essentially using it as external storage. " +
        "The app can also record the user's location history and make it available to other apps with time-based queries. " +
        "The individual features are described in more detail on the GitHub page under the 'Bachelor' branch. " +
        "One challenge was deciding how to store the data: a relational database is not well suited for geospatial data, so PBF files were used and read with appropriate libraries. " +
        "Searching for nodes with specific properties also presented challenges, particularly querying by bounding box. " +
        "A suitable interface had to be designed to match the complexity of the application.",
    },
  },
  {
    title: "Chat-App",
    language: "Flutter",
    github: "https://github.com/KerryKilian/ChatApp_Flutter",
    images: [
      {
        image: "images/ChatApp/ChatApp1.png",
        description: { de: "Alle Chats anzeigen lassen", en: "View all chats" },
      },
      {
        image: "images/ChatApp/ChatApp2.png",
        description: { de: "Im Chat mit anderen Usern", en: "Inside a chat with other users" },
      },
      {
        image: "images/ChatApp/ChatApp3.png",
        description: { de: "Mein Profil", en: "My profile" },
      },
      {
        image: "images/ChatApp/ChatApp4.png",
        description: { de: "Andere User finden", en: "Find other users" },
      },
    ],
    de: {
      shortDescription: "Flutter Chat App zum Schreiben und Verschicken von Nachrichten",
      longDescription:
        "Die App ist mit einer Firebase-Datenbank verknüpft, um Nachrichten über den Server an andere registrierte Nutzer zu versenden und zu empfangen.",
    },
    en: {
      shortDescription: "Flutter chat app for sending and receiving messages",
      longDescription:
        "The app is connected to a Firebase database to send and receive messages via the server to other registered users.",
    },
  },
  {
    title: "Schule-des-Friedens-Webseite",
    language: "NextJS",
    github: "https://github.com/KerryKilian/Schule-des-Friedens-Webseite-Public",
    available: "https://schule-des-friedens-berlin.vercel.app/",
    images: [
      {
        image: "images/SDF-Web/SDF1.png",
        description: {
          de: "Ein Teil der Webseite mit Informationen über die Schule des Friedens",
          en: "Part of the website with information about the Schule des Friedens",
        },
      },
      {
        image: "images/SDF-Web/SDF2.png",
        description: { de: "News anzeigen lassen", en: "Viewing news" },
      },
      {
        image: "images/SDF-Web/SDF3.png",
        description: { de: "Login", en: "Login" },
      },
      {
        image: "images/SDF-Web/SDF4.png",
        description: {
          de: "Nach dem Login kann man News hinzufügen.",
          en: "After login, news can be added.",
        },
      },
    ],
    de: {
      shortDescription: "Online-Auftritt der Schule des Friedens",
      longDescription:
        "In erster Linie ist die Webseite dafür da, Werbung zu machen für die ehrenamtliche Arbeit. Dazu gibt es verschiedene Reiter. Außerdem existiert die Möglichkeit für interne Personen, News hinzuzufügen. " +
        "Dazu müssen die Personen das richtige Passwort kennen. Das Backend besitzt auch Validierung, Logs sowie das Speichern der IP Adresse, sodass ungewünschte Zugriffe geblockt werden können. Die Daten sind in einer Firebase-Datenbank gespeichert.",
    },
    en: {
      shortDescription: "Online presence for the Schule des Friedens",
      longDescription:
        "The website's primary purpose is to promote the organisation's volunteer work through various sections. Internal members can also add news items by entering the correct password. " +
        "The backend includes validation, logging, and IP address recording so that unwanted access can be blocked. Data is stored in a Firebase database.",
    },
  },
  {
    title: "Taschenrechner-App",
    language: "Java (Android Studio)",
    github: "https://github.com/KerryKilian/calculator",
    images: [
      {
        image: "images/Calculator/Calculator1.png",
        description: { de: "Addition", en: "Addition" },
      },
      {
        image: "images/Calculator/Calculator2.png",
        description: { de: "Quadrat", en: "Square" },
      },
      {
        image: "images/Calculator/Calculator3.png",
        description: { de: "Wurzel", en: "Square root" },
      },
      {
        image: "images/Calculator/Calculator4.png",
        description: { de: "Division", en: "Division" },
      },
    ],
    de: {
      shortDescription: "Ein einfacher Taschenrechner",
      longDescription:
        "In einem Uni-Modul mussten wir eine Taschenrechner-App programmieren. Dort kann man mit Grundrechenarten rechnen, mit negativen Zahlen, quadratisch als auch die Wurzel ziehen.",
    },
    en: {
      shortDescription: "A simple calculator app",
      longDescription:
        "As part of a university module we had to develop a calculator app. It supports basic arithmetic operations, negative numbers, squaring, and square roots.",
    },
  },
  {
    title: "GPS-Tracker-App",
    language: "Java (Android Studio)",
    github: "https://github.com/KerryKilian/GPSTracker",
    images: [
      {
        image: "images/GPSTracker/GPSTracker1.png",
        description: {
          de: "Bildschirm mit getrackter Kurve und Hilfslinien",
          en: "Screen with tracked path and auxiliary lines",
        },
      },
      {
        image: "images/GPSTracker/GPSTracker2.png",
        description: {
          de: "Dieselbe Route auf OpenStreetMap dargestellt",
          en: "The same route displayed on OpenStreetMap",
        },
      },
    ],
    de: {
      shortDescription: "GPS Tracking und Darstellung des Pfads",
      longDescription:
        "In einem Uni-Modul mussten wir eine App programmieren, die den Standortverlauf trackt und in einer GPX-Datei speichert. " +
        "Dieser Pfad wurde dann auf dem Bildschirm angezeigt, jedoch nicht auf einer Karte, sondern auf dem Bildschirm direkt gezeichnet. " +
        "Zusätzlich wurden Hilfslinien, welche Meridiane in UTM-Koordinaten darstellen.",
    },
    en: {
      shortDescription: "GPS tracking and path visualisation",
      longDescription:
        "In a university module we built an app that tracks location history and saves it as a GPX file. " +
        "The recorded path is displayed directly on the screen — not on a map, but drawn as lines over the display. " +
        "Auxiliary lines representing UTM meridians are also shown.",
    },
  },
  {
    title: "Room-Datenbank-App",
    language: "Java (Android Studio)",
    github: "https://github.com/KerryKilian/UniversitiesRoomDatabase",
    images: [
      {
        image: "images/RoomDB/RoomDB1.png",
        description: { de: "Alle Universitäten aufgelistet", en: "List of all universities" },
      },
      {
        image: "images/RoomDB/RoomDB2.png",
        description: { de: "Details einer Universität", en: "Details of a university" },
      },
      {
        image: "images/RoomDB/RoomDB3.png",
        description: { de: "Universität hinzufügen", en: "Add a university" },
      },
      {
        image: "images/RoomDB/RoomDB4.png",
        description: { de: "Studenten hinzufügen", en: "Add students" },
      },
    ],
    de: {
      shortDescription: "App zum Anlegen und Speichern von Daten",
      longDescription:
        "In einem Uni-Modul mussten wir eine App programmieren, die Daten in einer Room Datenbank speichern kann. Ich habe mich für Universitäten und Studenten entschieden. " +
        "Das Ziel war es, mit ViewModel, ViewHolder, Repository und Dao umgehen zu können. Somit wurde die Datenbank nicht so einfach wie möglich, dafür aber so strukturiert wie möglich. " +
        "Außerdem wurde das Aufnehmen von Bildern mit der Kamera und das Speichern der Bilder im Dateisystem des Smartphones eingebaut.",
    },
    en: {
      shortDescription: "App for creating and storing data",
      longDescription:
        "In a university module we had to build an app that stores data in a Room database. I chose to model universities and students. " +
        "The goal was to work correctly with ViewModel, ViewHolder, Repository and DAO — making the database as structured as possible rather than as simple as possible. " +
        "The app also includes the ability to take photos with the camera and save them to the device's file system.",
    },
  },
  {
    title: "Digital Business Cards-App",
    language: "Flutter",
    github: "https://github.com/KerryKilian/DigitalBusinessCards",
    images: [
      {
        image: "images/DigitalBusinessCards/Cards1.png",
        description: { de: "Eigene Karte bearbeiten", en: "Edit your own card" },
      },
      {
        image: "images/DigitalBusinessCards/Cards2.png",
        description: {
          de: "Eigene Karte bearbeiten mit Bild URLs",
          en: "Edit your own card with image URLs",
        },
      },
      {
        image: "images/DigitalBusinessCards/Cards3.png",
        description: { de: "Eigene Karte anzeigen lassen", en: "View your own card" },
      },
      {
        image: "images/DigitalBusinessCards/Cards4.png",
        description: { de: "Andere Karte scannen", en: "Scan another card" },
      },
      {
        image: "images/DigitalBusinessCards/Cards5.png",
        description: { de: "Mit Kamera QR Code scannen", en: "Scan QR code with camera" },
      },
      {
        image: "images/DigitalBusinessCards/Cards6.png",
        description: {
          de: "Liste von gespeicherten QR Codes",
          en: "List of saved QR codes",
        },
      },
      {
        image: "images/DigitalBusinessCards/Cards7.png",
        description: {
          de: "Gespeicherte Karte anzeigen lassen",
          en: "View a saved card",
        },
      },
    ],
    de: {
      shortDescription: "App zum Erstellen und Verbreiten von QR Codes in Flutter",
      longDescription:
        "User können in der App Daten eingeben, mit denen ein QR Code erzeugt wird. Dieser Code kann von Personen mit derselben App gescannt und gespeichert werden. Die gespeicherten QR Codes können in einer Liste angesehen werden.",
    },
    en: {
      shortDescription: "Flutter app for creating and sharing QR codes",
      longDescription:
        "Users can enter their details in the app to generate a QR code. This code can be scanned and saved by others using the same app. Saved QR codes can be viewed in a list.",
    },
  },
  {
    title: "React Shop Webseite",
    language: "React",
    images: [
      {
        image: "images/ReactShop/ReactShop1.png",
        description: { de: "Anzeigen öffentlicher Listen", en: "Viewing public lists" },
      },
      {
        image: "images/ReactShop/ReactShop2.png",
        description: {
          de: "Anzeigen der Items in der öffentlichen Liste",
          en: "Viewing items in a public list",
        },
      },
      {
        image: "images/ReactShop/ReactShop3.png",
        description: { de: "Anzeige eines Items", en: "Viewing an item" },
      },
      {
        image: "images/ReactShop/ReactShop4.png",
        description: { de: "Neuen Store erstellen", en: "Creating a new store" },
      },
      {
        image: "images/ReactShop/ReactShop5.png",
        description: {
          de: "Nach Login sieht User auch private Stores",
          en: "After login, the user also sees private stores",
        },
      },
      {
        image: "images/ReactShop/ReactShop6.png",
        description: {
          de: "Eingeloggte User können Stores editieren und löschen",
          en: "Logged-in users can edit and delete stores",
        },
      },
    ],
    de: {
      shortDescription:
        "Im Unterricht entwickelte Webseite zum Anlegen, editieren und löschen von Daten",
      longDescription:
        "Im Modul Web Engineering 2 haben wir eine komplette Web-Anwendung mit Backend und Frontend unter Leitung unseres Dozenten gebaut. Die Anwendung dient lediglich dazu, User, Listen und Items anzulegen, zu editieren und zu löschen. Im Frontend wird mit React, im Backend mit NodeJS und Express gearbeitet. Hier wurden viele Konzepte wie Validierung als auch Json Web Tokens behandelt. Das Github-Projekt ist aus Lizenzgründen nicht sichtbar",
    },
    en: {
      shortDescription:
        "Web app built in class for creating, editing, and deleting data",
      longDescription:
        "In the Web Engineering 2 module we built a complete web application with backend and frontend under our lecturer's guidance. The application allows users to create, edit and delete users, lists and items. React is used on the frontend, Node.js and Express on the backend. Key concepts covered include validation and JSON Web Tokens. The GitHub project is not publicly visible for licensing reasons.",
    },
  },
  {
    title: "Travusion - CSS Uni-Projekt",
    language: "CSS",
    github: "https://github.com/KerryKilian/Travusion",
    images: [
      {
        image: "images/CSS/css1.jpg",
        description: { de: "Logo und Such-Formular", en: "Logo and search form" },
      },
      {
        image: "images/CSS/css2.jpg",
        description: {
          de: "Animation on hover mit Opacity und Translation",
          en: "Hover animation with opacity and translation",
        },
      },
      {
        image: "images/CSS/css3.jpg",
        description: {
          de: "Mit einem Loop wird das 'Angebot'-Schild nacheinander größer animiert",
          en: "A loop animates the 'Offer' sign growing in sequence",
        },
      },
      {
        image: "images/CSS/css4.jpg",
        description: { de: "Formular", en: "Form" },
      },
    ],
    de: {
      shortDescription:
        "Im Unterricht entwickelte Webseite zur Anwendung von CSS-Wissen.",
      longDescription:
        "In einem Uni-Modul haben wir Frontend-Webdesign mit CSS gelernt. Diese Seite hat zwar keine Funktionalität, aber es wurde SCSS angewandt, um eine Webseite mit fortgeschrittenen Techniken wie Animationen oder Mixins zu gestalten.",
    },
    en: {
      shortDescription: "Website built in class to practice CSS skills.",
      longDescription:
        "In a university module we studied frontend web design with CSS. While the site has no functional features, SCSS was used to create a web page with advanced techniques such as animations and mixins.",
    },
  },
  {
    title: "OCR - Handwriting",
    language: "Python",
    github: "https://github.com/KerryKilian/ocr-handwriting",
    images: [
      {
        image: "images/OCRHandwriting/ocr1.png",
        description: {
          de: "Ergebnisse der Vorhersage auf Wörtern",
          en: "Prediction results on words",
        },
      },
      {
        image: "images/OCRHandwriting/ocr2.png",
        description: {
          de: "Ergebnisse der Vorhersage auf Zeichen",
          en: "Prediction results on characters",
        },
      },
      {
        image: "images/OCRHandwriting/ocr3.png",
        description: {
          de: "Konfusionsmatrix der Zeichen",
          en: "Confusion matrix of characters",
        },
      },
    ],
    de: {
      shortDescription: "Uni-Projekt zur Erkennung von Handschrift",
      longDescription:
        "Hier geht es um OCR, bei dem ich per Hand geschriebene Wörter erkenne. Ich nutze dafür selbst trainierte Convolutional Neural Networks in Pytorch. Das Modell klassifiziert einzelne Buchstaben. Ein eigens implementierter Algorithmus erkennt alle Buchstaben in einem Bild und lässt sie von der selbst trainierten KI identifizieren. Die Dokumentation ist auf github im readme verfügbar.",
    },
    en: {
      shortDescription: "University project for handwriting recognition",
      longDescription:
        "This project focuses on OCR to recognise handwritten words. I used self-trained Convolutional Neural Networks in PyTorch to classify individual letters. A custom-built algorithm detects all characters in an image and passes them to the trained model for identification. Documentation is available in the GitHub readme.",
    },
  },
  {
    title: "News Webseite mit KI",
    language: "Django",
    github: "https://github.com/KerryKilian/AI-News-Django",
    images: [
      {
        image: "images/NewsKI/newski1.png",
        description: {
          de: "Startseite mit deutschen Artikeln mit BVB Präferenz des Users",
          en: "Home page with German articles, BVB preference active",
        },
      },
      {
        image: "images/NewsKI/newski2.png",
        description: {
          de: "Startseite mit englischen Artikeln mit Sport Präferenz des Users",
          en: "Home page with English articles, Sports preference active",
        },
      },
      {
        image: "images/NewsKI/newski3.png",
        description: {
          de: "Liken, disliken und kommentieren eines Artikels",
          en: "Liking, disliking and commenting on an article",
        },
      },
      {
        image: "images/NewsKI/newski4.png",
        description: {
          de: "Suchen, Mehrsprachigkeit, gelesene Artikel und Logout",
          en: "Search, multilingual support, read articles and logout",
        },
      },
      {
        image: "images/NewsKI/newski5.png",
        description: {
          de: "Ergebnisse einer Suche nach 'America'",
          en: "Search results for 'America'",
        },
      },
    ],
    de: {
      shortDescription:
        "Personalisierte News Webseite, die Nachrichten mit KI kategorisiert",
      longDescription:
        "Eine mit Django geschriebene Seite, die Nachrichten anzeigt, die von der News Api kommen. Die Nachrichten werden mit einer selbst trainierten KI kategorisiert in verschiedene Kategorien wie Sport, General, Science usw. " +
        "Außerdem werden dem User personalisierte Nachrichten angezeigt. Das heißt, wenn der User eine bestimmte Kategorie liest und diese Artikel auch liked, dann werden ihm in Zukunft auch Artikel dieser Kategorie angezeigt. " +
        "Außerdem gibt es noch weitere Unterteilungen innerhalb der Kategorie: Wenn der User nur BVB-Artikel liest, dann werden auch bevorzugt BVB-Artikel angezeigt. Denn wenn einem User Sport-Artikel gefallen, heißt es nicht, dass der User auch alle Sportarten mag. " +
        "Gelöst wurde letzteres mit Bag of Words. Außerdem wurden einige Features eingebaut, wie schon gelesene Artikel, liken, disliken, kommentieren, suchen und Mehrsprachigkeit.",
    },
    en: {
      shortDescription:
        "Personalised news website that categorises articles using AI",
      longDescription:
        "A Django-based website that displays news articles sourced from the News API. Articles are categorised using a self-trained AI model into categories such as Sports, General, Science, and more. " +
        "Users also receive personalised recommendations: if a user reads and likes articles from a particular category, future suggestions will favour that category. " +
        "Further refinement is achieved within categories using Bag of Words — if a user only reads BVB articles, BVB content is prioritised, since liking Sport does not mean liking all sports. " +
        "Additional features include marking articles as read, liking, disliking, commenting, searching, and multilingual support.",
    },
  },
  {
    title: "Öffentliche Webseite für globales Treffen",
    language: "NextJS",
    github: "https://github.com/KerryKilian/yfp_berlin_2024_public",
    available: "https://yfp-berlin-2024.vercel.app/de",
    images: [
      {
        image: "images/yfp_berlin_2024/yfp1.png",
        description: { de: "Startseite mit Programminhalten", en: "Home page with programme content" },
      },
      {
        image: "images/yfp_berlin_2024/yfp2.png",
        description: {
          de: "Hier sind die Touren mit Beschreibungen und Anzahl einsehbar",
          en: "Tours with descriptions and participant counts",
        },
      },
      {
        image: "images/yfp_berlin_2024/yfp3.png",
        description: { de: "Hier kann sich eingetragen werden", en: "Sign-up page" },
      },
      {
        image: "images/yfp_berlin_2024/yfp4.png",
        description: {
          de: "Hier können Teilnehmer sich selbst suchen und ggf aus einer Tour austragen",
          en: "Participants can search for themselves and withdraw from a tour",
        },
      },
      {
        image: "images/yfp_berlin_2024/yfp5.png",
        description: {
          de: "Teilnehmer können mit dieser Seite selbst zu den Sehenswürdigkeiten laufen und dort Informationen dazu erhalten",
          en: "Participants can navigate to attractions independently and read information about them",
        },
      },
      {
        image: "images/yfp_berlin_2024/yfp6.png",
        description: { de: "Dateien stehen hier bereit", en: "Files available for download" },
      },
      {
        image: "images/yfp_berlin_2024/yfp7.png",
        description: {
          de: "Folgende Sprachen können ausgewählt werden",
          en: "Available language options",
        },
      },
    ],
    de: {
      shortDescription:
        "Die Webseite diente bei einem globalen Treffen zum Einschreiben in Gruppen und Erhalten von Informationen auf mehreren Sprachen.",
      longDescription:
        "Die Webseite wurde mit NextJS und Typescript entwickelt und wurde von mehreren hundert Personen genutzt. Damit konnten sich die Teilnehmer des Treffens in Stadtführungen einschreiben (und austragen) und Informationen " +
        "zum Programm etc einholen. Die Daten sind in der Mongodb gespeichert. Außerdem können mehrere Sprachen eingestellt werden. Ich habe versucht, möglichst Animationen einzubauen und sauberes CSS zu schreiben, jedoch " +
        "musste die Seite mit enormem Zeitdruck erstellt werden, weshalb hier und da unschöne CSS Designs auftreten. Auch wurde hier bewusst auf eine Bestätigungsemail beim Eintragen in eine Tour verzichtet.",
    },
    en: {
      shortDescription:
        "Website used at a global gathering for group sign-ups and multilingual information.",
      longDescription:
        "The website was developed with Next.js and TypeScript and used by several hundred people. Participants could sign up for (and withdraw from) city tours and access programme information. " +
        "Data is stored in MongoDB. Multiple languages are supported. I aimed to incorporate smooth animations and clean CSS, although the tight deadline meant some styling is less polished. " +
        "Email confirmation for tour registration was intentionally omitted.",
    },
  },
  {
    title: "Einkaufslisten-App",
    language: "Flutter",
    github: "https://github.com/KerryKilian/shoplist_flutter",
    images: [
      {
        image: "images/Einkaufsliste/Hauptansicht.png",
        description: { de: "Startseite mit Einkaufsliste", en: "Home screen with shopping list" },
      },
      {
        image: "images/Einkaufsliste/Erstellen.png",
        description: { de: "Erstellen eines neuen Eintrags", en: "Creating a new entry" },
      },
      {
        image: "images/Einkaufsliste/Bearbeiten.png",
        description: { de: "Bearbeiten eines Eintrags", en: "Editing an entry" },
      },
    ],
    de: {
      shortDescription: "Eine kleine App zum Erstellen und Bearbeiten von Einkaufslisten",
      longDescription:
        "Diese App wurde mit Flutter entwickelt und arbeitet intern mit einer Datenbank, um Einträge zu speichern. Ein Eintrag (zB 1 Packung Kartoffeln) wird automatisch mit dem richtigen (Kartoffel-)Bild vernetzt. In der Listenansicht kann man alle Einträge sehen, bearbeiten und löschen. " +
        "Man kann Einträge auf deutsch, englisch und französisch machen, jedesmal wird das richtige Bild gefunden. ZB kann ich 'Apple' eingeben, dann wird auch ein Apfel-Bild angezeigt.",
    },
    en: {
      shortDescription: "A small app for creating and managing shopping lists",
      longDescription:
        "This app was developed with Flutter and uses an internal database to store entries. Each entry (e.g. 1 bag of potatoes) is automatically matched with the appropriate image. In the list view, entries can be viewed, edited and deleted. " +
        "Entries can be added in German, English or French, and the correct image is always found — for example, entering 'Apple' displays an apple image.",
    },
  },
  {
    title: "Peer-to-Peer-Messaging-App mit Analyse-Dashboard",
    language: "Kotlin",
    github: "https://github.com/KerryKilian/p2pmobile",
    available: "https://p2p-web-gray.vercel.app/",
    images: [
      {
        image: "images/p2p-mobile/p2p-start.jpg",
        description: {
          de: "Startscreen zum Starten und Stoppen der Verbindung mit anderen Geräten per Bluetooth oder Wi-Fi Direct",
          en: "Start screen for starting and stopping connections with nearby devices via Bluetooth or Wi-Fi Direct",
        },
      },
      {
        image: "images/p2p-mobile/p2p-chats.jpg",
        description: {
          de: "Anzeigen aller Chats mit anderen Geräten",
          en: "View all chats with other devices",
        },
      },
      {
        image: "images/p2p-mobile/p2p-chat.jpg",
        description: {
          de: "Anzeigen und Senden von Nachrichten in einem Chat. Es können Texte, Dateien und vordefinierte Batchnachrichten versendet werden.",
          en: "View and send messages in a chat — text, files and predefined batch messages can be sent.",
        },
      },
      {
        image: "images/p2p-mobile/p2p-settings.jpg",
        description: {
          de: "Einstellungen der App, z. B. Cleanup-Zeit, um zu bestimmen, wann Nachrichten gelöscht werden sollen, wenn von einer Nachricht noch keine Zustellbestätigung kam.",
          en: "App settings, e.g. cleanup time to determine when messages should be deleted if no delivery acknowledgement has been received.",
        },
      },
      {
        image: "images/p2p-mobile/p2p-statistics-mobile.jpg",
        description: {
          de: "Anzeigen von Statistiken und Analysen der Nachrichtenübertragung in einem Chat.",
          en: "View statistics and analytics of message transmission in a chat.",
        },
      },
      {
        image: "images/p2p-mobile/p2p-extern.jpg",
        description: {
          de: "Screen zum Auswählen des Benutzernamens eines nicht verbundenen Geräts, um Nachrichten über den Store-and-Forward-Mechanismus an eine dritte Person zu senden.",
          en: "Screen for selecting the username of a non-connected device in order to send messages via the store-and-forward mechanism to a third party.",
        },
      },
      {
        image: "images/p2p-mobile/p2p-store-and-forward.png",
        description: {
          de: "Prinzip des Store-and-Forward-Mechanismus, damit Nachrichten über mehrere Geräte weitergeleitet werden können, um das Zielgerät zu erreichen.",
          en: "Illustration of the store-and-forward mechanism for relaying messages across multiple devices to reach the target device.",
        },
      },
      {
        image: "images/p2p-mobile/p2p-uml.png",
        description: {
          de: "UML-Entity-Diagramm der mobilen Kotlin-App mit Nachrichten, Metriken und Szenarien.",
          en: "UML entity diagram of the Kotlin mobile app covering messages, metrics and scenarios.",
        },
      },
      {
        image: "images/p2p-mobile/p2p-architecture.png",
        description: {
          de: "Simples Architekturdiagramm über das Zusammenspiel der mobilen App, des Backend-Servers und des Web-Dashboards, das die Diagramme zeigt.",
          en: "Simple architecture diagram showing the interaction between the mobile app, the backend server and the web dashboard.",
        },
      },
      {
        image: "images/p2p-mobile/p2p-latencies-boxplot.png",
        description: {
          de: "Boxplot-Diagramm der Latenzen bei der Datei-Nachrichtenübertragung in einem Chat pro Szenario.",
          en: "Box plot of message transmission latencies for file messages per scenario.",
        },
      },
      {
        image: "images/p2p-mobile/p2p-latencies-scatterplots.png",
        description: {
          de: "Streudiagramm der Latenzen bei der Datei-Nachrichtenübertragung in einem Chat pro Szenario.",
          en: "Scatter plot of message transmission latencies for file messages per scenario.",
        },
      },
    ],
    de: {
      shortDescription:
        "Eine Kotlin-App zum Entwickeln einer mobilen Peer-to-Peer-Messaging-App inklusive eines Analyse-Dashboards für meine Masterarbeit.",
      longDescription:
        "Diese App wurde mit Kotlin entwickelt und ermöglicht es Benutzern, direkt miteinander zu kommunizieren, ohne einen zentralen Server zu verwenden. Die App nutzt die Google Nearby Connections API, um Nachrichten mittels Bluetooth oder Wi-Fi Direct zu übertragen. Benutzer können Chats erstellen, Nachrichten senden und empfangen sowie Dateien teilen. " +
        "Eine zentrale Herausforderung war das Implementieren eines Store-and-Forward-Mechanismus, damit Nachrichten über mehrere Geräte hinweg an das Zielgerät ankommen. Hierbei mussten Nachrichten weitergeleitet werden und es wurden Zustellbestätigungen an den ursprünglichen Sender geschickt. " +
        "Nach der Entwicklung wurde die App mit mehreren Geräten in verschiedenen Szenarien im öffentlichen Raum getestet und die gesammelten Daten in einer zentralen Schnittstelle inklusive Web-Dashboards analysiert und in Diagrammen grafisch ausgewertet.",
    },
    en: {
      shortDescription:
        "A Kotlin app developing a mobile peer-to-peer messaging application including an analytics dashboard for my master's thesis.",
      longDescription:
        "This app was developed with Kotlin and enables users to communicate directly without a central server, using the Google Nearby Connections API to transmit messages via Bluetooth or Wi-Fi Direct. Users can create chats, send and receive messages, and share files. " +
        "A key challenge was implementing a store-and-forward mechanism to relay messages across multiple devices until they reach the intended recipient, including delivery acknowledgements back to the original sender. " +
        "After development, the app was tested with multiple devices in various real-world scenarios in public spaces. The collected data was analysed and visualised in charts via a central interface including a web dashboard.",
    },
  },
];
