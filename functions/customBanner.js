const phrases = [ 
    "[⭐] Non Skeetless dude.",
    "[⭐] KhanCheetus on top.",
    "[⭐] Nix said hello!",
    "[⭐] God i wish i had KhanCheetus.",
    "[⭐] Get good get KhanCheetus!",
    "[⭐] KhanCheetus.space goes brrrrr" 
];

setInterval(() => { 
    const greeting = document.querySelector('.stp-animated-banner h2');
    if (greeting&&features.customBanner) greeting.textContent = phrases[Math.floor(Math.random() * phrases.length)];
}, 3000);

