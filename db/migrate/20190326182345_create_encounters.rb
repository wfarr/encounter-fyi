class CreateEncounters < ActiveRecord::Migration[5.2]
  def change
    create_table :encounters do |t|
      t.string :name
      t.belongs_to :game, index: true

      t.timestamps
    end
  end
end
