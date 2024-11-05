const sections = document.querySelectorAll('.section');
const container = document.getElementById('container');

let currentSection = 0; // Mantém a seção atual
let isScrolling = false; // Controla o estado de rolagem
let lastScrollTime = 0; // Registra o último tempo de rolagem
const scrollDelay = 500; // Intervalo de 0.5 segundos para bloquear a rolagem

// Função para rolar até a seção especificada
function scrollToSection(sectionIndex) {
  if (sectionIndex < 0 || sectionIndex >= sections.length) return;
  currentSection = sectionIndex;

  // Atualiza a rolagem suave
  container.scrollTo({
    top: sections[sectionIndex].offsetTop,
    behavior: 'smooth'
  });
}

// Controla o evento de rolagem do mouse
function handleWheelEvent(event) {
  const now = Date.now();

  // Bloqueia rolagem se a última rolagem foi menos de 0.5 segundo atrás
  if (now - lastScrollTime < scrollDelay || isScrolling) {
    return;
  }

  // Marca o tempo da rolagem atual
  lastScrollTime = now;

  // Impede rolagem enquanto a transição está acontecendo
  isScrolling = true;

  // Direção da rolagem (para baixo ou para cima)
  if (event.deltaY > 0) {
    // Rolagem para baixo
    if (currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1);
    }
  } else {
    // Rolagem para cima
    if (currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  }

  // Após 0.5 segundo, libera a rolagem
  setTimeout(() => {
    isScrolling = false;
  }, scrollDelay);
}

// Adiciona o event listener para rolagem com o mouse
window.addEventListener('wheel', handleWheelEvent, { passive: true });

// Controle de navegação com as teclas de seta
function handleKeyDownEvent(e) {
  const now = Date.now();

  // Bloqueia se a última rolagem foi menos de 0.5 segundo atrás
  if (now - lastScrollTime < scrollDelay || isScrolling) {
    return;
  }

  // Marca o tempo da rolagem atual
  lastScrollTime = now;

  // Impede rolagem enquanto a transição está acontecendo
  isScrolling = true;

  // Verifica a tecla pressionada
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    // Rolagem para baixo
    if (currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1);
    }
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    // Rolagem para cima
    if (currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  }

  // Após 0.5 segundo, libera a rolagem
  setTimeout(() => {
    isScrolling = false;
  }, scrollDelay);
}

// Adiciona o event listener para as teclas de navegação
document.addEventListener('keydown', handleKeyDownEvent);
