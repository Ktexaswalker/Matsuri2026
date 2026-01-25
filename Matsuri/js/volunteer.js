const voluntarios = {
    foto: {}, //img.webp
    name: {}, //Hector Martinez
    rol: {}, //Voluntario
    description: {}, // Fui invitado por Hyungchang y quise colaborar, para conocer personas con las que compartir buenos momentos y mostrar algunas de mis habilidades
    link: {}, // linkedin, email, instagram, facebook...
    trabajos: {}, // He sido el desarrollador de la web de Matsuri 2026
    tags: {} //admin, logistica, sponsors, marketing, programa, gobierno, vendedores, restauraciones, voluntariado, crowdfunding, información, bebida, niño, entrada, web, social
}



const params = new URLSearchParams(window.location.search);
const newUrl = window.location.pathname + "?" + params.toString();
console.log(id);
console.log(tipo);
console.log(nombre);
const section = document.createElement("section");
const innerSection = document.createTextNode(nombre);
