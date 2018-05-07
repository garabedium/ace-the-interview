class Api::V1::QuestionsController < ApiController
  def index
    render json: { questions: Question.all }
  end
end