class Encounter < ApplicationRecord
  belongs_to :game, optional: true
end
