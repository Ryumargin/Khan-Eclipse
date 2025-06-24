const phrases = [
    "[⭐] Non Skeetless dude.",
    "[⭐] KhanCheetus on top.",
    "[⭐] KhanCheetus disse olá!",
    "[⭐] Deus, eu queria ter o KhanCheetus.",
    "[⭐] Melhore, adquira o KhanCheetus!",
    "[⭐] KhanCheetus.space vai brrrrr",
    "[⭐] Cheetos > Batatas",
    "[⭐] Modo turbo ativado!",
    "[⭐] 100% Cheetus, 0% medo",
    "[⭐] Mais rápido que a luz!",
    "[⭐] Dominando a Khan Academy",
    "[⭐] Cheetos nunca perdem",
    "[⭐] Só os fortes usam KhanCheetus",
    "[⭐] Você foi Cheetado!",
    "[⭐] Erros? Nunca ouvi falar",
    "[⭐] Respostas antes das perguntas",
    "[⭐] Modo Cheetus: ON",
    "[⭐] A lenda nunca morre",
    "[⭐] Cheetando desde 2023",
    "[⭐] Fórmula 1 do aprendizado",
    "[⭐] Turbo respostas ativado",
    "[⭐] Ninguém segura os Cheetos",
    "[⭐] 1000x mais eficiente",
    "[⭐] O futuro é Cheetus",
    "[⭐] Cheetos não trapaceiam, dominam"
];

setInterval(() => { 
    const greeting = document.querySelector('.stp-animated-banner h2');
    if (greeting&&features.customBanner) greeting.textContent = phrases[Math.floor(Math.random() * phrases.length)];
}, 3000);

