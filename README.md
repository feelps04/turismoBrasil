# Turismo Brasil - Plataforma de Networking Profissional

![Turismo Brasil Logo](https://via.placeholder.com/150x150?text=TB)

## Introdução

Turismo Brasil é uma plataforma de networking profissional exclusiva para o setor de turismo brasileiro. Similar ao LinkedIn, mas especificamente projetada para conectar profissionais e empresas do turismo, como guias, agências de viagens, hotéis, restaurantes e serviços de transporte. A plataforma facilita a descoberta de parceiros de negócios, o crescimento de redes profissionais e a expansão de oportunidades no setor de turismo.

O objetivo principal é resolver o desafio da fragmentação no mercado de turismo brasileiro, onde muitas vezes é difícil para profissionais independentes ganharem visibilidade e para empresas maiores encontrarem parceiros qualificados em diferentes regiões do país.

## Funcionalidades

- **Perfis Profissionais Detalhados**: Informações específicas para o setor de turismo, incluindo especialidades, certificações e experiência
- **Busca Avançada**: Filtros por localização, categoria profissional, experiência e avaliações
- **Gestão de Conexões**: Acompanhamento e gerenciamento de sua rede profissional
- **Planos e Assinaturas**: Opções de plano Regular e Premium com diferentes benefícios
- **Dashboard Personalizado**: Visualização de atividades recentes, empresas sugeridas e contatos
- **Sistema de Avaliações**: Verificação da qualidade dos profissionais através de avaliações de clientes e parceiros
- **Sugestões de Correção**: Possibilidade de sugerir melhorias e correções para informações do setor

## Stack Tecnológica

- **Frontend**: Vue.js 3
- **UI Framework**: Vuetify 3
- **Roteamento**: Vue Router 4
- **Ícones**: Material Design Icons
- **Estilização**: CSS customizado com flexbox e grid
- **Gerenciamento de Pacotes**: Yarn/NPM
- **Build Tool**: Vue CLI

## Começando

### Pré-requisitos

- Node.js (v14.x ou superior)
- Yarn ou NPM

### Instalação

1. Clone o repositório
   ```bash
   git clone https://github.com/feelps04/turismoBrasil.git
   cd turismoBrasil
   ```

2. Instale as dependências
   ```bash
   yarn install
   # ou
   npm install
   ```

3. Execute o servidor de desenvolvimento
   ```bash
   yarn serve
   # ou
   npm run serve
   ```

4. Acesse o aplicativo em http://localhost:8080

### Compilação para Produção

```bash
yarn build
# ou
npm run build
```

## Estrutura do Projeto

```
turismoBrasil/
├── public/               # Arquivos públicos estáticos
├── src/                  # Código fonte
│   ├── assets/           # Recursos (imagens, fontes)
│   ├── components/       # Componentes Vue reutilizáveis
│   ├── views/            # Componentes de página/visualização
│   │   ├── Connections.vue  # Página de conexões
│   │   ├── Home.vue         # Página inicial/dashboard
│   │   ├── Plans.vue        # Página de planos e assinaturas
│   │   ├── Profile.vue      # Página de perfil do usuário
│   │   ├── Search.vue       # Página de busca de profissionais
│   │   └── Suggest.vue      # Página para sugestões de correção
│   ├── App.vue           # Componente raiz
│   ├── main.js           # Ponto de entrada da aplicação
│   └── router.js         # Configuração de rotas
├── .gitignore            # Arquivos ignorados pelo Git
├── babel.config.js       # Configuração do Babel
├── package.json          # Dependências e scripts
└── vue.config.js         # Configuração do Vue CLI
```

## Screenshots

*Screenshots serão adicionados à medida que o desenvolvimento avança*

### Dashboard Principal
![Dashboard](https://via.placeholder.com/800x450?text=Dashboard+Preview)

### Página de Busca
![Busca](https://via.placeholder.com/800x450?text=Search+Page+Preview)

### Perfil Profissional
![Perfil](https://via.placeholder.com/800x450?text=Profile+Preview)

## Roadmap

Funcionalidades planejadas para futuras versões:

- **Sistema de Mensagens**: Comunicação direta entre profissionais
- **Integração com APIs de Reserva**: Conexões com sistemas de reserva populares
- **Verificação de Credenciais**: Parceria com órgãos oficiais para verificação de certificações
- **Aplicativo Mobile**: Versões para iOS e Android
- **Marketplace de Serviços**: Contratação direta de serviços através da plataforma
- **Estatísticas e Analytics**: Métricas para profissionais acompanharem seu desempenho
- **Conteúdo Educativo**: Artigos e tutoriais sobre o setor de turismo

## Contribuindo

Contribuições são sempre bem-vindas! Veja como você pode ajudar:

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Siga o estilo de código existente
- Atualize o README.md com detalhes de mudanças na interface, se aplicável
- O versionamento usa [SemVer](http://semver.org/)
- Todas as alterações devem ser documentadas em CHANGELOG.md

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License

Copyright (c) 2025 Turismo Brasil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contato

Felipe - [@feelps04](https://github.com/feelps04)

Link do Projeto: [https://github.com/feelps04/turismoBrasil](https://github.com/feelps04/turismoBrasil)
