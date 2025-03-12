/*
  Warnings:

  - You are about to drop the column `title` on the `mind_maps` table. All the data in the column will be lost.
  - You are about to drop the `node_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,user_id]` on the table `mind_maps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `definition` to the `mind_maps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `mind_maps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `mind_maps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "node_tags" DROP CONSTRAINT "node_tags_nodeId_fkey";

-- DropForeignKey
ALTER TABLE "node_tags" DROP CONSTRAINT "node_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "nodes" DROP CONSTRAINT "nodes_mind_map_id_fkey";

-- AlterTable
ALTER TABLE "mind_maps" DROP COLUMN "title",
ADD COLUMN     "cron" TEXT,
ADD COLUMN     "definition" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "node_tags";

-- DropTable
DROP TABLE "nodes";

-- DropTable
DROP TABLE "tags";

-- CreateIndex
CREATE UNIQUE INDEX "mind_maps_name_user_id_key" ON "mind_maps"("name", "user_id");
