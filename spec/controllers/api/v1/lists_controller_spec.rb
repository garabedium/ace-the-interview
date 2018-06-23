require "rails_helper"

RSpec.describe Api::V1::ListsController, type: :controller do

  before(:each) do
    @user = FactoryBot.create(:user)
    @list = List.create(name: 'Some List', user: @user)
    questions = create_list(:question, 3)
    # QuestionCategory.create(question: @question, category: @category)
  end

  describe "GET#index" do
    it "should have name" do
      sign_in(@user)
      get :show, params: {id: @list.id}

      returned_json = JSON.parse(response.body)["list"]["name"]

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to eq "#{@list.name}"
    end

  end
end