class UsersController < ApplicationController
    def create
        user = User.new
        render json: user
    end

end
