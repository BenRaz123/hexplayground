const input = document.getElementById("input");
const bg = document.getElementsByTagName("body")[0];

const randomHexColor = () => {
    let r = randint(256);
    let g = randint(256);
    let b = randint(256);

    r = r > 16 ? r.toString(16) : `0${r.toString(16)}`;
    g = g > 16 ? g.toString(16) : `0${g.toString(16)}`;
    b = b > 16 ? b.toString(16) : `0${b.toString(16)}`;

    return `${r}${g}${b}`;
}

const randint = (max) => {
    return Math.floor(Math.random() * max);
}

const getColorUrlParam = () => {
    const params = new URLSearchParams(window.location.search);
    const myParam = params.get("color");
    if (myParam == null)
        return null;
    const regex = /([0-9a-f]{3}|[0-9a-f]{6})$/i;
    if (regex.test(myParam)) {
        return myParam;
    } else {
        let mycolor = colorNameToColor(myParam); 
        let r = mycolor[0];
        let g = mycolor[1];
        let b = mycolor[2];
        r = r > 16 ? r.toString(16) : `0${r.toString(16)}`;
        g = g > 16 ? g.toString(16) : `0${g.toString(16)}`;
        b = b > 16 ? b.toString(16) : `0${b.toString(16)}`;
        return `${r}${g}${b}`;
    }
}

const handler = (e) => {
    const val = e.target.value;
    const width = e.target.value.length;
    if (width === 0) {
        input.style.width = "6ch";
        // Apologies for the reprehensible use of a global variable                   
        document.body.style.backgroundColor = `#${startingColor}`;
        //                                        ^^^^^^^^^^^^^ This sucks
        return;
    }
    input.style.width = `${width + 0.5}ch`;
    document.body.style.backgroundColor = `#${val}`;
}

/* https://stackoverflow.com/questions/26414770/getting-the-rgb-values-for-a-css-html-named-color-in-javascript */
const colorNameToColor = (name) => {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.fillStyle = name;
    context.fillRect(0,0,1,1);
    return context.getImageData(0,0,1,1).data;
}

const setFavicon = () => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let link = document.createElement('link');
    link.rel = "icon";

    if (isDark) {
        link.href = "./favicon-dark.png";
    } else {
        link.href = "./favicon-light.png";
    }
    document.head.appendChild(link);

}

setFavicon();

const startingColor = getColorUrlParam() ?? randomHexColor();

input.setAttribute("placeholder", startingColor);
document.body.style.backgroundColor = `#${startingColor}`;

input.addEventListener('input', handler);
