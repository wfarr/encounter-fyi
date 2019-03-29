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

persistent_characters = PersistentCharacter.create([
  { name: "Theren", strength: 8, dexterity: 16, constitution: 14, intelligence: 20, wisdom: 10, charisma: 10, hit_point_maximum: 50, hit_points: 50, speed: 30 },
  { name: "Maraby", strength: 20, dexterity: 14, constitution: 16, intelligence: 10, wisdom: 10, charisma: 14, hit_point_maximum: 120, hit_points: 120, speed: 30 },
  { name: "Anris", strength: 8, dexterity: 14, constitution: 8, intelligence: 14, wisdom: 10, charisma: 18, hit_point_maximum: 19, hit_points: 1, speed: 30 },
  { name: "Margritte" },
  { name: "Helm" },
  { name: "Jimbo" },
  { name: "murder hobo" },
])

rand(10).times do |i|
  encounter_characters = persistent_characters.sample(rand(i) + 2)
  ordering = encounter_characters.shuffle.map(&:id)

  Encounter.create(
    name: "random encounter #{i * (i + 1)}",
    state: {
      combatants: Hash[*(encounter_characters.map {|c| [c.id, c.as_json.merge(initiative: rand(20) + 1)] }).flatten],
      order: ordering,
      currentActor: rand(ordering.size),
    }
  )
end

games.each do |g|
  rand(10).times do |i|
    encounter_characters = persistent_characters.sample(rand(i) + 2)
    ordering = encounter_characters.shuffle.map(&:id)

    g.encounters.create(
      name: "random encounter #{i}",
      state: {
        combatants: Hash[*(encounter_characters.map {|c| [c.id, c.as_json.merge(initiative: rand(20) + 1)] }).flatten],
        order: ordering,
        currentActor: rand(ordering.size),
      }
    )
  end
end
