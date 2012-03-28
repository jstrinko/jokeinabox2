Jokeinabox2::Application.routes.draw do
  root :to => "home#index"
  resources :jokes, :users
  resources :sessions, only: [:new, :create, :destroy]
end
