import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { auth } from '../src/lib/auth';
import { randomUUID } from 'node:crypto';
import { db } from '../src/lib/db';
import { bookings } from '../src/lib/schema';

const app = new Hono();

app.use('*', cors({
  origin: 'http://localhost:5173',
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.on(['POST', 'GET'], '/api/auth/**', (c) => {
    return auth.handler(c.req.raw);
});

app.post('/api/bookings', async (c) => {
    try {
        const data = await c.req.json();
        const newBooking = {
            id: randomUUID(),
            ...data,
            createdAt: new Date(),
        };
        await db.insert(bookings).values(newBooking);
        return c.json({ success: true, booking: newBooking });
    } catch (error) {
        console.error("Error creating booking:", error);
        return c.json({ success: false, error: "Failed to create booking" }, 500);
    }
});

console.log("Server running on http://localhost:3000");

serve({
  fetch: app.fetch,
  port: 3000
});
