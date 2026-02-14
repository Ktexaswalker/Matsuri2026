window.translations = window.translations || {
    Español: {},
    Català: {},
    日本語: {}
};
Object.assign(window.translations.Español, {
    "Press START to begin playing":"Pulsa START para empezar a jugar",
});
Object.assign(window.translations.Català, {
    "Press START to begin playing":"Prem START per començar a jugar",
});
Object.assign(window.translations.日本語, {
    "Press START to begin playing":"STARTを押してゲームを始めてください",
});

window.addEventListener("storage", (event) => {
    if (event.key === "lang") {
        translatePage(event.newValue);
    }
});