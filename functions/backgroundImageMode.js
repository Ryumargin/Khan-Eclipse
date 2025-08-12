function setupBackgroundImageMode() {
    const bgImageEnabled = localStorage.getItem('bgImageMode') === 'true';
    const mainContent = document.querySelector('#main-panel') || document.body; // Ajuste o seletor para o elemento principal do Khan
    const bgImageUrl = 'https://raw.githubusercontent.com/seu-usuario/seu-repo/main/path/image.png'; // Substitua pelo caminho da sua imagem
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
