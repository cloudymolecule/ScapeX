class SessionsController < ApplicationController
    def login
        user = User.find_by(username: params[:input]) || user = User.find_by(email: params[:input])
        if user && user.authenticate(params[:password])    
            render json: UserSerializer.new(user)
        else
            render json: {errors: ["Error while logging in, try again."]} 
        end
    end
end
