const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const noteToMidi = {
    "A0": 0x15, "A#0": 0x16, "B0": 0x17,
    "C1": 0x18, "C#1": 0x19, "D1": 0x1A, "D#1": 0x1B, "E1": 0x1C, "F1": 0x1D, "F#1": 0x1E, "G1": 0x1F, "G#1": 0x20, "A1": 0x21, "A#1": 0x22, "B1": 0x23,
    "C2": 0x24, "C#2": 0x25, "D2": 0x26, "D#2": 0x27, "E2": 0x28, "F2": 0x29, "F#2": 0x2A, "G2": 0x2B, "G#2": 0x2C, "A2": 0x2D, "A#2": 0x2E, "B2": 0x2F,
    "C3": 0x30, "C#3": 0x31, "D3": 0x32, "D#3": 0x33, "E3": 0x34, "F3": 0x35, "F#3": 0x36, "G3": 0x37, "G#3": 0x38, "A3": 0x39, "A#3": 0x3A, "B3": 0x3B,
    "C4": 0x3C, "C#4": 0x3D, "D4": 0x3E, "D#4": 0x3F, "E4": 0x40, "F4": 0x41, "F#4": 0x42, "G4": 0x43, "G#4": 0x44, "A4": 0x45, "A#4": 0x46, "B4": 0x47,
    "C5": 0x48, "C#5": 0x49, "D5": 0x4A, "D#5": 0x4B, "E5": 0x4C, "F5": 0x4D, "F#5": 0x4E, "G5": 0x4F, "G#5": 0x50, "A5": 0x51, "A#5": 0x52, "B5": 0x53,
    "C6": 0x54, "C#6": 0x55, "D6": 0x56, "D#6": 0x57, "E6": 0x58, "F6": 0x59, "F#6": 0x5A, "G6": 0x5B, "G#6": 0x5C, "A6": 0x5D, "A#6": 0x5E, "B6": 0x5F,
    "C7": 0x60, "C#7": 0x61, "D7": 0x62, "D#7": 0x63, "E7": 0x64, "F7": 0x65, "F#7": 0x66, "G7": 0x67, "G#7": 0x68, "A7": 0x69, "A#7": 0x6A, "B7": 0x6B,
    "C8": 0x6C
};

const expresiones = {
    uaah: { Español: "¡Uaaah!", English: "Woooow!", Català: "Uaaah!", 日本語: "うわぁ！" },
    comoloves: { Español: "¡Cómo lo clavas!", English: "You're nailing it!", Català: "Ho estàs clavant!", 日本語: "すごく上手！" },
    animo: { Español: "¡Ánimo!", English: "Keep going!", Català: "Ànims!", 日本語: "がんばって！" },
    yaquedamenos: { Español: "¡Ya queda menos!", English: "Almost there!", Català: "Ja queda poc!", 日本語: "もう少し！" },
    yeah: { Español: "¡Sí!", English: "Yeah!", Català: "Sí!", 日本語: "イエーイ！" },
    porfin: { Español: "¡Por fin!", English: "Finally!", Català: "Per fi!", 日本語: "やっと！" },
    repetir: { Español: "¿Quieres repetir?", English: "Do you want to try again?", Català: "Vols repetir?", 日本語: "もう一度やる？" },
    sorryNoWords: { Español: "No se han encontrado imágenes.", English: "No images were found.", Català: "No s'han trobat imatges.", 日本語: "画像が見つかりませんでした。"},
    ops: { Español: "¡Ups! Algo ha salido mal.", English: "Oops! Something went wrong.", Català: "Ups! Alguna cosa ha anat malament.", 日本語: "おっと！何か問題が発生しました。"},
    pruebaOtro: { Español: "Pruébalo de nuevo con otro idioma.", English: "Try it again with another language.", Català: "Prova-ho de nou amb un altre idioma.", 日本語: "別の言語でもう一度試してみてください。"},
    uno:{Español: "3", English: "3", Català: "3", 日本語: "3"},
    dos:{Español: "2", English: "2", Català: "2", 日本語: "2"},
    tres:{Español: "1", English: "1", Català: "1", 日本語: "1"},
    ya: {Español: "¡YA!",English: "NOW!",Català: "JA!",日本語: "今！"},
};

function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

function nivel1(words) {
    if (words.length == 0) return;
    const index = getRandomIndex(words);
    return Array(8).fill(words[index]); // repite 8 veces la misma palabra
}

function nivel2(words) {
    if (words.length == 0) return;
    if (words.length < 2) return;
    const indices = [];
    while (indices.length < 2) {
        const idx = getRandomIndex(words);
        if (!indices.includes(idx)) indices.push(idx);
    }
    const result = [];
    result.push(...Array(4).fill(words[indices[0]]));
    result.push(...Array(4).fill(words[indices[1]]));
    return result.sort(() => Math.random() - 0.5);
}

function nivel3(words) {
    if (words.length == 0) return;
    const result = [];
    const indices = words.map((_, i) => i);
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) result.push(words[indices[i]]);
    }
    while (result.length < 8) {
        result.push(words[getRandomIndex(words)]);
    }
    return result.sort(() => Math.random() - 0.5);
}

function nivel4(words) {
    if (words.length == 0) return;
    const result = [];
    const firstTwo = [];
    while (firstTwo.length < 2) {
        const idx = getRandomIndex(words);
        if (!firstTwo.includes(idx)) firstTwo.push(idx);
    }
    for (let i = 0; i < 4; i++) result.push(words[firstTwo[i % 2]]);
    for (let i = 0; i < 4; i++) {
        result.push(words[getRandomIndex(words)]);
    }
    return result.sort(() => Math.random() - 0.5);
}

function nivel5(words) {
    if (words.length == 0) return;
    const grupos = [[], []];
    for (let g = 0; g < 2; g++) {
        let prev = null;
        for (let i = 0; i < 4; i++) {
            let idx;
            do {
                idx = getRandomIndex(words);
            } while (idx === prev);
            grupos[g].push(words[idx]);
            prev = idx;
        }
    }
    return [...grupos[0], ...grupos[1]];
}

function generarNivel(words, nivel) {
    switch(nivel) {
        case 1: return nivel1(words);
        case 2: return nivel2(words);
        case 3: return nivel3(words);
        case 4: return nivel4(words);
        case 5: return nivel5(words);
        default: return nivel1(words);
    }
}

function empezarJuego(nivel, parte) {
    const lang = localStorage.getItem("lang");
    switch(parte) {
        case "easy": parte = words.easy[lang];break;
        case "medium": parte = words.medium[lang];break;
        case "hard": parte = words.hard[lang];break;
    }
    const iframe = document.getElementById("iframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const inicio = iframeDocument.getElementById("inicio");
    inicio.classList.add("d-none");
    const iFI = iframeDocument.getElementById("imagenes");
    iFI.classList.remove("d-none");
    const columnas = iFI.querySelectorAll(".row > div");
    const palabra = generarNivel(parte, nivel);
    if (!palabra) return false;
    const palabrasUnicas = new Set();
    for (let i = 1; i <= columnas.length; i++) {
        let col = iframeDocument.getElementById(`${i}`);
        const span = col.querySelector("span");
        col.style.background = `url(./../../imgsWebp/${palabra[i-1]}.webp)`;
        col.style.backgroundSize = "contain";
        col.style.backgroundRepeat = "no-repeat";
        col.style.backgroundPosition = "center";
        const palabraActual = palabra[i - 1];
        if (!palabrasUnicas.has(palabraActual)) {
            palabrasUnicas.add(palabraActual);
            span.textContent = palabraActual;
        } else {
            span.textContent = "";
        }
        span.style.color = "var(--cred)";
        span.style.textShadow = `
            -0.1em -0.1rem 0 var(--cgold),
            0.1rem -0.1rem 0 var(--cgold),
            -0.1rem  0.1rem 0 var(--cgold),
            0.1rem  0.1rem 0 var(--cgold)
        `;
        span.style.color = "var(--cred)";
        span.style.fontSize = "2.5em"
        // col.style.border = "0.1rem solid var(--3blue)";
        col.style.boxShadow = "none";
        if (window.visualViewport.width <= 576) {
            col.style.height = "22vh";
        } else if (window.visualViewport.width > 576 & window.visualViewport.width < 768) {
            col.style.height = "22vh";
            col.style.width = "32vw";
        } else {
            col.style.height = "40vh";
        }
    }
}

function playNote(freq, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
    }
    const notes = {
        C4: 261.63,
        D4: 293.66,
        E4: 329.63,
        G4: 392.00,
        A4: 440.00
    };
    function playMelody() {
    let time = audioCtx.currentTime;
    notes.forEach(note => {
        playScheduled(notes[note[0]], note[1], time);
        time += note[1];
    });
}

function playScheduled(freq, duration, startTime) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = freq;
    osc.type = "triangle";
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
}
function playSoftNote(freq, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine"; // puedes probar "triangle" o "sawtooth"
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    // Envelope ADSR
    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.05);      // Attack
    gain.gain.linearRampToValueAtTime(0.4, now + 0.2);       // Decay
    gain.gain.setValueAtTime(0.4, now + duration);           // Sustain
    gain.gain.linearRampToValueAtTime(0, now + duration + 0.2); // Release
    osc.start(now);
    osc.stop(now + duration + 0.2);
    return freq;
}

function playPianoApprox(freq, duration) {
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const osc3 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc1.type = "sine";   // fundamental
    osc2.type = "triangle"; // primer armónico
    osc3.type = "sawtooth"; // segundo armónico
    osc1.frequency.value = freq;
    osc2.frequency.value = freq * 2;  // doble frecuencia
    osc3.frequency.value = freq * 3;  // triple frecuencia
    osc1.connect(gain);
    osc2.connect(gain);
    osc3.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.01); // ataque
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.5); // release
    osc1.start(now); osc1.stop(now + duration + 0.5);
    osc2.start(now); osc2.stop(now + duration + 0.5);
    osc3.start(now); osc3.stop(now + duration + 0.5);
}

function playKick(midi, duration = 0.5) {
    const freq = midiToFreq(midi); // usa la nota
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    gain.gain.setValueAtTime(1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playSnare(midi, duration = 0.2) {
    const freq = midiToFreq(midi); // tono base
    const osc = audioCtx.createOscillator();
    const gainOsc = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const gainNoise = audioCtx.createGain();
    gainNoise.gain.setValueAtTime(0.7, audioCtx.currentTime);
    gainNoise.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gainOsc);
    gainOsc.connect(audioCtx.destination);
    gainOsc.gain.setValueAtTime(1, audioCtx.currentTime);
    gainOsc.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    noise.connect(gainNoise);
    gainNoise.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
    noise.start();
    noise.stop(audioCtx.currentTime + duration);
}

function playHiHat(midi, duration = 0.05) {
    const freq = midiToFreq(midi);
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++)
        output[i] = Math.random() * 2 - 1;
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.7, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    const filter = audioCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = freq; // frecuencia variable según nota
    noise.connect(gain);
    gain.connect(filter);
    filter.connect(audioCtx.destination);
    noise.start();
    noise.stop(audioCtx.currentTime + duration);
}
function playWhistle(freq, duration = 0.6) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq * 0.9, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(freq, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);   
}

function comprobarExistenPalabras(nivel, parte) {
    const lang = localStorage.getItem("lang");
    switch(parte) {
        case "easy": parte = words.easy[lang];break;
        case "medium": parte = words.medium[lang];break;
        case "hard": parte = words.hard[lang];break;
    }
    if (generarNivel(parte, nivel) == undefined) {
        mostrarMensaje("sorryNoWords");
        return false;
    } else {
        return true;
    }

}

function mostrarMensaje(expresion) {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const iFI = iframeDocument.getElementById("imagenes");
    const inicio = iframeDocument.getElementById("inicio");
    inicio.classList.remove("d-none");
    iFI.classList.add("d-none");
    const lang = localStorage.getItem("lang");
    if (expresiones[expresion]) {
        iframeDocument.getElementById("inicio").textContent = expresiones[expresion][lang];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function tocarMelodia() {
    const step = 190;
    saxofon = [
        "C6", "C6", "G6", "A6", "A#6", "A#6", "A6", "A6", "G6", "G6", "F6", "E6", "C6"
    ];
    bateria = [
        1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,
    ];
    silbato = [
        0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0,
    ]
    longitud = saxofon.length
    function estribillo(bateria, saxofon, nivel, parte) {
        if (!comprobarExistenPalabras(nivel, parte)){
            mostrarMensaje("ops");
            setTimeout(() => {
                mostrarMensaje("pruebaOtro");
                final();
            }, 900);
            return true;
        }
        if (nivel == 1) {
            const cuentaAtras = ["uno","dos","tres","ya"];
            for (let num = 0; num < cuentaAtras.length; num++) {
                setTimeout(() => {
                    mostrarMensaje(cuentaAtras[num]);
                }, num * 900);
            }
        }
        const containers = 8;
        let child = 1;
        return new Promise(resolve => {
            silbato.forEach((pi, to) => {
                setTimeout(() => {
                    if (pi === 1) {
                        playWhistle(midiToFreq(0x66), 0.4);
                        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                        iframeDocument.getElementById(`${child}`).style.boxShadow = "0 0 0 0.2rem white, 0 0 0 .6rem var(--cred)";
                        if (child > 1) {
                            iframeDocument.getElementById(`${child-1}`).style.boxShadow = "none";
                        }
                        if (child == containers) {
                            start = true;
                            setTimeout(() => {
                                if(nivel <= 5) {
                                    empezarJuego(nivel, parte);                  
                                } else {
                                    iframeDocument.getElementById("8").style.boxShadow = "none";
                                }
                            }, 1000);
                        }
                        child += pi
                    }
                }, to * step + 2);
            });
            bateria.forEach((num, i) => {
                setTimeout(() => {
                    if (num === 1) {
                        playKick(noteToMidi["G1"], 0.2);
                    }
                }, i * step + 0.4);
            });
            const offset = bateria.length * step;
            const total = offset + saxofon.length * step;
            for (let i = 0; i < saxofon.length; i++) {
                setTimeout(() => {
                    // Saxofón
                    if (i < saxofon.length) {
                        const midiSaxo = noteToMidi[saxofon[i]];
                        if (midiSaxo !== undefined) playSoftNote(midiToFreq(midiSaxo, 1), .20);
                    }
                    if (bateria[i]) {
                        playKick(noteToMidi["G1"], .20)
                    }
                }, offset + i * step);
            }
            setTimeout(resolve, total + 50);
        });
    }

    async function tocar(repeticiones) {
        let exit = false;
        for (let x = 0; x < repeticiones; x++) {
            exit = await estribillo(bateria, saxofon, x+1, "easy");
        }
        if (exit == true) return;
        mostrarMensaje("uaah");
        await sleep(2000);
        mostrarMensaje("comoloves");
        await sleep(2000);
        for (let x = 0; x < repeticiones; x++) {
            exit = await estribillo(bateria, saxofon, x+1, "medium");
        }
        if (exit == true) return;
        await sleep(1000);
        mostrarMensaje("animo");
        await sleep(1000);
        mostrarMensaje("yaquedamenos");
        await sleep(1000);
        for (let x = 0; x < repeticiones; x++) {
            exit = await estribillo(bateria, saxofon, x+1, "hard");
        }
        if (exit == true) return;
        mostrarMensaje("yeah");
        await sleep(2000);
        mostrarMensaje("porfin");
        await sleep(1000);
        mostrarMensaje("repetir");
        await final();
    }
    tocar(6);
}

function tambores() {
    return new Promise(resolve => {
        const secuencia = [1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0]
        secuencia.forEach((num, i) => {
            setTimeout(() => {
                if (num === 1) {
                    playNote(noteToMidi["D1"], 0.2);
                }
                if (i === secuencia.length - 1) {
                    resolve();
                }
            }, i * 180);
        });
    });
}
async function inicio() {
    const TMessage = 1000;
    document.getElementById("empezar").classList.add("d-none");
    const explicacion = {Español:"Di la palabra resaltada", English:"Say the highlighted word", Català:"Digues la paraula ressaltada", 日本語:"強調された単語を言おう" };
    const preparado = {Español:"¿Estás preparado?", English:"Are you ready?", Català:"Estàs preparat?", 日本語:"準備はできていますか？" };
    const iframe = document.getElementById("iframe");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    setTimeout(() => {
        iframeDocument.getElementById("inicio").textContent = explicacion[localStorage.getItem("lang")];
    }, TMessage)
    setTimeout(() => {
        iframeDocument.getElementById("inicio").textContent = preparado[localStorage.getItem("lang")];
    }, TMessage * 2)
    await tambores();
}

async function final() {
    document.getElementById("empezar").classList.remove("d-none");
}

async function sucesos() {
    await inicio();
    tocarMelodia();
    // función finalizar ¡YEAH!
}