const phrases = [ 
    "[🐷] Não há nada como um P-Chan!",
    "[🐷] KhanPchan é o melhor!",
    "[🐷] P-Chan diz olá!",
    "[🐷] Eu adoraria ter KhanPchan.",
    "[🐷] Melhore e tenha KhanPchan!",
    "[🐷] KhanPchan.Pchan vai brrrrr!",
    "[🐷] A vida é doce como P-Chan!",
    "[🐷] P-Chan sempre traz alegria!",
    "[🐷] Com KhanPchan, tudo é possível!",
    "[🐷] P-Chan é puro amor e fofura!"
];
setInterval(() => { 
    const greeting = document.querySelector('.stp-animated-banner h2');
    if (greeting && features.customBanner) {
        greeting.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    }
}, 3000);
