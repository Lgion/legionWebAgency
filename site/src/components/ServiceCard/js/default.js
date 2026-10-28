/**
 * ServiceCard — Gestionnaire d'interactions DOM (LegionUI Standard)
 * Gère l'interception du pattern lien-modale et l'ajout interactif au panier.
 */
export function initServiceCards(container = document) {
  const cards = container.querySelectorAll('.serviceCard');

  cards.forEach((card) => {
    // 1. Bouton d'ajout rapide au panier
    const cartBtn = card.querySelector('.serviceCard__cartBtn');
    if (cartBtn && !cartBtn.dataset.bound) {
      cartBtn.dataset.bound = 'true';
      cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = cartBtn.getAttribute('data-slug');
        const name = cartBtn.getAttribute('data-name');
        const price = Number(cartBtn.getAttribute('data-price')) || 0;

        window.dispatchEvent(
          new CustomEvent('cart:add', {
            detail: { slug, name, price, quantity: 1 }
          })
        );
      });
    }

    // 2. Déclencheur modal SEO (Pattern Lien-Modale)
    const modalTrigger = card.querySelector('.serviceCard__cta.modalTrigger');
    if (modalTrigger && !modalTrigger.dataset.bound) {
      modalTrigger.dataset.bound = 'true';
      modalTrigger.addEventListener('click', (e) => {
        // En progressive enhancement, si la modale globale existe sur la page
        const modal = document.getElementById('serviceDetailModal');
        if (modal && typeof modal.showModal === 'function') {
          e.preventDefault();
          window.dispatchEvent(
            new CustomEvent('service:open-modal', {
              detail: {
                slug: modalTrigger.getAttribute('data-slug'),
                title: modalTrigger.getAttribute('data-title'),
                category: modalTrigger.getAttribute('data-category'),
                price: modalTrigger.getAttribute('data-price'),
                desc: modalTrigger.getAttribute('data-desc'),
                highlights: JSON.parse(modalTrigger.getAttribute('data-highlights') || '[]')
              }
            })
          );
        }
      });
    }
  });
}

// Auto-initialisation si exécuté dans un contexte client
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initServiceCards());
  } else {
    initServiceCards();
  }
}
