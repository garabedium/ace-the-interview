require "rails_helper"

RSpec.describe Api::V1::AnswersController, type: :controller do

  before(:each) do
    @user = FactoryBot.create(:user)
    # @category = FactoryBot.create(:category)
    @question = FactoryBot.create(:question)
    # QuestionCategory.create(question: @question, category: @category)
    @answer = Answer.create(user: @user, question: @question, body: "Lorem ipsum dolum")
  end

  describe "GET#index" do
    it "should return an answer for a specific question" do
      sign_in(@user)

      get :index, params: {question_id: @answer.question_id}

      returned_json = JSON.parse(response.body)["answer"]

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["body"]).to eq "#{@answer.body}"

    end

  end
end