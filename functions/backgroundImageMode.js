function setupBackgroundImageMode() {
    const bgImageEnabled = localStorage.getItem('bgImageMode') === 'true';
    const mainContent = document.querySelector('#main-panel') || document.body; // Ajuste o seletor para o elemento principal do Khan
    const bgImageUrl = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTQ0eDZibnhnM2g3ZjB6OHozem9rZTFjcHQ1eDFyMnV0cm5pbjEzeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JvDzcuVBUglS9EISo7/giphy.gif'; // Substitua pelo caminho da sua imagem
    function toggleBackgroundImageMode(enable) {
        if (enable) {
            mainContent.style.background = `
                url(${bgImageUrl}) no-repeat center center fixed,
                linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))
            `;
            mainContent.style.backgroundSize = 'cover';
            mainContent.style.backgroundBlendMode = 'overlay';
            localStorage.setItem('bgImageMode', 'true');
        } else {
            mainContent.style.background = '';
            localStorage.setItem('bgImageMode', 'false');
        }
    }
    toggleBackgroundImageMode(bgImageEnabled);
    return { toggleBackgroundImageMode }; // Exporta a função para uso no menu
}
