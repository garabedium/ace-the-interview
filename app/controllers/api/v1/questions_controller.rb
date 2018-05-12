class Api::V1::QuestionsController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index
    render json: { questions: user_answers_by_question }
    # render json: Question.all # Couple this with the serializer....
  end

end