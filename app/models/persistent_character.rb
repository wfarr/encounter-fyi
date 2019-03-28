class PersistentCharacter < ApplicationRecord
  # name is required
  validates :name, presence: true

  # stats are required and must be > 0
  validates :strength, presence: true, numericality: { greater_than: 0, only_integer: true }
  validates :dexterity, presence: true, numericality: { greater_than: 0, only_integer: true }
  validates :constitution, presence: true, numericality: { greater_than: 0, only_integer: true }
  validates :intelligence, presence: true, numericality: { greater_than: 0, only_integer: true }
  validates :wisdom, presence: true, numericality: { greater_than: 0, only_integer: true }
  validates :charisma, presence: true, numericality: { greater_than: 0, only_integer: true }

  # hit points are required
  validates :hit_points, presence: true, numericality: { only_integer: true }

  # max hit points are required and must be > 0
  validates :hit_point_maximum, presence: true, numericality: { greater_than: 0, only_integer: true }
end
