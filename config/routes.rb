Jokeinabox2::Application.routes.draw do
    root :controller => 'home'
    resources :users
    resources :jokes
end
