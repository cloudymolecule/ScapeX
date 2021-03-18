class Room < ApplicationRecord
    belongs_to :user
    has_many :items, :dependent => :destroy

    validates :name, :setting, :time_limit, :completed_message, :attempts, :attempts_allowed, :times_completed, :obj_room, :obj_exit, :lock, presence: true
    validates :name, uniqueness: true
    validates :time_limit, :attempts_allowed, :obj_room, :obj_exit, format: {
        with: /\A\d+\z/, message: "Only numbers allowed."
    }

    validates :name, length: {maximum: 20}
    validates :time_limit, length: {maximum: 2}
    validates :attempts_allowed, length: {maximum: 2}
    validates :obj_room, length: {maximum: 2}
    validates :obj_exit, length: {maximum: 1}

    validates :time_limit, numericality: {greater_than_or_equal_to: 0 }
    validates :time_limit, numericality: {less_than_or_equal_to: 60 }

    validates :attempts_allowed, numericality: {greater_than_or_equal_to: 0 }
    validates :attempts_allowed, numericality: {less_than_or_equal_to: 10 }

    validates :obj_room, numericality: {greater_than_or_equal_to: 1 }
    validates :obj_room, numericality: {less_than_or_equal_to: 50 }

    validates :obj_exit, numericality: {greater_than_or_equal_to: 0 }
    validates :obj_exit, numericality: {less_than_or_equal_to: 3 }
end
