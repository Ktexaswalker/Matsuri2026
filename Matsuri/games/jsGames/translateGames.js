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

// window.addEventListener("storage", (event) => {
//     if (event.key === "lang") {
//         translatePage(event.newValue);
//     }
// });

// document.addEventListener("DOMContentLoaded", function() {
//     const savedLang = localStorage.getItem("lang") || "English";
//     translatePage(savedLang);
//     changeMap(savedLang);
// });

const browserLangMap2 = {
        es: "Español",
        ca: "Català",
        en: "English",
        ja: "日本語"
};

function changeMap(sl) {
    const langActiva = Object.keys(browserLangMap2).find(key => browserLangMap2[key] === sl);
    Object.keys(browserLangMap2).forEach(lang => {
        document.querySelectorAll(`.idioma-${lang}`).forEach(el =>
            el.classList.toggle("d-none", lang !== langActiva)
        );
    });
}

window.addEventListener("storage", function(event) {
    if (event.key === "lang") {
        const newLang = event.newValue || "English";
        translatePage(newLang);
        changeMap(newLang);
    }
});

window.document.querySelectorAll(".idioma").forEach(el => {
    el.addEventListener("click", () => {
        const newLang = localStorage.getItem("lang");
        const iframe = document.querySelector("iframe");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.location.reload();
        }
        translatePage(newLang);
        changeMap(newLang);
    });
});
