/**
 * ActionGroup Component Helper (LegionUI)
 * Gère la mise à jour dynamique des badges (panier, notifications) et les événements d'action.
 */
export function initActionGroup() {
  const updateBadges = () => {
    const badges = document.querySelectorAll('.actionGroup__badge[data-type="cart"]');
    if (!badges.length) return;

    try {
      // Écoute de l'événement global de stockage du boilerplate
      window.addEventListener('app:storage:change', (e) => {
        const count = e.detail?.cart?.length || 0;
        badges.forEach((b) => {
          b.textContent = String(count);
          b.style.display = count > 0 ? 'flex' : 'none';
        });
      });
    } catch (_) {
      // Ignorer silencieusement si storage non disponible
    }
  };

  updateBadges();
}

if (typeof window !== 'undefined') {
  initActionGroup();
}
