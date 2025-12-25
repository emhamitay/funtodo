CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"created_at" timestamp,
	"is_done" boolean DEFAULT false NOT NULL,
	"user_id" serial NOT NULL
);
