module Api::V1
  class EncountersController < ApplicationController
    before_action :set_encounter, only: [:show, :update, :destroy]

    # GET /encounters
    def index
      if params[:game_id]
        @encounters = Encounter.where(game_id: params[:game_id])
      else
        @encounters = Encounter.where(game_id: nil)
      end

      render json: @encounters
    end

    # GET /encounters/1
    def show
      render json: @encounter
    end

    # POST /encounters
    def create
      @encounter = Encounter.new(encounter_params)

      if @encounter.save
        render json: @encounter, status: :created, location: [:api, :v1, @encounter]
      else
        render json: @encounter.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /encounters/1
    def update
      if @encounter.update(encounter_params)
        render json: @encounter
      else
        render json: @encounter.errors, status: :unprocessable_entity
      end
    end

    # DELETE /encounters/1
    def destroy
      @encounter.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_encounter
        @encounter = Encounter.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def encounter_params
        params.require(:encounter).permit(:name, :game_id, state: {})
      end
  end
end