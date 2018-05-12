class Api::V1::QuestionsController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index
    render json: { questions: answers_by_questions }
  end

end