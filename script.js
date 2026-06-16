/*
  JCER static site interactions.
  Bez zewnętrznych bibliotek; gotowe do GitHub Pages.
*/
(function () {
  const navToggle = document.getElementById('nav-toggle');
  const navPanel = document.getElementById('nav-panel');
  const navLinks = document.querySelectorAll('.nav-panel a');
  const logoLink = document.querySelector('.jcer-logo-link');
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

  function normalizePath(path) {
    return path.replace(/\/index\.html$/, '/');
  }

  if (logoLink) {
    logoLink.addEventListener('click', function (event) {
      const currentPath = normalizePath(window.location.pathname);
      const logoPath = normalizePath(new URL(logoLink.href).pathname);
      const isCurrentPageLogoTarget = window.location.origin === new URL(logoLink.href).origin && currentPath === logoPath;

      if (isCurrentPageLogoTarget) {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    });
  }

  if (footerLogo) {
    footerLogo.addEventListener('error', function () {
      footerLogo.style.display = 'none';
    });
  }
})();
