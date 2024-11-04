install Prisma and its PostgreSQL client:
npm install prisma @prisma/client

initialize Prisma 
npx prisma init


npx prisma db pull

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run npx prisma db pull to turn your database schema into a Prisma schema.
4. Run npx prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm


// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model TestTable {
  id         Int      @id @default(autoincrement())
  name       String
  age        Int?
  email      String?
  created_at DateTime @default(now())
}

Step 5: Run the Migration
npx prisma migrate dev --name init
npx prisma migrate dev --create-only

Step 6: Generate Prisma Client
npx prisma generate

Step 7: Use Prisma Client in Your Next.js App
Create a lib/prisma.ts file to initialize the Prisma Client:

// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

Then, use this client in your API routes:

app/api/testTable/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.testTable.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
