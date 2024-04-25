document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('scroll', function () {
      fadeInOnScroll('.fade-in-element');
  });
});

function fadeInOnScroll(selector) {
  var elements = document.querySelectorAll(selector);

  // Adjust this value to control when the element starts fading in
  var triggerPoint = window.innerHeight * 0.9;

  elements.forEach(function(element) {
      var position = element.getBoundingClientRect();

      if (position.top < triggerPoint && !element.classList.contains('faded-in')) {
          element.style.opacity = '1';
          element.classList.add('faded-in');
      }
  });
}

document.addEventListener("DOMContentLoaded", function() {
    const text = "Explore a excelência <br>em produtos na Cotarco";
    const typingContainer = document.querySelector(".typing-text");
  
    // Função para exibir o texto com efeito de digitação
    function typeText() {
      typingContainer.innerHTML = ""; // Limpa o conteúdo
      let index = 0;
  
      function type() {
        if (index <= text.length) {
          const currentSubstring = text.substring(0, index);
  
          // Verifica se a palavra "Cotarco" começa a partir do índice anterior ao espaço em branco mais próximo
          const lastSpaceIndex = currentSubstring.lastIndexOf(" ");
          const cotarcoIndex = currentSubstring.toLowerCase().indexOf("cotarco", lastSpaceIndex + 1);
  
          if (cotarcoIndex !== -1) {
            typingContainer.innerHTML = currentSubstring.substring(0, cotarcoIndex) +
              '<span class="highlight">' + currentSubstring.substring(cotarcoIndex, index) + '</span>';
          } else {
            typingContainer.innerHTML = currentSubstring;
          }
  
          index++;
          setTimeout(type, 15); // Ajuste o tempo para tornar a animação mais rápida
        }
      }
  
      type();
    }
  
    // Inicia a animação após um breve atraso
    setTimeout(typeText, 100); // Ajuste o tempo conforme necessário
  });
  
  
