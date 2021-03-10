class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :id
end
