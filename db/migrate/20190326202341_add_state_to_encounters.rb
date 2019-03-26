class AddStateToEncounters < ActiveRecord::Migration[5.2]
  def change
    add_column :encounters, :state, :jsonb, default: {}
  end
end
