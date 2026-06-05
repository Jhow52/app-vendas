# App Vendas — Ionic + Angular + TypeScript

## 📋 Estrutura do Projeto

```
app-vendas/
├── src/
│   └── app/
│       ├── guards/
│       │   └── auth.guard.ts           # Proteção de rotas
│       ├── models/
│       │   ├── usuario.model.ts
│       │   ├── produto.model.ts
│       │   ├── cliente.model.ts
│       │   └── venda.model.ts
│       ├── pages/
│       │   ├── login/                  # Tela de Login
│       │   ├── home/                   # Menu Principal
│       │   ├── cadastro/
│       │   │   ├── usuario/            # Cadastro de Usuários
│       │   │   ├── produto/            # Cadastro de Produtos
│       │   │   └── cliente/            # Cadastro de Clientes
│       │   ├── venda/                  # Registro de Vendas
│       │   ├── receber/                # Contas a Receber
│       │   └── relatorios/             # Relatórios
│       ├── services/
│       │   ├── auth.service.ts
│       │   ├── usuario.service.ts
│       │   ├── produto.service.ts
│       │   ├── cliente.service.ts
│       │   ├── venda.service.ts
│       │   └── receber.service.ts
│       ├── app-routing.module.ts
│       ├── app.component.ts
│       ├── app.component.html
│       └── app.module.ts
```

## 🚀 Como rodar o projeto

### 1. Instalar dependências globais
```bash
npm install -g @ionic/cli @angular/cli
```

### 2. Instalar dependências do projeto
```bash
cd app-vendas
npm install
```

### 3. Rodar o projeto
```bash
ionic serve
```

Acesse: http://localhost:8100

## 🔑 Usuário padrão para teste
- **E-mail:** admin@admin.com
- **Senha:** 123456

## 📦 Tecnologias utilizadas
- Ionic 7
- Angular 16
- TypeScript 5
- localStorage (persistência de dados)

## 📄 Módulos do sistema
| Módulo | Descrição |
|--------|-----------|
| Login | Autenticação com e-mail e senha |
| Cadastro de Usuário | CRUD completo de usuários |
| Cadastro de Produto | CRUD completo de produtos |
| Cadastro de Cliente | CRUD completo de clientes |
| Venda | Registro de vendas com itens |
| Receber | Controle de contas a receber |
| Relatórios | Resumo de vendas e recebimentos |
