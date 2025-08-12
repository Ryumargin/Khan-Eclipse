// MultipleFiles/functions/moonLogo.js
plppdo.on('domChanged', () => {
    const headerLogoLink = document.querySelector('[data-testid="header-logo"]');
    if (headerLogoLink && features.moonLogo) {
        let khanLogoSvg = headerLogoLink.querySelector('svg._1rt6g9t');

        // Se o SVG original não existe mais (talvez removido por outro script), crie um placeholder
        if (!khanLogoSvg) {
            khanLogoSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            khanLogoSvg.classList.add('_1rt6g9t'); // Adiciona a classe original para compatibilidade
            khanLogoSvg.setAttribute('aria-hidden', 'true');
            khanLogoSvg.setAttribute('width', '28px'); // Tamanho para a lua
            khanLogoSvg.setAttribute('height', '28px'); // Tamanho para a lua
            khanLogoSvg.setAttribute('viewBox', '0 0 28 28'); // Ajusta o viewBox para o tamanho da lua
            headerLogoLink.prepend(khanLogoSvg); // Adiciona o SVG placeholder no início do link
        }

        // Remove os elementos existentes dentro do SVG (se houver)
        while (khanLogoSvg.firstChild) {
            khanLogoSvg.removeChild(khanLogoSvg.firstChild);
        }

        // Cria o elemento <i> para o ícone da lua
        const moonIcon = document.createElement('i');
        moonIcon.className = 'fas fa-moon moon-light';
        moon
