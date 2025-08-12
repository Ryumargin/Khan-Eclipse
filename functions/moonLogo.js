// MultipleFiles/functions/moonLogo.js
plppdo.on('domChanged', () => {
    const khanLogoSvg = document.querySelector('svg._1rt6g9t'); // Seleciona o SVG principal do logo
    
    if (khanLogoSvg && features.moonLogo) { // Verifica se o SVG existe e se a feature está ativada
        // Remove os elementos existentes do logo do Khan Academy
        while (khanLogoSvg.firstChild) {
            khanLogoSvg.removeChild(khanLogoSvg.firstChild);
        }

        // Cria o elemento <i> para o ícone da lua
        const moonIcon = document.createElement('i');
        moonIcon.className = 'fas fa-moon moon-light';
        moonIcon.style.fontSize = '27px'; // Ajuste o tamanho para caber no espaço do logo
        moonIcon.style.color = '#a073ff';
        moonIcon.style.filter = 'drop-shadow(0 0 8px rgba(160, 115, 255, 0.8)) drop-shadow(0 0 15px rgba(160, 115, 255, 0.6))';
        moonIcon.style.position = 'absolute'; // Posicionamento absoluto para centralizar
        moonIcon.style.top = '50%';
        moonIcon.style.left = '50%';
        moonIcon.style.transform = 'translate(-50%, -50%)'; // Centraliza o ícone

        // Adiciona o ícone da lua ao SVG
        khanLogoSvg.appendChild(moonIcon);

        // Adiciona o CSS necessário para o ícone da lua
        if (!document.getElementById('moonLogoStyle')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'moonLogoStyle';
            styleElement.textContent = `
                .moon-light {
                    font-size: 80px; /* Pode ser ajustado se necessário */
                    color: #a073ff; /* roxo claro */
                    filter: drop-shadow(0 0 8px rgba(160, 115, 255, 0.8))
                            drop-shadow(0 0 15px rgba(160, 115, 255, 0.6));
                }
            `;
            document.head.appendChild(styleElement);
        }

        // Garante que o Font Awesome esteja carregado
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fontAwesomeLink = document.createElement('link');
            fontAwesomeLink.rel = 'stylesheet';
            fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
            document.head.appendChild(fontAwesomeLink);
        }
    }
});
