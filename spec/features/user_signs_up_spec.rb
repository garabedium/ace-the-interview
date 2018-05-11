require 'rails_helper'

feature 'user registers', %Q{
  As a visitor
  I want to register
  So that I can create an account
} do

  # Acceptance Criteria:
  # * I must specify a valid email address,
  #   password, and password confirmation
  # * If I don't specify the required information, I am presented with
  #   an error message

  Industry.create(name: 'Test Industry')

  scenario 'provide valid registration information' do
    visit new_user_registration_path

    fill_in 'Email', with: 'john@example.com'
    fill_in 'First name', with: 'John'
    fill_in 'Last name', with: 'Doh'

    select("Test Industry", :from => "user[industry_id]")

    fill_in 'Zip', with: '02918'
    fill_in 'Password: (min. 6 characters)', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_button 'Sign up'

    # expect(page).to have_content('Welcome! You have signed up successfully.')
    expect(page).to have_content('Sign Out')
  end

  scenario 'provide invalid registration information' do
    visit new_user_registration_path

    click_button 'Sign up'
    expect(page).to have_content("can't be blank")
    expect(page).to_not have_content('Sign Out')
  end
end