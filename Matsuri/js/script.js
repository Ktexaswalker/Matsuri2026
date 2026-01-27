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
        // fondo.style.background = `conic-gradient(from ${angle}deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1)), url("./img/logo/acj\ logo red.png")`;
        fondo.style.background = `conic-gradient(from ${angle}deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1)), url("./img/svg/Isologo_matsuri_dorado.svg")`;
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
function changeMap(sl) {
    const langActiva = Object.keys(browserLangMap).find(key => browserLangMap[key] === sl);
    Object.keys(browserLangMap).forEach(lang => {
        document.querySelectorAll(`.idioma-${lang}`).forEach(el =>
            el.classList.toggle("d-none", lang !== langActiva)
        );
    });
}

const langBtns = document.querySelectorAll(".langBtn");
const items = document.querySelectorAll(".idioma");
const idiomas = document.querySelectorAll(".dropdown-item.idioma");

const browserLangMap = {
        es: "Español",
        ca: "Català",
        en: "English",
        ja: "日本語"
};

const savedLang = localStorage.getItem("lang") || "Español"; //cargar idioma inicial
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
        changeMap(selectedLang);
        cookies(selectedLang);
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
    changeMap(savedLang);
    cookies(savedLang);
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

const cad = "MjAyOC0xNy0wNVQxOTowMDowMA==";
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
    lupa.querySelectorAll("img").forEach(img => {
            if (!img) return;
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
            img.style.transform = `scale(1)`;
            img.style.transformOrigin = "center";
        });
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
// boton Program
function program() {
    window.open(
        "program.html",
        "_self",
        "noopener,noreferrer"
    );
}

// boton Stands
function stands() {
    window.open(
        "stands.html",
        "_self",
        "noopener,noreferrer"
    );
}
// boton learn more
function about() {
    window.open(
        "about.html",
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

// modal para aceptar politica de cookies
function cookies(idioma) {
    // Revisar si ya dio consentimiento
    if (localStorage.getItem('cookiesConsent')) return;
    const existingBanner = document.querySelector('.cookiesBanner');
    if (existingBanner) existingBanner.remove();
    // Crear banner dinámicamente
    const EN = `
    <div id="cookiesBanner_EN" class="cookiesBanner nuvesRosas position-fixed bottom-0 end-0 bg-light shadow pt-2 pb-5 d-flex flex-column flex-md-row align-items-center justify-content-between" 
    style="z-index: 1050; width: 100%; background-repeat: repeat; border-top: 0.4rem solid var(--cgold); padding: 0.5rem 1rem;">
        <div class="mb-2 mb-md-0 text-center text-md-start mx-5 fs-5">
            By using this website, you agree to the use of essential <em>cookies</em> and to our data practices.
            <a href="cookiepolicy.html">Cookies Policy</a> ·
            <a href="privacypolicy.html">Privacy Policy</a>
        </div>
        <div class="d-flex gap-2 justify-content-end">
            <button type="button" class="fs-5 btnCookies bg-container-animation bg-dblue text-wwhite rounded-3 me-4 js-cookies-all-close">Accept</button>
        </div>
    </div>
    `;
    const ES = `
    <div id="cookiesBanner_ES" class="cookiesBanner nuvesRosas position-fixed bottom-0 end-0 bg-light shadow pt-2 pb-5 d-flex flex-column flex-md-row align-items-center justify-content-between" 
    style="z-index: 1050; width: 100%; background-repeat: repeat; border-top: 0.4rem solid var(--cgold); padding: 0.5rem 1rem;">
        <div class="mb-2 mb-md-0 text-center text-md-start mx-5 fs-5">
            Al utilizar este sitio web, aceptas el uso de <em>cookies</em> esenciales y nuestras prácticas de privacidad.
            <a href="cookiepolicy.html">Política de cookies</a> ·
            <a href="privacypolicy.html">Política de privacidad</a>
        </div>
        <div class="d-flex gap-2 justify-content-end">
            <button type="button" class="fs-5 btnCookies bg-container-animation bg-dblue text-wwhite rounded-3 me-4 js-cookies-all-close">Aceptar</button>
        </div>
    </div>
    `;
    const CA = `
    <div id="cookiesBanner_CA" class="cookiesBanner nuvesRosas position-fixed bottom-0 end-0 bg-light shadow pt-2 pb-5 d-flex flex-column flex-md-row align-items-center justify-content-between" 
    style="z-index: 1050; width: 100%; background-repeat: repeat; border-top: 0.4rem solid var(--cgold); padding: 0.5rem 1rem;">
        <div class="mb-2 mb-md-0 text-center text-md-start mx-5 fs-5">
            En utilitzar aquest lloc web, acceptes l’ús de <em>cookies</em> essencials i les nostres pràctiques de privacitat.
            <a href="cookiepolicy.html">Política de cookies</a> ·
            <a href="privacypolicy.html">Política de privacitat</a>
        </div>
        <div class="d-flex gap-2 justify-content-end">
            <button type="button" class="fs-5 btnCookies bg-container-animation bg-dblue text-wwhite rounded-3 me-4 js-cookies-all-close">Accepta</button>
        </div>
    </div>
    `;
    const JA = `
    <div id="cookiesBanner_JA" class="cookiesBanner nuvesRosas position-fixed bottom-0 end-0 bg-light shadow pt-2 pb-5 d-flex flex-column flex-md-row align-items-center justify-content-between" 
    style="z-index: 1050; width: 100%; background-repeat: repeat; border-top: 0.4rem solid var(--cgold); padding: 0.5rem 1rem;">
        <div class="mb-2 mb-md-0 text-center text-md-start mx-5 fs-5">
            本サイトを利用することで、必須<em>クッキー</em>の使用および当サイトのデータ取扱方針に同意したものとします。
            <a href="cookiepolicy.html">クッキーポリシー</a> ·
            <a href="privacypolicy.html">プライバシーポリシー</a>
        </div>
        <div class="d-flex gap-2 justify-content-end">
            <button type="button" class="fs-5 btnCookies bg-container-animation bg-dblue text-wwhite rounded-3 me-4 js-cookies-all-close">同意する</button>
        </div>
    </div>
    `;
    // Añadir al body
    let idiomaHTML;
    if (idioma.startsWith('Español')) {
        idiomaHTML = ES;
    } else if (idioma.startsWith('Català')) {
        idiomaHTML = CA;
    } else if (idioma.startsWith('日本語')) {
        idiomaHTML = JA;
    } else {
        idiomaHTML = EN;
    }
    document.body.insertAdjacentHTML('beforeend', idiomaHTML);

    const banner = document.querySelector('.cookiesBanner:last-of-type');
    if (!banner) return;
    const btnAll = banner.querySelector('.js-cookies-all-close');

    // Bloquear scroll/tabulación si quieres
    document.body.classList.add('cookies-blocked');
    
    // CSS dinámico para bloquear clicks excepto elementos permitidos
    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 575px) {
            .cookiesBanner {
                height: 30vh;
            }
        }
        @media (min-width: 576px) {
            .cookiesBanner {
                height: 25vh;
            }
        }
        @media (min-width: 768px) {
            .cookiesBanner {
                height: 20vh;
            }
        }
        @media (min-width: 992px) {
            .cookiesBanner {
                height: 15vh;
            }
        }
        @media (min-width: 1200px) {
            .cookiesBanner {
                height: 14vh;
            }
        }
        @media (min-width: 1400px) {
            .cookiesBanner {
                height: 12vh;
            }
        }
        /* Bloquea toda la web salvo el banner y elementos permitidos */
            body.cookies-blocked > *:not(#cookiesBanner):not(.navbar-collapse):not(.navbar-toggler):not(.langBtn) {
                pointer-events: none !important;
                user-select: none !important;
                animation: gold-schimmer none !important;
            }
            .navbar-toggler-icon, 
            .navbar-toggler+.collapse>.navbar-nav>.nav-item:last-child, 
            .navbar-toggler+.collapse>.navbar-nav>.nav-item:last-child>.dropdown-menu  {
                pointer-events: auto !important;
                color: var(--white) !important;
                animation: gold-shimmer .35s linear infinite;
            }

            .dropdown:last-child>.dropdown-toggle+.dropdown-menu {
                pointer-events: auto !important;
                color: var(--white) !important;
                animation: gold-shimmer .35s linear infinite;
            }

            /* Botón hamburguesa y todos sus hijos */
            .navbar-toggler, .navbar-toggler > :last-child > .dropdown-menu {
                pointer-events: auto !important;
                color: var(--white) !important;
                animation: gold-shimmer .35s linear infinite;
            }

            /* Botones de idioma y todos sus hijos */
            .langBtn, .langBtn * {
                pointer-events: auto !important;
                color: var(--white) !important;
                animation: gold-shimmer .35s linear infinite;
            }

            .btnCookies {
                pointer-events: auto !important;
                animation: gold-shimmer .35s linear infinite;
            }
            .cookiesBanner>div {
                pointer-events: auto !important;
            }
            .cookiesBanner>div>a {
                animation: gold-shimmer .35s linear infinite;
            }

            @keyframes gold-shimmer {
            0% {
                border: 3px solid transparent;
                border-image: linear-gradient(
                    90deg,
                    rgba(255, 204, 136, 1) 0%,
                    rgba(255, 204, 136, 0) 40%,
                    rgba(255, 204, 136, 1) 100%
                ) 1;
                );
            }
            50% {
                border: 3px solid transparent;
                border-image: linear-gradient(90deg,
                rgba(255, 204, 136, 1) 0%,
                rgba(255, 204, 136, 0) 74%,
                rgba(255, 204, 136, 1) 100%,
                rgba(255, 204, 136, 0) 100%);
                ) 1;
            }
            100% {
                border: 3px solid transparent;
                border-image: linear-gradient(90deg,
                rgba(255, 204, 136, 1) 0%, 
                rgba(255, 204, 136, 0) 6%, 
                rgba(255, 204, 136, 1) 100%, 
                rgba(255, 204, 136, 0) 100%);
                ) 1;
            }
        }

        `;
    document.head.appendChild(style);

    // Función para guardar consentimiento y quitar banner
    function giveConsent(type) {
        localStorage.setItem('cookiesConsent', type);
        banner.remove();
        style.remove();
        window.location.reload()
        document.body.classList.remove('cookies-blocked');
    }

    btnAll.addEventListener('click', () => giveConsent('all'));
}
