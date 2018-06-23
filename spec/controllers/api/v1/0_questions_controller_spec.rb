require "rails_helper"

RSpec.describe Api::V1::QuestionsController, type: :controller do

  before(:each) do
    @user = FactoryBot.create(:user)
    @category = FactoryBot.create(:category)
    @question = FactoryBot.create(:question)
    QuestionCategory.create(question: @question, category: @category)
  end

  describe "GET#index" do
    it "should return a single question" do

      sign_in(@user)
      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["question"]["public"]).to eq true
      expect(returned_json["question"]["title"]).to eq "#{@question.title}"
      expect(returned_json["categories"][0]["name"]).to eq "#{@category.name}"
    end
  end

end