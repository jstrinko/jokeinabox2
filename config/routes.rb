Jokeinabox2::Application.routes.draw do
  root :to => "home#index"
  resources :jokes, only: [:index, :show, :create]
  resources :users, only: [:index, :show, :create, :update]
  resources :sessions, only: [:new, :create, :destroy]
  resources :votes, only: [:create, :destroy]
end
