class Game < ApplicationRecord
  has_many :encounters, dependent: :destroy
end
