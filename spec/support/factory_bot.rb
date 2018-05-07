require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    first_name 'Lorem'
    last_name 'Ipsum'
    zip '02918'
    password 'password'
    password_confirmation 'password'
  end

end
