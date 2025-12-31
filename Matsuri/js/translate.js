const translations = {
    Español: {
        "MATSURI FESTIVAL BARCELONA 2026":"MATSURI FESTIVAL BARCELONA 2026",
        "16 and 17 of may - At moll de la fusta":"16 y 17 de mayo - En el moll de la fusta",
        "Welcome": "Bienvenido",
        "Buy your tickets now": "Compra tus entradas ahora",
        "TICKETS": "ENTRADAS",
        "Activities": "Actividades",
        "Program": "Programa",
        "Performers": "Artistas",
        "Kids": "Niños",
        "Booths": "Estands",
        "Food": "Comida",
        "About":"Acerca de",
        "Support us":"Apóyanos",
        "Contact":"Contacto",
        "Sponsor us":"Patrocinador",
        "Crowdfund us":"Micromecenazgo",
        "Volunteer":"Voluntariado",
        "What is the Matsuri BCN?":"",
        "Matsuri BCN is a Japanese cultural festival here in Barcelona where people can come and enjoy live performance, authentic food and activities just like in Japan!":"Matsuri BCN es un festival cultural japonés aquí en Barcelona donde la gente puede venir y disfrutar de actuaciones en vivo, comida auténtica y actividades como en Japón.",
        "Information":"Información",
        "PROGRAM":"PROGRAMA",
        "PERFORMERS":"INTERPRETES",
        "KIDS":"NIÑOS",
        "BOOTHS":"ESTANDS",
        "FOOD":"COMIDA",
        "Where is the Matsuri?":"¿Dónde está el Matsuri?",
        "Moll de la fusta":"Muelle de la Madera - Moll de la Fusta",
        "Ronda Litoral, 1740, Ciutat Vella, 08039 Barcelona, 08039":"Ronda Litoral, 1740, Ciutat Vella, 08039 Barcelona",
        "Want to help the Matsuri?":"¿Quieres ayudar al Matsuri?",
        "Become a volunteer":"Hazte voluntario",
        "FAQ's":"Preguntas frequentes",
        "Contact":"Contacto",
        "Cookie policy":"Política de cookies",
        "Privacy policy":"Política de privacidad",
        "Food stals": "puestos de comida"
    },
    Català: {
        "MATSURI FESTIVAL BARCELONA 2026":"MATSURI FESTIVAL BARCELONA 2026",
        "16 and 17 of may - At moll de la fusta":"16 y 17 de maig - En el moll de la fusta",
        "Welcome": "Benvingut",
        "Buy your tickets now": "Compra les teves entrades ara",
        "TICKETS": "ENTRADES",
        "Activities": "Activitats",
        "Program": "Programa",
        "Performers": "Artistas",
        "Kids": "Nens",
        "Booths": "Estands",
        "Food": "Menjar",
        "About":"Referent a",
        "Support us":"Dóna'ns suport",
        "Contact":"Contacte",
        "Sponsor us":"Patrocinador",
        "Crowdfund us":"Micromecenatge",
        "Volunteer":"Voluntariat",
        "What is the Matsuri BCN?":"On és el Matsuri?",
        "Matsuri BCN is a Japanese cultural festival here in Barcelona where people can come and enjoy live performance, authentic food and activities just like in Japan!":"Matsuri BCN és un festival cultural japonès aquí a Barcelona on la gent pot venir i gaudir d'actuacions en directe, menjar autèntic i activitats com al Japó!",
        "Information":"Informació",
        "PROGRAM":"PROGRAMA",
        "PERFORMERS":"INTERPRETS",
        "KIDS":"NENS",
        "BOOTHS":"ESTANDS",
        "FOOD":"MENJAR",
        "Where is the Matsuri?":"On és el Matsuri?",
        "Moll de la fusta":"Moll de la fusta",
        "Ronda Litoral, 1740, Ciutat Vella, 08039 Barcelona":"Ronda Litoral, 1740, Ciutat Vella, 08039 Barcelona",
        "Want to help the Matsuri?":"Vols ajudar en el Matsuri?",
        "Become a volunteer":"Fes-te voluntari",
        "FAQ's":"Preguntes freqüents",
        "Contact":"Contacte",
        "Cookie policy":"Política de cookies",
        "Privacy policy":"Política de privacitat",
        "Food stals": "Parades de menjar"
    },
    日本語: {
        "MATSURI FESTIVAL BARCELONA 2026":"バルセロナ祭り2026",
        "16 and 17 of may - At moll de la fusta":"5月16日と17日 - モール・デ・ラ・フスタにて",
        "Welcome": "ようこそ",
        "Buy your tickets now": "チケットを購入してください",
        "TICKETS": "チケット",
        "Activities": "活動",
        "Program": "プログラム",
        "Performers": "出演者",
        "Kids": "子供たち",
        "Booths":"ブース",
        "Food": "食べ物",
        "About":"について",
        "Support us":"私たちをサポートしてください",
        "Contact":"接触",
        "Sponsor us":"スポンサーになる",
        "Crowdfund us":"クラウドファンディングで支援を",
        "Volunteer":"ボランティア",
        "What is the Matsuri BCN?":"Matsuri BCNとは何ですか？",
        "Matsuri BCN is a Japanese cultural festival here in Barcelona where people can come and enjoy live performance, authentic food and activities just like in Japan!":"Matsuri BCN はバルセロナで開催される日本文化のお祭りで、日本と同じようにライブパフォーマンス、本格的な料理、アクティビティを楽しむことができます。",
        "Information":"情報",
        "PROGRAM":"プログラム",
        "PERFORMERS":"出演者",
        "KIDS":"キッズ",
        "BOOTHS":"ブース",
        "FOOD":"食べ物",
        "Where is the Matsuri?":"祭りはどこですか？",
        "Moll de la fusta":"木製の桟橋 - もゆでラフスタ - Moll de la fusta",
        "Ronda Litoral, 1740, Ciutat Vella, 08039 Barcelona":"ロンダ リトラル、1740、シウタット ベーリャ、08039 バルセロナ",
        "Want to help the Matsuri?":"祭りを手伝ってみませんか？",
        "Become a volunteer":"ボランティアになる",
        "FAQ's":"よくある質問",
        "Contact":"接触",
        "Cookie policy":"クッキーポリシー",
        "Privacy policy":"プライバシーポリシー",
        "Food stals": "屋台"
    }
};

const originalTextNodes = [];

const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  null
);

let node;
while ((node = walker.nextNode())) {
  const text = node.nodeValue.replace(/\s+/g, ' ').trim();
  if (text) {
    originalTextNodes.push({
      node,
      text
    });
  }
}

function translatePage(lang) {
  const dict = translations[lang];

  originalTextNodes.forEach(({ node, text }) => {
    if (lang === 'English') {
      node.nodeValue = text;
      return;
    }
    if (dict[text]) {
      node.nodeValue = dict[text];
    }
  });
}
