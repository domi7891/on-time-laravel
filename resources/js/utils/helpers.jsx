import { BASE_FOLDER, COLORS, PRODUCT_COLORS } from "./constants";

const LINE_SPACING = 35;

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
    const spacing = lines > 2 ? LINE_SPACING * 0.25 : LINE_SPACING;
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
            case "Linksbündig mit 5cm Abstand":
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

function changePdfColor(
    canvas,
    context,
    image_data,
    red,
    green,
    blue,
    setShow
) {
    let image = new Image();
    image.onload = function () {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < pixelData.data.length; i += 4) {
            let setPixel = {
                r: pixelData.data[i],
                g: pixelData.data[i + 1],
                b: pixelData.data[i + 2],
                a: pixelData.data[i + 3],
            };
            if (setPixel.r == 255 && setPixel.g == 255 && setPixel.b == 255) {
                pixelData.data[i] = 0;
                pixelData.data[i + 1] = 0;
                pixelData.data[i + 2] = 0;
                pixelData.data[i + 3] = 0;
            } else {
                if (red && green && blue) {
                    pixelData.data[i] = red;
                    pixelData.data[i + 1] = green;
                    pixelData.data[i + 2] = blue;
                }
            }
        }
        context.putImageData(pixelData, 0, 0);
        setShow(true);
        //   canvas.classList.add('show')
    };
    image.src = image_data;
}

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
    formatePrice,
    capitalizeFirstLetter,
    calcFontSize,
    changeImageColor,
    changePdfColor,
    drawFrontText,
    drawSideText,
    mapColor,
    hasColor,
    buildUrl,
    getCookie,
    createCookie,
    getColors,
    materialByColor,
};
