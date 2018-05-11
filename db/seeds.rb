# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

if Rails.env.development? || Rails.env.production?
  IndustrySeeder.seed!
  UserSeeder.seed!
  QuestionSeeder.seed!
  AnswerSeeder.seed!
  CategorySeeder.seed!
  QuestionCategorySeeder.seed!
end
