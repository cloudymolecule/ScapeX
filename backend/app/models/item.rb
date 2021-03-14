class Item < ApplicationRecord
    belongs_to :room

    validates :name, :description, :looked_message, presence: true
    validates :take_message, presence: true, if: :take_validation


    def take_validation
        take 
    end
end
