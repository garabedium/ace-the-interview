Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # resources :questions

  namespace :api do
    namespace :v1 do
      resources :questions
    end
  end

  get "app", to: 'apps#index'
  get "app/questions", to: 'apps#questions'

end
