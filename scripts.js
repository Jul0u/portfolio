
// === MODE CLAIR/SOMBRE AVEC LOCALSTORAGE ===
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const iconMoon = document.getElementById('icon-moon');
  const iconSun = document.getElementById('icon-sun');

  // Appliquer le mode stocké
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark-mode');
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
  }

  darkModeToggle.addEventListener('click', () => {
    const darkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    iconSun.classList.toggle('hidden');
    iconMoon.classList.toggle('hidden');
  });

  // === MENU MOBILE TOGGLE AVEC ANIMATION ===
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.add('transition-opacity', 'duration-300');
  });

  // === BOUTON SCROLL-TO-TOP ===
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '⬆';
  scrollTopBtn.className = 'fixed bottom-4 right-4 p-2 rounded-full glass-btn z-50 hidden';
  scrollTopBtn.setAttribute('aria-label', 'Retour en haut');
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) scrollTopBtn.classList.remove('hidden');
    else scrollTopBtn.classList.add('hidden');
  });

  // === CHARGEMENT DYNAMIQUE DES FICHES SAE/PIP EN YAML ===
  fetch('Exemple%20SAE%20en%20YAML.yaml')
    .then(response => response.text())
    .then(text => jsyaml.load(text))
    .then(data => {
      const container = document.querySelector('#sae .grid');
      const fiche = data.sae;
      const card = document.createElement('div');
      card.className = 'sae-card opacity-0 transition-opacity duration-700';
      card.innerHTML = `
        <h4 class="text-xl font-bold mb-2">${fiche.affichage_rapide.code}</h4>
        <p>${fiche.affichage_rapide.resume}</p>
        <button class="mt-2 glass-btn toggle-details">Voir plus</button>
        <div class="project-details hidden mt-2 border-t pt-2">
          <p><strong>Intitulé :</strong> ${fiche.affichage_developpe.intitule}</p>
          <p><strong>Étudiant :</strong> ${fiche.affichage_developpe.etudiant}</p>
          <p><strong>Période :</strong> ${fiche.affichage_developpe.periode}</p>
          <p><strong>Livrables :</strong><ul class="list-disc list-inside">${
            fiche.affichage_developpe.livrables.map(l => `<li>${l}</li>`).join('')
          }</ul></p>
          <p><strong>Objectif :</strong> ${fiche.affichage_developpe.objectif.competence_ciblee}</p>
          <p><strong>Compétences :</strong><ul class="list-disc list-inside">${
            Object.values(fiche.affichage_developpe.competences_mobilisees)
              .flatMap(ue => ue.map(c => `<li>${c.ressource} (Niveau ${c.niveau_maitrise}) : ${c.justification}</li>`))
              .join('')
          }</ul></p>
          <p><strong>Bilan :</strong> ${fiche.affichage_developpe.bilan}</p>
        </div>`;
      container.appendChild(card);
      setTimeout(() => card.classList.remove('opacity-0'), 50);
    });

  // === INTERACTION TOGGLE "VOIR PLUS" ===
  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('toggle-details')) {
      const details = e.target.nextElementSibling;
      details.classList.toggle('hidden');
      e.target.textContent = details.classList.contains('hidden') ? 'Voir plus' : 'Voir moins';
    }
  });

  // === INTÉGRATION FUTURE (FORMATIONS & EXPÉRIENCES) ===
  // Exemple : fetch('formations_jules.yaml') => injecter dans #parcours
});
