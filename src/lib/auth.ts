import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
        // Generic OAuth for Strava (since it's not a built-in provider in basic socialProviders)
        strava: {
            enabled: true,
            clientId: process.env.STRAVA_CLIENT_ID || "",
            clientSecret: process.env.STRAVA_CLIENT_SECRET || "",
            // Manual configuration if needed, or better-auth generic-oauth plugin
        }
    },
    user: {
        additionalFields: {
            pilotLevel: {
                type: "string",
                required: false,
                defaultValue: "iniciante",
                input: true,
            },
            role: {
                type: "string",
                required: false,
                defaultValue: "client",
                input: false,
            }
        }
    }
});
