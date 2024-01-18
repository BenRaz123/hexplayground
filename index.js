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

const startingColor = randomHexColor();

input.setAttribute("placeholder", startingColor);
document.body.style.backgroundColor = `#${startingColor}`;

input.addEventListener('input', handler);
