const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function removeEncoding(str: string) {
    return str
        .replace(/&Agrave;/g, "À")
        .replace(/&Aacute;/g, "Á")
        .replace(/&Acirc;/g, "Â")
        .replace(/&Atilde;/g, "Ã")
        .replace(/&Auml;/g, "Ä")
        .replace(/&Aring;/g, "Å")
        .replace(/&agrave;/g, "à")
        .replace(/&acirc;/g, "â")
        .replace(/&atilde;/g, "ã")
        .replace(/&auml;/g, "ä")
        .replace(/&aring;/g, "å")
        .replace(/&AElig;/g, "Æ")
        .replace(/&aelig;/g, "æ")
        .replace(/&szlig;/g, "ß")
        .replace(/&Ccedil;/g, "Ç")
        .replace(/&ccedil;/g, "ç")
        .replace(/&Egrave;/g, "È")
        .replace(/&Eacute;/g, "É")
        .replace(/&Ecirc;/g, "Ê")
        .replace(/&Euml;/g, "Ë")
        .replace(/&egrave;/g, "è")
        .replace(/&eacute;/g, "é")
        .replace(/&ecirc;/g, "ê")
        .replace(/&euml;/g, "ë")
        .replace(/&#131;/g, "ƒ")
        .replace(/&Igrave;/g, "Ì")
        .replace(/&Iacute;/g, "Í")
        .replace(/&Icirc;/g, "Î")
        .replace(/&Iuml;/g, "Ï")
        .replace(/&igrave;/g, "ì")
        .replace(/&iacute;/g, "í")
        .replace(/&icirc;/g, "î")
        .replace(/&iuml;/g, "ï")
        .replace(/&Ntilde;/g, "Ñ")
        .replace(/&ntilde;/g, "ñ")
        .replace(/&Ograve;/g, "Ò")
        .replace(/&Oacute;/g, "Ó")
        .replace(/&Ocirc;/g, "Ô")
        .replace(/&Otilde;/g, "Õ")
        .replace(/&Ouml;/g, "Ö")
        .replace(/&ograve;/g, "ò")
        .replace(/&oacute;/g, "ó")
        .replace(/&ocirc;/g, "ô")
        .replace(/&otilde;/g, "õ")
        .replace(/&ouml;/g, "ö")
        .replace(/&Oslash;/g, "Ø")
        .replace(/&oslash;/g, "ø")
        .replace(/&#140;/g, "Œ")
        .replace(/&#156;/g, "œ")
        .replace(/&#138;/g, "Š")
        .replace(/&#154;/g, "š")
        .replace(/&Ugrave;/g, "Ù")
        .replace(/&Uacute;/g, "Ú")
        .replace(/&Ucirc;/g, "Û")
        .replace(/&Uuml;/g, "Ü")
        .replace(/&ugrave;/g, "ù")
        .replace(/&uacute;/g, "ú")
        .replace(/&ucirc;/g, "û")
        .replace(/&uuml;/g, "ü")
        .replace(/&#181;/g, "µ")
        .replace(/&#215;/g, "×")
        .replace(/&Yacute;/g, "Ý")
        .replace(/&#159;/g, "Ÿ")
        .replace(/&yacute;/g, "ý")
        .replace(/&yuml;/g, "ÿ")
        .replace(/&#176;/g, "°")
        .replace(/&#134;/g, "†")
        .replace(/&#135;/g, "‡")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#177;/g, "±")
        .replace(/&#171;/g, "«")
        .replace(/&#187;/g, "»")
        .replace(/&#191;/g, "¿")
        .replace(/&#161;/g, "¡")
        .replace(/&#183;/g, "·")
        .replace(/&#149;/g, "•")
        .replace(/&#153;/g, "™")
        .replace(/&copy;/g, "©")
        .replace(/&reg;/g, "®")
        .replace(/&#167;/g, "§")
        .replace(/&#182;/g, "¶")
        .replace(/&Alpha;/g, "Α")
        .replace(/&Beta;/g, "Β")
        .replace(/&Gamma;/g, "Γ")
        .replace(/&Delta;/g, "Δ")
        .replace(/&Epsilon;/g, "Ε")
        .replace(/&Zeta;/g, "Ζ")
        .replace(/&Eta;/g, "Η")
        .replace(/&Theta;/g, "Θ")
        .replace(/&Iota;/g, "Ι")
        .replace(/&Kappa;/g, "Κ")
        .replace(/&Lambda;/g, "Λ")
        .replace(/&Mu;/g, "Μ")
        .replace(/&Nu;/g, "Ν")
        .replace(/&Xi;/g, "Ξ")
        .replace(/&Omicron;/g, "Ο")
        .replace(/&Pi;/g, "Π")
        .replace(/&Rho;/g, "Ρ")
        .replace(/&Sigma;/g, "Σ")
        .replace(/&Tau;/g, "Τ")
        .replace(/&Upsilon;/g, "Υ")
        .replace(/&Phi;/g, "Φ")
        .replace(/&Chi;/g, "Χ")
        .replace(/&Psi;/g, "Ψ")
        .replace(/&Omega;/g, "Ω")
        .replace(/&alpha;/g, "α")
        .replace(/&beta;/g, "β")
        .replace(/&gamma;/g, "γ")
        .replace(/&delta;/g, "δ")
        .replace(/&epsilon;/g, "ε")
        .replace(/&zeta;/g, "ζ")
        .replace(/&eta;/g, "η")
        .replace(/&theta;/g, "θ")
        .replace(/&iota;/g, "ι")
        .replace(/&kappa;/g, "κ")
        .replace(/&lambda;/g, "λ")
        .replace(/&mu;/g, "μ")
        .replace(/&nu;/g, "ν")
        .replace(/&xi;/g, "ξ")
        .replace(/&omicron;/g, "ο")
        .replace(/&piρ;/g, "ρ")
        .replace(/&rho;/g, "ς")
        .replace(/&sigmaf;/g, "ς")
        .replace(/&sigma;/g, "σ")
        .replace(/&tau;/g, "τ")
        .replace(/&phi;/g, "φ")
        .replace(/&chi;/g, "χ")
        .replace(/&psi;/g, "ψ")
        .replace(/&omega;/g, "ω")
        .replace(/&bull;/g, "•")
        .replace(/&hellip;/g, "…")
        .replace(/&prime;/g, "′")
        .replace(/&Prime;/g, "″")
        .replace(/&oline;/g, "‾")
        .replace(/&frasl;/g, "⁄")
        .replace(/&weierp;/g, "℘")
        .replace(/&image;/g, "ℑ")
        .replace(/&real;/g, "ℜ")
        .replace(/&trade;/g, "™")
        .replace(/&alefsym;/g, "ℵ")
        .replace(/&larr;/g, "←")
        .replace(/&uarr;/g, "↑")
        .replace(/&rarr;/g, "→")
        .replace(/&darr;/g, "↓")
        .replace(/&barr;/g, "↔")
        .replace(/&crarr;/g, "↵")
        .replace(/&lArr;/g, "⇐")
        .replace(/&uArr;/g, "⇑")
        .replace(/&rArr;/g, "⇒")
        .replace(/&dArr;/g, "⇓")
        .replace(/&hArr;/g, "⇔")
        .replace(/&forall;/g, "∀")
        .replace(/&part;/g, "∂")
        .replace(/&exist;/g, "∃")
        .replace(/&empty;/g, "∅")
        .replace(/&nabla;/g, "∇")
        .replace(/&isin;/g, "∈")
        .replace(/&notin;/g, "∉")
        .replace(/&ni;/g, "∋")
        .replace(/&prod;/g, "∏")
        .replace(/&sum;/g, "∑")
        .replace(/&minus;/g, "−")
        .replace(/&lowast;/g, "∗")
        .replace(/&radic;/g, "√")
        .replace(/&prop;/g, "∝")
        .replace(/&infin;/g, "∞")
        .replace(/&OEig;/g, "Œ")
        .replace(/&oelig;/g, "œ")
        .replace(/&Yuml;/g, "Ÿ")
        .replace(/&spades;/g, "♠")
        .replace(/&clubs;/g, "♣")
        .replace(/&hearts;/g, "♥")
        .replace(/&diams;/g, "♦")
        .replace(/&thetasym;/g, "ϑ")
        .replace(/&upsih;/g, "ϒ")
        .replace(/&piv;/g, "ϖ")
        .replace(/&Scaron;/g, "Š")
        .replace(/&scaron;/g, "š")
        .replace(/&ang;/g, "∠")
        .replace(/&and;/g, "∧")
        .replace(/&or;/g, "∨")
        .replace(/&cap;/g, "∩")
        .replace(/&cup;/g, "∪")
        .replace(/&int;/g, "∫")
        .replace(/&there4;/g, "∴")
        .replace(/&sim;/g, "∼")
        .replace(/&cong;/g, "≅")
        .replace(/&asymp;/g, "≈")
        .replace(/&ne;/g, "≠")
        .replace(/&equiv;/g, "≡")
        .replace(/&le;/g, "≤")
        .replace(/&ge;/g, "≥")
        .replace(/&sub;/g, "⊂")
        .replace(/&sup;/g, "⊃")
        .replace(/&nsub;/g, "⊄")
        .replace(/&sube;/g, "⊆")
        .replace(/&supe;/g, "⊇")
        .replace(/&oplus;/g, "⊕")
        .replace(/&otimes;/g, "⊗")
        .replace(/&perp;/g, "⊥")
        .replace(/&sdot;/g, "⋅")
        .replace(/&lcell;/g, "⌈")
        .replace(/&rcell;/g, "⌉")
        .replace(/&lfloor;/g, "⌊")
        .replace(/&rfloor;/g, "⌋")
        .replace(/&lang;/g, "⟨")
        .replace(/&rang;/g, "⟩")
        .replace(/&loz;/g, "◊")
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"');
}
function shuffle(array: string[]) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

const randomArray = (max: number): number[] => {
    let arr = [];
    while (arr.length < 8) {
        let r = Math.floor(Math.random() * max) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
};

export { randomNumber, removeEncoding, shuffle, randomArray };
