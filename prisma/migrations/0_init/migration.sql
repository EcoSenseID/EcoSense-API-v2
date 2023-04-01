-- CreateTable
CREATE TABLE "campaigns" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "description" VARCHAR(4096) NOT NULL,
    "start_date" TIMESTAMPTZ(6) NOT NULL,
    "end_date" TIMESTAMPTZ(6) NOT NULL,
    "poster_url" VARCHAR(1024) NOT NULL,
    "id_initiator" INTEGER NOT NULL,
    "id_category" INTEGER,
    "ecopoints" INTEGER,
    "terms_conditions" VARCHAR(2048),
    "reset_every" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "donation" VARCHAR(128),

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "photo_url" VARCHAR(2083) NOT NULL,
    "color_hex" VARCHAR(7),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_campaign" (
    "id_category" INTEGER NOT NULL,
    "id_campaign" INTEGER NOT NULL,
    "earned_experience_point" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "category_rewards" (
    "id_category" INTEGER NOT NULL,
    "id_reward" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "completed_missions" (
    "id_mission" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "photo_url" VARCHAR(2083) NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "caption" VARCHAR(500),
    "status" INTEGER NOT NULL DEFAULT 2,
    "id" SERIAL NOT NULL,
    "invalid_reason" VARCHAR(255) NOT NULL DEFAULT '',
    "id_record" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "photo_hash" VARCHAR(255),

    CONSTRAINT "completed_missions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "histories" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "label" VARCHAR(100) NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "confidence_percent" INTEGER NOT NULL,

    CONSTRAINT "histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "join_records" (
    "id_campaign" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "joined_timestamp" TIMESTAMPTZ(6) NOT NULL,
    "completed_timestamp" TIMESTAMPTZ(6) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "id" SERIAL NOT NULL,
    "earned_ecopoints" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "campaign_participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "missions" (
    "id" SERIAL NOT NULL,
    "id_campaign" INTEGER NOT NULL,
    "order_number" INTEGER NOT NULL,
    "name" VARCHAR(1024) NOT NULL,
    "require_proof" BOOLEAN NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2083) NOT NULL,
    "news_url" VARCHAR(2083) NOT NULL,
    "photo_url" VARCHAR(2083) NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "id_target_user" INTEGER NOT NULL,
    "id_sender_user" INTEGER,
    "type" VARCHAR(50) NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "object" VARCHAR(50) NOT NULL,
    "object_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replies" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_story" INTEGER NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "photo_url" VARCHAR(2083) NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replies_supports" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_reply" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "replies_supports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reward_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "categories_for_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reward_claims" (
    "id_reward" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "wallet_type" VARCHAR(10) NOT NULL,
    "wallet_number" VARCHAR(20),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "reward_claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rewards" (
    "id" SERIAL NOT NULL,
    "photo_url" VARCHAR(2083) NOT NULL,
    "ecopoints" INTEGER NOT NULL,
    "valid_until" TIMESTAMPTZ(6) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "terms_and_conditions" VARCHAR(4096) NOT NULL,
    "id_category" INTEGER NOT NULL,
    "how_to_use" VARCHAR(4096) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "partner" VARCHAR(100) NOT NULL,
    "max_redeem" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stories" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "description" VARCHAR(3000) NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "photo_url" VARCHAR(2083) NOT NULL,
    "id_campaign" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stories_supports" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_story" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "stories_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_experience_points" (
    "id_category" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "experience_point" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user_role" (
    "id_user" INTEGER NOT NULL,
    "id_role" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firebase_uid" VARCHAR(40) NOT NULL,
    "name" VARCHAR,
    "profile_url" VARCHAR(2083),
    "ecopoints" INTEGER NOT NULL DEFAULT 0,
    "registration_token" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_id_initiator_fkey" FOREIGN KEY ("id_initiator") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "category_campaign" ADD CONSTRAINT "category_campaign_id_campaign_fkey" FOREIGN KEY ("id_campaign") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "category_rewards" ADD CONSTRAINT "category_rewards_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "reward_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "category_rewards" ADD CONSTRAINT "category_rewards_id_rewards_fkey" FOREIGN KEY ("id_reward") REFERENCES "rewards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "completed_missions" ADD CONSTRAINT "completed_missions_id_record_fkey" FOREIGN KEY ("id_record") REFERENCES "join_records"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "completed_missions" ADD CONSTRAINT "completed_tasks_id_task_fkey" FOREIGN KEY ("id_mission") REFERENCES "missions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "completed_missions" ADD CONSTRAINT "completed_tasks_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "join_records" ADD CONSTRAINT "campaign_participant_id_campaign_fkey" FOREIGN KEY ("id_campaign") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "missions" ADD CONSTRAINT "tasks_id_campaign_fkey" FOREIGN KEY ("id_campaign") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "fk_notifications_id_sender_user" FOREIGN KEY ("id_sender_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "fk_notifications_id_target_user" FOREIGN KEY ("id_target_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "comments_id_story_fkey" FOREIGN KEY ("id_story") REFERENCES "stories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "comments_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "replies_supports" ADD CONSTRAINT "replies_supports_id_reply_fkey" FOREIGN KEY ("id_reply") REFERENCES "replies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "replies_supports" ADD CONSTRAINT "replies_supports_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reward_claims" ADD CONSTRAINT "claimed_rewards_id_rewards_fkey" FOREIGN KEY ("id_reward") REFERENCES "rewards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reward_claims" ADD CONSTRAINT "claimed_rewards_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "reward_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_id_campaign_fkey" FOREIGN KEY ("id_campaign") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stories_supports" ADD CONSTRAINT "stories_likes_id_story_fkey" FOREIGN KEY ("id_story") REFERENCES "stories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stories_supports" ADD CONSTRAINT "stories_likes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

