const phrases = [ 
    "[🌙] There's nothing like a Khan ⌇ Eclipse!",
    "[🌌] Khan ⌇ Eclipse is the best!",
    "[🌠] Lunar Eclipse says hello!",
    "[🌜] I would love to have Khan ⌇ Eclipse.",
    "[⭐] Upgrade and get Lunar Eclipse!",
    "[🌃] Khan ⌇ Eclipse goes brrrrr!",
    "[🌟] Life is sweet like a Lunar Eclipse!",
    "[🌛] Khan ⌇ Eclipse always brings joy!",
    "[🌔] With Lunar Eclipse, anything is possible!",
    "[🌖] Khan ⌇ Eclipse is pure love and cuteness!",
    "[🌑] In the silence of the night, Khan ⌇ Eclipse shines.",
    "[🌕] Lunar Eclipse lights up even the darkness.",
    "[🌌] Under the stars, anything is possible with Khan ⌇ Eclipse.",
    "[✨] A touch of night magic with Lunar Eclipse.",
    "[🌠] May your dreams be guided by Khan ⌇ Eclipse.",
    "[🌙] The moonlight is more beautiful with Lunar Eclipse.",
    "[🌜] Night after night, Khan ⌇ Eclipse is there.",
    "[⭐] The stars applaud the brilliance of Lunar Eclipse.",
    "[🌔] Khan ⌇ Eclipse — where night meets light.",
    "[🌖] May every full moon bring more Khan ⌇ Eclipse."
];
setInterval(() => { 
    const greeting = document.querySelector('.stp-animated-banner h2');
    if (greeting && features.customBanner) {
        greeting.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    }
}, 3000);
