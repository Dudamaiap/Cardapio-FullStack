# Cardápio Digital — Aplicação Fullstack

Uma aplicação fullstack moderna para gerenciamento de um **Cardápio Digital**, construída com **Java Spring Boot + PostgreSQL** no backend e **React + TypeScript + Vite** no frontend.
Permite visualizar itens do cardápio e cadastrar novos pratos com imagem, nome e preço. Esse projeto foi criado de maneira a concluir o meu curso de Full Stack.

## Tecnologias Utilizadas

### **Backend — Java Spring Boot**

* Java 21
* Spring Boot 3
* Spring Web
* Spring Data JPA
* Lombok
* PostgreSQL
* Maven

### **Frontend — React + TypeScript**

* React
* TypeScript
* Vite
* Axios
* React Query (TanStack Query)
* CSS Modules

## Estrutura do Projeto

### **Backend**

```
backend/
└── src/
    └── main/java/com/example/Cardapio/
        ├── Controller/
        │   └── FoodController.java       # Endpoints REST
        ├── Food/
        │   ├── Food.java                 # Entidade JPA
        │   ├── FoodRepository.java       # Repositório JPA
        │   ├── FoodRequestDTO.java       # DTO para criação
        │   └── FoodResponseDTO.java      # DTO para listagem
        └── CardapioApplication.java      # Classe principal Spring Boot
```

### **Frontend**

```
frontend/
└── src/
    ├── components/
    │   ├── card/
    │   │   ├── card.tsx                 # Card de item
    │   │   └── card.css                 
    │   └── create modal/
    │       ├── create-modal.tsx         # Modal de cadastro
    │       └── modal.css
    │
    ├── hooks/
    │   ├── useFoodData.tsx              # Hook GET /food
    │   └── useFoodDataMutate.ts         # Hook POST /food
    │
    ├── interface/
    │   └── FoodData.ts                  # Tipagem FoodData
    │
    ├── App.tsx                          # Montagem da interface
    ├── App.css
    ├── index.css
    └── main.tsx                         # Ponto de entrada
```

## API — Endpoints do Backend

### **GET /food**

Retorna a lista completa de itens cadastrados.

### **POST /food**

Cadastra um novo item no cardápio.
Body esperado (JSON):

```json
{
  "title": "Nome do prato",
  "price": 29.90,
  "image": "https://url-da-imagem"
}
```

## Funcionalidades

### Backend

* API REST completa
* DTOs para segurança e organização
* Persistência em PostgreSQL
* CORS configurado para permitir acesso do frontend
* Mapeamento JPA com ID auto-gerado

### 💻 Frontend

* Listagem automatizada dos itens com React Query
* Cadastro de novos alimentos via modal
* Atualização automática após POST (`invalidateQueries`)
* Tipagem forte com TypeScript
* Componentes reutilizáveis
* Separação clara entre interface + lógica (hooks e DTOs)

## Hooks (Frontend)

### GET — Buscar lista (`useFoodData`)

Responsável por consumir `/food` e retornar lista sempre atualizada.

### POST — Criar item (`useFoodDataMutate`)

Usa `useMutation` + invalidation automática:

```ts
queryClient.invalidateQueries({ queryKey: ['food-data'] });
```

##  Executando o Projeto

### **Backend**

1. Configure seu banco PostgreSQL:

```
jdbc:postgresql://localhost:5432/food
username=postgres
password=****
```

2. Na pasta `backend/`, execute:

```bash
mvn spring-boot:run
```

Backend rodando em:

```
http://localhost:8080
```

### **Frontend**

Na pasta `frontend/`:

```bash
# Instalar dependências
npm install

# Rodar app
npm run dev
```

Frontend rodando em:

```
http://localhost:5173
```

##  Scripts Disponíveis

### Frontend

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run preview    # Visualizar build
npm run lint       # Linter
```

### Backend (Maven)

```bash
mvn spring-boot:run
mvn clean package
```
## Requisitos para Funcionamento

* PostgreSQL rodando e acessível
* Backend rodando na porta **8080**
* Frontend rodando na porta **5173**
* CORS habilitado no backend
* React Query configurado com QueryClientProvider

