class Game < ApplicationRecord
  has_many :encounters, counter_cache: true
end
