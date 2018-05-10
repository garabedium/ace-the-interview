# require "rails_helper"

# RSpec.describe Api::V1::AnswersController, type: :controller do

#   user = FactoryBot.create(:user)
#   question = FactoryBot.create(:question)
#   answer = FactoryBot.create(:answer)

#   describe "GET#index" do
#     it "should return an answer for the specific user's question" do
#       get "/api/v1/questions/#{question.id}/answers"
# binding.pry
#       returned_json = JSON.parse(response.body)
#       returned_json = returned_json["answers"]

#       expect(response.status).to eq 200
#       expect(response.content_type).to eq("application/json")
#       expect(returned_json.length).to eq 1
#       expect(returned_json[0]["body"]).to eq "#{answer.body}"
#       expect(returned_json[0]["question_id"]).to eq "#{question.id}"

#       returned_json.each do |item|
#         expect(item["public"]).to eq(true)
#       end

#     end

#   end
# end