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
Permite o cadastro de novos usuários fornecendo um nome de usuário e uma senha.

#### Parâmetros
- **username** (string, obrigatório, PK): Nome de usuário.
- **password** (string, obrigatório): Senha do usuário.
- **role** (INTEGER, obrigatório): Tipo de usuário.

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


### 4. Registro de Artefatos para Atividades

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

## Políticas de Acesso

### Tipos de Usuários
1. **Usuário Comum**: Pode cadastrar atividades e registrar artefatos.
2. **Administrador**: Pode, além das ações de um usuário comum, atribuir atividades a outros usuários.

### Regras de Acesso
- **Cadastro de Atividades**: Todos os usuários autenticados.
- **Atribuição de Atividades**: Todos os usuários autenticados.
- **Registro de Artefatos**: Todos os usuários autenticados.

### Gestão de Políticas
As políticas de acesso são gerenciadas via roles atribuídas a cada usuário no momento da criação do usuário ou via endpoint específico para atualização de roles.

#### Atualização de Roles
##### Endpoint
```
PUT /usuarios/:username
```

##### Descrição
Permite atualizar a role de um usuário.

##### Cabeçalho
```
Authorization: Bearer cyno
```

##### Parâmetros
- **role** (INTEGER, obrigatório): Nova role do usuário (e.g., "admin", "comum").

##### Exemplo de Requisição
```json
{
    "role": 2
}
```

##### Respostas
- **200 OK**: Role atualizada com sucesso.
- **400 Bad Request**: Falha na atualização da role.

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