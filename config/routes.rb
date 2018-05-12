Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # resources :questions

  namespace :api do
    namespace :v1 do

      resources :questions do
        resources :answers
      end

      resources :categories, only: [:index,:show]

    end
  end

  get "app", to: 'apps#index'
  get "app/questions", to: 'apps#questions'
  get "app/categories", to: 'apps#categories'
  get "app/categories/:id", to: 'apps#categories'

end
