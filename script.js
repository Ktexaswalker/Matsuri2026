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
    setInterval(() => {
        angle += 1;
        fondo.style.background = `conic-gradient(from ${angle}deg, #FFFFFF, #FFFE, #FFFD, #FFFC)`;
        fondo.style.backgroundSize = 'cover';
        fondo.style.borderRadius = `50%`;
        fondo.style.backgroundRepeat = 'no-repeat';
        // fondo.style.padding = `9px`;
        fondo.style.backgroundPosition = 'center';
    }, 20);
}