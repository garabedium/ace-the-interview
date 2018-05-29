require "rails_helper"

RSpec.describe Api::V1::QuestionsController, type: :controller do

  before(:each) do
    @user = FactoryBot.create(:user)
    @category = FactoryBot.create(:category)
    @question = FactoryBot.create(:question)
    QuestionCategory.create(question: @question, category: @category)
  end

  describe "GET#index" do

    it "should return a list of all the public questions" do
      # visit new_user_session_path

      # fill_in 'Email', with: @user.email
      # fill_in 'Password', with: @user.password
      # click_button 'Log in'
      # session[:user_id] = @user.id
      sign_in(@user)

      # test fails because of this line: industry_category_id = Category.find_by(name: user_industry).id
      # it's failing because it's looking for a category with the same name as the Industry name
      # failing now because: categories = question.categories

      get :index
      binding.pry

      returned_json = JSON.parse(response.body)

      returned_json = returned_json["questions"]

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 2

      expect(returned_json[0]["title"]).to eq "#{@question1.title}"
      expect(returned_json[1]["title"]).to eq "#{@question2.title}"

      returned_json.each do |item|
        expect(item["public"]).to eq(true)
      end

    end

  end
end