class UsersController < ApplicationController
    def create
        user = User.new(
            username: params[:username],
            email: params[:email],
            password: params[:password],
            password_confirmation: params[:password_confirmation]
        )
        if user.save
            render json: UserSerializer.new(user)
        else
            render json: {errors: user.errors.full_messages}
        end

    end
end
