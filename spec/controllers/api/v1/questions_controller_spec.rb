require "rails_helper"

RSpec.describe Api::V1::QuestionsController, type: :controller do

  question0 = FactoryBot.create(:question)
  question1 = FactoryBot.create(:question)
  question2 = FactoryBot.create(:question)

  describe "GET#index" do
    it "should return a list of all the public questions" do
      get :index

      returned_json = JSON.parse(response.body)
      returned_json = returned_json["questions"]

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 3

      expect(returned_json[0]["title"]).to eq "#{question0.title}"
      expect(returned_json[1]["title"]).to eq "#{question1.title}"
      expect(returned_json[2]["title"]).to eq "#{question2.title}"

      returned_json.each do |item|
        expect(item["public"]).to eq(true)
      end

    end

  end
end