# 💻 Chatter Frontend

O frontend do Chatter é uma aplicação React de página única (SPA) de alta performance, desenvolvida para oferecer uma experiência de chat em tempo real fluida, com uma interface moderna e gerenciamento de estado robusto via GraphQL.

---

## 🚀 Tecnologias Core

- **React (Vite)**: Biblioteca principal para construção da interface de usuário.
- **TypeScript**: Adiciona tipagem estática, reduzindo bugs e melhorando a manutenção.
- **Apollo Client**: Gerenciador de estado do servidor que lida com Queries, Mutations e Subscriptions.
- **Material UI (MUI)**: Framework de componentes para um design consistente e responsivo.
- **GraphQL CodeGen**: Ferramenta que gera automaticamente tipos TypeScript baseados no esquema do backend.

---

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para configurar o ambiente de desenvolvimento local.

### **1. Pré-requisitos**

- **Backend**: O serviço de API deve estar em execução (padrão: `http://localhost:3333`).
- **Node.js**: Versão 18 ou superior instalada.

### **2. Instalação e Execução**

Para rodar o projeto, execute os seguintes comandos no seu terminal:

```bash
# Entre na pasta do frontend
cd chatter-frontend

# Instale as dependências do projeto
npm install

# Gere os tipos do GraphQL (Codegen)
# Fundamental para sincronizar as queries do frontend com o schema do backend
npm run codegen

# Inicie o servidor de desenvolvimento
npm run dev
```
