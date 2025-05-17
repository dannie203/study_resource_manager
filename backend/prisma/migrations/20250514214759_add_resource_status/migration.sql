-- CreateEnum
CREATE TYPE "ResourceStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "status" "ResourceStatus" NOT NULL DEFAULT 'PENDING';
