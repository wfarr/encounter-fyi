# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_27_190328) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "api_v1_encounters", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "encounters", force: :cascade do |t|
    t.string "name"
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "state", default: {}
    t.index ["game_id"], name: "index_encounters_on_game_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "encounters_count", default: 0
  end

  create_table "persistent_characters", force: :cascade do |t|
    t.string "name", null: false
    t.integer "strength", default: 1, null: false
    t.integer "dexterity", default: 1, null: false
    t.integer "constitution", default: 1, null: false
    t.integer "intelligence", default: 1, null: false
    t.integer "wisdom", default: 1, null: false
    t.integer "charisma", default: 1, null: false
    t.integer "hit_point_maximum", default: 1, null: false
    t.integer "hit_points", default: 1, null: false
    t.integer "speed", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
