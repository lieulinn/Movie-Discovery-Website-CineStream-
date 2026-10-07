// LOCAL MOVIE DATABASE
const moviesData = [
  {
    id: 1,
    title: "Cyberpunk: Edgerunners",
    rating: "8.9",
    genre: "Sci-Fi",
    year: "2026",
    category: "trending",
    synopsis: "Di masa depan yang terobsesi dengan teknologi dan modifikasi tubuh, seorang anak jalanan mencoba bertahan hidup dengan menjadi mercenary outlaws.",
    cast: "KENN, Aoi Yuuki, Hiroki Touchi",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80"
  },
  {
    id: 2,
    title: "Interstellar Horizon",
    rating: "9.1",
    genre: "Sci-Fi",
    year: "2025",
    category: "top-rated",
    synopsis: "Sekelompok penjelajah menggunakan lubang cacing yang baru ditemukan untuk melintasi jarak terlarang dan menyelamatkan umat manusia.",
    cast: "Matthew C., Anne H., Jessica C.",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
  },
  {
    id: 3,
    title: "The Dark Knight Code",
    rating: "8.8",
    genre: "Action",
    year: "2024",
    category: "popular",
    synopsis: "Ancaman siber baru yang dikenal sebagai Joker melumpuhkan kota Gotham, memaksa Batman memperbarui seluruh teknologi tempurnya.",
    cast: "Christian B., Heath L., Gary O.",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&q=80"
  },
  {
    id: 4,
    title: "Neon City Chronicles",
    rating: "8.5",
    genre: "Thriller",
    year: "2026",
    category: "trending",
    synopsis: "Seorang detektif privat memburu pembunuh berantai di kota yang diterangi cahaya neon dan misteri konspirasi tingkat tinggi.",
    cast: "Ryan G., Ana d. A., Harrison F.",
    poster: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80"
  },
  {
    id: 5,
    title: "Arcane Legacy",
    rating: "9.3",
    genre: "Animation",
    year: "2025",
    category: "top-rated",
    synopsis: "Dua saudari bertempur di sisi berlawanan dari perang antara kota kaya Piltover dan kota bawah Zaun yang kumuh.",
    cast: "Hailee S., Ella P., Katie L.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80"
  },
  {
    id: 6,
    title: "Sub-Zero Operation",
    rating: "8.3",
    genre: "Action",
    year: "2026",
    category: "popular",
    synopsis: "Tim pasukan khusus terdampar di Kutub Utara untuk mengamankan artefak kuno yang dapat membekukan energi bumi.",
    cast: "Tom H., Charlize T., Idris E.",
    poster: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=1200&q=80"
  }
];

document.addEventListener('DOMContentLoaded', () => {

  const trendingGrid = document.getElementById('trendingGrid');
  const popularGrid = document.getElementById('popularGrid');
  const topRatedGrid = document.getElementById('topRatedGrid');
  const searchGrid = document.getElementById('searchGrid');
  const searchResultsSection = document.getElementById('searchResultsSection');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const genrePills = document.querySelectorAll('.pill');

  const modalOverlay = document.getElementById('modalOverlay');
  const closeModal = document.getElementById('closeModal');
  const modalBody = document.getElementById('modalBody');

  let activeGenre = 'All';

  // Render Card Element
  function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <div class="poster-wrap">
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
        <span class="card-rating-badge"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
      </div>
      <div class="card-info">
        <h4 class="card-title">${movie.title}</h4>
        <div class="card-meta">
          <span>${movie.genre}</span>
          <span>${movie.year}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openDetailModal(movie));
    return card;
  }

  // Populate Categories
  function renderAllSections() {
    trendingGrid.innerHTML = '';
    popularGrid.innerHTML = '';
    topRatedGrid.innerHTML = '';

    const filterByGenre = (movie) => activeGenre === 'All' || movie.genre === activeGenre;

    moviesData.filter(filterByGenre).forEach(movie => {
      if (movie.category === 'trending') trendingGrid.appendChild(createMovieCard(movie));
      if (movie.category === 'popular') popularGrid.appendChild(createMovieCard(movie));
      if (movie.category === 'top-rated') topRatedGrid.appendChild(createMovieCard(movie));
    });
  }

  // Search Functionality
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length > 0) {
      document.querySelectorAll('.movie-section:not(.search-results-section), .genres-section').forEach(s => s.style.display = 'none');
      searchResultsSection.style.display = 'block';
      searchGrid.innerHTML = '';

      const results = moviesData.filter(m => m.title.toLowerCase().includes(query) || m.genre.toLowerCase().includes(query));

      if (results.length === 0) {
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
        results.forEach(m => searchGrid.appendChild(createMovieCard(m)));
      }
    } else {
      document.querySelectorAll('.movie-section:not(.search-results-section), .genres-section').forEach(s => s.style.display = 'block');
      searchResultsSection.style.display = 'none';
      renderAllSections();
    }
  });

  // Genre Filter Pills
  genrePills.forEach(pill => {
    pill.addEventListener('click', () => {
      genrePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeGenre = pill.getAttribute('data-genre');
      renderAllSections();
    });
  });

  // Modal Open
  function openDetailModal(movie) {
    modalBody.innerHTML = `
      <div class="modal-header-hero" style="background-image: url('${movie.backdrop}')">
        <div class="modal-header-overlay"></div>
      </div>
      <div class="modal-body-content">
        <div class="modal-grid">
          <img src="${movie.poster}" alt="${movie.title}" class="modal-poster">
          <div class="modal-details">
            <h2>${movie.title}</h2>
            <div class="hero-meta">
              <span class="rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
              <span class="genre-tag">${movie.genre}</span>
              <span class="year">${movie.year}</span>
            </div>
            <p class="modal-synopsis">${movie.synopsis}</p>
            <p class="cast-list"><strong>Cast:</strong> ${movie.cast}</p>
          </div>
        </div>
      </div>
    `;
    modalOverlay.style.display = 'flex';
  }

  closeModal.addEventListener('click', () => modalOverlay.style.display = 'none');
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.style.display = 'none';
  });

  // Setup Featured Hero
  const featuredMovie = moviesData[0];
  document.getElementById('heroBackdrop').style.backgroundImage = `url('${featuredMovie.backdrop}')`;
  document.getElementById('heroTitle').textContent = featuredMovie.title;
  document.getElementById('heroRating').textContent = featuredMovie.rating;
  document.getElementById('heroGenre').textContent = featuredMovie.genre;
  document.getElementById('heroYear').textContent = featuredMovie.year;
  document.getElementById('heroSynopsis').textContent = featuredMovie.synopsis;

  document.getElementById('heroWatchBtn').addEventListener('click', () => openDetailModal(featuredMovie));
  document.getElementById('heroTrailerBtn').addEventListener('click', () => openDetailModal(featuredMovie));

  // Initial Load
  renderAllSections();
});