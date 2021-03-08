class CreateUsernames < ActiveRecord::Migration[6.1]
  def change
    create_table :usernames do |t|
      t.string :email
      t.string :password
      t.string :password_digest

      t.timestamps
    end
  end
end
