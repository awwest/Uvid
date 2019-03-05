Rails.application.routes.draw do
  get '/', to: 'application#index'
  scope '/api' do
    get '/feed', to: 'feed#index'

  end
  resources :users do
    member do
      get :following, :followers
    end
  end

  # root :to => "feed#home"

  resources :posts, only: [:create, :destroy]
  resources :relationships, only: [:create, :destroy]
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/account', to: 'users#account'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
