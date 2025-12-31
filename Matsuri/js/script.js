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
const swiper = new Swiper(".mySwiper", {
    spaceBetween: 16,
    loop: false,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
        slidesPerView: 1,   // móvil
        },
        576: {
        slidesPerView: 2,   // tablet
        },
        768: {
        slidesPerView: 3,   // desktop
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
