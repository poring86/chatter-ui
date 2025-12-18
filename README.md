# 💻 Chatter Frontend

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Apollo Client](https://img.shields.io/badge/Apollo%20Client-311C87?style=for-the-badge&logo=apollographql&logoColor=white)](https://www.apollographql.com/docs/react/)
[![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 🌟 Visão Geral

O frontend do Chatter é uma aplicação React de página única (SPA) de alta performance, desenvolvida para oferecer uma experiência de chat em tempo real fluida, com uma interface moderna e gerenciamento de estado robusto via GraphQL.

---

### 📸 Preview da Interface

![Interface do Chatter](image.png)

---

## 🚀 Tecnologias Core

| Tecnologia          | Descrição                                                         |
| :------------------ | :---------------------------------------------------------------- |
| **React (Vite)**    | Biblioteca principal e build tool ultra-rápida.                   |
| **TypeScript**      | Tipagem estática para maior segurança e previsibilidade.          |
| **Apollo Client**   | Gerenciamento de Queries, Mutations e Subscriptions (WebSockets). |
| **Material UI**     | Framework de componentes para um design responsivo.               |
| **GraphQL CodeGen** | Geração automática de tipos baseada no Schema do backend.         |

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
