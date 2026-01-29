const voluntarios = {
    1: {
        id:"MQ==",
        name:"SGVjdG9yIE1hcnRpbmV6IENlcnZlcmE=",
        rol:"dm9sdW50ZWVy",
        descripcion:"TWUgaW52aXRhcvNuIHBhcmEgY29sYWJvcmFyIGVuIGVsIE1hdHN1cmkgeSBtZSBvZnJlY+0gYSBheXVkYXIgcGFyYSBjb25vY2VyIHBlcnNvbmFzIGNvbiBsYXMgcXVlIGNvbXBhcnRpciBidWVub3MgbW9tZW50b3MgeSBtb3N0cmFyIGFsZ3VuYXMgZGUgbWlzIGhhYmlsaWRhZGVz",
        links: [
            "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2hlY3Rvci5tYXJ0aW5lemNlcnZlcmE=",
            "aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2hlY3Rvci1tYXJ0aW5lei1jZXJ2ZXJhLTA0MTAwMjZhLw==",
            "aHR0cHM6Ly9naXRodWIuY29tL0t0ZXhhc3dhbGtlcg=="
        ],
        trabajos: "RGVzYXJyb2xsYWRvciBkZSBsYSB3ZWIgZGUgbWF0c3VyaSAyMDI2",
        tags: [
            "bWFycXVldGluZw==",
            "Y3Jvd2RmdW5kaW5n"
        ]
    },
    2: {
        id:"Mg==",
        name:"UGVwYQ==",
        rol:"dm9sdW50ZWVy",
        descripcion:"VGhpcyBpcyBhbiBpbmZvcm1hdGl2ZSBkZXNjcmlwdGlvbiBzbyB1c2VycyBjYW4gdW5kZXJzdGFuZCBob3cgdGhpcyBzb2Z0d2FyZSB3b3Jrcy4gVGhlIFJvbGUgZmVhdHVyZSBpcyBub3QgdG8gYmUgdG91Y2hlZCB1bmxlc3MgeW91IGFyZSBhbiBhZG1pbiwgYXJ0aXN0LCBvciBzb21ldGhpbmcgZWxzZS4=",
        links: [
            "cGVwYXdhbGtpbmdncmFzcy5jb20=", "cGVwYWxpbmtlZGluLmNvbS9teWpvYnM=", "aWxvdmVtYXRzdXJpYW5ka2lkcy5jb20=", "ZmFjZWJvb2stcGVwYS5jb20vcHJvZmlsZQ==", "eW91dHViZS5jb20vbXljaGFuZWxpbnlvdXR1YmU="
        ],
        trabajos:"SSBhbSBpbiBjaGFyZ2Ugb2YgaGVscGluZyB3aXRoIHRoZSBwcmVwYXJhdGlvbiBvZiB0aGUgc2hvcHMgYW5kIHRoZSBhc3NlbWJseSBvZiBzdGFuZHMu",
        tags: [
            "Vm9sdW50ZWVyaW5n", "SW5mb3JtYXRpb24=", "RHJpbmtz", "RW50cmFuY2U=", "Q2hpbGRyZW4="
        ]
    },
    3: {
        id:"MQ==",
        name:"SGVjdG9yIE1hcnRpbmV6IENlcnZlcmE=",
        rol:"dm9sdW50ZWVy",
        descripcion:"TWUgaW52aXRhcvNuIHBhcmEgY29sYWJvcmFyIGVuIGVsIE1hdHN1cmkgeSBtZSBvZnJlY+0gYSBheXVkYXIgcGFyYSBjb25vY2VyIHBlcnNvbmFzIGNvbiBsYXMgcXVlIGNvbXBhcnRpciBidWVub3MgbW9tZW50b3MgeSBtb3N0cmFyIGFsZ3VuYXMgZGUgbWlzIGhhYmlsaWRhZGVz",
        links: [
            "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2hlY3Rvci5tYXJ0aW5lemNlcnZlcmE=",
            "aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2hlY3Rvci1tYXJ0aW5lei1jZXJ2ZXJhLTA0MTAwMjZhLw==",
            "aHR0cHM6Ly9naXRodWIuY29tL0t0ZXhhc3dhbGtlcg=="
        ],
        trabajos: "RGVzYXJyb2xsYWRvciBkZSBsYSB3ZWIgZGUgbWF0c3VyaSAyMDI2",
        tags: [
            "bWFycXVldGluZw==",
            "Y3Jvd2RmdW5kaW5n"
        ]
    },
// 2:{...}

    // id: { }, //img.webp
    // name: { }, //Hector Martinez
    // rol: { }, //Voluntario
    // description: { }, // Fui invitado por Hyungchang y quise colaborar, para conocer personas con las que compartir buenos momentos y mostrar algunas de mis habilidades
    // link: { }, // linkedin, email, instagram, facebook...
    // trabajos: { }, // He sido el desarrollador de la web de Matsuri 2026
    // tags: { } //admin, logistica, sponsors, marketing, programa, gobierno, vendedores, restauraciones, voluntariado, crowdfunding, información, bebida, niño, entrada, web, social
}



const params = new URLSearchParams(window.location.search);
const newUrl = window.location.pathname + "?" + params.toString();
// console.log(id);
// console.log(tipo);
// console.log(nombre);
const section = document.createElement("section");
// const innerSection = document.createTextNode(nombre);
