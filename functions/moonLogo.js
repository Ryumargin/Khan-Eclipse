// MultipleFiles/functions/moonLogo.js
plppdo.on('domChanged', () => {
    const headerLogoLink = document.querySelector('[data-testid="header-logo"]');
    if (headerLogoLink && features.moonLogo) {
        // Verifica se o ícone da lua já foi adicionado
        if (!headerLogoLink.querySelector('.moon-light')) {
            // Cria o elemento <i> para o ícone da lua
            const moonIcon = document.createElement('i');
            moonIcon.className = 'fas fa-moon moon-light';
            moonIcon.style.fontSize = '28px'; // Ajuste o tamanho para caber no espaço do logo
            moonIcon.style.color = '#a073ff'; // Cor da lua
            moonIcon.style.filter = 'drop-shadow(0 0 8px rgba(160, 115, 255, 0.8)) drop-shadow(0 0 15px rgba(160, 115, 255, 0.6))';
            moonIcon.style.marginRight = '5px'; // Espaçamento entre a lua e o texto

            // Adiciona o ícone da lua antes do texto
            headerLogoLink.prepend(moonIcon); // Adiciona a lua antes do texto
        }
    }
});
