class SessionsController < ApplicationController
    def login
       
        if user = User.find_by(username: params[:input]) || user = User.find_by(email: params[:input])
            render json: user, only: [:username]
        else
            render json: {
                error: "Error while logging in, try again.",
                status: 400
            }
        end
    end
end
