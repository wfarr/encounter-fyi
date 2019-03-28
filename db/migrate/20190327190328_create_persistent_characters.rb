class CreatePersistentCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :persistent_characters do |t|
      t.string :name, null: false
      t.integer :strength, null: false, default: 1
      t.integer :dexterity, null: false, default: 1
      t.integer :constitution, null: false, default: 1
      t.integer :intelligence, null: false, default: 1
      t.integer :wisdom, null: false, default: 1
      t.integer :charisma, null: false, default: 1
      t.integer :hit_point_maximum, null: false, default: 1
      t.integer :hit_points, null: false, default: 1
      t.integer :speed, null: false, default: 1

      t.timestamps
    end
  end
end
