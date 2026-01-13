const translations = {
    Español: {
        "MATSURI BARCELONA 2026":"MATSURI BARCELONA 2026",
        "16 and 17 of may - At moll de la fusta":"16 y 17 de mayo - En el moll de la fusta",
        "Welcome": "Bienvenido",
        "Buy your tickets now": "Compra tus entradas ahora",
        "TICKETS": "ENTRADAS",
        "Activities": "Actividades",
        "Program": "Programa",
        "Performers": "Artistas",
        "Kids": "Niños",
        "Booths": "Estands",
        "Foods & Drinks": "Comidas y bebidas",
        "About":"Acerca de",
        "Support us":"Apóyanos",
        "Contact":"Contacto",
        "Sponsor us":"Patrocinador",
        "Crowdfund us":"Micromecenazgo",
        "Volunteer":"Voluntariado",
        "What is the Matsuri BCN?":"",
        "Matsuri BCN is one of Spain's largest Japanese culture festivals held in Barcelona, featuring live performances, street food, and activities to enjoy with family and friends.":"Matsuri BCN es uno de los festivales de cultura japonesa más grandes de España que se celebra en Barcelona y que cuenta con actuaciones en directo, comida callejera y actividades para disfrutar con familiares y amigos.",
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
        "Food stals": "Puestos de comida",
        "Crowdfund":"Micromecenazgo",
        "Lang":"Idioma"
    },
    Català: {
        "MATSURI BARCELONA 2026":"MATSURI BARCELONA 2026",
        "16 and 17 of may - At moll de la fusta":"16 i 17 de maig - En el moll de la fusta",
        "Welcome": "Benvingut",
        "Buy your tickets now": "Compra les teves entrades ara",
        "TICKETS": "ENTRADES",
        "Activities": "Activitats",
        "Program": "Programa",
        "Performers": "Artistes",
        "Kids": "Nens",
        "Booths": "Estands",
        "Foods & Drinks": "Menjars i begudes",
        "About":"Referent a",
        "Support us":"Dóna'ns suport",
        "Contact":"Contacte",
        "Sponsor us":"Patrocinador",
        "Crowdfund us":"Micromecenatge",
        "Volunteer":"Voluntariat",
        "What is the Matsuri BCN?":"On és el Matsuri?",
        "Matsuri BCN is one of Spain's largest Japanese culture festivals held in Barcelona, featuring live performances, street food, and activities to enjoy with family and friends.":"Matsuri BCN és un dels festivals de cultura japonesa més grans d'Espanya que se celebra a Barcelona, ​​amb actuacions en directe, menjar de carrer i activitats per gaudir amb la família i els amics.",
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
        "Food stals": "Parades de menjar",
        "Crowdfund":"Micromecenatge",
        "Lang":"Llengua"
    },
    日本語: {
        "MATSURI BARCELONA 2026":"バルセロナ祭り2026",
        "16 and 17 of may - At moll de la fusta":"5月16日と17日 - モール・デ・ラ・フスタにて",
        "Welcome": "ようこそ",
        "Buy your tickets now": "チケット購入",
        "TICKETS": "チケット",
        "Activities": "アクティビティ",
        "Program": "プログラム",
        "Performers": "出演者",
        "Kids": "子供たち",
        "Booths":"ブース",
        "Foods & Drinks": "飲食",
        "About":"について",
        "Support us":"私たちをサポートしてください",
        "Contact":"コンタクト",
        "Sponsor us":"スポンサーになる",
        "Crowdfund us":"クラウドファンディングで支援を",
        "Volunteer":"ボランティア",
        "What is the Matsuri BCN?":"Matsuri BCNとは何ですか？",
        "Matsuri BCN is one of Spain's largest Japanese culture festivals held in Barcelona, featuring live performances, street food, and activities to enjoy with family and friends.":"Matsuri BCNは、バルセロナで開催されるスペイン最大級の日本文化の祭典です。ライブパフォーマンスや屋台グルメ、様々なアクティビティを、ご家族やご友人と一緒にお楽しみいただけます。",
        "Information":"情報",
        "PROGRAM":"プログラム",
        "PERFORMERS":"出演者",
        "KIDS":"キッズ",
        "BOOTHS":"ブース",
        "FOOD":"食べ物",
        "Where is the Matsuri?":"祭りはどこで開催されますか？",
        "Moll de la fusta":"Moll de la fusta",
        "Ronda Litoral, 1740, Ciutat Vella, 08039 Barcelona":"ロンダ リトラル、1740、シウタット ベーリャ、08039 バルセロナ",
        "Want to help the Matsuri?":"祭りを手伝ってみませんか？",
        "Become a volunteer":"ボランティアになる",
        "FAQ's":"よくある質問",
        "Contact":"コンタクト",
        "Cookie policy":"クッキーポリシー",
        "Privacy policy":"プライバシーポリシー",
        "Food stals": "屋台",
        "Crowdfund":"クラウドファンディング",
        "Lang":"言語"
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
