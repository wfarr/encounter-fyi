module Api::V1
  class PersistentCharactersController < ApplicationController
    before_action :set_persistent_character, only: [:show, :update, :destroy]

    # GET /persistent_characters
    def index
      @persistent_characters = PersistentCharacter.all

      render json: @persistent_characters
    end

    # GET /persistent_characters/1
    def show
      render json: @persistent_character
    end

    # POST /persistent_characters
    def create
      @persistent_character = PersistentCharacter.new(persistent_character_params)

      if @persistent_character.save
        render json: @persistent_character, status: :created, location: [:api, :v1, @persistent_character]
      else
        render json: @persistent_character.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /persistent_characters/1
    def update
      if @persistent_character.update(persistent_character_params)
        render json: @persistent_character
      else
        render json: @persistent_character.errors, status: :unprocessable_entity
      end
    end

    # DELETE /persistent_characters/1
    def destroy
      @persistent_character.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_persistent_character
        @persistent_character = PersistentCharacter.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def persistent_character_params
        params.require(:persistent_character).permit(:name, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :hit_point_maximum, :hit_points, :speed)
      end
  end
end