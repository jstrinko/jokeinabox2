class CreateJokes < ActiveRecord::Migration
  def change
    create_table :jokes do |t|
      t.integer :upvotes
      t.integer :downvotes
      t.string :joke
      t.integer :user_id
      t.timestamps
    end
  end
end
