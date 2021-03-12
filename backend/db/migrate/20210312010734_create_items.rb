class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.string :looked_message
      t.boolean :take
      t.string :take_message
      t.boolean :closed
      t.string :closed_message
      t.boolean :talk
      t.string :talk_message
      t.boolean :locked
      t.string :locked_message
      t.string :opened_message

      t.timestamps
    end
  end
end
