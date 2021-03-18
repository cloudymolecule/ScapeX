class RoomsController < ApplicationController
  # before_action :set_room, only: [:show, :update, :destroy]

  def index
    if params[:id]
      byebug
      user = User.find(params[:id])
      rooms = user.rooms
     
    else
      byebug
      rooms = Room.all
    end
    render json: RoomSerializer.new(rooms)
  end

  def show
    room = Room.find(params[:id])
    render json: RoomSerializer.new(room)
  end

  # POST /rooms
  def create
    room = Room.new(room_params)
    if room.save
      render json: RoomSerializer.new(room)
    else
      render json: {errors: room.errors.full_messages}
    end
  end

  # PATCH/PUT /rooms/1
  def update
    # byebug
    room = Room.find(params[:id])
    if room.update(room_params)
      render json: RoomSerializer.new(room)
    else
      render json: {errors: room.errors.full_messages}
    end
  end

  # DELETE /rooms/1
  def destroy
    room = Room.find(params[:id])
    room.destroy
    render json: {success: "Room deleted successfully"}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_room
    #   room = Room.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def room_params
      params.require(:room).permit(:user_id, :name, :setting, :time_limit, :completed_message, :attempts, :attempts_allowed, :times_completed, :obj_room, :obj_exit, :lock)
    end
end
