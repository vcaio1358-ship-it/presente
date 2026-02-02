document.querySelectorAll('.retrospectiva').forEach((secao) => {

  const imagemPrincipal = secao.querySelector('.imagemPrincipal');
  const textoRetro = secao.querySelector('.texto-retro');
  const imagens = Array.from(secao.querySelectorAll('.imagemCarrossel'));

  let indexAtual = 0;
  let startX = 0;
  let isDragging = false;

  // ===== FUNÇÃO COM ANIMAÇÃO SUAVE =====
  function atualizarCarousel(index) {

    // anima saída
    imagemPrincipal.style.opacity = 0;
    imagemPrincipal.style.transform = "scale(0.95)";

    setTimeout(() => {

      imagemPrincipal.src = imagens[index].src;
      textoRetro.textContent = imagens[index].dataset.texto;

      // anima entrada
      imagemPrincipal.style.opacity = 1;
      imagemPrincipal.style.transform = "scale(1)";

    }, 200);
  }

  // ===== CLIQUE NAS MINIATURAS =====
  imagens.forEach((imagem, index) => {
    imagem.addEventListener('click', () => {
      indexAtual = index;
      atualizarCarousel(indexAtual);
    });
  });

  // ===== SWIPE MOBILE =====

  imagemPrincipal.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  imagemPrincipal.addEventListener('touchend', (e) => {

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && indexAtual < imagens.length - 1) {
      indexAtual++;
    } 
    else if (diff < -50 && indexAtual > 0) {
      indexAtual--;
    }

    atualizarCarousel(indexAtual);
  });

  // ===== DRAG DESKTOP =====

  imagemPrincipal.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  imagemPrincipal.addEventListener('mouseup', (e) => {

    if (!isDragging) return;

    const diff = startX - e.clientX;

    if (diff > 50 && indexAtual < imagens.length - 1) {
      indexAtual++;
    } 
    else if (diff < -50 && indexAtual > 0) {
      indexAtual--;
    }

    atualizarCarousel(indexAtual);
    isDragging = false;
  });

});


// ===== ANIMAÇÃO AO ROLAR A PÁGINA =====

const secoes = document.querySelectorAll('.retrospectiva');

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aparecer');
    }
  });

}, {
  threshold: 0.2
});

secoes.forEach(secao => {
  observer.observe(secao);
});
