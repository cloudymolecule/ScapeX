class SessionsSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :id
end
