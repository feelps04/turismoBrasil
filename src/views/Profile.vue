<template>
  <div>
    <h1 class="page-title">Meu Perfil</h1>
    
    <div class="card mb-6">
      <div class="card-content">
        <div class="row">
          <!-- Profile Photo Section -->
          <div class="col col-12 col-md-4 text-center">
            <div class="avatar extra-large mb-4">
              <img :src="profile.avatar || 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Profile Photo">
              <div class="avatar-overlay">
                <button class="btn btn-text-light" @click="openPhotoUpload">
                  <span class="material-icons">edit</span>
                </button>
              </div>
            </div>
            <input type="file" ref="photoInput" style="display: none" accept="image/*" @change="handlePhotoUpload">
            <h3 class="text-h5 mb-1">{{ profile.name }}</h3>
            <p class="text-subtitle-1 mb-3">{{ profile.title }}</p>
            <div class="profile-status" :class="{'status-active': profile.active}">
              {{ profile.active ? 'Ativo' : 'Inativo' }}
            </div>
          </div>
          
          <!-- Main Profile Information -->
          <div class="col col-12 col-md-8">
            <div class="profile-actions mb-4">
              <button class="btn btn-primary" @click="editMode = !editMode">
                {{ editMode ? 'Cancelar' : 'Editar Perfil' }}
              </button>
              <button v-if="editMode" class="btn btn-success ml-2" @click="saveProfile">
                Salvar Alterações
              </button>
            </div>
            
            <!-- Tabs for different profile sections -->
            <div class="profile-tabs mb-4">
              <button 
                v-for="(tab, index) in tabs" 
                :key="index"
                class="tab-button" 
                :class="{ 'active': activeTab === index }"
                @click="activeTab = index"
              >
                {{ tab }}
              </button>
            </div>
            
            <!-- Personal Information Section -->
            <div v-if="activeTab === 0" class="profile-section">
              <h3 class="section-title">Informações Pessoais</h3>
              
              <div class="form-group">
                <label>Nome Completo</label>
                <input type="text" class="form-control" v-model="profile.name" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>Data de Nascimento</label>
                <input type="date" class="form-control" v-model="profile.birthdate" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>Documento (CPF)</label>
                <input type="text" class="form-control" v-model="profile.document" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>Gênero</label>
                <select class="form-control" v-model="profile.gender" :disabled="!editMode">
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="other">Outro</option>
                  <option value="prefer_not_to_say">Prefiro não informar</option>
                </select>
              </div>
            </div>
            
            <!-- Professional Information Section -->
            <div v-if="activeTab === 1" class="profile-section">
              <h3 class="section-title">Informações Profissionais</h3>
              
              <div class="form-group">
                <label>Título Profissional</label>
                <input type="text" class="form-control" v-model="profile.title" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>Empresa/Agência</label>
                <input type="text" class="form-control" v-model="profile.company" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>Cadastur</label>
                <input type="text" class="form-control" v-model="profile.registration" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>Áreas de Atuação</label>
                <select class="form-control" multiple v-model="profile.areas" :disabled="!editMode">
                  <option value="guia">Guia de Turismo</option>
                  <option value="agencia">Agência de Turismo</option>
                  <option value="hotel">Hotelaria</option>
                  <option value="restaurante">Restaurante</option>
                  <option value="transporte">Transporte</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Biografia Profissional</label>
                <textarea class="form-control" rows="4" v-model="profile.bio" :disabled="!editMode"></textarea>
              </div>
            </div>
            
            <!-- Contact Information Section -->
            <div v-if="activeTab === 2" class="profile-section">
              <h3 class="section-title">Informações de Contato</h3>
              
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" v-model="profile.email" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>Telefone</label>
                <input type="tel" class="form-control" v-model="profile.phone" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>Whatsapp</label>
                <input type="tel" class="form-control" v-model="profile.whatsapp" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>Endereço</label>
                <input type="text" class="form-control mb-2" v-model="profile.address.street" placeholder="Rua" :disabled="!editMode">
                <div class="row">
                  <div class="col col-6">
                    <input type="text" class="form-control mb-2" v-model="profile.address.city" placeholder="Cidade" :disabled="!editMode">
                  </div>
                  <div class="col col-6">
                    <input type="text" class="form-control mb-2" v-model="profile.address.state" placeholder="Estado" :disabled="!editMode">
                  </div>
                </div>
                <input type="text" class="form-control" v-model="profile.address.zipcode" placeholder="CEP" :disabled="!editMode">
              </div>
            </div>
            
            <!-- Social Media Section -->
            <div v-if="activeTab === 3" class="profile-section">
              <h3 class="section-title">Redes Sociais</h3>
              
              <div class="form-group">
                <label>
                  <span class="social-icon instagram">
                    <span class="material-icons">photo_camera</span>
                  </span>
                  Instagram
                </label>
                <input type="text" class="form-control" v-model="profile.social.instagram" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>
                  <span class="social-icon facebook">
                    <span class="material-icons">thumb_up</span>
                  </span>
                  Facebook
                </label>
                <input type="text" class="form-control" v-model="profile.social.facebook" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>
                  <span class="social-icon linkedin">
                    <span class="material-icons">business</span>
                  </span>
                  LinkedIn
                </label>
                <input type="text" class="form-control" v-model="profile.social.linkedin" :disabled="!editMode">
              </div>
              
              <div class="form-group">
                <label>
                  <span class="social-icon website">
                    <span class="material-icons">language</span>
                  </span>
                  Website
                </label>
                <input type="text" class="form-control" v-model="profile.social.website" :disabled="!editMode">
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
  name: 'Profile',
  data() {
    return {
      editMode: false,
      activeTab: 0,
      tabs: ['Pessoal', 'Profissional', 'Contato', 'Redes Sociais'],
      profile: {
        name: 'João Silva',
        title: 'Guia de Turismo',
        company: 'Agência Aventuras Brasil',
        avatar: null,
        birthdate: '1985-06-15',
        document: '123.456.789-00',
        gender: 'male',
        registration: 'MT-12345-SP',
        areas: ['guia', 'agencia'],
        bio: 'Guia de turismo com mais de 10 anos de experiência em ecoturismo e turismo de aventura. Especialista em trilhas e destinos naturais do Brasil.',
        active: true,
        email: 'joao.silva@exemplo.com',
        phone: '(11) 98765-4321',
        whatsapp: '(11) 98765-4321',
        address: {
          street: 'Rua das Flores, 123',
          city: 'São Paulo',
          state: 'SP',
          zipcode: '01234-567'
        },
        social: {
          instagram: '@joao_guiaturismo',
          facebook: 'joaosilva.guiaturismo',
          linkedin: 'joaosilva-guia',
          website: 'www.joaosilva.com.br'
        }
      }
    }
  },
  methods: {
    openPhotoUpload() {
      this.$refs.photoInput.click();
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profile.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveProfile() {
      // Here you would typically make an API call to save the profile
      // For now, we'll just toggle edit mode and show a success message
      this.$toast.success('Perfil atualizado com sucesso!');
      this.editMode = false;
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

.avatar.extra-large {
  width: 120px;
  height: 120px;
  position: relative;
  margin: 0 auto;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar:hover .avatar-overlay {
  opacity: 1;
}

.btn-text-light {
  color: white;
  background-color: transparent;
}

.profile-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #e0e0e0;
  color: #757575;
}

.profile-status.status-active {
  background-color: #c8e6c9;
  color: #2e7d32;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
}

.ml-2 {
  margin-left: 0.5rem;
}

.profile-tabs {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  overflow-x: auto;
}

.tab-button {
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.6);
  position: relative;
  transition: color 0.3s;
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

.section-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.87);
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #1976d2;
}

.form-control:disabled {
  background-color: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.6);
}

textarea.form-control {
  resize: vertical;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
}

.social-icon .material-icons {
  font-size: 16px;
  color: white;
}

.social-icon.instagram {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}

.social-icon.facebook {
  background-color: #1877f2;
}

.social-icon.linkedin {
  background-color: #0077b5;
}

.social-icon.website {
  background-color: #4caf50;
}

.btn-success {
  background-color: #4caf50;
  color: white;
}

.btn-success:hover {
  background-color: #388e3c;
}
</style>

