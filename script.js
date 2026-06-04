/*
  JCER static site interactions.
  Bez zewnętrznych bibliotek; gotowe do GitHub Pages.
*/
(function () {
  const navToggle = document.getElementById('nav-toggle');
  const navPanel = document.getElementById('nav-panel');
  const navLinks = document.querySelectorAll('.nav-panel a');
  const brandLogo = document.querySelector('.brand-logo');
  const brandFallback = document.querySelector('.brand-fallback');
  const footerLogo = document.querySelector('.footer-brand img');

  function setMenuState(isOpen) {
    document.body.classList.toggle('is-nav-open', isOpen);
    if (navPanel) {
      navPanel.setAttribute('aria-hidden', String(!isOpen && window.innerWidth < 940));
    }
  }

  if (navToggle) {
    navToggle.addEventListener('change', function () {
      setMenuState(navToggle.checked);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navToggle) {
        navToggle.checked = false;
        setMenuState(false);
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 940 && navToggle) {
      navToggle.checked = false;
      setMenuState(false);
    }
  });

  // Logo fallback: jeśli placeholder logo nie istnieje jeszcze w /assets/, pokazujemy tekstową identyfikację JCER.
  if (brandLogo && brandFallback) {
    brandLogo.addEventListener('error', function () {
      brandLogo.style.display = 'none';
      brandFallback.style.display = 'inline-flex';
    });
  }

  if (footerLogo) {
    footerLogo.addEventListener('error', function () {
      footerLogo.style.display = 'none';
    });
  }
})();
