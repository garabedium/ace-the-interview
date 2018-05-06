class UserSeeder
  USERS = [
    {:email => 'ace@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret', :first_name => 'Greg', :last_name =>'Gee', :industry_id => Industry.find(5).id, :admin => true, :zip => '02115'}
    {:email => 'lorem@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret', :first_name => 'Lore', :last_name =>'Lee', :industry => Industry.find(2), admin: false, :zip => '02116'}
  ]

  def self.seed!
    USERS.each do |item|
      user = User.find_or_initialize_by(email: item[:email])
      user.first_name = item[:first_name]
      user.last_name = item[:last_name]
      user.industry = item[:industry]
      user.password = item[:password]
      user.password_confirmation = item[:password_confirmation]
      user.admin = item[:admin]
      user.zip = item[:zip]
      user.save!
    end
  end
end