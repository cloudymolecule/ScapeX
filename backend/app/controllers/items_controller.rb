class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :update, :destroy]

  # GET /items
  def index
    items = Room.find_by(id: params[:id]).items
    render json: ItemSerializer.new(items)
  end

  # GET /items/1
  def show
    item = Item.find(params[:id])
    render json: ItemSerializer.new(item)
  end

  # POST /items
  def create
    # byebug
    item = Item.new(item_params)
    if item.save
      render json: ItemSerializer.new(item)
    else
      render json: {errors: item.errors.full_messages}
    end
  end

  # PATCH/PUT /items/1
  def update
    item = Item.find(params[:id])
    if item.update(item_params)
      render json: ItemSerializer.new(item)
    else
      render json: {errors: item.errors.full_messages}
    end
  end

  # DELETE /items/1
  def destroy
    item = Item.find(params[:id])
    item.destroy
    render json: {success: "Item deleted successfully"}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      item = Item.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def item_params
      params.require(:item).permit(:room_id, :name, :description, :looked_message, :take, :take_message, :closed, :closed_message, :talk, :talk_message, :locked, :locked_message, :opened_message)
    end
end
