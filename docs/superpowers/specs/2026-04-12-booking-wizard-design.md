# Especificação: Wizard de Agendamento e Preferências MTB

Este documento descreve o design e a implementação do novo sistema de agendamento dinâmico para a plataforma Vulcão Trilhas.

## 1. Visão Geral
O objetivo é substituir o contato direto via WhatsApp por um fluxo de agendamento qualificado que coleta preferências do ciclista, verifica/cadastra o usuário na base de dados e salva o agendamento antes de iniciar o contato humano.

## 2. Experiência do Usuário (Wizard de 3 Passos)

### Passo 1: Preferências do Pedal
O usuário preenche os detalhes técnicos do passeio desejado:
- **Data do Pedal:** Calendário restrito (mínimo de 15 dias de antecedência).
- **Tipo de Bike:** Toggle entre "Bike Convencional" e "e-Bike".
- **Modalidade:** Select (Passeio Família, Cicloturismo, Cross Country, MTB Técnico).
- **Margem de Kilometragem:** Range Slider ou Select (ex: 20-40km).
- **Altimetria Desejada:** Select (Leve, Moderada, Desafiadora, Brutal).
- **Tempo de Pedal:** Select (2h, 4h, Dia Inteiro).
- **Investimento Pretendido:** Select (Econômico, Padrão, VIP/Experiência Completa).

### Passo 2: Identificação (Email)
- Campo único de E-mail.
- **Lógica:** Ao clicar em "Próximo", o sistema consulta o backend (`better-auth`) para verificar se o e-mail já existe.
  - **E-mail Existe:** Pula para o resumo final.
  - **E-mail Novo:** Avança para o Passo 3 (Cadastro).

### Passo 3: Cadastro de Ciclista (Condicional)
Aparece apenas para novos usuários:
- **Nome Completo:** Input text.
- **Nível do Piloto:** Select (Iniciante, Intermediário, Avançado, Expert).
- **Senha:** Input password (necessário para o `Better Auth`).
- **LGPD:** Checkbox de consentimento para tratamento de dados.

## 3. Arquitetura Técnica

### Modelagem de Dados (Drizzle ORM)
Adição da tabela `bookings` no `schema.ts`:
```typescript
export const bookings = sqliteTable("booking", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id),
    date: text("date").notNull(),
    bikeType: text("bike_type").notNull(),
    modality: text("modality").notNull(),
    mileage: text("mileage").notNull(),
    elevation: text("elevation").notNull(),
    duration: text("duration").notNull(),
    investment: text("investment").notNull(),
    status: text("status").default("pending"),
    createdAt: text("created_at").notNull(),
});
```

### Backend (Hono)
- Nova rota `POST /api/bookings`:
  - Recebe as preferências e o ID do usuário autenticado.
  - Valida os dados usando Zod.
  - Insere no SQLite via Drizzle.

### Frontend (React + shadcn/ui)
- Componente `BookingModal.tsx` gerenciando o estado do wizard.
- Uso de `AnimatePresence` do Framer Motion para transições de slides.
- Integração com `authClient` para verificação de e-mail e cadastro em tempo real.

## 4. Integração com WhatsApp
Após o sucesso do salvamento no banco, o sistema gera uma URL de WhatsApp formatada:
`https://wa.me/5535999513333?text=Olá! Acabei de solicitar um agendamento para o dia [DATA]. Detalhes: [BIKE], [MODALIDADE]...`

## 5. Design Visual
- **Glassmorphism:** Fundo `bg-navy/80` com `backdrop-blur-xl`.
- **Cores:** Destaques em `gold` (#D4AF37) para botões de ação e estados ativos.
- **Responsividade:** Layout adaptável para mobile, com inputs grandes e de toque fácil.
