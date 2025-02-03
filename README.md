# Rede Social Solidária de Apoio a Moradores de Rua

Este repositório contém o código-fonte da API REST desenvolvida para a **Rede Social Solidária de Apoio a Moradores de Rua**, uma plataforma que visa conectar entidades públicas, privadas e voluntários para facilitar o acesso de pessoas em situação de rua a serviços assistenciais e oportunidades de reintegração social.

---

## Índice

1. [Introdução](#1-introdução)
   - [Propósito](#11-propósito)
   - [Escopo](#12-escopo)
   - [Justificativa](#13-justificativa)
2. [Descrição do Problema](#2-descrição-do-problema)
   - [Problema](#21-problema)
   - [Impacto](#22-impacto)
3. [Objetivos](#3-objetivos)
4. [Funcionalidades Principais](#4-funcionalidades-principais)
   - [Cadastro e Gerenciamento de Entidades e Voluntários](#41-cadastro-e-gerenciamento-de-entidades-e-voluntários)
   - [Cadastro e Avaliação de Beneficiários](#42-cadastro-e-avaliação-de-beneficiários)
   - [Organização de Eventos e Campanhas](#43-organização-de-eventos-e-campanhas)
   - [Compartilhamento de Experiências](#44-compartilhamento-de-experiências)
   - [Sistema de Doações](#45-sistema-de-doções)
5. [Tecnologias Utilizadas](#5-tecnologias-utilizadas)
6. [Metodologia](#6-metodologia)
7. [Ferramentas Utilizadas](#7-ferramentas-utilizadas)
8. [Restrições](#8-restrições)
9. [Suposições](#9-suposições)
10. [Dependências](#10-dependências)
11. [Como Contribuir](#11-como-contribuir)
12. [Instalação e Execução](#12-instalação-e-execução)
13. [Documentação da API](#13-documentação-da-api)
14. [Licença](#14-licença)

---

## 1. Introdução

### 1.1 Propósito
A Rede Social Solidária de Apoio a Moradores de Rua tem como objetivo conectar entidades públicas, privadas e voluntários para facilitar o acesso de pessoas em situação de rua a serviços assistenciais e oportunidades de reintegração social. A plataforma busca transformar práticas assistencialistas em ações que promovam inclusão e emancipação desses indivíduos.

### 1.2 Escopo
A plataforma permitirá a articulação de ações sociais por meio de entidades e voluntários, oferecendo recursos para organização de eventos, compartilhamento de experiências, recebimento de doações e disponibilização de oportunidades de socialização.

### 1.3 Justificativa
O aumento da população em situação de rua exige ações efetivas e coordenadas entre diferentes agentes da sociedade. A falta de acesso a meios digitais por essa população torna essencial a intermediação de instituições e voluntários para garantir o acesso a serviços assistenciais e oportunidades de reinserção social.

---

## 2. Descrição do Problema

### 2.1 Problema
A população em situação de rua enfrenta dificuldades para acessar serviços assistenciais, educação, saúde e oportunidades de reinserção social. Além disso, não há uma plataforma centralizada para organizar e facilitar as iniciativas da sociedade voltadas a essa causa.

### 2.2 Impacto
Sem um meio estruturado de comunicação e organização, esforços individuais ou de pequenas iniciativas se tornam dispersos e ineficazes, reduzindo o impacto social positivo que poderia ser alcançado com maior articulação.

---

## 3. Objetivos

- Cadastrar e avaliar indivíduos em situação de rua para um direcionamento mais eficaz a serviços assistenciais.
- Facilitar a conexão entre entidades públicas, privadas e voluntários para articular iniciativas de apoio.
- Disponibilizar um ambiente digital para organização de eventos, campanhas de doação e compartilhamento de experiências.
- Criar mecanismos para promover a socialização e reintegração dessa população à sociedade.

---

## 4. Funcionalidades Principais

### 4.1 Cadastro e Gerenciamento de Entidades e Voluntários
- Registro de entidades públicas e privadas, ONGs e voluntários.
- Perfil detalhado com serviços oferecidos e áreas de atuação.

### 4.2 Cadastro e Avaliação de Beneficiários
- Registro de indivíduos em situação de rua por meio de assistentes sociais e voluntários.
- Avaliação personalizada para recomendação de serviços adequados.

### 4.3 Organização de Eventos e Campanhas
- Criação e gestão de eventos assistenciais, cursos, campanhas de arrecadação.
- Sistema de inscrição para voluntários e acompanhamento de eventos.

### 4.4 Compartilhamento de Experiências
- Publicação de histórias de reinserção social e boas práticas.
- Espaço de interação entre participantes para troca de informações.

### 4.5 Sistema de Doações
- Plataforma para arrecadação de recursos financeiros e materiais.
- Transparência no uso das doações e acompanhamento dos benefícios gerados.

---

## 5. Tecnologias Utilizadas

- **Frontend:** React.
- **Backend:** Node.js com Express e TypeScript.
- **Banco de Dados:** MySQL.
- **Testes:** Jest para testes unitários e automatizados.
- **Containers:** Docker para ambiente de desenvolvimento e produção.
- **Documentação:** Swagger para APIs.
- **Metodologia:** Kanban para gerenciamento do projeto.

---

## 6. Metodologia

O desenvolvimento deste projeto será baseado na metodologia **Kanban**, visando proporcionar um fluxo de trabalho contínuo e adaptável às necessidades da equipe e do projeto. A equipe será composta por **dois desenvolvedores**, que atuarão no desenvolvimento da plataforma.

### Reuniões e Acompanhamento
- **Reuniões semanais** para avaliação do progresso, identificação de bloqueios e definição de prioridades.
- Uso de ferramentas como **Notion** para organização de tarefas e documentação.

---

## 7. Ferramentas Utilizadas

- **Gerenciamento do Projeto:** Notion.
- **Desenvolvimento:** VSCode, GitHub.
- **Backend:** Postman, Swagger, Jest, Prisma.
- **Frontend:** React Developer Tools, Styled Components/TailwindCSS, Storybook.
- **Infraestrutura:** Docker, AWS/GCP/DigitalOcean, Railway.app/Render.com.
- **Comunicação:** Discord, Miro/Excalidraw.

---

## 8. Restrições

- O projeto deve ser desenvolvido utilizando apenas tecnologias de código aberto.
- A plataforma deve garantir a privacidade e segurança dos dados de beneficiários e voluntários.
- O acesso aos serviços assistenciais deve ser intermediado por entidades públicas ou privadas, não sendo feito diretamente pelos beneficiários.

---

## 9. Suposições

- A adesão de entidades públicas, privadas e voluntários será suficiente para garantir o funcionamento e a oferta de serviços.
- O financiamento do projeto poderá contar com doações, parcerias institucionais ou programas de incentivo governamental.
- A tecnologia escolhida será capaz de atender à demanda esperada de usuários e interações na plataforma.

---

## 10. Dependências

- Parcerias com ONGs, empresas e governos para viabilizar a oferta de serviços assistenciais.
- Infraestrutura de servidores e armazenamento em nuvem para hospedagem da plataforma.
- Equipe técnica especializada para manutenção e evolução do sistema.

---

## 11. Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## 12. Instalação e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- Docker (opcional, para ambiente containerizado)
- MySQL

### Passos para Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/rede-social-solidaria.git
   cd rede-social-solidaria
