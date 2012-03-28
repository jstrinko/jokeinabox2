class CreateJokes < ActiveRecord::Migration
  def change
    create_table :jokes do |t|
      t.integer :upvotes
      t.integer :downvotes
      t.string :joke
      t.integer :posting_user
      t.timestamps
    end
  end
end
