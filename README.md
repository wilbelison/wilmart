# Wilmart

## Instalação

- Clone o repositório
- Execute `npm install` dentro da raiz da pasta do projeto
- Crie um arquivo chamado `.env` na raiz da pasta do projeto com as seguintes informações:

```
# PORTA
PORT=3000

# MongoDB URI
MONGO_URI=mongodb://localhost:27017/nome_do_seu_banco

# Secret da sessão
SESSION_SECRET=escolha_uma_palavra_secreta

# Credenciais do usuário admin
ADMIN_USERNAME=escolha_um_usuario
ADMIN_PASSWORD=escolha_uma_senha
```

## Primeiro acesso

- Rode o projeto com o comando `npm start`
- No seu primeiro acesso abra a rota `http://localhost:3000/setup` para criar um usuário admin
