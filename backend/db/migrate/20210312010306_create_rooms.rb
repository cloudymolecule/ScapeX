class CreateRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :setting
      t.integer :time_limit
      t.string :completed_message
      t.integer :attempts
      t.integer :attempts_allowed
      t.integer :times_completed
      t.integer :obj_room
      t.integer :obj_exit
      t.string :lock

      t.timestamps
    end
  end
end
