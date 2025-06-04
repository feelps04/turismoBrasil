<template>
  <div class="row">
    <!-- Card de Busca -->
    <div class="col col-12">
      <div class="card mb-6 p-4">
        <h2 class="card-title text-center">Encontre Profissionais</h2>
        <div class="card-content">
          <div class="search-field">
            <span class="material-icons search-icon">search</span>
            <input 
              type="text" 
              placeholder="Buscar profissionais/empresas..." 
              class="form-control" 
              @click="openSearchPage"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Card de Destaque (Plano Atual) -->
    <div class="col col-12">
      <div class="card mb-6">
        <h2 class="card-title">Seu Plano</h2>
        <div class="card-content">
          <h3 class="text-h6 mb-2">{{ user.plan === 'RO' ? 'Plano Regular' : 'Plano Premium' }}</h3>
          <p class="text-body-2 mb-4">{{ user.plan === 'RO' ? 'Você está nos 100 primeiros!' : 'Aproveite todos os benefícios!' }}</p>
          
          <div class="progress-bar-container mb-4">
            <div class="progress-bar" :style="{ width: user.planProgress + '%' }"></div>
          </div>
          
          <router-link to="/plans" class="btn btn-primary btn-block">
            {{ user.plan === 'RO' ? 'Upgrade' : 'Gerenciar assinatura' }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Card de Perfil Rápido -->
    <div class="col col-12">
      <div class="card mb-6">
        <div class="card-content text-center">
          <div class="avatar large mb-3">
            <img :src="user.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Profile">
          </div>
          <h3 class="text-h6">{{ user.name }}</h3>
          <p class="text-subtitle-1 mb-1">{{ user.title }}</p>
          <p class="text-body-2 mb-4">{{ user.company }}</p>
          <router-link to="/profile" class="btn btn-outline-primary btn-block">Editar perfil</router-link>
        </div>
      </div>
    </div>

    <!-- Card de Ações Rápidas -->
    <div class="col col-12">
      <div class="card mb-6">
        <h2 class="card-title">Ações Rápidas</h2>
        <div class="card-content">
          <div class="row">
            <div class="col col-6 col-sm-3">
              <router-link to="/search" class="action-button">
                <span class="material-icons">search</span>
                <span class="action-text">Buscar profissionais</span>
              </router-link>
            </div>
            <div class="col col-6 col-sm-3">
              <router-link to="/connections" class="action-button">
                <span class="material-icons">group</span>
                <span class="action-text">Minhas conexões</span>
              </router-link>
            </div>
            <div class="col col-6 col-sm-3">
              <router-link to="/suggest" class="action-button">
                <span class="material-icons">edit</span>
                <span class="action-text">Sugerir correção</span>
              </router-link>
            </div>
            <div class="col col-6 col-sm-3">
              <router-link to="/plans" class="action-button">
                <span class="material-icons">star</span>
                <span class="action-text">Planos e benefícios</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Card de Empresas Sugeridas -->
    <div class="col col-12">
      <div class="card mb-6">
        <div class="card-header">
          <h2 class="card-title">Empresas Sugeridas</h2>
          <a href="#" class="btn btn-text-primary">Ver mais</a>
        </div>
        <div class="card-content">
          <div class="company-slider">
            <div class="company-card" v-for="(company, i) in suggestedCompanies" :key="i">
              <div class="company-logo">
                <img :src="company.logo" alt="Company logo">
              </div>
              <div class="company-info text-center">
                <p class="company-name">{{ company.name }}</p>
                <p class="company-type">{{ company.type }}</p>
                <button class="btn btn-text-primary btn-sm btn-block mt-2">Ver perfil</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Card de Atividades Recentes -->
    <div class="col col-12 col-md-6">
      <div class="card mb-6">
        <h2 class="card-title">Atividades</h2>
        <div class="card-content">
          <ul class="activity-list">
            <li class="activity-item" v-for="(activity, i) in recentActivities" :key="i">
              <span class="material-icons" :class="'text-' + activity.color">{{ activity.icon }}</span>
              <div class="activity-content">
                <div class="activity-text">{{ activity.text }}</div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Card de Notícias/Blog -->
    <div class="col col-12 col-md-6">
      <div class="card mb-6">
        <div class="card-header">
          <h2 class="card-title">Dicas do Turismo</h2>
          <a href="#" class="btn btn-text-primary">Ver mais</a>
        </div>
        <div class="card-content">
          <ul class="blog-list">
            <li class="blog-item" v-for="(post, i) in blogPosts" :key="i">
              <div class="blog-image">
                <img :src="post.image" alt="Blog post">
              </div>
              <div class="blog-content">
                <h3 class="blog-title">{{ post.title }}</h3>
                <p class="blog-excerpt">{{ post.excerpt }}</p>
              </div>
              <button class="btn btn-text-primary btn-sm">Ler mais</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
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
      this.$router.push('/search');
    }
  }
}
</script>

