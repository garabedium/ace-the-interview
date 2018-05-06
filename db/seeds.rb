# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

if Rails.env.development? || Rails.env.production?
  IndustrySeeder.seed!
end

if Rails.env.development?
  UserSeeder.seed!
end

# User.create!(:email => 'ace@gmail.com',:password => 'topsecret', :password_confirmation => 'topsecret', :first_name => 'Greg', :last_name =>'Gee', :admin => true, :zip => '02115')
# User.create!(:email => 'lorem@gmail.com',:password => 'topsecret', :password_confirmation => 'topsecret', :industry_id => Industry.find(2), :first_name => 'Greg', :last_name =>'Gee', :zip => '02116')