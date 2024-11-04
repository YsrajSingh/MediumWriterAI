-- CreateTable
CREATE TABLE "test_table" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "age" INTEGER,
    "email" VARCHAR(100),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_table_pkey" PRIMARY KEY ("id")
);
