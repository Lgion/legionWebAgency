/**
 * Accordion — Gestionnaire d'interactions DOM (LegionUI Standard)
 * 
 * Note d'architecture :
 * L'accordéon utilise les balises HTML5 natives <details> et <summary>.
 * Le basculement ouvert/fermé de base est donc géré NATIVEMENT par le moteur du navigateur
 * sans aucun JavaScript obligatoire (garantie de légèreté et 0 latence mobile).
 * 
 * Ce fichier apporte une amélioration progressive (Progressive Enhancement) :
 * 1. Mode exclusif : fermeture automatique des autres éléments du même accordéon si souhaité.
 * 2. Émission d'événements personnalisés (ex: 'accordion:toggle') pour l'analytics et le tracking.
 * 3. Navigation fluide au clavier (flèches haut/bas, début/fin).
 */
export function initAccordions(container = document) {
  const accordions = container.querySelectorAll('.b5_accordion');

  accordions.forEach((accordion) => {
    const detailsList = accordion.querySelectorAll('details.b5_accordion__details');
    const isExclusive = accordion.hasAttribute('data-exclusive');

    detailsList.forEach((details, index) => {
      // 1. Événement natif toggle enrichi
      details.addEventListener('toggle', () => {
        const isOpen = details.open;

        // Mode exclusif : fermer les autres panneaux
        if (isOpen && isExclusive) {
          detailsList.forEach((other) => {
            if (other !== details && other.open) {
              other.open = false;
            }
          });
        }

        // Notification d'événement personnalisé
        accordion.dispatchEvent(
          new CustomEvent('accordion:toggle', {
            bubbles: true,
            detail: {
              index,
              isOpen,
              heading: details.querySelector('.b5_accordion__heading')?.textContent?.trim() || ''
            }
          })
        );
      });

      // 2. Navigation clavier accessible sur les summaries
      const summary = details.querySelector('summary.b5_accordion__header');
      if (summary) {
        summary.addEventListener('keydown', (e) => {
          const summaries = Array.from(accordion.querySelectorAll('summary.b5_accordion__header'));
          const currentIndex = summaries.indexOf(summary);

          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = summaries[(currentIndex + 1) % summaries.length];
            next?.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = summaries[(currentIndex - 1 + summaries.length) % summaries.length];
            prev?.focus();
          } else if (e.key === 'Home') {
            e.preventDefault();
            summaries[0]?.focus();
          } else if (e.key === 'End') {
            e.preventDefault();
            summaries[summaries.length - 1]?.focus();
          }
        });
      }
    });
  });
}

// Auto-initialisation côté client
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAccordions());
  } else {
    initAccordions();
  }
}
