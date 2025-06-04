<template>
  <div>
    <h1 class="page-title">Planos e Benefícios</h1>
    
    <!-- Current Plan Overview -->
    <div class="card mb-6" v-if="userHasActivePlan">
      <div class="card-content current-plan-content">
        <div class="row">
          <div class="col col-12 col-md-6">
            <h2 class="current-plan-title">Seu Plano Atual</h2>
            <div class="current-plan-info">
              <div class="plan-badge" :class="{'premium': user.plan === 'CP'}">
                {{ user.plan === 'RO' ? 'Plano Regular' : 'Plano Premium' }}
              </div>
              <p class="current-plan-description">
                {{ user.plan === 'RO' ? 'Aproveite os recursos básicos para guias e profissionais de turismo.' : 'Aproveite todos os recursos premium para impulsionar sua presença profissional.' }}
              </p>
              <p class="renewal-info" v-if="user.plan === 'CP'">
                Renovação em: <strong>{{ user.renewalDate }}</strong>
              </p>
            </div>
          </div>
          
          <div class="col col-12 col-md-6">
            <div class="current-plan-usage">
              <div class="usage-label">
                <span>Uso do plano</span>
                <span>{{ user.planUsage }}%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: user.planUsage + '%' }"></div>
              </div>
              <p class="usage-details">
                <span v-if="user.plan === 'RO'">
                  Você está nos primeiros 100 usuários! Aproveite o acesso gratuito.
                </span>
                <span v-else>
                  {{ user.connectionsLeft }} conexões disponíveis este mês.
                </span>
              </p>
            </div>
            
            <div class="current-plan-actions">
              <button v-if="user.plan === 'RO'" class="btn btn-primary btn-block" @click="showUpgradeModal = true">
                Fazer Upgrade para Premium
              </button>
              <button v-else class="btn btn-outline-primary btn-block">
                Gerenciar Assinatura
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Plans Comparison -->
    <div class="card mb-6">
      <div class="card-header">
        <h2 class="card-title">Compare os Planos</h2>
        <div class="view-toggle">
          <span>Pagamento:</span>
          <button 
            class="toggle-button" 
            :class="{ 'active': billingCycle === 'monthly' }" 
            @click="billingCycle = 'monthly'"
          >
            Mensal
          </button>
          <button 
            class="toggle-button" 
            :class="{ 'active': billingCycle === 'annual' }" 
            @click="billingCycle = 'annual'"
          >
            Anual <span class="discount-badge">-20%</span>
          </button>
        </div>
      </div>
      
      <div class="card-content">
        <div class="plans-container">
          <!-- Regular Plan (Free) -->
          <div class="plan-card">
            <div class="plan-header">
              <h3 class="plan-name">Plano Regular</h3>
              <div class="plan-price">
                <span class="price-value">Grátis</span>
                <span class="price-period">Para sempre</span>
              </div>
              <p class="plan-description">
                Ideal para profissionais que estão começando.
              </p>
            </div>
            
            <div class="plan-features">
              <ul class="features-list">
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Perfil básico</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Até 10 conexões</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Busca de profissionais</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon excluded">cancel</span>
                  <span class="feature-text">Perfil destacado</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon excluded">cancel</span>
                  <span class="feature-text">Contatos ilimitados</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon excluded">cancel</span>
                  <span class="feature-text">Suporte prioritário</span>
                </li>
              </ul>
            </div>
            
            <div class="plan-actions">
              <button 
                class="btn btn-outline-primary btn-block"
                :disabled="user.plan === 'RO'"
              >
                {{ user.plan === 'RO' ? 'Plano Atual' : 'Selecionar Plano' }}
              </button>
            </div>
          </div>
          
          <!-- Premium Plan -->
          <div class="plan-card highlighted">
            <div class="plan-tag">Popular</div>
            
            <div class="plan-header">
              <h3 class="plan-name">Plano Premium</h3>
              <div class="plan-price">
                <span class="price-value">{{ billingCycle === 'monthly' ? 'R$ 29,90' : 'R$ 287,00' }}</span>
                <span class="price-period">{{ billingCycle === 'monthly' ? '/mês' : '/ano' }}</span>
              </div>
              <p class="plan-description">
                Ideal para profissionais que querem expandir sua rede.
              </p>
            </div>
            
            <div class="plan-features">
              <ul class="features-list">
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Perfil completo e personalizado</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Conexões ilimitadas</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Busca avançada de profissionais</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Perfil destacado nos resultados</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Mensagens diretas para não-conexões</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Suporte prioritário 24/7</span>
                </li>
              </ul>
            </div>
            
            <div class="plan-actions">
              <button 
                class="btn btn-primary btn-block"
                :disabled="user.plan === 'CP'"
                @click="showUpgradeModal = true"
              >
                {{ user.plan === 'CP' ? 'Plano Atual' : 'Fazer Upgrade' }}
              </button>
            </div>
          </div>
          
          <!-- Enterprise Plan -->
          <div class="plan-card">
            <div class="plan-header">
              <h3 class="plan-name">Plano Empresarial</h3>
              <div class="plan-price">
                <span class="price-value">Sob consulta</span>
                <span class="price-period">Personalizado</span>
              </div>
              <p class="plan-description">
                Ideal para agências e empresas com múltiplos guias.
              </p>
            </div>
            
            <div class="plan-features">
              <ul class="features-list">
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Tudo do plano Premium</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Múltiplos usuários</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Dashboard de gestão</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">API de integração</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Página empresarial personalizada</span>
                </li>
                <li class="feature-item">
                  <span class="material-icons feature-icon included">check_circle</span>
                  <span class="feature-text">Gerente de conta dedicado</span>
                </li>
              </ul>
            </div>
            
            <div class="plan-actions">
              <button class="btn btn-outline-primary btn-block">
                Fale Conosco
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Detailed Benefits -->
    <div class="card mb-6">
      <div class="card-header">
        <h2 class="card-title">Benefícios Detalhados</h2>
      </div>
      
      <div class="card-content">
        <div class="benefits-tabs">
          <button 
            v-for="(tab, index) in benefitTabs" 
            :key="index"
            class="tab-button" 
            :class="{ 'active': activeBenefitTab === index }"
            @click="activeBenefitTab = index"
          >
            <span class="material-icons tab-icon">{{ tab.icon }}</span>
            <span>{{ tab.name }}</span>
          </button>
        </div>
        
        <div class="benefits-content">
          <!-- Visibility Benefits -->
          <div v-if="activeBenefitTab === 0" class="benefit-section">
            <h3 class="benefit-title">Aumente sua Visibilidade</h3>
            
            <div class="row">
              <div class="col col-12 col-md-6">
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">trending_up</span>
                  <div class="benefit-text">
                    <h4>Destaque nos Resultados de Busca</h4>
                    <p>Perfis premium aparecem no topo dos resultados de busca, aumentando suas chances de ser encontrado por potenciais clientes.</p>
                  </div>
                </div>
                
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">verified</span>
                  <div class="benefit-text">
                    <h4>Selo de Verificação</h4>
                    <p>Ganhe um selo de verificação em seu perfil, transmitindo maior credibilidade e confiança aos visitantes.</p>
                  </div>
                </div>
              </div>
              
              <div class="col col-12 col-md-6">
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">campaign</span>
                  <div class="benefit-text">
                    <h4>Destaque na Newsletter</h4>
                    <p>Possibilidade de ser destacado em nossa newsletter semanal, enviada para milhares de usuários.</p>
                  </div>
                </div>
                
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">palette</span>
                  <div class="benefit-text">
                    <h4>Personalização Avançada</h4>
                    <p>Personalize seu perfil com cores, banners, galerias de fotos e muito mais, criando uma presença online única.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Networking Benefits -->
          <div v-if="activeBenefitTab === 1" class="benefit-section">
            <h3 class="benefit-title">Amplie sua Rede</h3>
            
            <div class="row">
              <div class="col col-12 col-md-6">
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">group_add</span>
                  <div class="benefit-text">
                    <h4>Conexões Ilimitadas</h4>
                    <p>Conecte-se com quantos profissionais desejar, sem as limitações do plano gratuito.</p>
                  </div>
                </div>
                
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">forward_to_inbox</span>
                  <div class="benefit-text">
                    <h4>Mensagens Diretas</h4>
                    <p>Envie mensagens para qualquer usuário, mesmo sem conexão prévia estabelecida.</p>
                  </div>
                </div>
              </div>
              
              <div class="col col-12 col-md-6">
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">event</span>
                  <div class="benefit-text">
                    <h4>Eventos Exclusivos</h4>
                    <p>Acesso a eventos de networking online e presenciais exclusivos para membros premium.</p>
                  </div>
                </div>
                
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">local_offer</span>
                  <div class="benefit-text">
                    <h4>Recomendações Inteligentes</h4>
                    <p>Algoritmo avançado de recomendação para sugerir conexões mais relevantes para seu negócio.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Business Tools Benefits -->
          <div v-if="activeBenefitTab === 2" class="benefit-section">
            <h3 class="benefit-title">Ferramentas de Negócio</h3>
            
            <div class="row">
              <div class="col col-12 col-md-6">
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">analytics</span>
                  <div class="benefit-text">
                    <h4>Estatísticas Detalhadas</h4>
                    <p>Acompanhe quem visitou seu perfil, interações e métricas de desempenho.</p>
                  </div>
                </div>
                
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">calendar_month</span>
                  <div class="benefit-text">
                    <h4>Agenda Integrada</h4>
                    <p>Gerencie sua disponibilidade e permita que clientes agendem serviços diretamente pela plataforma.</p>
                  </div>
                </div>
              </div>
              
              <div class="col col-12 col-md-6">
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">reviews</span>
                  <div class="benefit-text">
                    <h4>Sistema de Avaliações</h4>
                    <p>Receba e gerencie avaliações de clientes, construindo sua reputação online.</p>
                  </div>
                </div>
                
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">laptop</span>
                  <div class="benefit-text">
                    <h4>Mini-site Profissional</h4>
                    <p>Tenha uma página personalizada para compartilhar com clientes potenciais, funcionando como um mini-site profissional.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Support Benefits -->
          <div v-if="activeBenefitTab === 3" class="benefit-section">
            <h3 class="benefit-title">Suporte e Recursos</h3>
            
            <div class="row">
              <div class="col col-12 col-md-6">
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">support_agent</span>
                  <div class="benefit-text">
                    <h4>Suporte Prioritário</h4>
                    <p>Acesso a atendimento prioritário via chat, email e telefone, com tempos de resposta garantidos.</p>
                  </div>
                </div>
                
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">school</span>
                  <div class="benefit-text">
                    <h4>Recursos Educacionais</h4>
                    <p>Acesso a cursos, webinars e materiais exclusivos sobre turismo, marketing digital e empreendedorismo.</p>
                  </div>
                </div>
              </div>
              
              <div class="col col-12 col-md-6">
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">healing</span>
                  <div class="benefit-text">
                    <h4>Programa de Assistência</h4>
                    <p>Desconto em seguros para guias e acesso a rede de apoio em caso de emergências durante tours.</p>
                  </div>
                </div>
                
                <div class="benefit-item">
                  <span class="material-icons benefit-icon premium">handshake</span>
                  <div class="benefit-text">
                    <h4>Parcerias Exclusivas</h4>
                    <p>Descontos e condições especiais com parceiros, incluindo hotéis, agências e serviços para profissionais de turismo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Testimonials -->
    <div class="card mb-6">
      <div class="card-header">
        <h2 class="card-title">O que Nossos Usuários Dizem</h2>
      </div>
      
      <div class="card-content">
        <div class="testimonials-slider">
          <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial-rating">
              <span class="material-icons star-icon" v-for="n in 5" :key="n">
                {{ n <= testimonial.rating ? 'star' : 'star_border' }}
              </span>
            </div>
            <div class="testimonial-content">
              <p class="testimonial-text">{{ testimonial.text }}</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <img :src="testimonial.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Avatar">
              </div>
              <div class="author-info">
                <h4 class="author-name">{{ testimonial.name }}</h4>
                <p class="author-title">{{ testimonial.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- FAQ Section -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Perguntas Frequentes</h2>
      </div>
      
      <div class="card-content">
        <div class="faq-list">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <div class="faq-question" @click="toggleFaq(index)">
              <h3>{{ faq.question }}</h3>
              <span class="material-icons">
                {{ openFaqs.includes(index) ? 'expand_less' : 'expand_more' }}
              </span>
            </div>
            <div class="faq-answer" v-if="openFaqs.includes(index)">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Upgrade Modal -->
    <div class="modal" v-if="showUpgradeModal">
      <div class="modal-backdrop" @click="showUpgradeModal = false"></div>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Fazer Upgrade para Premium</h3>
            <button class="modal-close" @click="showUpgradeModal = false">
              <span class="material-icons">close</span>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="upgrade-info">
              <h4>Plano Premium</h4>
              <div class="upgrade-price">
                <span class="price-value">{{ billingCycle === 'monthly' ? 'R$ 29,90' : 'R$ 287,00' }}</span>
                <span class="price-period">{{ billingCycle === 'monthly' ? '/mês' : '/ano' }}</span>
              </div>
              
              <div class="billing-toggle">
                <span>Pagamento:</span>
                <div class="toggle-group">
                  <button 
                    class="toggle-button" 
                    :class="{ 'active': billingCycle === 'monthly' }" 
                    @click="billingCycle = 'monthly'"
                  >
                    Mensal
                  </button>
                  <button 
                    class="toggle-button" 
                    :class="{ 'active': billingCycle === 'annual' }" 
                    @click="billingCycle = 'annual'"
                  >
                    Anual <span class="discount-badge">-20%</span>
                  </button>
                </div>
              </div>
              
              <div class="payment-details">
                <div class="form-group">
                  <label>Nome no Cartão</label>
                  <input type="text" class="form-control" v-model="paymentInfo.cardName">
                </div>
                
                <div class="form-group">
                  <label>Número do Cartão</label>
                  <input type="text" class="form-control" v-model="paymentInfo.cardNumber">
                </div>
                
                <div class="row">
                  <div class="col col-6">
                    <div class="form-group">
                      <label>Validade</label>
                      <input type="text" class="form-control" placeholder="MM/AA" v-model="paymentInfo.cardExpiry">
                    </div>
                  </div>
                  <div class="col col-6">
                    <div class="form-group">
                      <label>CVV</label>
                      <input type="text" class="form-control" v-model="paymentInfo.cardCvv">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" @click="showUpgradeModal = false">
              Cancelar
            </button>
            <button class="btn btn-primary" @click="processUpgrade">
              Confirmar Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Plans',
  data() {
    return {
      user: {
        plan: 'RO', // 'RO' (Regular) or 'CP' (Premium)
        planUsage: 70,
        renewalDate: '15/07/2025',
        connectionsLeft: 30
      },
      billingCycle: 'monthly',
      activeBenefitTab: 0,
      benefitTabs: [
        { name: 'Visibilidade', icon: 'visibility' },
        { name: 'Networking', icon: 'people' },
        { name: 'Ferramentas', icon: 'business_center' },
        { name: 'Suporte', icon: 'support' }
      ],
      testimonials: [
        {
          name: 'Ana Oliveira',
          title: 'Guia de Turismo - Rio de Janeiro',
          rating: 5,
          text: 'Desde que aderi ao plano Premium, minha visibilidade aumentou significativamente. Estou recebendo muito mais contatos e expandindo minha rede de contatos profissionais.',
          avatar: null
        },
        {
          name: 'Ricardo Santos',
          title: 'Agência de Ecoturismo - Manaus',
          rating: 5,
          text: 'As ferramentas de negócio do plano Premium transformaram a maneira como gerencio minha agência. A agenda integrada e as estatísticas me ajudam a tomar decisões melhores.',
          avatar: null
        },
        {
          name: 'Mariana Costa',
          title: 'Guia Independente - Salvador',
          rating: 4,
          text: 'O destaque nos resultados de busca fez toda a diferença para mim como profissional autônoma. Consegui triplicar minha clientela em apenas três meses.',
          avatar: null
        },
        {
          name: 'Carlos Mendes',
          title: 'Hotel Pousada Mar - Florianópolis',
          rating: 5,
          text: 'Como gerente de hotel, as parcerias exclusivas e o mini-site profissional foram recursos fundamentais para promover nossos serviços e conectar com guias locais.',
          avatar: null
        }
      ],
      faqs: [
        {
          question: 'Como funciona o período de teste gratuito?',
          answer: 'Oferecemos 7 dias de teste gratuito do plano Premium. Durante este período, você terá acesso a todos os recursos Premium sem nenhum custo. Ao final do período, você pode optar por continuar com o plano ou voltar ao plano Regular.'
        },
        {
          question: 'Posso cancelar minha assinatura a qualquer momento?',
          answer: 'Sim, você pode cancelar sua assinatura Premium a qualquer momento. O cancelamento será efetivado ao final do período de cobrança atual, e você continuará tendo acesso aos recursos Premium até lá.'
        },
        {
          question: 'Quais formas de pagamento são aceitas?',
          answer: 'Aceitamos cartões de crédito das bandeiras Visa, Mastercard, American Express e Elo. Também oferecemos pagamento via Pix para assinaturas anuais.'
        },
        {
          question: 'Como funciona o plano Empresarial?',
          answer: 'O plano Empresarial é personalizado de acordo com as necessidades da sua empresa. Ele inclui múltiplos usuários, dashboards de gestão e funcionalidades exclusivas. Entre em contato com nossa equipe comercial para uma proposta personalizada.'
        },
        {
          question: 'Ao fazer upgrade, perco minhas conexões atuais?',
          answer: 'Não, todas as suas conexões e dados são mantidos ao fazer upgrade de plano. Você apenas ganha acesso a mais recursos e possibilidades.'
        }
      ],
      openFaqs: [0],
      showUpgradeModal: false,
      paymentInfo: {
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvv: ''
      }
    }
  },
  computed: {
    userHasActivePlan() {
      return this.user.plan === 'RO' || this.user.plan === 'CP';
    }
  },
  methods: {
    toggleFaq(index) {
      if (this.openFaqs.includes(index)) {
        this.openFaqs = this.openFaqs.filter(i => i !== index);
      } else {
        this.openFaqs.push(index);
      }
    },
    processUpgrade() {
      // Here you would handle the payment processing
      // For demo purposes, just close the modal and show a success message
      this.showUpgradeModal = false;
      this.user.plan = 'CP';
      alert('Parabéns! Seu upgrade para o plano Premium foi realizado com sucesso.');
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

/* Current Plan Section */
.current-plan-content {
  padding: 24px;
}

.current-plan-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 16px;
}

.plan-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: rgba(25, 118, 210, 0.12);
  color: #1976d2;
  margin-bottom: 12px;
}

.plan-badge.premium {
  background-color: rgba(156, 39, 176, 0.12);
  color: #9c27b0;
}

.current-plan-description {
  font-size: 0.975rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 12px;
}

.renewal-info {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.current-plan-usage {
  margin-bottom: 24px;
}

.usage-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 8px;
}

.progress-bar-container {
  height: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar {
  height: 100%;
  background-color: #1976d2;
  border-radius: 4px;
}

.usage-details {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.current-plan-actions {
  display: flex;
  justify-content: flex-end;
}

/* Plans Toggle */
.view-toggle {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.toggle-button {
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 4px 12px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
}

.toggle-button:first-of-type {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: none;
}

.toggle-button:last-of-type {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.toggle-button.active {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}

.discount-badge {
  display: inline-block;
  background-color: #4caf50;
  color: white;
  font-size: 0.75rem;
  padding: 2px 4px;
  border-radius: 4px;
  margin-left: 4px;
}

/* Plans Cards */
.plans-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

.plan-card {
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.plan-card.highlighted {
  border: 2px solid #9c27b0;
  box-shadow: 0 4px 10px rgba(156, 39, 176, 0.2);
}

.plan-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #9c27b0;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
}

.plan-header {
  padding: 24px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.plan-name {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 12px;
}

.plan-price {
  margin-bottom: 12px;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.price-period {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.plan-description {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0;
}

.plan-features {
  padding: 24px;
  flex-grow: 1;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.feature-item:last-child {
  margin-bottom: 0;
}

.feature-icon {
  font-size: 20px;
  margin-right: 12px;
}

.feature-icon.included {
  color: #4caf50;
}

.feature-icon.excluded {
  color: #e0e0e0;
}

.feature-text {
  font-size: 0.875rem;
}

.plan-actions {
  padding: 0 24px 24px;
}

/* Benefits Tabs */
.benefits-tabs {
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  margin-bottom: 24px;
}

.tab-button {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  white-space: nowrap;
  background: transparent;
  border: none;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: color 0.3s;
  position: relative;
}

.tab-button.active {
  color: #1976d2;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1976d2;
}

.tab-icon {
  font-size: 20px;
  margin-right: 8px;
}

/* Benefits Section */
.benefit-section {
  padding: 16px 0;
}

.benefit-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 24px;
  text-align: center;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
}

.benefit-icon {
  font-size: 32px;
  margin-right: 16px;
  color: rgba(0, 0, 0, 0.54);
}

.benefit-icon.premium {
  color: #9c27b0;
}

.benefit-text h4 {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 8px;
}

.benefit-text p {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

/* Testimonials */
.testimonials-slider {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 8px 4px;
  margin: 0 -4px;
}

.testimonial-card {
  flex: 0 0 300px;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.testimonial-rating {
  margin-bottom: 16px;
}

.star-icon {
  color: #ffc107;
  font-size: 20px;
}

.testimonial-content {
  flex-grow: 1;
  margin-bottom: 16px;
}

.testimonial-text {
  font-size: 0.875rem;
  line-height: 1.5;
  font-style: italic;
  color: rgba(0, 0, 0, 0.7);
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 4px;
}

.author-title {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

/* FAQ Section */
.faq-list {
  display: flex;
  flex-direction: column;
}

.faq-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;
}

.faq-question h3 {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

.faq-answer {
  padding-bottom: 16px;
}

.faq-answer p {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 1001;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
}

.modal-close {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

/* Upgrade Modal Specific */
.upgrade-info {
  margin-bottom: 20px;
}

.upgrade-info h4 {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 12px;
}

.upgrade-price {
  margin-bottom: 16px;
}

.billing-toggle {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  font-size: 0.875rem;
}

.toggle-group {
  margin-left: 12px;
}

.payment-details {
  margin-top: 24px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .plans-container {
    flex-direction: column;
    align-items: center;
  }
  
  .plan-card {
    width: 100%;
    max-width: none;
  }
  
  .benefit-item {
    margin-bottom: 32px;
  }
  
  .benefits-tabs {
    justify-content: flex-start;
  }
  
  .testimonials-slider {
    padding-bottom: 16px;
  }
  
  .testimonial-card {
    flex: 0 0 260px;
  }
}
</style>

