/* =========================================================
   1. TEMA CLARO / ESCURO (salvo no localStorage)
   ========================================================= */
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'dark' || temaSalvo === 'light') {
  root.setAttribute('data-theme', temaSalvo);
}

function atualizarIconeTema() {
  const escuro = root.getAttribute('data-theme') === 'dark';
  themeToggle.textContent = escuro ? '☀️' : '🌙';
  themeToggle.setAttribute(
    'aria-label',
    escuro ? 'Ativar tema claro' : 'Ativar tema escuro'
  );
}
atualizarIconeTema();

themeToggle.addEventListener('click', () => {
  const escuro = root.getAttribute('data-theme') === 'dark';
  const novoTema = escuro ? 'light' : 'dark';
  root.setAttribute('data-theme', novoTema);
  localStorage.setItem('tema', novoTema);
  atualizarIconeTema();
});

/* =========================================================
   2. EFEITO DE DIGITAÇÃO NO HERO
   ========================================================= */
const frases = [
  'Desenvolvedor(a) Front-end',
  'Designer de Interfaces',
  'Estudante de Tecnologia'
];

const typedEl = document.getElementById('typed');
let indiceFrase = 0;
let indiceChar = 0;
let apagando = false;

function digitar() {
  const frase = frases[indiceFrase];
  typedEl.textContent = frase.slice(0, indiceChar);

  if (!apagando) {
    indiceChar++;
    if (indiceChar > frase.length) {
      apagando = true;
      setTimeout(digitar, 1600); // pausa com a frase completa
      return;
    }
  } else {
    indiceChar--;
    if (indiceChar === 0) {
      apagando = false;
      indiceFrase = (indiceFrase + 1) % frases.length;
    }
  }

  setTimeout(digitar, apagando ? 40 : 90);
}
digitar();

/* =========================================================
   3. ANIMAÇÃO DE ENTRADA AO ROLAR (IntersectionObserver)
   ========================================================= */
const elementosReveal = document.querySelectorAll('.reveal');

const observadorReveal = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observadorReveal.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);

elementosReveal.forEach((el) => observadorReveal.observe(el));

/* =========================================================
   4. BARRAS DE HABILIDADE
   ========================================================= */
const barras = document.querySelectorAll('.skill-fill');

const observadorBarras = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const barra = entrada.target;
        barra.style.width = barra.dataset.level + '%';
        observadorBarras.unobserve(barra);
      }
    });
  },
  { threshold: 0.4 }
);

barras.forEach((barra) => observadorBarras.observe(barra));

/* =========================================================
   5. MENU MOBILE
   ========================================================= */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const aberto = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', aberto);
  navToggle.setAttribute('aria-expanded', String(aberto));
});

// Fecha o menu ao clicar em um link
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* =========================================================
   6. HEADER COM SOMBRA + BOTÃO VOLTAR AO TOPO
   ========================================================= */
const header = document.querySelector('.header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener(
  'scroll',
  () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);
    backToTop.classList.toggle('visible', y > 400);
  },
  { passive: true }
);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================================================
   7. LINK ATIVO NO MENU CONFORME A SEÇÃO VISÍVEL (scroll spy)
   ========================================================= */
const secoes = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observadorSpy = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entrada.target.id
          );
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

secoes.forEach((secao) => observadorSpy.observe(secao));

/* =========================================================
   8. ANO ATUAL NO RODAPÉ
   ========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();