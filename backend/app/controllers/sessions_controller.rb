class SessionsController < ApplicationController
    def login
        if user = User.find_by(username: params[:username])
            render json: user, only: [:username]
        else
            render json: {
                error: "Error while logging in, try again.",
                status: 400
            }
        end
    end
end
