const LINE_SPACING = 35;

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

let PRODUCT_COLORS = {
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

const formatePrice = (price) => {
    const formatted = Number(price).toFixed(2).toString().replace(".", ",");
    return `€ ${formatted}`;
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const mapColor = (color) => {
    return COLORS[color].name;
};

const getColors = (type, material) => {
    let colors = [];
    if (type == "Hardcover") {
        colors = PRODUCT_COLORS[type.toLowerCase()].all;
    }
    if (type == "Softcover") {
        colors = PRODUCT_COLORS[type.toLowerCase()];
    }

    return Object.entries(COLORS).filter(([name, color], idx) => {
        return colors.includes(name);
    });
};

const mapMaterial = (material) => {
    switch (material) {
        case "Draht":
            return "Wire";
        case "Kunststoff":
            return "Plastic";
        default:
            return material;
    }
};

const hasColor = (type, material, color) => {
    if (type == "Hardcover") {
        return PRODUCT_COLORS[type.toLowerCase()][
            material.toLowerCase()
        ].includes(color);
    } else if (type == "Softcover") {
        return PRODUCT_COLORS[type.toLowerCase()].includes(color);
    } else {
        return true;
    }
};

const materialByColor = (type, material, color) => {
    if (type == "Hardcover") {
        if (
            PRODUCT_COLORS[type.toLowerCase()][material.toLowerCase()].includes(
                color
            )
        ) {
            return material;
        } else {
            for (const [mat, col] of Object.entries(
                PRODUCT_COLORS[type.toLowerCase()]
            )) {
                if (mat != "all") {
                    if (col.includes(color)) {
                        return capitalizeFirstLetter(mat);
                    }
                }
            }
        }
    }
    return material;
};

const buildUrl = (type, material, color, front = true) => {
    const url =
        BASE_FOLDER +
        `Produktfotos ${capitalizeFirstLetter(type)}${
            type.toLowerCase() == "hardcover"
                ? " " + capitalizeFirstLetter(material)
                : ""
        }/Small/${type.toLowerCase()}_${
            material ? mapMaterial(material).toLowerCase() + "_" : ""
        }${front ? "front" : "side"}${color ? "_" + mapColor(color) : ""}.jpg`;
    return url;
};

const calcFontSize = (size) => {
    let intSize = parseFloat(size.replace("mm", ""));
    return Math.round(1.9 * intSize);
};

const drawFrontText = (
    canvas,
    context,
    lines,
    text,
    { red, green, blue },
    posTop
) => {
    context.textBaseline = "top";
    context.fillStyle = `rgb(${red},${green},${blue})`;
    context.font = calcFontSize(text.size) + "px 'Arial'";
    let center = canvas.width / 2 - context.measureText(text.text).width / 2;
    context.fillText(text.text, center, posTop);
    const spacing = lines > 2 ? LINE_SPACING * 0.2 : LINE_SPACING;
    posTop += context.measureText(text.text).fontBoundingBoxDescent + spacing;

    return posTop;
};

const drawSideText = (canvas, context, text, { red, green, blue }) => {
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillStyle = `rgb(${red},${green},${blue})`;
    context.font = calcFontSize(text.size) + "px 'Arial'";

    context.save();

    if (text.text || text.left || text.right) {
        let centerText = text.text;
        let left = text.left;
        let right = text.right;
        switch (text.position) {
            case "Rechtsbündig":
                context.textAlign = "right";
                context.translate(canvas.width / 2, 0);
                context.rotate(1.5 * Math.PI);
                context.fillText(centerText, -10, 0);
                break;
            case "Linksbündig":
                context.translate(canvas.width / 2, canvas.height);
                context.rotate(1.5 * Math.PI);
                context.fillText(centerText, 10, 0);
                break;
            case "Links- und Rechtsbündig":
                context.save();
                context.translate(canvas.width / 2, canvas.height);
                context.rotate(1.5 * Math.PI);
                context.fillText(left, 10, 0);
                context.restore();
                context.textAlign = "right";
                context.translate(canvas.width / 2, 0);
                context.rotate(1.5 * Math.PI);
                context.fillText(right, -10, 0);
                break;
            case "Linksbündig mit Rand":
                context.translate(canvas.width / 2, canvas.height);
                context.rotate(1.5 * Math.PI);
                context.fillText(centerText, 50, 0);
                break;
            case "Zentriert":
                context.textAlign = "center";
                context.translate(canvas.width / 2, canvas.height);
                context.rotate(1.5 * Math.PI);
                context.fillText(centerText, canvas.height / 2, 0);
                break;
        }
    }
    context.restore();
};

const changeImageColor = (canvas, context, x, y, color) => {
    let pixelData = context.getImageData(x, y, canvas.width, canvas.height);
    for (let i = 0; i < pixelData.data.length; i += 4) {
        let setPixel = {
            r: pixelData.data[i],
            g: pixelData.data[i + 1],
            b: pixelData.data[i + 2],
            a: pixelData.data[i + 3],
        };
        if (color.red && color.green && color.blue) {
            pixelData.data[i] = color.red;
            pixelData.data[i + 1] = color.green;
            pixelData.data[i + 2] = color.blue;
        }
    }
    context.putImageData(pixelData, x, y);
};

const getCookie = function (name) {
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
};

const createCookie = (name, value) => {
    const d = new Date();
    d.setTime(d.getTime() + 183 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    // document.cookie = `${name}=${value};${expires};domain=www.augenarzt-kaya.at;path=/`
    document.cookie = `${name}=${value};${expires};path=/`;
};

export {
    BASE_FOLDER,
    TOTALS,
    BASE_PRODUCT,
    formatePrice,
    capitalizeFirstLetter,
    calcFontSize,
    changeImageColor,
    drawFrontText,
    drawSideText,
    mapColor,
    hasColor,
    buildUrl,
    getCookie,
    createCookie,
    COLORS,
    EMBOSSING_COLORS,
    getColors,
    materialByColor,
};
