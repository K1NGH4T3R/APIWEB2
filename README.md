# Documentação da API de Gerenciamento de Atividades

## Visão Geral

Esta documentação descreve uma API RESTful para gerenciamento de atividades, incluindo funcionalidades de cadastro de usuários, autenticação, gerenciamento de atividades e registro de artefatos. A API está em conformidade com o Nível 2 do modelo de maturidade de Richardson.

## Endpoints

### 1. Cadastro de Usuários

#### Endpoint
```
POST /user
```

#### Descrição
Permite o cadastro de novos usuários fornecendo um nome de usuário, uma senha e uma role.

#### Parâmetros
- **username** (string, obrigatório, PK): Nome de usuário.
- **password** (string, obrigatório): Senha do usuário.
- **role** (INTEGER, obrigatório): Tipo de usuário (1 para Administrador, 2 para Usuário Comum).

#### Exemplo de Requisição
```json
{
    "username": "admin",
    "password": "senha123",
    "role": 1
}
```

#### Respostas
- **201 Created**: Usuário criado com sucesso.
- **400 Bad Request**: Falha na criação do usuário (e.g., campos obrigatórios ausentes, nome de usuário já existente).

### 2. Autenticação de Usuários

#### Endpoint
```
POST /login
```

#### Descrição
Permite que os usuários façam login e recebam um token de autenticação para acessar funcionalidades protegidas.

#### Parâmetros
- **username** (string, obrigatório): Nome de usuário.
- **password** (string, obrigatório): Senha do usuário.

#### Exemplo de Requisição
```json
{
    "username": "johndoe",
    "password": "1234"
}
```

#### Respostas
- **200 OK**: Login bem-sucedido. Retorna um token de autenticação.
- **401 Unauthorized**: Credenciais inválidas.

### 3. Gerenciamento de Atividades

#### 3.1. Cadastro de Atividades

#### Endpoint
```
POST /activity
```

#### Descrição
Permite que usuários autenticados cadastrem novas atividades.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Parâmetros
- **name** (string, obrigatório): Título da atividade.
- **assigned_to** (string, opcional): Quem precisa fazer a atividade.

#### Exemplo de Requisição
```json
{
    "name": "Revisar código",
    "assigned_to": "username"
}
```

#### Respostas
- **201 Created**: Atividade criada com sucesso.
- **400 Bad Request**: Falha na criação da atividade.

#### 3.2. Atribuir Atividades a Outros Usuários

#### Endpoint
```
PUT /activity/:id
```

#### Descrição
Permite que um usuário autenticado atribua uma atividade a outro usuário.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Parâmetros
- **assigned_to** (integer, obrigatório): ID do usuário ao qual a atividade será atribuída.

#### Exemplo de Requisição
```json
{
    "assigned_to": {
        "username": "johndoe"
    }
}
```

#### Respostas
- **200 OK**: Atividade atribuída com sucesso.
- **400 Bad Request**: Falha na atribuição da atividade.

#### 3.3. Listar Todas as Atividades

#### Endpoint
```
GET /activity
```

#### Descrição
Permite que usuários autenticados obtenham uma lista de todas as atividades.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Respostas
- **200 OK**: Retorna uma lista de atividades.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

#### 3.4. Obter Detalhes de uma Atividade

#### Endpoint
```
GET /activity/:id
```

#### Descrição
Permite que usuários autenticados obtenham detalhes de uma atividade específica.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Respostas
- **200 OK**: Retorna os detalhes da atividade.
- **404 Not Found**: Atividade não encontrada.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

#### 3.5. Listar Atividades de um Usuário

#### Endpoint
```
GET /user/:username/activity
```

#### Descrição
Permite que usuários autenticados obtenham uma lista de atividades de um usuário específico.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Respostas
- **200 OK**: Retorna uma lista de atividades do usuário.
- **404 Not Found**: Usuário não encontrado.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

#### 3.6. Deletar Atividade

#### Endpoint
```
DELETE /activity/:id
```

#### Descrição
Permite que usuários autenticados deletem uma atividade.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Respostas
- **200 OK**: Atividade deletada com sucesso.
- **404 Not Found**: Atividade não encontrada.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

### 4. Registro de Artefatos para Atividades

#### 4.1. Registro de Artefatos

#### Endpoint
```
POST /activity/:id/artifact
```

#### Descrição
Permite que usuários autenticados registrem artefatos para atividades.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Parâmetros
- **name** (string, obrigatório): Nome do artefato.
- **activity_id** (INTEGER, obrigatório): ID da atividade.

#### Exemplo de Requisição
```json
{
    "name": "Especificação do Projeto",
    "activity_id": 14
}
```

#### Respostas
- **201 Created**: Artefato registrado com sucesso.
- **400 Bad Request**: Falha no registro do artefato.

#### 4.2. Listar Artefatos de uma Atividade

#### Endpoint
```
GET /activity/:id/artifact
```

#### Descrição
Permite que usuários autenticados obtenham uma lista de artefatos de uma atividade específica.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Respostas
- **200 OK**: Retorna uma lista de artefatos da atividade.
- **404 Not Found**: Atividade não encontrada.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

#### 4.3. Obter Detalhes de um Artefato

#### Endpoint
```
GET /activity/:id/artifact/:id
```

#### Descrição
Permite que usuários autenticados obtenham detalhes de um artefato específico.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Respostas
- **200 OK**: Retorna os detalhes do artefato.
- **404 Not Found**: Artefato não encontrado.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

#### 4.4. Atualizar Artefato

#### Endpoint
```
PUT /activity/:id/artifact/:id
```

#### Descrição
Permite que usuários autenticados atualizem os dados de um artefato.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Parâmetros
- **name** (string, obrigatório): Nome do artefato.

#### Exemplo de Requisição
```json
{
    "name": "Documentação Atualizada"
}
```

#### Respostas
- **200 OK**: Artefato atualizado com sucesso.
- **404 Not Found**: Artefato não encontrado.
- **400 Bad Request**: Falha na atualização do artefato.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

#### 4.5. Deletar Artefato

#### Endpoint
```
DELETE /activity/:id/artifact/:id
```

#### Descrição
Permite que usuários autenticados deletem um artefato.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Respostas
- **200 OK**: Artefato deletado com sucesso.
- **404 Not Found**: Artefato não encontrado.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

### 5. Gerenciamento de Usuários

#### 5.1. Listar Usuários

#### Endpoint
```
GET /user
```

#### Descrição
Permite que usuários autenticados obtenham uma lista de todos os usuários.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Respostas
- **200 OK**: Retorna uma lista de usuários.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

#### 5.2. Obter Detalhes de um Usuário

#### Endpoint
```
GET /user/:username
```

#### Descrição
Permite que usuários autenticados obtenham detalhes de um usuário específico.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Respostas
- **200 OK**: Retorna os detalhes do usuário.
- **404 Not Found**: Usuário não encontrado.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

#### 5.3

. Atualizar Usuário

#### Endpoint
```
PUT /user/:username
```

#### Descrição
Permite que usuários autenticados atualizem os dados de um usuário.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Parâmetros
- **username** (string, obrigatório): Nome de usuário.
- **password** (string, opcional): Senha do usuário.
- **role** (INTEGER, opcional): Tipo de usuário.

#### Exemplo de Requisição
```json
{
    "password": "novaSenha123",
    "role": 2
}
```

#### Respostas
- **200 OK**: Usuário atualizado com sucesso.
- **404 Not Found**: Usuário não encontrado.
- **400 Bad Request**: Falha na atualização do usuário.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

#### 5.4. Deletar Usuário

#### Endpoint
```
DELETE /user/:username
```

#### Descrição
Permite que usuários autenticados deletem um usuário.

#### Cabeçalho
```
Authorization: Bearer cyno
```

#### Respostas
- **200 OK**: Usuário deletado com sucesso.
- **404 Not Found**: Usuário não encontrado.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

## Políticas de Acesso

### Tipos de Usuários
1. **Usuário Comum**: Pode cadastrar atividades e registrar artefatos.
2. **Administrador**: Pode, além das ações de um usuário comum, atribuir atividades a outros usuários e gerenciar usuários.

### Regras de Acesso
- **Cadastro de Atividades**: Todos os usuários autenticados.
- **Atribuição de Atividades**: Todos os usuários autenticados.
- **Registro de Artefatos**: Todos os usuários autenticados.
- **Gerenciamento de Usuários**: Todos os usuários autenticados.

### Gestão de Políticas
As políticas de acesso são gerenciadas via roles atribuídas a cada usuário no momento da criação do usuário ou via endpoint específico para atualização de roles.

#### Atualização de Roles
##### Endpoint
```
PUT /user/:username
```

##### Descrição
Permite atualizar a role de um usuário.

##### Cabeçalho
```
Authorization: Bearer cyno
```

##### Parâmetros
- **role** (INTEGER, obrigatório): Nova role do usuário (1 para Administrador, 2 para Usuário Comum).

##### Exemplo de Requisição
```json
{
    "role": 2
}
```

##### Respostas
- **200 OK**: Role atualizada com sucesso.
- **404 Not Found**: Usuário não encontrado.
- **400 Bad Request**: Falha na atualização da role.
- **401 Unauthorized**: Token de autenticação ausente ou inválido.

## Modelos de Recurso

### Usuário
```json
{
    "username": "johndoe",
    "password": "1234",
    "role": 1
}
```

### Atividade
```json
{
    "name": "Revisar código",
    "assigned_to": {
        "username": "janedoe"
    }
}
```

### Artefato
```json
{
    "name": "Especificação do Projeto",
    "activity_id": 1
}
```

## Conclusão

Esta documentação cobre as funcionalidades principais de uma API RESTful para gerenciamento de atividades, incluindo o cadastro e autenticação de usuários, gerenciamento de atividades, registro de artefatos e políticas de acesso. A API atende ao Nível 2 do modelo de maturidade de Richardson, utilizando métodos HTTP adequados, URIs claros e princípios RESTful.