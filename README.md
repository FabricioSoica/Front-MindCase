# Front-MindCase

Interface de usuário (frontend) para a aplicação de blog MindCase, desenvolvida com React, TypeScript e Chakra UI.

## 🚀 Tecnologias

- React
- TypeScript
- Chakra UI
- React Router DOM
- Axios
- SweetAlert2

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- O backend da aplicação rodando (por padrão em `http://localhost:3000`)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/FabricioSoica/Front-MindCase
cd Front-MindCase
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

## ⚙️ Configuração

A URL base da API do backend está configurada em `src/config/axios.ts`. Por padrão, é `http://localhost:3000/api`. Se o seu backend estiver rodando em um endereço/porta diferente, atualize este arquivo:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

```

## ▶️ Rodando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta disponível).

## ✨ Autor

[FabricioSoica](https://github.com/fabriciosoica)
