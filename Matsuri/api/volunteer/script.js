// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { nombre, about, description, urls, area, foto } = req.body;
//     console.log("Nuevo voluntario:", nombre, about, description, urls, area, foto);
//     await db.insert({ nombre, about, description, urls, area, foto });
//     return res.status(200).json({ message: "Guardado correctamente" });
//   }
//   res.status(405).json({ message: "Método no permitido" });
// }


function convertDriveLink(url) {
      const idMatch = url.match(/[-\w]{25,}/);
      return idMatch
        ? `https://lh3.googleusercontent.com/d/${idMatch[0]}`
        : url;
    }
function obtenerDominio(url) {
  try {
      if (!/^https?:\/\//i.test(url)) {
          url = "https://" + url;
      }
      return new URL(url).hostname.replace(/^www\./, "").split('.')[0];;
  } catch {
      return url;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRDEsztzxOFCKGSAh_R5DWeEKQY1bAPROS96argqXT7qYXCGrvbG-tjmgY66pUoctK2Mhu71Ch3erD2/pub?gid=1178366309&single=true&output=csv";
  fetch(url)
  .then(response => response.text())
  .then(csv => {
    // const rows = csv.split("\n").map(r => r.split(","));
    // const headers = rows.shift();
    Doc.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: function(resultado) {
        const data = resultado.data;
        // const container = document.getElementById("volunteers-container");
        const divInfo = document.getElementById("info");
        
        const campo = "voluntario";
        const titulo = "Voluntarios";
        const carrousel = document.createElement("div");
        carrousel.classList.add("bg-container-animation", "container-fluid", "bg-dblue");
        const divCarrousel = document.createElement("div");
        divCarrousel.classList.add("justify-content-center", "align-items-center")
        const divCol = document.createElement("div");
        divCol.classList.add("col");
        const h3 = document.createElement("h3");
        h3.classList.add("text-wwhite", "pt-1", "ps-5", "fw-medium", "display-6", "py-3");
        h3.textContent = titulo;
        divCol.appendChild(h3);
        const divSwiper = document.createElement("div");
        divSwiper.classList.add("swiper", "mySwiper", "px-3");
        const divWrapper = document.createElement("div");
        divWrapper.classList.add("swiper-wrapper");      

        let row = 0
        data.forEach(col => {
          row += 1;
          let nombre = col[resultado.meta.fields[1]];
          let about = col[resultado.meta.fields[2]];
          let description = col[resultado.meta.fields[3]];
          let urls = col[resultado.meta.fields[4]].split(", ");
          let area = col[resultado.meta.fields[5]].split(/\s*,\s*/);
          let foto = convertDriveLink(col[resultado.meta.fields[6]]);
          const containerIni = document.createElement("div");
          containerIni.setAttribute("id", `${row}`);
          const divRow = document.createElement("div");
          divRow.classList.add("row");
          const col12 = document.createElement("div");
          col12.classList.add("col-12");
          const rowDFlex = document.createElement("div");
          rowDFlex.classList.add("row", "d-flex", "align-items-center", "justify-content-between");
          const col5 = document.createElement("div");
          col5.classList.add("col-5");
          const dFlex = document.createElement("div");
          dFlex.classList.add("d-flex","align-items-center", "justify-content-start");
          const puntoDorado = document.createElement("img");
          puntoDorado.classList.add("me-3");
          puntoDorado.src = "./../../img/png/Punto dorado.png";
          puntoDorado.alt = "punto"; 
          const trbRe = document.createElement("b");
          trbRe.textContent = "Trabajos realizados: ";
          const descript = document.createElement("b");
          descript.textContent = "Descripción: ";
          const tEnlaces = document.createElement("b");
          tEnlaces.textContent = "Enlaces: ";
          const col12T = document.createElement("div");
          col12T.classList.add("col-12");
          const col7 = document.createElement("div");
          col7.classList.add("col-7");
          // const container1 = document.createElement("div");
          // container1.setAttribute("id", `${row}`)
          if (row == 1) {
            containerIni.classList.add("container-fluid", "bg-dblue", "px-3");
            // container1.classList.add("col", "col-sm-12", "col-lg-6", "col-xl-6", "col-xxl-6");
          } else {
            containerIni.classList.add("d-none", "container-fluid", "bg-dblue", "px-3");
            // container1.classList.add("d-none", "col", "col-sm-12", "col-lg-6", "col-xl-6", "col-xxl-6");
          }
          
          // const container2 = document.createElement("div");
          // container2.classList.add("container", "pt-5");
          // const container3 = document.createElement("div");
          // container3.classList.add("bg-container-animation", "container-fluid", "bg-dblue", "border", "rounded-4", "p-sm-4", "p-3");
          // const article1 = document.createElement("article");
          // article1.classList.add("row", "d-flex", "align-items-center", "justify-content-center");
          // const container4 = document.createElement("div");
          // container4.classList.add("bg-transparent", "offset-0", "col-12", "offset-sm-0", "col-sm-12", "order-sm-1", "offset-md-0", "col-md-6", "order-md-2", "offset-lg-0", "col-lg-6", "order-lg-2", "offset-xl-0", "col-xl-6", "order-xl-2", "offset-xxl-0", "col-xxl-6", "order-xxl-2", "bg-dblue", "rounded-4", "ps-3", "w-lg-50", "w-xl-50", "w-xxl-50");
          // NOMBRE
          const name = document.createElement("h3");
          // name.classList.add("fw-medium", "d-flex", "justify-content-between");
          name.textContent = nombre;
          dFlex.appendChild(puntoDorado);
          dFlex.appendChild(name);
          // article1.appendChild(name);
          // ROL
          // const rol = document.createElement("div");
          // rol.classList.add("btn", "bg-dgrey", "pe-none", "d-none", "d-sm-block");
          // rol.textContent = campo;
          // name.appendChild(rol);
          const trabajos = document.createElement("p");
          trabajos.appendChild(trbRe);
          trabajos.append(description);
          col12T.appendChild(trabajos);
          // DESCRIPCION
          const descrip = document.createElement("p");
          descrip.appendChild(descript)
          descrip.append(about);
          col12T.appendChild(descrip);
          // descrip.classList.add("pt-3", "d-none", "d-sm-block");
          // container4.appendChild(descrip);
          // LINKS
          const enlaces = document.createElement("p");
          enlaces.appendChild(tEnlaces);
          urls.forEach(l => {
            const button = document.createElement("button");
            button.classList.add("mx-1", "p-1", "bg-cgold", "rounded", "d-sm-inline-block");
            const a = document.createElement("a");
            a.classList.add("p-0", "text-decoration-none", "text-wwhite", "fw-light");
            a.href = l;
            a.textContent = `${obtenerDominio(l)}`;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            button.appendChild(a);
            // container4.appendChild(button);
            enlaces.append(button);
            col12T.appendChild(enlaces);
          })
          // TRABAJOS
          
          // trabajos.classList.add("pt-3", "d-none", "d-sm-block");
          
          
          // container4.appendChild(trabajos);
          // article1.appendChild(container4);
          // TAGS
          area.forEach(t => {
            const tag = document.createElement("div");
            // tag.classList.add("btn", "bg-3blue", "me-1", "pe-none", "px-1", "py-0", "d-none", "d-sm-inline-block")
            tag.classList.add("btn", "bg-3blue", "me-1", "pe-none", "px-1", "py-0");
            tag.textContent = t.split(" / ")[0];
            col7.appendChild(tag);
            // container4.appendChild(tag);
          })
          col5.appendChild(dFlex);
          rowDFlex.appendChild(col5);
          rowDFlex.appendChild(col7);
          rowDFlex.appendChild(col12T);
          col12.appendChild(rowDFlex);
          divRow.appendChild(col12);
          containerIni.appendChild(divRow);
          divInfo.appendChild(containerIni);
          // const containerMovil1 = document.createElement("div");
          // containerMovil1.classList.add("col-12", "order-2", "offset-0", "d-block", "d-sm-none", "w-lg-50", "w-xl-50", "w-xxl-50");
          // const containerMovil2 = document.createElement("div");
          // containerMovil2.classList.add("d-flex", "align-items-start", "col-12", "order-2", "col-md-6", "order-md-2", "col-xl-6", "offset-xl-0", "bg-dblue", "w-lg-50", "w-xl-50", "w-xxl-50");
          // const img = document.createElement("img");
          // img.classList.add("rounded-4", "img-fluid", "card-img-top");
          // img.src = foto
          // img.alt = name.textContent.split(campo);
          // containerMovil2.appendChild(img);
          // containerMovil1.appendChild(containerMovil2);
          // const containerTablet1 = document.createElement("div");
          // containerTablet1.classList.add("d-none", "col-sm-12", "offset-sm-0", "order-sm-2", "d-sm-block", "col-md-6", "offset-md-0", "order-md-1", "col-lg-6", "offset-lg-0", "d-md-block", "w-lg-50", "w-xl-50", "w-xxl-50", "mt-3");
          // const containerTablet2 = document.createElement("div");
          // containerTablet2.classList.add("d-flex", "align-items-start", "col-12", "order-2", "col-md-12", "order-md-2", "col-xl-12", "offset-xl-0", "bg-dblue", "w-lg-50", "w-xl-50", "w-xxl-50");
          // const img1 = document.createElement("img");
          // img1.classList.add("rounded-4", "img-fluid", "card-img-top");
          // img1.src = foto
          // img1.alt = name.textContent.split(campo);
          // containerTablet2.appendChild(img1);
          // containerTablet1.appendChild(containerTablet2);
          // article1.appendChild(containerTablet1);
          // article1.appendChild(containerMovil1)
          // container3.appendChild(article1);
          // container2.appendChild(container3);
          // container1.appendChild(container2);
          // container.appendChild(container1);
          
          const divSlide = document.createElement("div");
          divSlide.classList.add("swiper-slide");
          const divCard = document.createElement("div");
          divCard.classList.add("card", "bg-dblue", "text-white", "h-100", "mb-4");
          const aHref = document.createElement("a");
          aHref.classList.add(`${row}`, "text-decoration-none");
          const divRatio = document.createElement("div");
          divRatio.classList.add("ratio", "ratio-4x3");
          const imgFluid = document.createElement("img");
          imgFluid.classList.add("img-fluid", "object-fit-cover", "optimizable", "rounded-3");
          imgFluid.src = foto;
          aHref.appendChild(imgFluid);
          const divCardBody = document.createElement("div");
          divCardBody.classList.add("card-body");
          const pCardText = document.createElement("p");
          pCardText.classList.add("card-text", "display-5", "lh-1");
          const aTag = document.createElement("a");
          aTag.classList.add("text-white", "text-decoration-none", "animation-funny", "fw-light", "h3", "fw-light");
          const imgA = document.createElement("img");
          imgA.classList.add("pe-3");
          imgA.src = "./../../img/png/Punto dorado.png";
          // const textoArea = area.map(a => a.split(" / ")[0]).join(", ");
          aTag.append(nombre.split(" ")[0]+" "+nombre.split(" ")[1]);
          pCardText.appendChild(imgA);
          pCardText.appendChild(aTag);
          aHref.appendChild(pCardText);
          divRatio.appendChild(aHref);
          divCard.appendChild(aHref);
          divSlide.appendChild(divCard);
          divWrapper.appendChild(divSlide);
        });
        const swiperBtnNext = document.createElement("div");
        swiperBtnNext.classList.add("swiper-button-next");
        const swiperBtnPrev = document.createElement("div");
        swiperBtnPrev.classList.add("swiper-button-prev");
        divSwiper.appendChild(swiperBtnNext);
        divSwiper.appendChild(swiperBtnPrev);
        divSwiper.appendChild(divWrapper);
        divCol.appendChild(divSwiper);
        divCarrousel.appendChild(divCol);
        carrousel.appendChild(divCarrousel);
        document.getElementById("carrousel-voluntarios").appendChild(carrousel);
        new Swiper(".mySwiper", {
          loop: true,
          speed: 600,
          spaceBetween: 20,
          slidesPerView: 3,
          preventClicks: true,
          preventClicksPropagation: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          },
          breakpoints: {
            0: {
              slidesPerView: 1,
              on: {
                slideChange: function () {
                  const volunters = document.getElementById("info");
                  Array.from(volunters.children).forEach((el, i) => {
                    el.classList.toggle("active-info", i === indexReal);
                  });
                }
              }
            },
            768: {
              slidesPerView: 3,
            },
                1200: {
                slidesPerView: 5,
              },
            },
          });
        }});
      });
});