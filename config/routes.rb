Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'pages#home'
  get 'googlemaps', to: 'pages#google_maps_api'

  resources :users, only: [:show, :index, :update]
end
