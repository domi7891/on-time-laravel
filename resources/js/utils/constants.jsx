const BASE_FOLDER = "/images/products/";

const TOTALS = {
    total: 15,
    basePrice: 15,
    totalEquipment: 0,
    totalExtras: 0,
    totalUnit: 15,
    extras: {},
    equipment: {
        CD: {
            unitPrice: 5,
            total: 5,
        },
        USB: {
            unitPrice: 5,
            total: 10,
        },
    },
};

const BASE_PRODUCT = {
    type: "Hardcover",
    material: "Leinen",
    color: "Schwarz",
    print: "Einseitig",
    paper_weight: "100g",
    quantity: 1,
    embossing: true,
    // pdf: {
    //     displayName: "Diplomarbeit.pdf",
    // },
    images: {
        front: "/images/products/Produktfotos Hardcover Leder/Small/hardcover_leder_front_black.jpg",
    },
    pages: 75,
    embossing_options: {
        color: "Silber",
        method: "Tiefenprägung",
        position: "Beides",
        schoollogo: true,
        schoollogo_options: {
            logoSelected: true,
            name: "HLTW 13 Bergheidengasse",
        },
        custom: true,
        custom_options: {
            displayName: "CustomFront.pdf",
        },
        text: {
            front: true,
            front_text: {
                "1. Zeile": {
                    text: "Diplomarbeit",
                    size: "9mm",
                },
                "2. Zeile": {
                    text: "5AHIF 2022",
                    size: "5.5mm",
                },
            },
            back: true,
            back_text: {
                position: "Links- und Rechtsbündig",
                left: "Diplomarbeit",
                right: "2022",
                text: "Diplomarbeit",
                size: "5.5mm",
            },
        },
    },
    a3: false,
    a3_sites: [
        { from: 1, to: 6 },
        { from: 10, to: 19 },
    ],
    remarks:
        "uiasdghaikjfbcslkdfh adfuhasdfhoi asedafdq asdasdfeadfcaLSDH QWEEGHDQIUEGDQA QIzregdasiuegdasudqewiedgasid qwiuerdghasiudghas dqiuzidhaiudzqa sdqiziazdzuaszrdhwqeiuo rdiuqzdaio dhzqiudzh sdasdfcasodfhcsudfhcpsozfhcswd fciasuzxhgdcaiudzfchsuifhgxc ",
    equipment: {
        CD: {
            selected: true,
            quantity: 1,
        },
        USB: {
            selected: false,
            quantity: 2,
        },
    },
};

const COLORS = {
    Schwarz: { name: "black", hex: "#000000" },
    Bordeaux: { name: "bordeaux", hex: "#6e001d" },
    Dunkelblau: { name: "darkblue", hex: "#000e68" },
    Grün: { name: "green", hex: "#00531f" },
    Grau: { name: "grey", hex: "#616161" },
    Beige: { name: "beige", hex: "#ebd9be" },
    Weiß: { name: "white", hex: "#ffffff" },
};

const EMBOSSING_COLORS = {
    Gold: { name: "gold", hex: "#d4af37", red: 212, green: 175, blue: 55 },
    Silber: { name: "silver", hex: "#c0c0c0", red: 192, green: 192, blue: 192 },
    Weiß: { name: "white", hex: "#ffffff", red: 255, green: 255, blue: 255 },
};

const PRODUCT_COLORS = {
    hardcover: {
        all: [
            "Schwarz",
            "Bordeaux",
            "Dunkelblau",
            "Grün",
            "Grau",
            "Beige",
            "Weiß",
        ],
        standard: ["Schwarz", "Bordeaux", "Dunkelblau", "Grün", "Grau"],
        leder: ["Schwarz", "Bordeaux", "Dunkelblau", "Grün"],
        leinen: ["Schwarz", "Bordeaux", "Dunkelblau", "Beige", "Weiß"],
    },
    softcover: ["Schwarz", "Bordeaux", "Dunkelblau", "Grün", "Grau"],
};

const ALLOWED_KEYS = {
    "5.5mm": [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "Ä",
        "Ö",
        "Ü",
        "ß",
        "ä",
        "ö",
        "ü",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        " ",
        "Tab",
        "´",
        ".",
        ",",
        "/",
        "!",
        "&",
        '"',
        ":",
        ";",
        "@",
        "?",
    ],
    "9mm": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "Ä",
        "Ö",
        "Ü",
        "ß",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        " ",
        "Tab",
        "´",
        ".",
        ",",
        "&",
        "!",
        "?",
        '"',
        ":",
        ";",
        "-",
    ],
};

export {
    BASE_FOLDER,
    TOTALS,
    BASE_PRODUCT,
    COLORS,
    EMBOSSING_COLORS,
    PRODUCT_COLORS,
    ALLOWED_KEYS,
};
