// ===== OUTRAS FUNÇÕES =====

// Aqui você pode ter outras funções que já existem no seu arquivo

// ===== FUNÇÃO DE MODO IMAGEM DE FUNDO =====
function setupBackgroundImageMode() {
    // Verifica se já existe a configuração no localStorage
    const bgImageEnabled = localStorage.getItem('bgImageMode') === 'true';
    
    // Elemento que contém o conteúdo principal (ajuste conforme necessário)
    const mainContent = document.querySelector('.main-content') || 
                       document.body; // fallback caso não encontre
    
    // URL da sua imagem (substitua pela sua imagem PNG)
    const bgImageUrl = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTQ0eDZibnhnM2g3ZjB6OHozem9rZTFjcHQ1eDFyMnV0cm5pbjEzeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JvDzcuVBUglS9EISo7/giphy.gif'; // <-- ALTERE AQUI
    
    // Função para ativar/desativar o modo imagem de fundo
    function toggleBackgroundImageMode(enable) {
        if (enable) {
            // Aplicar estilo de imagem de fundo
            mainContent.style.background = `
                url(${bgImageUrl}) no-repeat center center fixed
            `;
            mainContent.style.backgroundSize = 'cover';
            localStorage.setItem('bgImageMode', 'true');
        } else {
            // Remover estilo (voltar ao padrão)
            mainContent.style.background = '';
            localStorage.setItem('bgImageMode', 'false');
        }
    }
    
    // Inicializar
    toggleBackgroundImageMode(bgImageEnabled);
}

// Chame a função quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', setupBackgroundImageMode);

// ===== OUTRAS FUNÇÕES =====
// Aqui você pode continuar com outras funções ou lógica do seu código

