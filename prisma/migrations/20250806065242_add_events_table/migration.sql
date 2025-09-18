-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Upcoming',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "slug" TEXT NOT NULL,
    "participants" INTEGER,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "ctaText" TEXT,
    "ctaLink" TEXT,
    "rsvpLink" TEXT,
    "googleCalendarLink" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");
