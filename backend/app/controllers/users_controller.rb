class UsersController < ApplicationController
    before_action :set_room, only: [:show, :update, :destroy]

    def create
        user = User.new(user_params)
        if user.save
            render json: UserSerializer.new(user)
        else
            render json: {errors: user.errors.full_messages}
        end
    end

    private

    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end
end
