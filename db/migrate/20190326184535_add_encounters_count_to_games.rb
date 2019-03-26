class AddEncountersCountToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :encounters_count, :integer, default: 0
  end
end
