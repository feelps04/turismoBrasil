<template>
  <div>
    <h1 class="page-title">Buscar Profissionais</h1>
    
    <!-- Main Search Bar -->
    <div class="card mb-6">
      <div class="card-content p-4">
        <div class="search-field">
          <span class="material-icons search-icon">search</span>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Buscar por nome, especialidade, cidade..." 
            class="form-control" 
            @keyup.enter="searchProfessionals"
          >
          <button class="btn btn-primary search-button" @click="searchProfessionals">
            Buscar
          </button>
        </div>
      </div>
    </div>
    
    <div class="row">
      <!-- Filters Section -->
      <div class="col col-12 col-md-3">
        <div class="card mb-6 filters-card">
          <div class="card-header">
            <h2 class="card-title">Filtros</h2>
            <button class="btn btn-text-primary" @click="resetFilters">
              Limpar
            </button>
          </div>
          
          <div class="card-content">
            <!-- Categories Filter -->
            <div class="filter-section">
              <h3 class="filter-title">Categorias</h3>
              <div class="filter-options">
                <div class="checkbox-group" v-for="(category, index) in categories" :key="index">
                  <input 
                    type="checkbox" 
                    :id="'cat-' + index" 
                    :value="category.value" 
                    v-model="selectedCategories"
                  >
                  <label :for="'cat-' + index">{{ category.label }}</label>
                </div>
              </div>
            </div>
            
            <!-- Location Filter -->
            <div class="filter-section">
              <h3 class="filter-title">Localização</h3>
              <div class="filter-options">
                <div class="form-group">
                  <select class="form-control" v-model="selectedState">
                    <option value="">Todos os estados</option>
                    <option v-for="(state, index) in states" :key="index" :value="state">
                      {{ state }}
                    </option>
                  </select>
                </div>
                
                <div class="form-group">
                  <select class="form-control" v-model="selectedCity" :disabled="!selectedState">
                    <option value="">Todas as cidades</option>
                    <option v-for="(city, index) in filteredCities" :key="index" :value="city">
                      {{ city }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            
            <!-- Experience Level Filter -->
            <div class="filter-section">
              <h3 class="filter-title">Experiência</h3>
              <div class="filter-options">
                <div class="radio-group" v-for="(experience, index) in experienceLevels" :key="index">
                  <input 
                    type="radio" 
                    :id="'exp-' + index" 
                    :value="experience.value" 
                    v-model="selectedExperience"
                  >
                  <label :for="'exp-' + index">{{ experience.label }}</label>
                </div>
              </div>
            </div>
            
            <!-- Rating Filter -->
            <div class="filter-section">
              <h3 class="filter-title">Avaliação</h3>
              <div class="filter-options">
                <div class="star-filter">
                  <button 
                    v-for="n in 5" 
                    :key="n" 
                    @click="setRating(n)" 
                    class="star-button"
                    :class="{ 'active': n <= selectedRating }"
                  >
                    <span class="material-icons">{{ n <= selectedRating ? 'star' : 'star_border' }}</span>
                  </button>
                  <span class="rating-text" v-if="selectedRating > 0">
                    {{ selectedRating }}+ estrelas
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Apply Filters Button (visible on mobile) -->
            <button class="btn btn-primary btn-block mt-4 d-md-none" @click="applyFilters">
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
      
      <!-- Search Results Section -->
      <div class="col col-12 col-md-9">
        <!-- Result Stats -->
        <div class="result-stats mb-4">
          <span v-if="searchPerformed">{{ totalResults }} profissionais encontrados</span>
          <div class="view-options">
            <button 
              class="view-button" 
              :class="{ 'active': viewMode === 'grid' }" 
              @click="viewMode = 'grid'"
            >
              <span class="material-icons">grid_view</span>
            </button>
            <button 
              class="view-button" 
              :class="{ 'active': viewMode === 'list' }" 
              @click="viewMode = 'list'"
            >
              <span class="material-icons">view_list</span>
            </button>
            <select class="form-control select-sm" v-model="sortBy">
              <option value="relevance">Mais relevantes</option>
              <option value="rating">Maior avaliação</option>
              <option value="name">Nome (A-Z)</option>
              <option value="recent">Mais recentes</option>
            </select>
          </div>
        </div>
        
        <div v-if="loading" class="text-center py-5">
          <div class="spinner"></div>
          <p class="mt-3">Buscando profissionais...</p>
        </div>
        
        <div v-else-if="!searchPerformed" class="empty-state">
          <span class="material-icons empty-icon">search</span>
          <h3>Busque profissionais</h3>
          <p>Use a barra de busca e os filtros para encontrar os melhores profissionais de turismo.</p>
        </div>
        
        <div v-else-if="professionals.length === 0" class="empty-state">
          <span class="material-icons empty-icon">sentiment_dissatisfied</span>
          <h3>Nenhum resultado encontrado</h3>
          <p>Tente alterar os filtros ou usar termos diferentes na busca.</p>
        </div>
        
        <!-- Grid View -->
        <div v-else-if="viewMode === 'grid'" class="professionals-grid">
          <div class="row">
            <div 
              v-for="(professional, index) in professionals" 
              :key="index" 
              class="col col-12 col-sm-6 col-lg-4 mb-4"
            >
              <div class="card professional-card">
                <div class="professional-header">
                  <div class="avatar medium">
                    <img :src="professional.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Avatar">
                  </div>
                  <div class="professional-rating">
                    <span class="material-icons star-icon">star</span>
                    <span>{{ professional.rating }}</span>
                  </div>
                </div>
                <div class="card-content text-center">
                  <h3 class="professional-name">{{ professional.name }}</h3>
                  <p class="professional-title">{{ professional.title }}</p>
                  <p class="professional-location">
                    <span class="material-icons location-icon">location_on</span>
                    {{ professional.city }}, {{ professional.state }}
                  </p>
                  <div class="professional-categories">
                    <span 
                      v-for="(category, catIndex) in professional.categories" 
                      :key="catIndex" 
                      class="category-tag"
                    >
                      {{ category }}
                    </span>
                  </div>
                  <button class="btn btn-outline-primary btn-block mt-3">Ver Perfil</button>
                  <button class="btn btn-text-primary btn-block">Conectar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- List View -->
        <div v-else class="professionals-list">
          <div 
            v-for="(professional, index) in professionals" 
            :key="index" 
            class="card professional-list-card mb-3"
          >
            <div class="professional-list-content">
              <div class="professional-list-avatar">
                <div class="avatar medium">
                  <img :src="professional.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Avatar">
                </div>
              </div>
              <div class="professional-list-info">
                <div class="professional-list-header">
                  <h3 class="professional-name">{{ professional.name }}</h3>
                  <div class="professional-rating">
                    <span class="material-icons star-icon">star</span>
                    <span>{{ professional.rating }}</span>
                  </div>
                </div>
                <p class="professional-title">{{ professional.title }}</p>
                <p class="professional-location">
                  <span class="material-icons location-icon">location_on</span>
                  {{ professional.city }}, {{ professional.state }}
                </p>
                <div class="professional-categories">
                  <span 
                    v-for="(category, catIndex) in professional.categories" 
                    :key="catIndex" 
                    class="category-tag"
                  >
                    {{ category }}
                  </span>
                </div>
              </div>
              <div class="professional-list-actions">
                <button class="btn btn-outline-primary mb-2">Ver Perfil</button>
                <button class="btn btn-text-primary">Conectar</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="professionals.length > 0" class="pagination-container">
          <div class="pagination">
            <button 
              class="pagination-button" 
              @click="prevPage" 
              :disabled="currentPage === 1"
            >
              <span class="material-icons">chevron_left</span>
            </button>
            
            <button 
              v-for="page in displayedPages" 
              :key="page" 
              class="pagination-button" 
              :class="{ 'active': currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            
            <button 
              class="pagination-button" 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
            >
              <span class="material-icons">chevron_right</span>
            </button>
          </div>
          <div class="page-size">
            <span>Itens por página:</span>
            <select v-model="pageSize" class="form-control select-sm">
              <option value="9">9</option>
              <option value="18">18</option>
              <option value="36">36</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      // Search state
      searchQuery: '',
      searchPerformed: false,
      loading: false,
      
      // Results view
      viewMode: 'grid',
      sortBy: 'relevance',
      
      // Pagination
      currentPage: 1,
      pageSize: 9,
      totalResults: 0,
      totalPages: 1,
      
      // Filter options
      categories: [
        { label: 'Guia de Turismo', value: 'guia' },
        { label: 'Agência', value: 'agencia' },
        { label: 'Hotel/Pousada', value: 'hotel' },
        { label: 'Restaurante', value: 'restaurante' },
        { label: 'Transporte', value: 'transporte' }
      ],
      states: ['SP', 'RJ', 'MG', 'SC', 'RS', 'BA', 'PE', 'CE'],
      cities: {
        'SP': ['São Paulo', 'Campinas', 'Santos', 'Guarujá'],
        'RJ': ['Rio de Janeiro', 'Niterói', 'Búzios', 'Paraty'],
        'MG': ['Belo Horizonte', 'Ouro Preto', 'Tiradentes'],
        'SC': ['Florianópolis', 'Blumenau', 'Balneário Camboriú'],
        'RS': ['Porto Alegre', 'Gramado', 'Canela'],
        'BA': ['Salvador', 'Porto Seguro', 'Ilhéus'],
        'PE': ['Recife', 'Olinda', 'Porto de Galinhas'],
        'CE': ['Fortaleza', 'Jericoacoara', 'Canoa Quebrada']
      },
      experienceLevels: [
        { label: 'Todos os níveis', value: '' },
        { label: 'Iniciante (< 2 anos)', value: 'junior' },
        { label: 'Intermediário (2-5 anos)', value: 'mid' },
        { label: 'Experiente (> 5 anos)', value: 'senior' }
      ],
      
      // Selected filters
      selectedCategories: [],
      selectedState: '',
      selectedCity: '',
      selectedExperience: '',
      selectedRating: 0,
      
      // Mock data for professionals
      professionals: []
    }
  },
  computed: {
    filteredCities() {
      return this.selectedState ? this.cities[this.selectedState] : [];
    },
    displayedPages() {
      // Create array of page numbers to display
      const pages = [];
      const totalVisible = 5;
      
      if (this.totalPages <= totalVisible) {
        // If there are fewer pages than the total visible, show all
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Calculate which pages to show
        const leftSide = Math.floor(totalVisible / 2);
        const rightSide = totalVisible - leftSide - 1;
        
        // Always show current page
        pages.push(this.currentPage);
        
        // Add pages before current
        for (let i = 1; i <= leftSide; i++) {
          if (this.currentPage - i > 0) {
            pages.unshift(this.currentPage - i);
          }
        }
        
        // Add pages after current
        for (let i = 1; i <= rightSide; i++) {
          if (this.currentPage + i <= this.totalPages) {
            pages.push(this.currentPage + i);
          }
        }
        
        // Fill any remaining slots
        while (pages.length < totalVisible && pages[0] > 1) {
          pages.unshift(pages[0] - 1);
        }
        
        while (pages.length < totalVisible && pages[pages.length - 1] < this.totalPages) {
          pages.push(pages[pages.length - 1] + 1);
        }
      }
      
      return pages;
    }
  },
  methods: {
    searchProfessionals() {
      if (!this.searchQuery && this.selectedCategories.length === 0 && 
          !this.selectedState && !this.selectedExperience && this.selectedRating === 0) {
        return;
      }
      
      this.loading = true;
      this.searchPerformed = true;
      this.currentPage = 1;
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Mock data generation
        const mockData = this.generateMockResults();
        this.professionals = mockData.results;
        this.totalResults = mockData.total;
        this.totalPages = Math.ceil(this.totalResults / this.pageSize);
        this.loading = false;
      }, 1000);
    },
    
    generateMockResults() {
      // Generate random professionals for demo
      const professionalsCount = Math.floor(Math.random() * 50) + 10;
      const professionals = [];
      
      for (let i = 0; i < professionalsCount; i++) {
        const stateIndex = Math.floor(Math.random() * this.states.length);
        const state = this.states[stateIndex];
        const cityIndex = Math.floor(Math.random() * this.cities[state].length);
        
        const categoryCount = Math.floor(Math.random() * 3) + 1;
        const categories = [];
        for (let j = 0; j < categoryCount; j++) {
          const catIndex = Math.floor(Math.random() * this.categories.length);
          const category = this.categories[catIndex].label;
          if (!categories.includes(category)) {
            categories.push(category);
          }
        }
        
        professionals.push({
          id: i + 1,
          name: `Profissional ${i + 1}`,
          title: `${categories[0]}`,
          city: this.cities[state][cityIndex],
          state: state,
          rating: (Math.random() * 2 + 3).toFixed(1),
          categories: categories,
          experience: Math.floor(Math.random() * 10) + 1
        });
      }
      
      // Apply filters
      let filtered = professionals;
      
      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter(p => 
          p.categories.some(c => 
            this.selectedCategories.some(sc => 
              c.toLowerCase().includes(this.categories.find(cat => cat.value === sc).label.toLowerCase())
            )
          )
        );
      }
      
      if (this.selectedState) {
        filtered = filtered.filter(p => p.state === this.selectedState);
        
        if (this.selectedCity) {
          filtered = filtered.filter(p => p.city === this.selectedCity);
        }
      }
      
      if (this.selectedExperience) {
        if (this.selectedExperience === 'junior') {
          filtered = filtered.filter(p => p.experience < 2);
        } else if (this.selectedExperience === 'mid') {
          filtered = filtered.filter(p => p.experience >= 2 && p.experience <= 5);
        } else if (this.selectedExperience === 'senior') {
          filtered = filtered.filter(p => p.experience > 5);
        }
      }
      
      if (this.selectedRating > 0) {
        filtered = filtered.filter(p => parseFloat(p.rating) >= this.selectedRating);
      }
      
      // Sort results
      if (this.sortBy === 'rating') {
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      } else if (this.sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
      
      // Apply pagination
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      
      return {
        total: filtered.length,
        results: filtered.slice(start, end)
      };
    },
    
    resetFilters() {
      this.selectedCategories = [];
      this.selectedState = '';
      this.selectedCity = '';
      this.selectedExperience = '';
      this.selectedRating = 0;
      
      if (this.searchPerformed) {
        this.searchProfessionals();
      }
    },
    
    applyFilters() {
      this.searchProfessionals();
    },
    
    setRating(rating) {
      this.selectedRating = this.selectedRating === rating ? 0 : rating;
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.searchProfessionals();
      }
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.searchProfessionals();
      }
    },
    
    goToPage(page) {
      this.currentPage = page;
      this.searchProfessionals();
    }
  },
  watch: {
    pageSize() {
      if (this.searchPerformed) {
        this.currentPage = 1;
        this.searchProfessionals();
      }
    },
    
    sortBy() {
      if (this.searchPerformed) {
        this.searchProfessionals();
      }
    },
    
    selectedState() {
      this.selectedCity = '';
      
      if (this.searchPerformed) {
        this.searchProfessionals();
      }
    }
  }
}
</script>

<style scoped>
.page-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

/* Search Bar Styling */
.search-field {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.54);
}

.form-control {
  flex: 1;
  padding: 12px 12px 12px 48px;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.search-button {
  margin-left: 8px;
  white-space: nowrap;
}

/* Filters Styling */
.filters-card {
  position: sticky;
  top: 80px;
}

.filter-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.filter-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.filter-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 12px;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-group, .radio-group {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-group input, .radio-group input {
  margin-right: 8px;
}

.star-filter {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.star-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: rgba(0, 0, 0, 0.38);
}

.star-button.active {
  color: #ffc107;
}

.rating-text {
  margin-left: 8px;
  font-size: 0.875rem;
}

/* Results Section */
.result-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.view-options {
  display: flex;
  align-items: center;
  gap: 8px;
}

.view-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.54);
}

.view-button.active {
  background-color: rgba(25, 118, 210, 0.08);
  color: #1976d2;
}

.select-sm {
  font-size: 0.875rem;
  padding: 4px 8px;
  height: auto;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.26);
}

/* Loading Spinner */
.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(25, 118, 210, 0.1);
  border-radius: 50%;
  border-top-color: #1976d2;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Professional Cards */
.professional-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
}

.professional-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}

.professional-header {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.professional-rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
}

.star-icon {
  font-size: 16px;
  color: #ffc107;
  margin-right: 4px;
}

.professional-name {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 12px 0 4px;
}

.professional-title {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 8px;
}

.professional-location {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 12px;
}

.location-icon {
  font-size: 16px;
  margin-right: 4px;
  color: #e53935;
}

.professional-categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-bottom: 16px;
}

.category-tag {
  background-color: rgba(25, 118, 210, 0.08);
  color: #1976d2;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
}

/* Professional List View */
.professional-list-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.professional-list-card:hover {
  transform: translateX(4px);
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}

.professional-list-content {
  display: flex;
  padding: 16px;
}

.professional-list-avatar {
  margin-right: 16px;
}

.professional-list-info {
  flex: 1;
}

.professional-list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.professional-list-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.pagination {
  display: flex;
  align-items: center;
}

.pagination-button {
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  margin: 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.pagination-button:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.04);
}

.pagination-button.active {
  background-color: rgba(25, 118, 210, 0.08);
  color: #1976d2;
}

.pagination-button:disabled {
  color: rgba(0, 0, 0, 0.26);
  cursor: default;
}

.page-size {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.page-size select {
  margin-left: 8px;
  width: auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .professional-list-content {
    flex-direction: column;
  }
  
  .professional-list-avatar {
    display: flex;
    justify-content: center;
    margin-right: 0;
    margin-bottom: 16px;
  }
  
  .professional-list-header {
    flex-direction: column;
  }
  
  .professional-list-actions {
    margin-top: 16px;
    margin-left: 0;
  }
  
  .pagination-container {
    flex-direction: column;
    gap: 16px;
  }
  
  .pagination {
    justify-content: center;
    width: 100%;
  }
  
  .page-size {
    width: 100%;
    justify-content: center;
  }
}
</style>

