require "rails_helper"

RSpec.describe Api::V1::ListsController, type: :controller do

  before(:each) do
    @user = FactoryBot.create(:user)
    @list = List.create(name: 'Some List', user: @user)
    @list.questions = create_list(:question, 3)
    sign_in(@user)
    get :show, params: {id: @list.id}
  end

  describe "GET#index" do

    it "should have a name" do
      returned_json = JSON.parse(response.body)["list"]["name"]

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to eq "#{@list.name}"
    end

    it "should have a list of questions" do
      returned_json = JSON.parse(response.body)["list"]["questions"]

      expect(returned_json.length).to eq @list.questions.length
      expect(returned_json[0]["title"]).to eq @list.questions[0].title
    end

  end
end