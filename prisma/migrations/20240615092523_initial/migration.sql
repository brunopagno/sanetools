-- CreateTable
CREATE TABLE "Dummy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "something" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Dummy_name_key" ON "Dummy"("name");
