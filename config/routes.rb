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

      resources :dashboard, only: [:index]
      resources :categories
      resources :lists
      resources :question_lists

    end
  end

  get "app", to: 'apps#index'
  get "app/dashboard", to: 'apps#dashboards'
  get "app/categories/:id", to: 'apps#categories'
  get "app/lists/:id", to: 'apps#lists'

end
