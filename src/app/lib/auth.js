import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('ideonexis');

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
    emailAndPassword: { 
        enabled: true, 
    },
    database: mongodbAdapter(db, {
        client
    }),
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: googleId, 
            clientSecret: googleSecret,  
        }, 
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60
        },
    },
    plugins: [
        jwt(),
    ],
});