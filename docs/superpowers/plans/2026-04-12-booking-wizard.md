# Wizard de Agendamento MTB - Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar um Wizard de 3 passos para coleta de preferências de pedal e cadastro dinâmico de ciclistas.

**Architecture:** Wizard multi-step no frontend (React) integrado com Hono (Backend) e Drizzle (DB). Usa Better Auth para gerenciamento de usuários.

**Tech Stack:** React, Hono, Drizzle ORM, Better Auth, shadcn/ui, Framer Motion.

---

### Task 1: Atualização do Schema (Drizzle)

**Files:**
- Modify: `src/lib/schema.ts`

- [ ] **Step 1: Adicionar campo role e tabela bookings**

```typescript
// Em src/lib/schema.ts

export const user = sqliteTable("user", {
    // ... campos existentes
    role: text("role", { enum: ["client", "hoster", "admin"] }).default("client"),
});

export const bookings = sqliteTable("booking", {
    id: text("id").primaryKey(),
    userId: text("userId").notNull().references(() => user.id),
    date: text("date").notNull(),
    bikeType: text("bikeType").notNull(),
    modality: text("modality").notNull(),
    mileage: text("mileage").notNull(),
    elevation: text("elevation").notNull(),
    duration: text("duration").notNull(),
    investment: text("investment").notNull(),
    status: text("status").default("pending"),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});
```

- [ ] **Step 2: Gerar migração (se aplicável)**
Rode o comando do drizzle-kit (se configurado) ou apenas atualize o arquivo se estiver em modo de desenvolvimento inicial.

### Task 2: API de Agendamento (Hono)

**Files:**
- Modify: `server/index.ts`

- [ ] **Step 1: Adicionar rota POST /api/bookings**

```typescript
// Em server/index.ts

import { bookings } from '../src/lib/schema';
import { db } from '../src/lib/db';
import { v4 as uuidv4 } from 'uuid';

app.post('/api/bookings', async (c) => {
    const data = await c.req.json();
    const newBooking = {
        id: uuidv4(),
        ...data,
        createdAt: new Date(),
    };
    await db.insert(bookings).values(newBooking);
    return c.json({ success: true, booking: newBooking });
});
```

### Task 3: Componente de Wizard (Frontend)

**Files:**
- Create: `src/components/BookingModal.tsx`

- [ ] **Step 1: Criar estrutura base do Modal**

```tsx
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const BookingModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-navy/90 backdrop-blur-xl border-white/10 text-white rounded-[2rem]">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            {/* Render Step 1 */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};
```

### Task 4: Passo 1 - Preferências

- [ ] **Step 1: Implementar campos de preferência**
Adicionar Calendar (shadcn), RadioGroup para Bike, e Selects para os demais campos.

### Task 5: Passo 2 - Identificação e Auth Check

- [ ] **Step 1: Implementar campo de E-mail com verificação**
Ao submeter o e-mail, usar `authClient.listUsers` ou similar para checar existência (ou tentar login/signup).

### Task 6: Passo 3 - Cadastro Condicional

- [ ] **Step 1: Implementar campos de Nome, Nível e Senha**
Integrar com `authClient.signUp.email`.

### Task 7: Conclusão e WhatsApp

- [ ] **Step 1: Salvar no DB e redirecionar**
Chamar `fetch('/api/bookings')` e depois `window.open(whatsappUrl)`.
