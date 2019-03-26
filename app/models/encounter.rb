class Encounter < ApplicationRecord
  belongs_to :game, counter_cache: true, optional: true
end
