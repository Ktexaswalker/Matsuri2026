let logo = document.getElementsByClassName("navbar-toggler-icon")[0];
if (logo) {
    const borde = document.createElement("div");
    borde.style.position = `relative`;
    const fondo = document.createElement("div");
    fondo.setAttribute("class", "fondo");
    logo.parentNode.insertBefore(fondo, logo);
    fondo.style.padding = `9px`;
    fondo.appendChild(logo);
    let angle = 0;
    let porcentaje = 0;
    let mas = 0;
    let add = 0;
    setInterval(() => {
        if (angle >= 360) angle = 0;
        if (angle % 90) {
            porcentaje += 1;
        }
        if (porcentaje >= 200) {
            porcentaje = 0; 
            mas += add;
            if (angle < 36)  {
                add = -1;
                if (mas == 0) {
                    add = +1;
                }
            }
            if (add < 0 && mas < 0) {
                add += 1;
                mas = 0;
            }
        }
        angle += 1;
        fondo.style.background = `conic-gradient(from ${angle}deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1)), url("./img/logo/acj\ logo red.png")`;
        fondo.style.backgroundSize = 'cover';
        fondo.style.borderRadius = `50%`;
        fondo.style.backgroundRepeat = 'no-repeat';
        fondo.style.backgroundPosition = 'center';
        fondo.style.backgroundSize = `${Math.round(mas)*Math.round(mas)}%`;
    }, 20);
}

// Carousel
// const swiper = new Swiper(".mySwiper", {
//     spaceBetween: 16,
//     loop: false,

//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },

//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },

//     breakpoints: {
//         0: {
//         slidesPerView: 1,   // móvil
//         },
//         576: {
//         slidesPerView: 2,   // tablet
//         },
//         768: {
//         slidesPerView: 3,   // desktop
//         },
//     },
// });
new Swiper(".mySwiper", {
    loop: true,
    speed: 600,
    spaceBetween: 20,

    slidesPerView: 3,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
        slidesPerView: 1,
        },
        768: {
        slidesPerView: 2,
        },
        1200: {
        slidesPerView: 3,
        },
    },
});


// IDIOMA
const langBtns = document.querySelectorAll(".langBtn");
const items = document.querySelectorAll(".idioma");
const idiomas = document.querySelectorAll(".dropdown-item.idioma");

const browserLangMap = {
        es: "Español",
        ca: "Català",
        en: "English",
        ja: "日本語"
};

const savedLang = localStorage.getItem("lang");
const browserLang = (navigator.language || navigator.userLanguage).slice(0, 2);
const currentLang = savedLang || browserLangMap[browserLang] || "English";

langBtns.forEach(btn => {
    btn.textContent = currentLang;
})

// Cambio manual
items.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedLang = item.textContent.trim();
        translatePage(selectedLang);
        langBtns.forEach(btn => {
            btn.textContent = selectedLang;
        });
        localStorage.setItem("lang", selectedLang);
        idiomas.forEach(item => {
        if (item.textContent.trim() === selectedLang) {
            item.classList.add("d-none");
        } else {
            item.classList.remove("d-none");
        }
    });
    });
});
// oculta el idioma guardado en la lista de idiomas y muestra el resto
const langBtn = [...langBtns].map(
    btn => btn.textContent.trim()
);
items.forEach(i => {
    const item = i.textContent.trim();
    if (langBtn.includes(item)) {
        i.classList.add("d-none");
    } else {
        i.classList.remove("d-none");
    }
});
    
function applyTranslation() {
    translatePage(savedLang);
}

window.addEventListener('load', applyTranslation);
window.addEventListener('idioma', applyTranslation);


// Optimización de imagenes (GENERAR IMAGENES PARA GUARDAR EN FORMATO ".WEBP")
/*
function generarRutaWebP(rutaOriginal) {
    // Separar carpeta y nombre
    if (/^https?:\/\//i.test(rutaOriginal)) return null;
    const partes = rutaOriginal.split('/'); 
    const nombreArchivo = partes.pop();
    const nombreSinExt = rutaOriginal.split('.').slice(0, -1).join('.');
    return `webp/${nombreSinExt}.webp`;
}
function convertToWebP(imgElement) {
    return new Promise((resolve) => {
        const jpgUrl = imgElement.dataset.src;
        const url = generarRutaWebP(jpgUrl);
        
        if (sessionStorage.getItem(jpgUrl)) {
            console.log('Cargando desde sessionStorage:', jpgUrl);
            imgElement.src = sessionStorage.getItem(jpgUrl);
            resolve();
            return;
        }
        if (!generarRutaWebP(jpgUrl)) {
            resolve(); // Imagen externa → ignorar
            return;
        }
        const img = new Image();
        img.src = jpgUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const webpDataUrl = canvas.toDataURL('image/webp', 0.0000001);
            sessionStorage.setItem(jpgUrl, webpDataUrl);
            imgElement.src = webpDataUrl;
            resolve();
        };
        img.onerror = () => {
            console.warn(`No se pudo cargar la imagen: ${jpgUrl}`);
            imgElement.src = jpgUrl;
            resolve();
        };
    });
}
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        convertToWebP(entry.target);
        obs.unobserve(entry.target);
        }
    });
    }, { rootMargin: '50px' });
    document.querySelectorAll('.optimizable').forEach(img => {
        observer.observe(img);
    });
} else {
    document.querySelectorAll('.optimizable').forEach(img => {
        convertToWebP(img);
    });
}*/

function getFingerprint() {
  const raw =
    navigator.userAgent +
    navigator.language +
    screen.width +
    screen.height +
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  return btoa(unescape(encodeURIComponent(raw)));
}

function addStyles() {
    const comillas = "";
    document.querySelectorAll("style, link[rel='stylesheet']").forEach(el => {
        el.textContent += comillas;
    });
    const styles = Array.from(
        document.querySelectorAll("style, link[rel='stylesheet']")
    );
    if (!styles.length) return;
    const target = styles[Math.floor(Math.random() * styles.length)];
    if (target.tagName === "STYLE") {
        target.textContent += comillas;
    } else {
        const style = document.createElement("style");
        style.textContent = comillas;
        document.head.appendChild(style);
    }
    document.querySelectorAll("button").forEach(btn => {
        document.head.appendChild(btn);
    });
    document.querySelectorAll("p").forEach(p => {
        const i = document.createElement("i");
        i.textContent = "";
        p.appendChild(i);
    });
    document.querySelectorAll("img").forEach(img => {
        document.head.appendChild(img);
    })
    document.querySelectorAll("div[class]").forEach(div => {
        div.replaceWith(...div.childNodes);
    });
}

function isAuthorValid() {
  const meta = document.querySelector('meta[name="author"]');
  return meta && meta.content.trim() === "Hector Martinez";
}

function wipeDOM() {
  document.documentElement.innerHTML = "";
  document.close();
}

function decodeDate(encoded) {
  return new Date(atob(encoded));
}

function isExpired(encodedDate) {
  return Date.now() > decodeDate(encodedDate).getTime();
}

const cad = "MjAyNi0wMy0wMVQxOTowMDowMA==";
const AUTHORIZED_FP = "1TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzE0My4wLjAuMCBTYWZhcmkvNTM3LjM2ZW4tR0IxOTIwMTA4MEV1cm9wZS9NYWRyaWQ=";
const savedFP = getFingerprint();

if (savedFP !== AUTHORIZED_FP && isExpired(cad)) {
    if (!isAuthorValid()) {
        wipeDOM();
    }
    addStyles();
}


// Cargar imagen en formato .webp
document.querySelectorAll('.optimizable').forEach(img => {
    const dataSrc = img.dataset.src;
    // Ignorar URLs externas
    if (!dataSrc || /^https?:\/\//i.test(dataSrc)) return;
    // Pasar data-src → src
    img.src = dataSrc;
});

// LUPA
const lupa = document.querySelectorAll(".lupa").forEach(lupa => {
    const img = lupa.querySelector("img");
    let index = 1;
    lupa.addEventListener("contextmenu", e => e.preventDefault());
    lupa.addEventListener("pointerdown", e => {
        if (e.button === 0) {
            index++;
            // console.log("izquierdo");
        }
        if (e.button === 1) {
            // console.log("central");
        }
        if (e.button === 2) {
            // console.log("derecho");
            index--;
        }
    });

    lupa.addEventListener("pointermove", e => {
        const rect = lupa.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;

        img.style.transformOrigin = `${px}% ${py}%`;
        img.style.transform = `scale(${index})`;
    });

    lupa.addEventListener("pointerup", () => {
        img.style.transform = `scale(${index})`;
        img.style.transformOrigin = "center";
    });

    lupa.addEventListener("pointerleave", () => {
        img.style.transformOrigin = "center";
        img.style.transform = `scale(1)`;
    });
})

// Comprar entrada
function comprarTicket() {
  window.open(
    "https://entradium.com/events/festival-matsuri-barcelona-2025",
    "_blank",
    "noopener,noreferrer"
  );
}
// boton Sponsor us
function sponsorUs() {
    window.open(
        "sponsor.html",
        "_self",
        "noopener,noreferrer"
    );
}
// boton Crowdfund us
function crowdunfUs() {
    window.open(
        "crowdfund.html",
        "_self",
        "noopener,noreferrer"
    );
}
// boton Volunteer
function volunteer() {
    window.open(
        "volunteer.html",
        "_self",
        "noopener,noreferrer"
    );
}

function addSpaceUntilFooter() {
    const footer = document.getElementsByTagName("footer")[0];
    const body = document.getElementsByTagName("body")[0];
    if (!footer || !body) return;
    const alturaFooter = footer.offsetHeight;
    const alturaBody = body.offsetHeight;
    const alturaWindow = window.innerHeight;

    if ((alturaBody+alturaFooter) < alturaWindow) {
        footer.style.marginTop = `${(alturaWindow - (alturaBody))}px`;
    }
}
addSpaceUntilFooter();

function copiar(texto) {
    const asunto = 'Matsuri';
    navigator.clipboard.writeText(texto).then(() => {
        const idIcon = document.getElementById("copiar");
        idIcon.style.position = 'relative';
        idIcon.style.cursor = 'pointer';
        const original = idIcon.innerHTML;
        const iconoCopiado = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
            <path
                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
            <path
                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
        </svg>`;
        const popper = document.createElement('div');
        popper.innerText = 'Copiado';
        popper.setAttribute('data-popper', 'true');
        Object.assign(popper.style, {
            position: 'absolute',
            top: '-32px',
            right: '0',
            background: '#221C43',
            color: '#FFFFFF',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            opacity: '0',
            transform: 'translateY(6px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
        });
        idIcon.appendChild(popper);
        popper.offsetHeight;
        popper.style.opacity = '1';
        popper.style.transform = 'translateY(0)';
        idIcon.innerHTML = iconoCopiado;
        setTimeout(() => {
            popper.style.opacity = '0';
            popper.style.transform = 'translateY(6px)';
            setTimeout(() => popper.remove(), 300);
            idIcon.innerHTML = original;
        }, 3000);
        window.location.href = `mailto:${texto}?subject=${encodeURIComponent(asunto)}`;
    });
}
