class User < ApplicationRecord
    has_secure_password
    validates :username, :email, presence: true
    validates :username, :email, uniqueness: true
    validates :password, presence: true, confirmation: true, on: :create
end
