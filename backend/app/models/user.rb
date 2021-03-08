class User < ApplicationRecord
    has_secure_password
    validates :username, :email, presence: true
    validates :password, presence: true, confirmation: true, on: :create
end
