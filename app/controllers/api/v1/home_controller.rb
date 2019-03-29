module Api::V1
  class HomeController < ApplicationController
    def index
      @recent_games = Game.order(created_at: :desc).limit(5)
      @recent_encounters = Encounter.order(created_at: :desc).limit(5)
      @recent_characters = PersistentCharacter.order(created_at: :desc).limit(5)

      render json: {
        recent_games: @recent_games,
        recent_encounters: @recent_encounters,
        recent_characters: @recent_characters,
      }
    end
  end
end
