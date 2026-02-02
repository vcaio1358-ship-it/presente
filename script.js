document.querySelectorAll('.retrospectiva').forEach((secao) => {

  const imagemPrincipal = secao.querySelector('.imagemPrincipal');
  const textoRetro = secao.querySelector('.texto-retro');
  const imagens = secao.querySelectorAll('.imagemCarrossel');

  imagens.forEach((imagem) => {
    imagem.addEventListener('click', () => {
      imagemPrincipal.src = imagem.src;
      textoRetro.textContent = imagem.dataset.texto;
    });
  });

});
