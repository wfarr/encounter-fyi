# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

games = Game.create([
  { name: "Storm King's Thunder" },
  { name: "Waterdeep: Dragon Heist" },
  { name: "Critical Role" },
])

games.each do |g|
  rand(10).times { |i| g.encounters.create(name: "random encounter #{i}") }
end