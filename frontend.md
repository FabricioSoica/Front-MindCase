# Documentação da API - MindCase Blog

## Autenticação

### Registro de Usuário
- **URL**: `/api/users/register`
- **Método**: `POST`
- **Body**:
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "Senha@123"
}
```
- **Resposta (201)**:
```json
{
  "user": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@email.com"
  },
  "token": "jwt_token_aqui"
}
```
- **Erro (400)**:
```json
{
  "message": "Email já cadastrado"
}
```

### Login
- **URL**: `/api/users/login`
- **Método**: `POST`
- **Body**:
```json
{
  "email": "usuario@email.com",
  "password": "Senha@123"
}
```
- **Resposta (200)**:
```json
{
  "user": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@email.com"
  },
  "token": "jwt_token_aqui"
}
```
- **Erro (401)**:
```json
{
  "message": "Credenciais inválidas"
}
```

### Atualizar Usuário
- **URL**: `/api/users/update`
- **Método**: `PUT`
- **Headers**: `Authorization: Bearer jwt_token_aqui`
- **Body**:
```json
{
  "name": "Novo Nome",
  "password": "NovaSenha@123"
}
```
- **Resposta (200)**:
```json
{
  "user": {
    "id": 1,
    "name": "Novo Nome",
    "email": "usuario@email.com"
  },
  "token": "novo_jwt_token_aqui"
}
```

## Artigos

### Listar Artigos
- **URL**: `/api/articles`
- **Método**: `GET`
- **Query Params**:
  - `page`: número da página (default: 1)
  - `limit`: itens por página (default: 10)
- **Resposta (200)**:
```json
{
  "articles": [
    {
      "id": 1,
      "title": "Título do Artigo",
      "content": "Conteúdo do artigo...",
      "featuredImage": "nome_do_arquivo.jpg",
      "createdAt": "2024-02-20T00:00:00.000Z",
      "updatedAt": "2024-02-20T00:00:00.000Z",
      "User": {
        "id": 1,
        "name": "Nome do Autor",
        "email": "autor@email.com"
      }
    }
  ],
  "total": 100,
  "pages": 10,
  "currentPage": 1
}
```

### Buscar Artigo por ID
- **URL**: `/api/articles/:id`
- **Método**: `GET`
- **Resposta (200)**:
```json
{
  "id": 1,
  "title": "Título do Artigo",
  "content": "Conteúdo do artigo...",
  "featuredImage": "nome_do_arquivo.jpg",
  "createdAt": "2024-02-20T00:00:00.000Z",
  "updatedAt": "2024-02-20T00:00:00.000Z",
  "User": {
    "id": 1,
    "name": "Nome do Autor",
    "email": "autor@email.com"
  }
}
```
- **Erro (404)**:
```json
{
  "message": "Artigo não encontrado"
}
```

### Criar Artigo
- **URL**: `/api/articles`
- **Método**: `POST`
- **Headers**: `Authorization: Bearer jwt_token_aqui`
- **Body**: `multipart/form-data`
  - `title`: string
  - `content`: string
  - `featuredImage`: file (opcional)
- **Resposta (201)**:
```json
{
  "id": 1,
  "title": "Título do Artigo",
  "content": "Conteúdo do artigo...",
  "featuredImage": "nome_do_arquivo.jpg",
  "userId": 1,
  "createdAt": "2024-02-20T00:00:00.000Z",
  "updatedAt": "2024-02-20T00:00:00.000Z"
}
```

### Atualizar Artigo
- **URL**: `/api/articles/:id`
- **Método**: `PUT`
- **Headers**: `Authorization: Bearer jwt_token_aqui`
- **Body**: `multipart/form-data`
  - `title`: string
  - `content`: string
  - `featuredImage`: file (opcional)
- **Resposta (200)**:
```json
{
  "id": 1,
  "title": "Título Atualizado",
  "content": "Conteúdo atualizado...",
  "featuredImage": "novo_arquivo.jpg",
  "userId": 1,
  "createdAt": "2024-02-20T00:00:00.000Z",
  "updatedAt": "2024-02-20T00:00:00.000Z"
}
```
- **Erro (403)**:
```json
{
  "message": "Não autorizado"
}
```

### Deletar Artigo
- **URL**: `/api/articles/:id`
- **Método**: `DELETE`
- **Headers**: `Authorization: Bearer jwt_token_aqui`
- **Resposta (204)**: Sem conteúdo
- **Erro (403)**:
```json
{
  "message": "Não autorizado"
}
```

## Observações Importantes

1. **Autenticação**:
   - Todas as rotas protegidas precisam do header `Authorization: Bearer jwt_token_aqui`
   - O token expira em 24 horas
   - A senha deve conter:
     - Mínimo 8 caracteres
     - Pelo menos uma letra maiúscula
     - Pelo menos um caractere especial

2. **Upload de Imagens**:
   - As imagens são salvas na pasta `uploads`
   - O campo `featuredImage` retorna apenas o nome do arquivo
   - Para acessar a imagem: `http://localhost:3000/uploads/nome_do_arquivo.jpg`

3. **Paginação**:
   - Use os parâmetros `page` e `limit` para controlar a paginação
   - A resposta inclui metadados úteis como `total`, `pages` e `currentPage`

4. **Tratamento de Erros**:
   - Todos os erros retornam um objeto com a propriedade `message`
   - Códigos de status HTTP indicam o tipo de erro:
     - 400: Erro de validação
     - 401: Não autenticado
     - 403: Não autorizado
     - 404: Recurso não encontrado
     - 500: Erro interno do servidor 