const phrases = [
    "⚡️ Get good, get [KhanCheetus](https://github.com/Ryumargin/KhanCheetus/)!",
    "⭐️ By [Ryumargin/KhanCheetus](https://github.com/Ryumargin/KhanCheetus/).",
    "🌟 Star the project on [GitHub](https://github.com/Ryumargin/KhanCheetus/)!",
    "💫 Ryumargin fez a boa",
    "💥 KhanCheetus tá forte",
    "😎 Sua mãe gosta de mim?",
    "🤨📸 Tá filmando?",
    "🚀 Acelera, Cheetos!",
    "💻 Código? Só se for Cheetado",
    "🧀 Cheetos > Suas respostas",
    "🤖 Bot mode: Cheetus",
    "📚 Aprendizado turbo ativado",
    "🔥 100% Cheetus, 0% preguiça",
    "🎮 GG EZ - KhanCheetus wins",
    "💯 Nota máxima garantida",
    "🤯 Sua mente vai explodir",
    "👑 Rei da Khan Academy",
    "🦾 Braço forte, mente Cheeta",
    "📉 Suas notas antes: 📈 Suas notas depois",
    "😏 Tá achando que é o Ryumargin?",
    "🕶️ Óculos escuros obrigatório",
    "💨 Velocidade Cheetus: ON",
    "🧠 Big brain time",
    "🤡 Palhaço? Só se for você sem Cheetus",
    "🤑 Gratuito e melhor que pago",
    "👀 Olha só quem tá dominando",
    "🙈🙉🙊 Vê não, fala não, ouve não - só Cheeta",
    "🍟 Batata? Nunca vi, só Cheetos",
    "🎲 RNG? Aqui é CGN (Cheetus Guaranteed Numbers)",
    "🏆 Campeão oculto da Khan",
    "💪 Flexível como código do Ryu",
    "🤙 Firma? Só com Cheetus",
    "✌️ Paz, amor e Cheetos",
    "🦸 Herói não usa capa, usa Cheetus",
    "🧨 Toma essa de resposta!",
    "🎯 Precisão Cheetada",
    "🍕 Pizza? Só se for de Cheetos",
    "🚫 Sem Cheetus, sem like",
    "✅ Resposta correta: C) Cheetus",
    "❓ Pergunta? Já respondeu",
    "⁉️ Tá em dúvida? Cheeta logo",
    "🛠️ Ferramenta dos deuses",
    "⚔️ Desafio aceito - Cheetus win",
    "🏁 Corrida? Já ganhou",
    "📛 Nome: Cheetus | Hobby: Dominar",
    "🎖️ Medalha de ouro em respostas",
    "🧪 Fórmula secreta: 99% Cheetus",
    "🔫 Bang! Resposta Cheetada",
    "🦁 Cheetah mode: activated",
    "🍜 Lámen? Só se for de Cheetos",
    "🎮 Speedrun de respostas",
    "🏅 Ouro nas Olimpíadas da Khan",
    "🛌 Dorme? Nem eu, nem o Cheetus",
    "🍿 Pipoca? Melhor comer Cheetos"
];

const originalFetch = window.fetch;

window.fetch = async function (input, init) {
    let body;
    if (input instanceof Request) body = await input.clone().text();
    else if (init && init.body) body = init.body;

    const originalResponse = await originalFetch.apply(this, arguments);
    const clonedResponse = originalResponse.clone();

    try {
        const responseBody = await clonedResponse.text();
        let responseObj = JSON.parse(responseBody);
        if (features.questionSpoof && responseObj?.data?.assessmentItem?.item?.itemData) {
            let itemData = JSON.parse(responseObj.data.assessmentItem.item.itemData);
            if(itemData.question.content[0] === itemData.question.content[0].toUpperCase()){
                itemData.answerArea = { "calculator": false, "chi2Table": false, "periodicTable": false, "tTable": false, "zTable": false }
                itemData.question.content = phrases[Math.floor(Math.random() * phrases.length)] + `[[☃ radio 1]]`;
                itemData.question.widgets = { "radio 1": { type: "radio",  options: { choices: [ { content: "Resposta correta.", correct: true }, { content: "Resposta incorreta.", correct: false } ] } } };
                responseObj.data.assessmentItem.item.itemData = JSON.stringify(itemData);
                sendToast("🔓 Questão exploitada.", 1000);
                return new Response(JSON.stringify(responseObj), { status: originalResponse.status, statusText: originalResponse.statusText, headers: originalResponse.headers });
            }
        }
    } catch (e) { debug(`🚨 Error @ questionSpoof.js\n${e}`); }
    return originalResponse;
};
