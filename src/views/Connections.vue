<template>
  <div>
    <h1 class="page-title">Minhas Conexões</h1>
    
    <!-- Statistics Cards -->
    <div class="row mb-6">
      <div class="col col-6 col-md-3">
        <div class="card stat-card">
          <div class="stat-icon-wrapper primary">
            <span class="material-icons stat-icon">group</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalConnections }}</div>
            <div class="stat-label">Total de conexões</div>
          </div>
        </div>
      </div>
      
      <div class="col col-6 col-md-3">
        <div class="card stat-card">
          <div class="stat-icon-wrapper success">
            <span class="material-icons stat-icon">person_add</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.newConnections }}</div>
            <div class="stat-label">Novas neste mês</div>
          </div>
        </div>
      </div>
      
      <div class="col col-6 col-md-3">
        <div class="card stat-card">
          <div class="stat-icon-wrapper warning">
            <span class="material-icons stat-icon">pending</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.pendingRequests }}</div>
            <div class="stat-label">Solicitações pendentes</div>
          </div>
        </div>
      </div>
      
      <div class="col col-6 col-md-3">
        <div class="card stat-card">
          <div class="stat-icon-wrapper info">
            <span class="material-icons stat-icon">recommend</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.suggestedConnections }}</div>
            <div class="stat-label">Sugeridos para você</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Section -->
    <div class="row">
      <!-- Current Connections -->
      <div class="col col-12 col-lg-8">
        <div class="card mb-6">
          <div class="card-header">
            <h2 class="card-title">Conexões Atuais</h2>
            <div class="connection-actions">
              <div class="search-field-small">
                <span class="material-icons search-icon-small">search</span>
                <input 
                  type="text" 
                  v-model="connectionSearch" 
                  placeholder="Buscar conexões..." 
                  class="form-control form-control-sm"
                >
              </div>
              
              <select v-model="connectionFilter" class="form-control form-control-sm ml-2">
                <option value="all">Todos</option>
                <option value="guia">Guias</option>
                <option value="agencia">Agências</option>
                <option value="outros">Outros</option>
              </select>
            </div>
          </div>
          
          <div class="card-content">
            <div v-if="filteredConnections.length === 0" class="empty-state small">
              <span class="material-icons empty-icon">group_off</span>
              <p>Nenhuma conexão encontrada</p>
            </div>
            
            <div v-else>
              <div class="connection-list">
                <div v-for="(connection, index) in filteredConnections" :key="index" class="connection-item">
                  <div class="connection-avatar">
                    <div class="avatar medium">
                      <img :src="connection.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Avatar">
                    </div>
                    <div class="connection-status" :class="{ 'online': connection.online }"></div>
                  </div>
                  
                  <div class="connection-details">
                    <h3 class="connection-name">{{ connection.name }}</h3>
                    <p class="connection-title">{{ connection.title }}</p>
                    <p class="connection-meta">
                      <span class="material-icons location-icon-small">location_on</span>
                      {{ connection.location }}
                      <span class="connection-since">• Conectado desde {{ connection.connectedSince }}</span>
                    </p>
                  </div>
                  
                  <div class="connection-actions">
                    <button class="btn btn-text-primary btn-sm">
                      <span class="material-icons">message</span>
                    </button>
                    <button class="btn btn-text-primary btn-sm">
                      <span class="material-icons">visibility</span>
                    </button>
                    <div class="connection-menu">
                      <button class="btn btn-text-primary btn-sm" @click="toggleMenu(index)">
                        <span class="material-icons">more_vert</span>
                      </button>
                      <div v-if="activeMenu === index" class="connection-menu-dropdown">
                        <ul>
                          <li @click="removeConnection(connection)">
                            <span class="material-icons menu-icon">person_remove</span>
                            Remover conexão
                          </li>
                          <li>
                            <span class="material-icons menu-icon">block</span>
                            Bloquear
                          </li>
                          <li>
                            <span class="material-icons menu-icon">flag</span>
                            Reportar
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="pagination-simple">
                <button 
                  class="btn btn-text-primary" 
                  :disabled="currentConnectionsPage === 1"
                  @click="currentConnectionsPage--"
                >
                  <span class="material-icons">chevron_left</span>
                  Anterior
                </button>
                <span class="pagination-info">
                  Página {{ currentConnectionsPage }} de {{ totalConnectionsPages }}
                </span>
                <button 
                  class="btn btn-text-primary" 
                  :disabled="currentConnectionsPage === totalConnectionsPages"
                  @click="currentConnectionsPage++"
                >
                  Próxima
                  <span class="material-icons">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Side Section -->
      <div class="col col-12 col-lg-4">
        <!-- Pending Requests -->
        <div class="card mb-6">
          <div class="card-header">
            <h2 class="card-title">Solicitações Pendentes</h2>
            <span class="badge" v-if="pendingRequests.length > 0">{{ pendingRequests.length }}</span>
          </div>
          
          <div class="card-content">
            <div v-if="pendingRequests.length === 0" class="empty-state small">
              <span class="material-icons empty-icon">mark_email_read</span>
              <p>Nenhuma solicitação pendente</p>
            </div>
            
            <div v-else class="request-list">
              <div v-for="(request, index) in pendingRequests" :key="index" class="request-item">
                <div class="request-avatar">
                  <div class="avatar small">
                    <img :src="request.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Avatar">
                  </div>
                </div>
                
                <div class="request-details">
                  <h3 class="request-name">{{ request.name }}</h3>
                  <p class="request-title">{{ request.title }}</p>
                  <p class="request-meta">
                    <span class="material-icons connection-icon-small">group</span>
                    {{ request.mutualConnections }} conexões em comum
                  </p>
                </div>
                
                <div class="request-actions">
                  <button class="btn btn-success btn-sm btn-block mb-1" @click="acceptRequest(request)">
                    Aceitar
                  </button>
                  <button class="btn btn-text-secondary btn-sm btn-block" @click="rejectRequest(request)">
                    Recusar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Suggested Connections -->
        <div class="card mb-6">
          <div class="card-header">
            <h2 class="card-title">Sugestões para Conectar</h2>
            <button class="btn btn-text-primary btn-sm">Ver mais</button>
          </div>
          
          <div class="card-content">
            <div class="suggestion-list">
              <div v-for="(suggestion, index) in suggestedConnections" :key="index" class="suggestion-item">
                <div class="suggestion-avatar">
                  <div class="avatar small">
                    <img :src="suggestion.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Avatar">
                  </div>
                </div>
                
                <div class="suggestion-details">
                  <h3 class="suggestion-name">{{ suggestion.name }}</h3>
                  <p class="suggestion-title">{{ suggestion.title }}</p>
                  <p class="suggestion-meta" v-if="suggestion.mutualConnections > 0">
                    <span class="material-icons connection-icon-small">group</span>
                    {{ suggestion.mutualConnections }} conexões em comum
                  </p>
                  <p class="suggestion-meta" v-else>
                    <span class="suggestion-reason">{{ suggestion.reason }}</span>
                  </p>
                </div>
                
                <div class="suggestion-actions">
                  <button class="btn btn-outline-primary btn-sm btn-block" @click="connectWithSuggestion(suggestion)">
                    Conectar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Connection Invites -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Convide Profissionais</h2>
          </div>
          
          <div class="card-content">
            <p class="invite-text">Convide colegas profissionais para se conectarem com você.</p>
            
            <div class="form-group">
              <label>Email do profissional</label>
              <input type="email" class="form-control" v-model="inviteEmail" placeholder="email@exemplo.com">
            </div>
            
            <button class="btn btn-primary btn-block" @click="sendInvite" :disabled="!inviteEmail">
              Enviar convite
            </button>
            
            <div class="social-invite">
              <p class="text-center mt-3 mb-2">Ou compartilhe seu perfil</p>
              <div class="social-buttons">
                <button class="btn btn-social whatsapp">
                  <span class="material-icons">whatsapp</span>
                </button>
                <button class="btn btn-social email">
                  <span class="material-icons">email</span>
                </button>
                <button class="btn btn-social copy">
                  <span class="material-icons">content_copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Connections',
  data() {
    return {
      // Stats
      stats: {
        totalConnections: 67,
        newConnections: 12,
        pendingRequests: 3,
        suggestedConnections: 15
      },
      
      // Connections
      connections: [
        {
          id: 1,
          name: 'Ana Silva',
          title: 'Guia de Turismo',
          location: 'São Paulo, SP',
          connectedSince: 'Março 2025',
          online: true,
          type: 'guia'
        },
        {
          id: 2,
          name: 'Carlos Mendes',
          title: 'Agência Turismo Radical',
          location: 'Rio de Janeiro, RJ',
          connectedSince: 'Janeiro 2025',
          online: false,
          type: 'agencia'
        },
        {
          id: 3,
          name: 'Patrícia Alves',
          title: 'Guia de Ecoturismo',
          location: 'Manaus, AM',
          connectedSince: 'Dezembro 2024',
          online: true,
          type: 'guia'
        },
        {
          id: 4,
          name: 'Roberto Costa',
          title: 'Hotel Maresias',
          location: 'Florianópolis, SC',
          connectedSince: 'Fevereiro 2025',
          online: false,
          type: 'outros'
        },
        {
          id: 5,
          name: 'Maria Souza',
          title: 'Agência Viaje Mais',
          location: 'Salvador, BA',
          connectedSince: 'Janeiro 2025',
          online: true,
          type: 'agencia'
        }
      ],
      connectionSearch: '',
      connectionFilter: 'all',
      currentConnectionsPage: 1,
      connectionsPerPage: 5,
      
      // Pending Requests
      pendingRequests: [
        {
          id: 101,
          name: 'Lucas Fernandes',
          title: 'Guia de Turismo Histórico',
          mutualConnections: 3
        },
        {
          id: 102,
          name: 'Fernanda Lima',
          title: 'Agência Litoral Norte',
          mutualConnections: 1
        },
        {
          id: 103,
          name: 'Ricardo Nunes',
          title: 'Guia de Trilhas',
          mutualConnections: 5
        }
      ],
      
      // Suggested Connections
      suggestedConnections: [
        {
          id: 201,
          name: 'Juliana Santos',
          title: 'Guia de Ecoturismo',
          mutualConnections: 7,
          reason: ''
        },
        {
          id: 202,
          name: 'Marcos Oliveira',
          title: 'Agência Aventuras SP',
          mutualConnections: 0,
          reason: 'Baseado no seu perfil'
        },
        {
          id: 203,
          name: 'Carla Dias',
          title: 'Hotel Fazenda Araucária',
          mutualConnections: 2,
          reason: ''
        },
        {
          id: 204,
          name: 'Rodrigo Lima',
          title: 'Guia de Turismo Urbano',
          mutualConnections: 4,
          reason: ''
        }
      ],
      
      // UI state
      activeMenu: null,
      
      // Invite form
      inviteEmail: ''
    }
  },
  computed: {
    filteredConnections() {
      let filtered = [...this.connections];
      
      // Apply search filter
      if (this.connectionSearch) {
        const search = this.connectionSearch.toLowerCase();
        filtered = filtered.filter(c => 
          c.name.toLowerCase().includes(search) || 
          c.title.toLowerCase().includes(search) || 
          c.location.toLowerCase().includes(search)
        );
      }
      
      // Apply type filter
      if (this.connectionFilter !== 'all') {
        filtered = filtered.filter(c => c.type === this.connectionFilter);
      }
      
      // Apply pagination
      const start = (this.currentConnectionsPage - 1) * this.connectionsPerPage;
      const end = start + this.connectionsPerPage;
      
      return filtered.slice(start, end);
    },
    
    totalConnectionsPages() {
      // Calculate total pages based on filters
      let filtered = [...this.connections];
      
      if (this.connectionSearch) {
        const search = this.connectionSearch.toLowerCase();
        filtered = filtered.filter(c => 
          c.name.toLowerCase().includes(search) || 
          c.title.toLowerCase().includes(search) || 
          c.location.toLowerCase().includes(search)
        );
      }
      
      if (this.connectionFilter !== 'all') {
        filtered = filtered.filter(c => c.type === this.connectionFilter);
      }
      
      return Math.ceil(filtered.length / this.connectionsPerPage);
    }
  },
  methods: {
    toggleMenu(index) {
      this.activeMenu = this.activeMenu === index ? null : index;
    },
    
    removeConnection(connection) {
      // Here you would make an API call to remove the connection
      this.connections = this.connections.filter(c => c.id !== connection.id);
      this.activeMenu = null;
      this.stats.totalConnections--;
    },
    
    acceptRequest(request) {
      // Here you would make an API call to accept the request
      this.pendingRequests = this.pendingRequests.filter(r => r.id !== request.id);
      this.connections.push({
        id: request.id,
        name: request.name,
        title: request.title,
        location: 'Novo usuário',
        connectedSince: 'Hoje',
        online: false,
        type: request.title.toLowerCase().includes('guia') ? 'guia' : 
              request.title.toLowerCase().includes('agência') ? 'agencia' : 'outros'
      });
      this.stats.pendingRequests--;
      this.stats.totalConnections++;
    },
    
    rejectRequest(request) {
      // Here you would make an API call to reject the request
      this.pendingRequests = this.pendingRequests.filter(r => r.id !== request.id);
      this.stats.pendingRequests--;
    },
    
    connectWithSuggestion(suggestion) {
      // Here you would make an API call to send a connection request
      this.suggestedConnections = this.suggestedConnections.filter(s => s.id !== suggestion.id);
      this.stats.suggestedConnections--;
      // Show some feedback to the user
      alert(`Solicitação de conexão enviada para ${suggestion.name}`);
    },
    
    sendInvite() {
      // Here you would make an API call to send an invite
      if (this.inviteEmail) {
        // Show some feedback to the user
        alert(`Convite enviado para ${this.inviteEmail}`);
        this.inviteEmail = '';
      }
    }
  },
  mounted() {
    // Close dropdown menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.connection-menu')) {
        this.activeMenu = null;
      }
    });
  }
}
</script>

<style scoped>
.page-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

/* Statistics Cards */
.stat-card {
  display: flex;
  align-items: center;
  padding: 16px;
  height: 100%;
}

.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.stat-icon-wrapper.primary {
  background-color: rgba(25, 118, 210, 0.12);
  color: #1976d2;
}

.stat-icon-wrapper.success {
  background-color: rgba(76, 175, 80, 0.12);
  color: #4caf50;
}

.stat-icon-wrapper.warning {
  background-color: rgba(255, 152, 0, 0.12);
  color: #ff9800;
}

.stat-icon-wrapper.info {
  background-color: rgba(3, 169, 244, 0.12);
  color: #03a9f4;
}

.stat-icon {
  font-size: 24px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

/* Search Field */
.search-field-small {
  position: relative;
  max-width: 200px;
}

.search-icon-small {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: rgba(0, 0, 0, 0.54);
}

.form-control-sm {
  padding: 6px 6px 6px 32px;
  font-size: 0.875rem;
  height: 32px;
}

.ml-2 {
  margin-left: 0.5rem;
}

/* Connection List */
.connection-list {
  display: flex;
  flex-direction: column;
}

.connection-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.connection-item:last-child {
  border-bottom: none;
}

.connection-avatar {
  position: relative;
  margin-right: 16px;
}

.connection-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e0e0e0;
  border: 2px solid white;
}

.connection-status.online {
  background-color: #4caf50;
}

.connection-details {
  flex: 1;
  min-width: 0;
}

.connection-name {
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.connection-title {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.connection-meta {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

.location-icon-small {
  font-size: 14px;
  margin-right: 4px;
  color: #e53935;
}

.connection-icon-small {
  font-size: 14px;
  margin-right: 4px;
  color: #1976d2;
}

.connection-since {
  margin-left: 4px;
}

.connection-actions {
  display: flex;
  align-items: center;
}

.connection-menu {
  position: relative;
}

.connection-menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.connection-menu-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.connection-menu-dropdown li {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.connection-menu-dropdown li:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.menu-icon {
  font-size: 18px;
  margin-right: 12px;
  color: rgba(0, 0, 0, 0.54);
}

/* Pagination */
.pagination-simple {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.pagination-info {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background-color: #f44336;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Empty State */
.empty-state.small {
  padding: 30px 20px;
}

.empty-state.small .empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

/* Request List */
.request-list, .suggestion-list {
  display: flex;
  flex-direction: column;
}

.request-item, .suggestion-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.request-item:last-child, .suggestion-item:last-child {
  border-bottom: none;
}

.request-avatar, .suggestion-avatar {
  margin-right: 12px;
}

.request-details, .suggestion-details {
  flex: 1;
  min-width: 0;
}

.request-name, .suggestion-name {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.request-title, .suggestion-title {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.request-meta, .suggestion-meta {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

.suggestion-reason {
  font-style: italic;
}

.request-actions, .suggestion-actions {
  margin-left: 12px;
}

.btn-block {
  width: 100%;
}

.btn-sm.btn-block {
  padding: 4px 8px;
  font-size: 0.75rem;
}

/* Invite Section */
.invite-text {
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.social-invite {
  margin-top: 16px;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn-social {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  transition: opacity 0.3s;
}

.btn-social:hover {
  opacity: 0.8;
}

.btn-social.whatsapp {
  background-color: #25D366;
}

.btn-social.email {
  background-color: #D44638;
}

.btn-social.copy {
  background-color: #607D8B;
}

.btn-social .material-icons {
  font-size: 20px;
}

/* Media Queries */
@media (max-width: 992px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .connection-actions {
    margin-top: 12px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  
  .search-field-small {
    max-width: none;
    width: 100%;
  }
}

@media (max-width: 576px) {
  .connection-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .connection-avatar {
    margin-right: 0;
    margin-bottom: 12px;
  }
  
  .connection-actions {
    width: 100%;
    margin-top: 12px;
    justify-content: flex-start;
  }
}
</style>

