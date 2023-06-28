import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { createClient } from "redis";
import { DB } from "../db/types";

export const redisClient = createClient({
  password: "JFPhIY5VM8ocafienXlY5rk6liRgZ78X",
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});
redisClient.connect();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
