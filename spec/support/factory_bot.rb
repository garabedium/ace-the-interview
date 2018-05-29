require 'factory_bot'

FactoryBot.define do

  factory :industry do
    sequence(:name) {|n| "Industry Name #{n}" }
  end

  factory :category do
    sequence(:name) { |n| "Industry Name #{n}" }
  end

  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    first_name 'Lorem'
    last_name 'Ipsum'
    industry { FactoryBot.create(:industry) }
    zip '02918'
    password 'password'
    password_confirmation 'password'
  end

  factory :question do
    sequence(:title) {|n| "How do you lorem the #{n}?" }
    # category { FactoryBot.create(:category) }
    user { FactoryBot.create(:user) }
  end

  factory :answer do
    sequence(:body) {|n| "This is an awesome answer, no: #{n}?" }
    user { FactoryBot.create(:user) }
    question { FactoryBot.create(:question) }
  end

end
