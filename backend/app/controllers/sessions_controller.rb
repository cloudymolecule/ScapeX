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
end
