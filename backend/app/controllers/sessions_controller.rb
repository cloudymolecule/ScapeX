class SessionsController < ApplicationController
    def login
        user = User.find_by(username: params[:input]) || user = User.find_by(email: params[:input])
        if user && user.authenticate(params[:password])    
            render json: UserSerializer.new(user)
        else
            render json: {
                error: "Error while logging in, try again.",
                status: 400
            }
        end
    end
end
