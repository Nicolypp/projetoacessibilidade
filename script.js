document.addEventListener('DOMContentLoaded', function() {
    // Elementos que serão afetados
    const htmlElement = document.documentElement;
    const decreaseBtn = document.getElementById('decrease-size');
    const resetBtn = document.getElementById('reset-size');
    const increaseBtn = document.getElementById('increase-size');
    const contrastBtn = document.getElementById('toggle-contrast');
    
    // Tamanhos base
    const baseFontSize = 16;
    const baseImageScale = 1;
    
    // Valores de incremento/decremento
    const fontSizeStep = 2;
    const imageScaleStep = 0.1;
    
    // Estado atual
    let currentFontSize = baseFontSize;
    let currentImageScale = baseImageScale;
    let isHighContrast = false;
    
    // Função para atualizar os tamanhos
    function updateSizes() {
        document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        document.documentElement.style.setProperty('--base-image-scale', currentImageScale);
    }
    
    // Função para alternar o contraste
    function toggleContrast() {
        isHighContrast = !isHighContrast;
        if (isHighContrast) {
            htmlElement.classList.add('high-contrast');
            contrastBtn.setAttribute('aria-pressed', 'true');
        } else {
            htmlElement.classList.remove('high-contrast');
            contrastBtn.setAttribute('aria-pressed', 'false');
        }
    }
    
    // Event listeners para os botões
    decreaseBtn.addEventListener('click', function() {
        if (currentFontSize > 12) {
            currentFontSize -= fontSizeStep;
        }
        if (currentImageScale > 0.7) {
            currentImageScale -= imageScaleStep;
        }
        updateSizes();
    });
    
    resetBtn.addEventListener('click', function() {
        currentFontSize = baseFontSize;
        currentImageScale = baseImageScale;
        updateSizes();
    });
    
    increaseBtn.addEventListener('click', function() {
        if (currentFontSize < 24) {
            currentFontSize += fontSizeStep;
        }
        if (currentImageScale < 1.5) {
            currentImageScale += imageScaleStep;
        }
        updateSizes();
    });
    
    contrastBtn.addEventListener('click', toggleContrast);
    
    // Inicializa com os valores padrão
    updateSizes();
    contrastBtn.setAttribute('aria-pressed', 'false');
    
    // Adiciona eventos para melhorar a acessibilidade do teclado
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});