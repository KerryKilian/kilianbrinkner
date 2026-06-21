type Lang = 'de' | 'en';

interface TimelineTranslation {
  cardTitle: string;
  cardDetailedText: string;
}

interface TimelineItem {
  title: string;
  cardSubtitle: string;
  logo: string;
  de: TimelineTranslation;
  en: TimelineTranslation;
}

export interface ResolvedTimelineItem {
  title: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDetailedText: string;
  logo: string;
}

export function getTimelineData(lang: string): ResolvedTimelineItem[] {
  const l: Lang = lang.startsWith('en') ? 'en' : 'de';
  return timelineData.map(entry => ({
    title: entry.title,
    cardSubtitle: entry.cardSubtitle,
    logo: entry.logo,
    ...entry[l],
  }));
}

const timelineData: TimelineItem[] = [
  {
    title: "2013-2019",
    cardSubtitle: "Georg-Büchner-Gymnasium",
    logo: "images/logos/gbg.png",
    de: {
      cardTitle: "Oberschule & Abitur",
      cardDetailedText:
        "In der Oberschule hatte ich viel Spaß in Geographie, Physik und Mathematik. Angefangen zu programmieren habe ich hier nur in meiner Freizeit, wodurch ich ein wenig mit Python in Berührung kam.",
    },
    en: {
      cardTitle: "Secondary School & A-Levels",
      cardDetailedText:
        "In secondary school I particularly enjoyed Geography, Physics and Mathematics. I started programming in my free time, which gave me my first introduction to Python.",
    },
  },
  {
    title: "2019-2022",
    cardSubtitle: "Berliner Hochschule für Technik",
    logo: "images/logos/bht.png",
    de: {
      cardTitle: "Bachelor Geoinformation",
      cardDetailedText:
        "In diesem Studium haben wir viel mit Geodaten gearbeitet. Ich habe gelernt, an Geodaten heranzukommen, sie zu verstehen, zu analysieren und sie darzustellen. " +
        "Am spannendsten fand ich die Module, in denen wir Anwendungen programmieren sollten, die Geodaten beinhalteten.",
    },
    en: {
      cardTitle: "Bachelor of Geoinformatics",
      cardDetailedText:
        "During this degree programme we worked extensively with geospatial data — acquiring, understanding, analysing and visualising it. I found the modules most exciting where we had to build applications that incorporated geodata.",
    },
  },
  {
    title: "2021",
    cardSubtitle: "Berliner Hochschule für Technik",
    logo: "images/logos/bht.png",
    de: {
      cardTitle: "Werkstudent für Lehre mit R",
      cardDetailedText:
        "Hier habe ich für meinen Professor Übungsaufgaben in der Sprache R erstellt. Es ging hauptsächlich darum, anderen Studierenden die Arbeit mit R näherzubringen.",
    },
    en: {
      cardTitle: "Student Teaching Assistant – R",
      cardDetailedText:
        "I created exercises in the R programming language for my professor, with the primary goal of helping fellow students learn to work with R.",
    },
  },
  {
    title: "2022",
    cardSubtitle: "Berliner Hochschule für Technik",
    logo: "images/logos/bht.png",
    de: {
      cardTitle: "Bachelorarbeit",
      cardDetailedText:
        "In meiner Bachelorarbeit habe ich eine Android-Anwendung entwickelt, die über einen Content Provider Geodaten für andere Apps zur Verfügung stellt. Ähnlich wie man Anfragen an einen Webserver stellt, können hier Anfragen an eine lokal verfügbare App gestellt werden. Es können Anfragen über allgemein zugängliche Geodaten als auch private Standortdaten des Users erhalten werden, sofern dieser dem zustimmt.",
    },
    en: {
      cardTitle: "Bachelor Thesis",
      cardDetailedText:
        "For my bachelor thesis I developed an Android application that makes geodata available to other apps via a Content Provider. Similar to making requests to a web server, other apps can query locally available geodata — including both public geospatial datasets and the user's private location data, provided the user grants consent.",
    },
  },
  {
    title: "10/2022-09/2023",
    cardSubtitle: "Berliner Hochschule für Technik",
    logo: "images/logos/bht.png",
    de: {
      cardTitle: "Module im Bachelor Medieninformatik",
      cardDetailedText:
        "Um meinen Master Medienformatik anfangen zu dürfen, musste ich einige Module aus dem Bachelor belegen. Ich habe viele Anwendungen programmiert und konnte viel dazu lernen. Vor allem im Bereich Web- und Appentwicklung konnte ich mein Wissen enorm erweitern, da wir dort komplette Anwendungen programmiert haben.",
    },
    en: {
      cardTitle: "Media Informatics Bachelor Modules",
      cardDetailedText:
        "To be admitted to the Master's programme in Media Informatics I had to complete several bachelor-level modules first. I built many applications and gained a great deal of knowledge, especially in web and app development where we implemented complete end-to-end applications.",
    },
  },
  {
    title: "05/2023-11/2023",
    cardSubtitle: "Complori",
    logo: "images/logos/complori.webp",
    de: {
      cardTitle: "Werkstudent Programmierlehrer",
      cardDetailedText:
        "Bei Complori brachte ich Kindern und Jugendlichen das Programmieren bei. Dabei lehrte ich Javascript und Python.",
    },
    en: {
      cardTitle: "Student Employee – Programming Instructor",
      cardDetailedText:
        "At Complori I taught children and teenagers how to programme, covering both JavaScript and Python.",
    },
  },
  {
    title: "10/2023 - 03/2026",
    cardSubtitle: "Berliner Hochschule für Technik",
    logo: "images/logos/bht.png",
    de: {
      cardTitle: "Master Medieninformatik",
      cardDetailedText:
        "Im Master belegte ich Module, um mein Wissen in der Webentwicklung zu festigen und um neue Programmiersprachen oder Frameworks zu erlernen. Meine Masterarbeit beinhaltete das Entwickeln einer mobilen Peer-to-Peer-Messaging-App mit Kotlin.",
    },
    en: {
      cardTitle: "Master of Media Informatics",
      cardDetailedText:
        "In the Master's programme I took modules to deepen my knowledge in web development and to learn new programming languages and frameworks. My master's thesis involved developing a mobile peer-to-peer messaging app in Kotlin.",
    },
  },
  {
    title: "12/2023 - 07/2024",
    cardSubtitle: "Kiezbote",
    logo: "images/logos/kiezbote.png",
    de: {
      cardTitle: "Werkstudent Webentwicklung",
      cardDetailedText:
        "Mit Bubble.io habe ich die internen Prozesse zum Anlegen von Aufträgen weiterentwickelt.",
    },
    en: {
      cardTitle: "Student Employee – Web Development",
      cardDetailedText:
        "Using Bubble.io, I further developed the internal workflows for creating and managing orders.",
    },
  },
  {
    title: "08/2024 - 07/2025",
    cardSubtitle: "Materna",
    logo: "images/logos/materna.png",
    de: {
      cardTitle: "Werkstudent Webentwicklung",
      cardDetailedText:
        "Hier habe ich im NINA-Projekt an der Webseite mit Javascript gearbeitet. Meine Hauptaufgaben waren die Mitarbeit an der Kartendarstellung sowie das Erstellen von Server Side gerenderten Seiten mit Kotlin. Dabei konnte ich auch Jenkins und Nginx kennenlernen.",
    },
    en: {
      cardTitle: "Student Employee – Web Development",
      cardDetailedText:
        "I worked on the NINA project's website using JavaScript. My main responsibilities were contributing to the map visualisation and building server-side rendered pages with Kotlin. I also gained hands-on experience with Jenkins and Nginx.",
    },
  },
  {
    title: "09/2025 - 03/2026",
    cardSubtitle: "TJ Labs",
    logo: "images/logos/tjlabs.webp",
    de: {
      cardTitle: "Werkstudent Web- und Appentwicklung",
      cardDetailedText:
        "Hier konnte ich mit Next.js für eine Plattform das Web-Panel entwickeln. Hier mussten das Anlegen von Benutzern, Projekten und Organisationen sowie ein Admin-Panel zur Verwaltung implementiert werden.",
    },
    en: {
      cardTitle: "Student Employee – Web & App Development",
      cardDetailedText:
        "I developed the web panel for a platform using Next.js, implementing user, project and organisation creation as well as an admin panel for management.",
    },
  },
  {
    title: "03/2025 - 06/2026",
    cardSubtitle: "TJ Labs",
    logo: "images/logos/tjlabs.webp",
    de: {
      cardTitle: "Web- und Appentwicklung (Vollzeit)",
      cardDetailedText:
        "Ich wurde von TJ Labs übernommen und habe ein weiteres Projekt maßgeblich vorangebracht, bei dem mit Next.js und React Native eine mobile App, ein Web-Dashboard für Firmen und Admins sowie entsprechende Backend Funktionen implementiert werden mussten.",
    },
    en: {
      cardTitle: "Web & App Development (Full-Time)",
      cardDetailedText:
        "I was hired full-time by TJ Labs and played a key role in advancing another project — implementing a mobile app with React Native, a web dashboard for companies and admins using Next.js, and the corresponding backend functionality.",
    },
  },
];
