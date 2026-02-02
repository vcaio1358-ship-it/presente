window.addEventListener('load', () => {

  const hero = document.querySelector('.hero');
  const overlay = document.querySelector('.overlay');

  hero.classList.add('hero-animada');
  overlay.classList.add('overlay-animada');

});

document.querySelectorAll('.retrospectiva').forEach((secao) => {

  const imagemPrincipal = secao.querySelector('.imagemPrincipal');
  const textoRetro = secao.querySelector('.texto-retro');
  const imagens = Array.from(secao.querySelectorAll('.imagemCarrossel'));

  let indexAtual = 0;
  let startX = 0;
  let isDragging = false;

  function atualizarCarousel(index) {

    imagemPrincipal.style.opacity = 0;
    imagemPrincipal.style.transform = "scale(0.95)";

    textoRetro.style.opacity = 0;
    textoRetro.style.transform = "translateY(10px)";

    setTimeout(() => {

      imagemPrincipal.src = imagens[index].src;
      textoRetro.textContent = imagens[index].dataset.texto;

      imagemPrincipal.style.opacity = 1;
      imagemPrincipal.style.transform = "scale(1)";

      textoRetro.style.opacity = 1;
      textoRetro.style.transform = "translateY(0)";

    }, 250);
  }

  imagens.forEach((img, index) => {
    img.addEventListener('click', () => {
      indexAtual = index;
      atualizarCarousel(indexAtual);
    });
  });

  imagemPrincipal.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  imagemPrincipal.addEventListener('touchend', (e) => {

    const diff = startX - e.changedTouches[0].clientX;

    if (diff > 50 && indexAtual < imagens.length - 1) indexAtual++;
    else if (diff < -50 && indexAtual > 0) indexAtual--;

    atualizarCarousel(indexAtual);
  });

  imagemPrincipal.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  imagemPrincipal.addEventListener('mouseup', (e) => {

    if (!isDragging) return;

    const diff = startX - e.clientX;

    if (diff > 50 && indexAtual < imagens.length - 1) indexAtual++;
    else if (diff < -50 && indexAtual > 0) indexAtual--;

    atualizarCarousel(indexAtual);
    isDragging = false;
  });

});

const secoes = document.querySelectorAll('.retrospectiva');

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aparecer');
    }
  });

}, { threshold: 0.2 });

secoes.forEach(secao => observer.observe(secao));

const rodape = document.querySelector('.rodape');

const observerRodape = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      rodape.classList.add('aparecer');
    }
  });
}, {
  threshold: 0.3
});

observerRodape.observe(rodape);

