/**
 * NavMenu Component Helper (LegionUI)
 * Gère l'accessibilité au clavier (Arrow navigation) et la détection du lien actif.
 */
export function initNavMenu() {
  const menus = document.querySelectorAll('.navMenu');

  menus.forEach((menu) => {
    const links = Array.from(menu.querySelectorAll('.navMenu__link, .navMenu__btn'));
    if (!links.length) return;

    // 1. Navigation au clavier (Flèches Gauche / Droite / Début / Fin)
    links.forEach((link, idx) => {
      link.addEventListener('keydown', (e) => {
        let targetIndex = null;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          targetIndex = (idx + 1) % links.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          targetIndex = (idx - 1 + links.length) % links.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = links.length - 1;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          links[targetIndex].focus();
        }
      });
    });

    // 2. Détection du lien actif basée sur l'URL / hash
    const updateActiveLink = () => {
      const currentHash = window.location.hash;
      const currentPath = window.location.pathname;

      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;

        const isHashMatch = currentHash && href.endsWith(currentHash);
        const isPathMatch = !currentHash && href === currentPath;

        if (isHashMatch || isPathMatch) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    window.addEventListener('hashchange', updateActiveLink);
    updateActiveLink();
  });
}

// Initialisation automatique au chargement
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavMenu);
  } else {
    initNavMenu();
  }
}
