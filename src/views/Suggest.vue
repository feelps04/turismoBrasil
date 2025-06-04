<template>
  <div>
    <h1 class="page-title">Sugerir Correções</h1>
    
    <!-- Introduction Card -->
    <div class="card mb-6">
      <div class="card-content">
        <div class="intro-content">
          <div class="intro-icon">
            <span class="material-icons">lightbulb</span>
          </div>
          <div class="intro-text">
            <h2>Ajude a melhorar nossa plataforma</h2>
            <p>Suas sugestões e feedback são essenciais para melhorarmos continuamente a experiência de todos os profissionais de turismo. Compartilhe suas ideias, reporte problemas ou sugira novas funcionalidades.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <!-- New Suggestion Form -->
      <div class="col col-12 col-lg-7">
        <div class="card mb-6">
          <div class="card-header">
            <h2 class="card-title">Nova Sugestão</h2>
          </div>
          
          <div class="card-content">
            <form @submit.prevent="submitSuggestion">
              <div class="form-group">
                <label>Título <span class="required">*</span></label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="newSuggestion.title" 
                  placeholder="Um título claro e conciso"
                  required
                >
              </div>
              
              <div class="form-group">
                <label>Categoria <span class="required">*</span></label>
                <select class="form-control" v-model="newSuggestion.category" required>
                  <option value="">Selecione uma categoria</option>
                  <option v-for="(category, index) in categories" :key="index" :value="category.value">
                    {{ category.label }}
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Descrição <span class="required">*</span></label>
                <textarea 
                  class="form-control" 
                  v-model="newSuggestion.description" 
                  placeholder="Descreva sua sugestão ou problema em detalhes. Quanto mais específico, melhor poderemos atender."
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <div class="form-group">
                <label>Impacto</label>
                <select class="form-control" v-model="newSuggestion.impact">
                  <option value="low">Baixo - Uma melhoria seria bem-vinda</option>
                  <option value="medium">Médio - Afeta minha experiência, mas tenho alternativas</option>
                  <option value="high">Alto - Limita significativamente meu uso da plataforma</option>
                  <option value="critical">Crítico - Impede completamente o uso de um recurso</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Anexos (opcional)</label>
                <div class="file-upload">
                  <button type="button" class="btn btn-outline-primary" @click="triggerFileInput">
                    <span class="material-icons">attach_file</span>
                    Selecionar Arquivo
                  </button>
                  <span class="file-name" v-if="newSuggestion.attachmentName">
                    {{ newSuggestion.attachmentName }}
                    <button type="button" class="btn-clear" @click="clearAttachment">
                      <span class="material-icons">close</span>
                    </button>
                  </span>
                  <span class="file-info" v-else>Formatos aceitos: JPG, PNG, PDF (máx. 5MB)</span>
                  <input 
                    type="file" 
                    ref="fileInput" 
                    style="display: none" 
                    @change="handleFileUpload"
                    accept=".jpg,.jpeg,.png,.pdf"
                  >
                </div>
              </div>
              
              <div class="form-actions">
                <button type="button" class="btn btn-outline-secondary" @click="resetForm">Limpar</button>
                <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                  <span class="material-icons spinner" v-if="isSubmitting">refresh</span>
                  {{ isSubmitting ? 'Enviando...' : 'Enviar Sugestão' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Process Information -->
      <div class="col col-12 col-lg-5">
        <div class="card mb-6">
          <div class="card-header">
            <h2 class="card-title">Como Funciona</h2>
          </div>
          
          <div class="card-content">
            <div class="process-steps">
              <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Envie sua sugestão</h3>
                  <p>Preencha o formulário com os detalhes da sua sugestão ou problema encontrado.</p>
                </div>
              </div>
              
              <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Análise pela equipe</h3>
                  <p>Nossa equipe de desenvolvimento analisará sua sugestão e classificará sua prioridade.</p>
                </div>
              </div>
              
              <div class="process-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Feedback sobre o status</h3>
                  <p>Você receberá notificações sobre mudanças de status da sua sugestão.</p>
                </div>
              </div>
              
              <div class="process-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Implementação</h3>
                  <p>Sugestões aprovadas serão adicionadas ao nosso plano de desenvolvimento e implementadas.</p>
                </div>
              </div>
            </div>
            
            <div class="info-note">
              <span class="material-icons info-icon">info</span>
              <p>Revisamos todas as sugestões, mas não podemos garantir que todas serão implementadas. Priorizamos com base no impacto para a comunidade e viabilidade técnica.</p>
            </div>
          </div>
        </div>
        
        <!-- Categories Info -->
        <div class="card mb-6">
          <div class="card-header">
            <h2 class="card-title">Categorias</h2>
          </div>
          
          <div class="card-content">
            <div class="categories-info">
              <div v-for="(category, index) in categories" :key="index" class="category-item">
                <span class="material-icons category-icon" :style="{ color: category.color }">{{ category.icon }}</span>
                <div class="category-details">
                  <h3>{{ category.label }}</h3>
                  <p>{{ category.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Previous Suggestions -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Minhas Sugestões</h2>
        <div class="card-actions">
          <select v-model="filterStatus" class="form-control form-control-sm">
            <option value="all">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="reviewing">Em análise</option>
            <option value="approved">Aprovado</option>
            <option value="implemented">Implementado</option>
            <option value="declined">Recusado</option>
          </select>
        </div>
      </div>
      
      <div class="card-content">
        <div v-if="filteredSuggestions.length === 0" class="empty-state">
          <span class="material-icons empty-icon">inbox</span>
          <h3>Nenhuma sugestão encontrada</h3>
          <p v-if="previousSuggestions.length === 0">
            Você ainda não enviou nenhuma sugestão. Use o formulário acima para enviar sua primeira sugestão.
          </p>
          <p v-else>
            Nenhuma sugestão corresponde ao filtro selecionado.
          </p>
        </div>
        
        <div v-else class="suggestions-list">
          <div v-for="(suggestion, index) in filteredSuggestions" :key="index" class="suggestion-item">
            <div class="suggestion-header">
              <h3 class="suggestion-title">{{ suggestion.title }}</h3>
              <div class="suggestion-status" :class="'status-' + suggestion.status">
                {{ getStatusLabel(suggestion.status) }}
              </div>
            </div>
            
            <div class="suggestion-category">
              <span class="material-icons category-icon" :style="{ color: getCategoryColor(suggestion.category) }">
                {{ getCategoryIcon(suggestion.category) }}
              </span>
              {{ getCategoryLabel(suggestion.category) }}
            </div>
            
            <div class="suggestion-content">
              <p>{{ suggestion.description }}</p>
            </div>
            
            <div class="suggestion-meta">
              <div class="suggestion-date">
                <span class="material-icons meta-icon">calendar_today</span>
                Enviado em {{ suggestion.dateSubmitted }}
              </div>
              
              <div class="suggestion-id">
                <span class="material-icons meta-icon">tag</span>
                ID: {{ suggestion.id }}
              </div>
            </div>
            
            <div class="suggestion-footer" v-if="suggestion.feedback">
              <div class="feedback-box">
                <h4>Feedback da equipe</h4>
                <p>{{ suggestion.feedback }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success Modal -->
    <div class="modal" v-if="showSuccessModal">
      <div class="modal-backdrop" @click="showSuccessModal = false"></div>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header success">
            <span class="material-icons success-icon">check_circle</span>
            <button class="modal-close" @click="showSuccessModal = false">
              <span class="material-icons">close</span>
            </button>
          </div>
          
          <div class="modal-body">
            <h3 class="modal-title text-center">Sugestão Enviada com Sucesso!</h3>
            <p class="text-center">Obrigado por contribuir para a melhoria da nossa plataforma. Sua sugestão foi registrada e será analisada pela nossa equipe.</p>
            
            <div class="suggestion-confirmation">
              <div class="confirmation-field">
                <span class="field-label">ID da Sugestão:</span>
                <span class="field-value">{{ submittedSuggestion.id }}</span>
              </div>
              
              <div class="confirmation-field">
                <span class="field-label">Título:</span>
                <span class="field-value">{{ submittedSuggestion.title }}</span>
              </div>
              
              <div class="confirmation-field">
                <span class="field-label">Categoria:</span>
                <span class="field-value">{{ getCategoryLabel(submittedSuggestion.category) }}</span>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-primary btn-block" @click="showSuccessModal = false">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Suggest',
  data() {
    return {
      // Form data
      newSuggestion: {
        title: '',
        category: '',
        description: '',
        impact: 'medium',
        attachment: null,
        attachmentName: ''
      },
      
      // UI states
      isSubmitting: false,
      showSuccessModal: false,
      filterStatus: 'all',
      
      // Submitted suggestion (for success modal)
      submittedSuggestion: {
        id: '',
        title: '',
        category: ''
      },
      
      // Categories
      categories: [
        {
          label: 'Bug ou Erro',
          value: 'bug',
          icon: 'bug_report',
          color: '#f44336',
          description: 'Reporte problemas técnicos, erros ou comportamentos inesperados na plataforma.'
        },
        {
          label: 'Nova Funcionalidade',
          value: 'feature',
          icon: 'stars',
          color: '#2196f3',
          description: 'Sugira novas ferramentas ou recursos que poderiam melhorar a plataforma.'
        },
        {
          label: 'Melhoria de Interface',
          value: 'ui',
          icon: 'palette',
          color: '#9c27b0',
          description: 'Sugira melhorias de usabilidade, layout ou design da plataforma.'
        },
        {
          label: 'Correção de Conteúdo',
          value: 'content',
          icon: 'article',
          color: '#4caf50',
          description: 'Reporte erros ou imprecisões em textos, traduções ou informações.'
        },
        {
          label: 'Desempenho',
          value: 'performance',
          icon: 'speed',
          color: '#ff9800',
          description: 'Reporte problemas de velocidade, tempo de carregamento ou eficiência.'
        },
        {
          label: 'Outros',
          value: 'other',
          icon: 'more_horiz',
          color: '#607d8b',
          description: 'Qualquer outro tipo de sugestão que não se enquadre nas categorias acima.'
        }
      ],
      
      // Previous suggestions
      previousSuggestions: [
        {
          id: 'SUG-2025-0042',
          title: 'Adicionar filtro por região no mapa de profissionais',
          category: 'feature',
          description: 'Seria útil poder filtrar profissionais por região específica no mapa interativo, não apenas por estado/cidade. Assim poderíamos localizar guias por regiões turísticas como "Litoral Norte de SP" ou "Serra Gaúcha".',
          status: 'reviewing',
          dateSubmitted: '01/06/2025',
          feedback: 'Estamos avaliando a viabilidade técnica desta funcionalidade. Obrigado pela sugestão!'
        },
        {
          id: 'SUG-2025-0031',
          title: 'Erro no formulário de edição de perfil',
          category: 'bug',
          description: 'Quando tento atualizar meu número de telefone no perfil, recebo uma mensagem de erro dizendo "Formato inválido", mesmo usando o formato correto com DDD.',
          status: 'implemented',
          dateSubmitted: '28/05/2025',
          feedback: 'Bug corrigido na versão 2.3.4. Agora o sistema aceita diferentes formatos de números de telefone. Obrigado por reportar!'
        },
        {
          id: 'SUG-2025-0027',
          title: 'Melhorar contraste de texto nos cards',
          category: 'ui',
          description: 'O texto cinza claro sobre fundo branco nos cards de profissionais tem pouco contraste, dificultando a leitura para pessoas com dificuldades visuais.',
          status: 'approved',
          dateSubmitted: '25/05/2025',
          feedback: 'Concordamos com sua observação. Esta melhoria de acessibilidade será implementada na próxima atualização.'
        },
        {
          id: 'SUG-2025-0018',
          title: 'Opção para exportar contatos em formato CSV',
          category: 'feature',
          description: 'Gostaria de poder exportar minha lista de contatos/conexões em formato CSV para usar em outras ferramentas de gestão.',
          status: 'pending',
          dateSubmitted: '20/05/2025'
        },
        {
          id: 'SUG-2025-0010',
          title: 'Implementar modo escuro (dark mode)',
          category: 'ui',
          description: 'Seria ótimo ter a opção de um tema escuro para uso noturno e economia de bateria.',
          status: 'declined',
          dateSubmitted: '15/05/2025',
          feedback: 'Embora seja uma boa sugestão, no momento nosso foco está em outros aspectos prioritários da plataforma. Manteremos esta sugestão para consideração futura.'
        }
      ]
    }
  },
  computed: {
    filteredSuggestions() {
      if (this.filterStatus === 'all') {
        return this.previousSuggestions;
      } else {
        return this.previousSuggestions.filter(s => s.status === this.filterStatus);
      }
    }
  },
  methods: {
    // Form handling
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert('O arquivo selecionado excede o limite de 5MB.');
          this.$refs.fileInput.value = '';
          return;
        }
        
        this.newSuggestion.attachment = file;
        this.newSuggestion.attachmentName = file.name;
      }
    },
    
    clearAttachment() {
      this.newSuggestion.attachment = null;
      this.newSuggestion.attachmentName = '';
      this.$refs.fileInput.value = '';
    },
    
    resetForm() {
      this.newSuggestion = {
        title: '',
        category: '',
        description: '',
        impact: 'medium',
        attachment: null,
        attachmentName: ''
      };
      
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },
    
    submitSuggestion() {
      // Simulate form submission
      this.isSubmitting = true;
      
      // Generate a fake ID for the demo
      const suggestionId = 'SUG-2025-' + Math.floor(1000 + Math.random() * 9000);
      
      // Store submitted suggestion data for the confirmation modal
      this.submittedSuggestion = {
        id: suggestionId,
        title: this.newSuggestion.title,
        category: this.newSuggestion.category
      };
      
      // Simulate API delay
      setTimeout(() => {
        // Add to previous suggestions
        this.previousSuggestions.unshift({
          id: suggestionId,
          title: this.newSuggestion.title,
          category: this.newSuggestion.category,
          description: this.newSuggestion.description,
          status: 'pending',
          dateSubmitted: new Date().toLocaleDateString('pt-BR')
        });
        
        this.isSubmitting = false;
        this.showSuccessModal = true;
        this.resetForm();
      }, 1500);
    },
    
    // Helper methods
    getStatusLabel(status) {
      const statusMap = {
        'pending': 'Pendente',
        'reviewing': 'Em análise',
        'approved': 'Aprovado',
        'implemented': 'Implementado',
        'declined': 'Recusado'
      };
      
      return statusMap[status] || status;
    },
    
    getCategoryLabel(categoryValue) {
      const category = this.categories.find(c => c.value === categoryValue);
      return category ? category.label : categoryValue;
    },
    
    getCategoryIcon(categoryValue) {
      const category = this.categories.find(c => c.value === categoryValue);
      return category ? category.icon : 'help';
    },
    
    getCategoryColor(categoryValue) {
      const category = this.categories.find(c => c.value === categoryValue);
      return category ? category.color : '#757575';
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

/* Introduction Card */
.intro-content {
  display: flex;
  align-items: center;
  padding: 16px;
}

.intro-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: rgba(25, 118, 210, 0.12);
  color: #1976d2;
  border-radius: 50%;
  margin-right: 24px;
  flex-shrink: 0;
}

.intro-icon .material-icons {
  font-size: 32px;
}

.intro-text h2 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.intro-text p {
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.5;
}

/* Form Styling */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.required {
  color: #f44336;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #1976d2;
}

select.form-control {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='rgba(0,0,0,0.54)' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 32px;
}

.form-control-sm {
  padding: 6px 10px;
  font-size: 0.875rem;
  max-width: 200px;
}

textarea.form-control {
  min-height: 120px;
  resize: vertical;
}

.file-upload {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.file-name {
  margin-left: 12px;
  display: flex;
  align-items: center;
}

.file-info {
  margin-left: 12px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 0.875rem;
}

.btn-clear {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.54);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.spinner {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Process Steps */
.process-steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}

.process-step {
  display: flex;
  align-items: flex-start;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #1976d2;
  color: white;
  border-radius: 50%;
  font-weight: 500;
  margin-right: 16px;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 4px;
}

.step-content p {
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
}

.info-note {
  display: flex;
  align-items: flex-start;
  background-color: rgba(3, 169, 244, 0.08);
  padding: 16px;
  border-radius: 4px;
  border-left: 4px solid #03a9f4;
}

.info-icon {
  color: #03a9f4;
  margin-right: 12px;
  flex-shrink: 0;
}

.info-note p {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
}

/* Categories Info */
.categories-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-item {
  display: flex;
  align-items: flex-start;
}

.category-icon {
  margin-right: 12px;
  flex-shrink: 0;
}

.category-details h3 {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 4px;
}

.category-details p {
  margin: 0;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
}

/* Previous Suggestions */
.card-actions {
  display: flex;
  align-items: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  color: rgba(0, 0, 0, 0.26);
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 8px;
}

.empty-state p {
  max-width: 400px;
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.suggestion-item {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 0.3s;
}

.suggestion-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.suggestion-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.suggestion-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
}

.suggestion-status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.6);
}

.status-pending {
  background-color: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.6);
}

.status-reviewing {
  background-color: rgba(3, 169, 244, 0.12);
  color: #0288d1;
}

.status-approved {
  background-color: rgba(156, 39, 176, 0.12);
  color: #9c27b0;
}

.status-implemented {
  background-color: rgba(76, 175, 80, 0.12);
  color: #43a047;
}

.status-declined {
  background-color: rgba(244, 67, 54, 0.12);
  color: #e53935;
}

.suggestion-category {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 12px;
}

.category-icon {
  font-size: 18px;
  margin-right: 8px;
}

.suggestion-content {
  margin-bottom: 16px;
}

.suggestion-content p {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.5;
}

.suggestion-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.suggestion-date, .suggestion-id {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.54);
}

.meta-icon {
  font-size: 16px;
  margin-right: 4px;
}

.suggestion-footer {
  margin-top: 16px;
}

.feedback-box {
  background-color: rgba(0, 0, 0, 0.04);
  padding: 12px;
  border-radius: 4px;
}

.feedback-box h4 {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 8px;
  color: rgba(0, 0, 0, 0.87);
}

.feedback-box p {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  font-style: italic;
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
  position: relative;
  z-index: 1001;
  width: 100%;
  max-width: 500px;
}

.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12);
  overflow: hidden;
}

.modal-header {
  position: relative;
  padding: 32px 24px 24px;
  display: flex;
  justify-content: center;
}

.modal-header.success {
  background-color: rgba(76, 175, 80, 0.12);
}

.success-icon {
  font-size: 48px;
  color: #43a047;
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.54);
}

.modal-body {
  padding: 0 24px 24px;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 16px;
}

.text-center {
  text-align: center;
}

.suggestion-confirmation {
  background-color: rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  margin-top: 24px;
}

.confirmation-field {
  display: flex;
  margin-bottom: 8px;
}

.confirmation-field:last-child {
  margin-bottom: 0;
}

.field-label {
  width: 120px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 0.875rem;
}

.field-value {
  font-weight: 500;
  font-size: 0.875rem;
}

.modal-footer {
  padding: 8px 24px 24px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .intro-content {
    flex-direction: column;
    text-align: center;
  }
  
  .intro-icon {
    margin-right: 0;
    margin-bottom: 16px;
  }
  
  .form-actions {
    flex-direction: column-reverse;
    gap: 8px;
  }
  
  .file-upload {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .file-name, .file-info {
    margin-left: 0;
    margin-top: 8px;
  }
  
  .suggestion-header {
    flex-direction: column;
  }
  
  .suggestion-status {
    margin-top: 8px;
  }
  
  .suggestion-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>

