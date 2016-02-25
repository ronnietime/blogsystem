class CreateTokens < ActiveRecord::Migration
  def change
    create_table :tokens do |t|
      t.integer :refinery_authentication_devise_user_id
      t.string :secret
      t.timestamps null: false
    end

    add_foreign_key :tokens, :refinery_authentication_devise_users
  end
end
