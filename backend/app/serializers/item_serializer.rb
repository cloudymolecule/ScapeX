class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :looked_message, :take, :take_message, :closed, :closed_message, :talk, :talk_message, :locked, :locked_message, :opened_message, :room
  belongs_to :room
end
