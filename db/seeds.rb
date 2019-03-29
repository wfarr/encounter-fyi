# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def random_creation_time
  Time.now - rand(59).minutes - rand(23).hours - rand(30).days
end

games = Game.create([
  { name: "Storm King's Thunder", created_at: random_creation_time },
  { name: "Waterdeep: Dragon Heist", created_at: random_creation_time },
  { name: "Critical Role", created_at: random_creation_time },
  { name: "Curse of Strahd", created_at: random_creation_time },
  { name: "Ghosts of Saltmarsh", created_at: random_creation_time },
  { name: "Hoard of the Dragon Queen", created_at: random_creation_time },
])

persistent_characters = PersistentCharacter.create([
  { name: "Theren", strength: 8, dexterity: 16, constitution: 14, intelligence: 20, wisdom: 10, charisma: 10, hit_point_maximum: 50, hit_points: 50, speed: 30, created_at: random_creation_time },
  { name: "Maraby", strength: 20, dexterity: 14, constitution: 16, intelligence: 10, wisdom: 10, charisma: 14, hit_point_maximum: 120, hit_points: 120, speed: 30, created_at: random_creation_time },
  { name: "Anris", strength: 8, dexterity: 14, constitution: 8, intelligence: 14, wisdom: 10, charisma: 18, hit_point_maximum: 19, hit_points: 1, speed: 30, created_at: random_creation_time },
  { name: "Margritte", created_at: random_creation_time },
  { name: "Helm", created_at: random_creation_time },
  { name: "Jimbo", created_at: random_creation_time },
  { name: "murder hobo", created_at: random_creation_time },
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
    },
    created_at: random_creation_time,
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
      },
      created_at: random_creation_time,
    )
  end
end
