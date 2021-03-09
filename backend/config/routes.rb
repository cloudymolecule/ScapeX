Rails.application.routes.draw do
  # resources :users 
  # resources :sessions
  post '/users', to: 'users#create'
  post '/login', to: 'sessions#login'
  get '/auth', to: 'sessions#auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
