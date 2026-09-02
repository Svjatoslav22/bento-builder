ALTER TABLE "Profile"
  ADD COLUMN "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "name" TEXT,
  ADD COLUMN "title" TEXT,
  ADD COLUMN "bio" TEXT,
  ADD COLUMN "avatarUrl" TEXT,
  ADD COLUMN "linkedinUrl" TEXT,
  ADD COLUMN "githubUrl" TEXT,
  ADD COLUMN "resumeUrl" TEXT;