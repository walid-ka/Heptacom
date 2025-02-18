import { Folder, House, Users, BookOpen } from "lucide-react";

export const API_CUSTOMER = "https://hcloud-resources.test/api/customer.php";
export const API_PROJECT = "https://hcloud-resources.test/api/project.php";
export const API_RESOURCE = "https://hcloud-resources.test/api/resource.php";


//! Nav links

export const navLinks = [
    {
        name: "Home",
        icon: House,
        to: "/home",
    },
    {
        name: "Kunden",
        icon: Users,
        to: "/kunden",
    },
    {
        name: "Projekte",
        icon: Folder,
        to: "/projekte",
    },

    {
        name: "Ressourcen",
        icon: BookOpen,
        to: "/ressourcen",
    },
];


//! Clients


export const clients = [
    {
        fullName: "David Becker",
        email: "hello@jonas.io",
        phoneNumber: 1234567890,
        PauschalBetrag: 10000,
        WarnGrenzeBeiPauschalAbrechnung: null,
        KommentarFuerDieAbrechnung: null,
    },
    {
        fullName: "Sarah Müller",
        email: "sarah.mueller@email.com",
        phoneNumber: 9876543210,
        PauschalBetrag: 8500,
        WarnGrenzeBeiPauschalAbrechnung: 7500,
        KommentarFuerDieAbrechnung: "Kunde wünscht detaillierte Abrechnung.",
    },
    {
        fullName: "David Schmidt",
        email: "david.schmidt@email.com",
        phoneNumber: 1122334455,
        PauschalBetrag: 12000,
        WarnGrenzeBeiPauschalAbrechnung: 10000,
        KommentarFuerDieAbrechnung: null,
    },
    {
        fullName: "Emily Becker",
        email: "emily.becker@email.com",
        phoneNumber: 3344556677,
        PauschalBetrag: 9500,
        WarnGrenzeBeiPauschalAbrechnung: 8500,
        KommentarFuerDieAbrechnung: "Kunde möchte monatliche Updates.",
    },
    {
        fullName: "Michael Fischer",
        email: "michael.fischer@email.com",
        phoneNumber: 6677889900,
        PauschalBetrag: 11000,
        WarnGrenzeBeiPauschalAbrechnung: 9000,
        KommentarFuerDieAbrechnung: null,
    },
    {
        fullName: "Laura Hoffmann",
        email: "laura.hoffmann@email.com",
        phoneNumber: 5566778899,
        PauschalBetrag: 10200,
        WarnGrenzeBeiPauschalAbrechnung: 9500,
        KommentarFuerDieAbrechnung: "Sondervereinbarung für Q4 2024.",
    },
    {
        fullName: "Thomas Wagner",
        email: "thomas.wagner@email.com",
        phoneNumber: 2233445566,
        PauschalBetrag: 9700,
        WarnGrenzeBeiPauschalAbrechnung: null,
        KommentarFuerDieAbrechnung: null,
    },
    {
        fullName: "Anna Weber",
        email: "anna.weber@email.com",
        phoneNumber: 7788990011,
        PauschalBetrag: 10800,
        WarnGrenzeBeiPauschalAbrechnung: 9800,
        KommentarFuerDieAbrechnung: "Kunde bevorzugt E-Mail-Kommunikation.",
    },
    {
        fullName: "Peter Schneider",
        email: "peter.schneider@email.com",
        phoneNumber: 8899001122,
        PauschalBetrag: 9400,
        WarnGrenzeBeiPauschalAbrechnung: 8500,
        KommentarFuerDieAbrechnung: null,
    },
    {
        fullName: "Julia Neumann",
        email: "julia.neumann@email.com",
        phoneNumber: 9900112233,
        PauschalBetrag: 10500,
        WarnGrenzeBeiPauschalAbrechnung: 9500,
        KommentarFuerDieAbrechnung: "Rechnung muss bis zum 5. des Monats erstellt werden.",
    },
    {
        fullName: "Christian Lehmann",
        email: "christian.lehmann@email.com",
        phoneNumber: 5544332211,
        PauschalBetrag: 11200,
        WarnGrenzeBeiPauschalAbrechnung: 10000,
        KommentarFuerDieAbrechnung: null,
    },
    {
        fullName: "Nina Meier",
        email: "nina.meier@email.com",
        phoneNumber: 6677889901,
        PauschalBetrag: 9300,
        WarnGrenzeBeiPauschalAbrechnung: 8500,
        KommentarFuerDieAbrechnung: "Extra Abrechnung für Reisekosten.",
    },

];

//! Projects
export const projects = [
    {
        client: clients[0].fullName, // Jonas Schmedtmann
        name: "Web Development Platform",
        hetznerProjektID: 1001001,
        hetznerAPIKey: "X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0",
    },
    {
        client: clients[1].fullName, // Sarah Müller
        name: "E-Commerce Store",
        hetznerProjektID: 1001002,
        hetznerAPIKey: "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0",
    },
    {
        client: clients[2].fullName, // David Schmidt
        name: "Mobile App Backend",
        hetznerProjektID: 1001003,
        hetznerAPIKey: "Z9Y8X7W6V5U4T3S2R1Q0P9O8N7M6L5K4J3I2H1G0",
    },
    {
        client: clients[3].fullName, // Emily Becker
        name: "CRM Dashboard",
        hetznerProjektID: 1001004,
        hetznerAPIKey: "Q1W2E3R4T5Y6U7I8O9P0A1S2D3F4G5H6J7K8L9Z0",
    },
    {
        client: clients[4].fullName, // Michael Fischer
        name: "Marketing Automation",
        hetznerProjektID: 1001005,
        hetznerAPIKey: "L9K8J7H6G5F4D3S2A1P0O9I8U7Y6T5R4E3W2Q1M0",
    },
    {
        client: clients[5].fullName, // Laura Hoffmann
        name: "Cloud File Storage",
        hetznerProjektID: 1001006,
        hetznerAPIKey: "M1N2B3V4C5X6Z7A8S9D0F1G2H3J4K5L6Q7W8E9R0",
    },
    {
        client: clients[6].fullName, // Thomas Wagner
        name: "AI Chatbot",
        hetznerProjektID: 1001007,
        hetznerAPIKey: "T1Y2U3I4O5P6A7S8D9F0G1H2J3K4L5Z6X7C8V9B0",
    },
    {
        client: clients[7].fullName, // Anna Weber
        name: "Project Management Tool",
        hetznerProjektID: 1001008,
        hetznerAPIKey: "B1V2C3X4Z5A6S7D8F9G0H1J2K3L4Q5W6E7R8T9Y0",
    },
    {
        client: clients[8].fullName, // Peter Schneider
        name: "Customer Support System",
        hetznerProjektID: 1001009,
        hetznerAPIKey: "N1M2B3V4C5X6Z7A8S9D0F1G2H3J4K5L6Q7W8E9R0",
    },
    {
        client: clients[9].fullName, // Julia Neumann
        name: "Cloud-Based ERP",
        hetznerProjektID: 1001010,
        hetznerAPIKey: "Q1W2E3R4T5Y6U7I8O9P0A1S2D3F4G5H6J7K8L9Z0",
    },
    {
        client: clients[10].fullName, // Christian Lehmann
        name: "Social Media Analytics",
        hetznerProjektID: 1001011,
        hetznerAPIKey: "X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0",
    },
    {
        client: clients[11].fullName, // Nina Meier
        name: "Inventory Management System",
        hetznerProjektID: 1001012,
        hetznerAPIKey: "T1Y2U3I4O5P6A7S8D9F0G1H2J3K4L5Z6X7C8V9B0",
    },
]

//! Ressources


export const resources = [
    {
        client: clients[0].fullName,
        projekt: projects[0].name,
        Typ: "server",
        name: "name",
        beschreibung: "High-performance web server for handling user traffic and API requests.",
        status: "Staging",
        LöschenAm: "15.03.2025",
        snapshot: true
    },
    {
        client: clients[1].fullName,
        projekt: projects[1].name,
        Typ: "volume",
        name: "name",
        beschreibung: "Secure database volume for e-commerce transactions.",
        status: "Temporary",
        LöschenAm: "N/A",
        snapshot: false
    },
    {
        client: clients[2].fullName,
        projekt: projects[2].name,
        Typ: "network",
        name: "name",
        beschreibung: "Private network for backend communication and security.",
        status: "Production",
        LöschenAm: "N/A",
        snapshot: true
    },
    {
        client: clients[3].fullName,
        projekt: projects[3].name,
        Typ: "server",
        name: "name",
        beschreibung: "Dedicated server for CRM dashboard application.",
        status: "Temporary",
        LöschenAm: "22.07.2025",
        snapshot: false
    },
    {
        client: clients[4].fullName,
        projekt: projects[4].name,
        Typ: "load balancer",
        name: "name",
        beschreibung: "Load balancer to optimize traffic distribution.",
        status: "Temporary",
        LöschenAm: "N/A",
        snapshot: true
    },
    {
        client: clients[5].fullName,
        projekt: projects[5].name,
        Typ: "database",
        name: "name",
        beschreibung: "Cloud storage database for customer files.",
        status: "Staging",
        LöschenAm: "10.06.2025",
        snapshot: false
    },
    {
        client: clients[6].fullName,
        projekt: projects[6].name,
        Typ: "server",
        name: "name",
        beschreibung: "AI-powered chatbot server instance.",
        status: "Temporary",
        LöschenAm: "N/A",
        snapshot: true
    },
    {
        client: clients[7].fullName,
        projekt: projects[7].name,
        Typ: "container",
        name: "name",
        beschreibung: "Docker container for project management tool deployment.",
        status: "Production",
        LöschenAm: "30.09.2025",
        snapshot: false
    },
    {
        client: clients[8].fullName,
        projekt: projects[8].name,
        Typ: "firewall",
        name: "name",
        beschreibung: "Firewall setup for customer support system security.",
        status: "Temporary",
        LöschenAm: "N/A",
        snapshot: true
    },
    {
        client: clients[9].fullName,
        projekt: projects[9].name,
        Typ: "volume",
        name: "name",
        beschreibung: "Additional storage volume for ERP system.",
        status: "Staging",
        LöschenAm: "05.11.2025",
        snapshot: false
    },
    {
        client: clients[10].fullName,
        projekt: projects[10].name,
        Typ: "network",
        name: "name",
        beschreibung: "Internal network for social media analytics tools.",
        status: "Temporary",
        LöschenAm: "N/A",
        snapshot: true
    },
    {
        client: clients[11].fullName,
        projekt: projects[11].name,
        Typ: "server",
        name: "name",
        beschreibung: "Server for inventory management system operations.",
        status: "Production",
        LöschenAm: "20.08.2025",
        snapshot: false
    },

]
