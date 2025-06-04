<template>
  <div id="app">
    <!-- Top Bar -->
    <header class="top-bar">
      <!-- Hamburger Menu -->
      <button class="menu-button" @click="drawer = !drawer">
        <span class="material-icons">menu</span>
      </button>
      
      <div class="spacer"></div>
      
      <!-- User Profile / Login -->
      <div class="dropdown">
        <button class="avatar-button" @click="toggleUserMenu">
          <div class="avatar small">
            <img :src="user.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Avatar">
          </div>
        </button>
        <div class="dropdown-menu" v-if="showUserMenu">
          <div class="card">
            <div class="card-content text-center">
              <div class="avatar medium mb-3">
                <img :src="user.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Avatar">
              </div>
              <h3 class="mt-2">{{ user.name || 'Entrar/Cadastrar' }}</h3>
            </div>
            <div class="card-actions">
              <router-link to="/profile" v-if="user.loggedIn" class="btn btn-outline-primary btn-block mb-2">Meu Perfil</router-link>
              <button v-if="!user.loggedIn" class="btn btn-outline-primary btn-block mb-2">Entrar</button>
              <button v-if="!user.loggedIn" class="btn btn-secondary btn-block">Cadastrar</button>
              <button v-if="user.loggedIn" class="btn btn-text-error btn-block">Sair</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Notification Icon -->
      <button class="icon-button mx-1">
        <span class="material-icons">notifications_none</span>
      </button>
      
      <!-- Username display -->
      <button class="text-button">
        {{ user.name || 'Entrar/Cadastrar' }}
      </button>
    </header>

    <!-- Navigation Drawer -->
    <div class="nav-drawer" :class="{ 'drawer-open': drawer }">
      <div class="drawer-overlay" @click="drawer = false" v-if="drawer"></div>
      <nav class="drawer-content" :class="{ 'drawer-open': drawer }">
        <ul class="nav-list">
          <li><router-link to="/" class="nav-item"><span class="material-icons">dashboard</span> Dashboard</router-link></li>
          <li><router-link to="/profile" class="nav-item"><span class="material-icons">person</span> Meu Perfil</router-link></li>
          <li><router-link to="/search" class="nav-item"><span class="material-icons">search</span> Buscar Profissionais</router-link></li>
          <li><router-link to="/connections" class="nav-item"><span class="material-icons">group</span> Minhas Conexões</router-link></li>
          <li><router-link to="/plans" class="nav-item"><span class="material-icons">star</span> Planos e Benefícios</router-link></li>
          <li><router-link to="/suggest" class="nav-item"><span class="material-icons">edit</span> Sugerir Correção</router-link></li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      showUserMenu: false,
      user: {
        loggedIn: true,
        name: 'João Silva',
        avatar: null, // URL da imagem do avatar
        title: 'Guia de Turismo',
        company: 'Agência Aventuras Brasil',
        plan: 'RO', // 'RO' ou 'CP'
        planProgress: 70 // porcentagem de progresso do plano
      },
      suggestedCompanies: [
        { name: 'Aventuras Brasil', type: 'Agência de Viagens', logo: 'https://via.placeholder.com/150/2196F3/FFFFFF?text=AB' },
        { name: 'Turismo Ecológico', type: 'Guia de Ecoturismo', logo: 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=TE' },
        { name: 'Destino Nordeste', type: 'Operadora', logo: 'https://via.placeholder.com/150/FF9800/FFFFFF?text=DN' },
        { name: 'Viaje Mais', type: 'Agência de Viagens', logo: 'https://via.placeholder.com/150/9C27B0/FFFFFF?text=VM' },
        { name: 'Expedições Sul', type: 'Turismo de Aventura', logo: 'https://via.placeholder.com/150/F44336/FFFFFF?text=ES' }
      ],
      recentActivities: [
        { text: 'Você buscou por Guias em SP', time: 'Há 2 horas', icon: 'search', color: 'primary' },
        { text: 'Perfil atualizado com sucesso', time: 'Ontem', icon: 'edit', color: 'success' },
        { text: 'Nova conexão: Maria Guia', time: '3 dias atrás', icon: 'person_add', color: 'info' },
        { text: 'Busca por hotéis em RJ', time: '1 semana atrás', icon: 'search', color: 'primary' }
      ],
      blogPosts: [
        { 
          title: 'Certificações essenciais para guias', 
          excerpt: 'Conheça as principais certificações que todo guia deve ter em 2025...',
          image: 'https://via.placeholder.com/100/2196F3/FFFFFF?text=Guia'
        },
        { 
          title: 'Tecnologia no turismo pós-pandemia', 
          excerpt: 'Como a tecnologia está transformando o setor de turismo nos últimos anos...',
          image: 'https://via.placeholder.com/100/4CAF50/FFFFFF?text=Tech'
        }
      ]
    }
  },
  methods: {
    openSearchPage() {
      // Navigate to search page with filters
      this.$router.push('/search');
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const dropdown = document.querySelector('.dropdown');
      if (dropdown && !dropdown.contains(e.target)) {
        this.showUserMenu = false;
      }
    });
  }
}
</script>
<style>
/* Base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f5f5f5;
}

#app {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Utility classes */
.text-center {
  text-align: center;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.mb-6 {
  margin-bottom: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.p-4 {
  padding: 1rem;
}

.spacer {
  flex-grow: 1;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
  text-decoration: none;
}

.btn-block {
  display: flex;
  width: 100%;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.btn-primary {
  background-color: #1976d2;
  color: white;
}

.btn-primary:hover {
  background-color: #1565c0;
}

.btn-secondary {
  background-color: #9c27b0;
  color: white;
}

.btn-secondary:hover {
  background-color: #7b1fa2;
}

.btn-outline-primary {
  background-color: transparent;
  border: 1px solid #1976d2;
  color: #1976d2;
}

.btn-outline-primary:hover {
  background-color: rgba(25, 118, 210, 0.08);
}

.btn-text-primary {
  background-color: transparent;
  color: #1976d2;
  padding: 0.25rem 0.5rem;
}

.btn-text-primary:hover {
  background-color: rgba(25, 118, 210, 0.08);
}

.btn-text-error {
  background-color: transparent;
  color: #f44336;
}

.btn-text-error:hover {
  background-color: rgba(244, 67, 54, 0.08);
}

.text-primary {
  color: #1976d2;
}

.text-success {
  color: #4caf50;
}

.text-info {
  color: #2196f3;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
}

.text-subtitle-1 {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75;
}

.text-body-2 {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.43;
  color: rgba(0, 0, 0, 0.6);
}

/* Top Bar */
.top-bar {
  display: flex;
  align-items: center;
  background-color: #1976d2;
  color: white;
  height: 64px;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);
}

.menu-button, .icon-button, .avatar-button, .text-button {
  background-color: transparent;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
}

.menu-button:hover, .icon-button:hover, .avatar-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.text-button {
  border-radius: 4px;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
}

.avatar {
  overflow: hidden;
  border-radius: 50%;
}

.avatar.small {
  width: 36px;
  height: 36px;
}

.avatar.medium {
  width: 64px;
  height: 64px;
}

.avatar.large {
  width: 80px;
  height: 80px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  min-width: 200px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12);
  margin-top: 8px;
}

/* Navigation Drawer */
.nav-drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 200;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 199;
}

.drawer-content {
  position: fixed;
  top: 0;
  left: -280px;
  width: 280px;
  height: 100%;
  background-color: white;
  z-index: 200;
  box-shadow: 0 8px 10px -5px rgba(0,0,0,0.2), 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12);
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
}

.drawer-content.drawer-open {
  transform: translateX(280px);
}

.nav-list {
  list-style: none;
  padding: 8px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.nav-item .material-icons {
  margin-right: 16px;
  color: rgba(0, 0, 0, 0.6);
}

/* Main Content */
.main-content {
  flex: 1;
  padding-top: 16px;
  padding-bottom: 16px;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
}

.col {
  padding: 0 8px;
  width: 100%;
}

.col-6 {
  width: 50%;
}

/* Card Styles */
.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);
  overflow: hidden;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 500;
  padding: 16px 16px 0;
  margin: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 0;
}

.card-content {
  padding: 16px;
}

.card-actions {
  padding: 8px 16px 16px;
}

/* Search Field */
.search-field {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.54);
}

.form-control {
  width: 100%;
  padding: 12px 12px 12px 48px;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #1976d2;
}

/* Progress Bar */
.progress-bar-container {
  height: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #1976d2;
  background-image: linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent);
  background-size: 1rem 1rem;
  animation: progress-animation 1s linear infinite;
}

@keyframes progress-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 1rem 0;
  }
}

/* Action Buttons */
.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: rgba(25, 118, 210, 0.08);
  color: #1976d2;
  border-radius: 4px;
  text-decoration: none;
  padding: 8px;
  text-align: center;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: rgba(25, 118, 210, 0.16);
}

.action-text {
  font-size: 0.75rem;
  margin-top: 4px;
}

/* Company Slider */
.company-slider {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  gap: 8px;
  padding: 4px 0;
}

.company-slider::-webkit-scrollbar {
  display: none;
}

.company-card {
  flex: 0 0 150px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.company-logo {
  height: 80px;
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company-info {
  padding: 8px;
}

.company-name {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.company-type {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
}

/* Activity List */
.activity-list {
  list-style: none;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-content {
  margin-left: 16px;
  flex: 1;
}

.activity-text {
  font-size: 0.875rem;
}

.activity-time {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
}

/* Blog List */
.blog-list {
  list-style: none;
}

.blog-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.blog-item:last-child {
  border-bottom: none;
}

.blog-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-content {
  margin-left: 16px;
  flex: 1;
}

.blog-title {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.blog-excerpt {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Media Queries for Responsive Design */
@media (min-width: 600px) {
  .mb-6 {
    margin-bottom: 1.5rem;
  }
  
  .container {
    padding: 0 24px;
  }
  
  .col-sm-3 {
    width: 25%;
  }
}

@media (min-width: 960px) {
  .col-md-6 {
    width: 50%;
  }
}
</style>
