/**
 * StatusBadge Component Helper (LegionUI)
 * Permet de mettre à jour dynamiquement le statut et le libellé via événements.
 */
export function initStatusBadge() {
  window.addEventListener('status:update', (event) => {
    const { id, status, label } = event.detail || {};
    if (!id) return;

    const badge = document.getElementById(id);
    if (!badge) return;

    if (status) {
      badge.classList.remove('--online', '--busy', '--offline');
      badge.classList.add(`--${status}`);
    }

    if (label) {
      const labelEl = badge.querySelector('.statusBadge__label');
      if (labelEl) labelEl.textContent = label;
    }
  });
}

if (typeof window !== 'undefined') {
  initStatusBadge();
}
