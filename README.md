# Comunicação Interna CSEPS

Ferramenta web em desenvolvimento para comunicação interna do capítulo IEEE CS & EPS UFF.

## Status atual do projeto

O projeto está em fase de MVP funcional. Já existe navegação entre as principais áreas e a relação entre **Tarefas** e **Calendário** está integrada por uma fonte compartilhada de atividades.

O que já está funcionando:

- Menu lateral com acesso às páginas principais.
- Página de Tarefas com colunas por status.
- Criação de atividades com dia, horário, descrição e status.
- Calendário com seleção de dia e visualização das atividades daquele dia.
- Sincronização entre Tarefas e Calendário usando a mesma base de dados no navegador.

O que ainda está em evolução:

- Persistência em backend ou banco de dados real.
- Edição, exclusão e movimentação real das atividades entre colunas.
- Dashboard com métricas e gráficos.
- Refinamento visual e validação de fluxo com usuários.

## Estrutura do projeto

- `src/app/tarefas`: quadro de tarefas e formulário de criação de atividades.
- `src/app/calendario`: calendário mensal com lista de atividades por dia.
- `src/app/menu-lateral`: navegação lateral do sistema.
- `src/app/dashboard`: espaço reservado para indicadores.
- `src/app/shared/activities.ts`: fonte compartilhada das atividades entre as telas.

## Como executar

### Requisitos

- Node.js instalado.
- npm instalado.

### Instalação

```bash
git clone https://github.com/cseps-uff/comunicacao-interna.git
cd comunicacao-interna
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Depois, abra [http://localhost:3000](http://localhost:3000).

### Outros comandos

```bash
npm run build
npm run start
npm run lint
```

## Observação sobre os dados

As atividades criadas em **Tarefas** ficam salvas no `localStorage` do navegador. Isso permite que o **Calendário** mostre os mesmos dados sem precisar de backend por enquanto.

## Próximas entregas sugeridas

- Conectar o sistema a uma API ou banco de dados.
- Permitir editar e excluir atividades.
- Concluir a tela de dashboard.
- Melhorar a experiência responsiva em telas menores.
