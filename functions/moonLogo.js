plppdo.on('domChanged', () => {
    const khanLogoSvg = document.querySelector('svg._1rt6g9t'); // Seleciona o SVG principal do logo

    if (khanLogoSvg && features.moonLogo) { // Verifica se o SVG existe e se a feature está ativada
        // Remove os elementos existentes do logo do Khan Academy (incluindo paths e circles)
        while (khanLogoSvg.firstChild) {
            khanLogoSvg.removeChild(khanLogoSvg.firstChild);
        }

        // Cria o elemento <img> para a imagem da lua
        const moonImage = document.createElement('img');
        moonImage.src = 'lua.png'; // Caminho para a imagem da lua
        moonImage.alt = 'Lua'; // Texto alternativo para a imagem
        moonImage.style.width = '80px'; // Ajuste o tamanho para caber no espaço do logo
        moonImage.style.height = '80px'; // Ajuste o tamanho para caber no espaço do logo
        moonImage.style.position = 'absolute'; // Posicionamento absoluto para centralizar
        moonImage.style.top = '50%';
        moonImage.style.left = '50%';
        moonImage.style.transform = 'translate(-50%, -50%)'; // Centraliza a imagem

        // Adiciona a imagem da lua ao SVG
        khanLogoSvg.appendChild(moonImage);
    }
});
