class SessionsController < ApplicationController
    def login
        # byebug
        # user = User.find(params[:id])
        user = User.new
        render json: user
    end

    def logout
        render json: user
    end

    def auth
        # if session[:user]
        #     user = "hello"
        #     render json: user
        # else
        #     user = 'goodbye'
        #     render json: user
        # end
        user = User.new
        user.username = "andy"
        render json: user
        
    end
end
