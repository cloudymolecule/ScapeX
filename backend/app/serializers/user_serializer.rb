class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :email, :id, :rooms 
end
