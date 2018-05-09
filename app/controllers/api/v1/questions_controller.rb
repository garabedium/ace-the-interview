class Api::V1::QuestionsController < ApiController
  serialization_scope :current_user

  def index
    render json: { questions: Question.where(public: true) }
  end

end