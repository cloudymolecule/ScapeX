# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_12_010734) do

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "looked_message"
    t.boolean "take"
    t.string "take_message"
    t.boolean "closed"
    t.string "closed_message"
    t.boolean "talk"
    t.string "talk_message"
    t.boolean "locked"
    t.string "locked_message"
    t.string "opened_message"
    t.integer "room_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["room_id"], name: "index_items_on_room_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.string "name"
    t.string "setting"
    t.integer "time_limit"
    t.string "completed_message"
    t.integer "attempts"
    t.integer "attempts_allowed"
    t.integer "times_completed"
    t.integer "obj_room"
    t.integer "obj_exit"
    t.string "lock"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_rooms_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "items", "rooms"
  add_foreign_key "rooms", "users"
end
