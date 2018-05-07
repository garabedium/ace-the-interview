class UserSeeder
  USERS = [
<<<<<<< HEAD
    {:email => 'ace@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret', :first_name => 'Greg', :last_name =>'Gee', :admin => true, :zip => '02115'},
    {:email => 'lorem@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret', :first_name => 'Lore', :last_name =>'Lee', :admin => false, :zip => '02116'}
=======
    {:email => 'ace@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret', :first_name => 'Greg', :last_name =>'Gee', :industry => Industry.first, :admin => true, :zip => '02115'},
    {:email => 'lorem@gmail.com', :password => 'topsecret', :password_confirmation => 'topsecret', :first_name => 'Lore', :last_name =>'Lee', :industry => Industry.last, :admin => false, :zip => '02116'}
>>>>>>> master
  ]

  def self.seed!
    USERS.each do |item|
      user = User.find_or_initialize_by(email: item[:email])
      user.first_name = item[:first_name]
      user.last_name = item[:last_name]
<<<<<<< HEAD
      # user.industry = item[:industry]
=======
      user.industry = item[:industry]
>>>>>>> master
      user.password = item[:password]
      user.password_confirmation = item[:password_confirmation]
      user.admin = item[:admin]
      user.zip = item[:zip]
      user.save!
    end
  end
end