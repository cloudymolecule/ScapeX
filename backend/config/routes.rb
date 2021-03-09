Rails.application.routes.draw do
  # resources :users 
  # resources :sessions
  post '/users', to: 'users#create'
  post '/sessions/login', to: 'sessions#login'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
