class RoomSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :setting, :time_limit, :completed_message, :attempts, :attempts_allowed, :times_completed, :obj_room, :obj_exit, :lock, :items
  belongs_to :user
end
