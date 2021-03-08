class UsersController < ApplicationController
    def create
        user = User.new(
            username: params[:username],
            email: params[:email],
            password: params[:password],
            password_confirmation: params[:password_confirmation]
        )
        if user.save
            render json: user
        else
            render json: {
                error: "Error while creating account, try again.",
                status: 400
            }
        end

    end
end
