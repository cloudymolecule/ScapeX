class UsersController < ApplicationController
    def create
        user = User.new(
            username: params[:username],
            email: params[:email],
            password: params[:password],
            password_confirmation: params[:password_confirmation]
        )
        if user.save
            session[:user] = user.id
            render json: user
        else
            render json: {
                error: "The user didn's save to the super sqlite",
                status: 400
            }
        end

    end
end
