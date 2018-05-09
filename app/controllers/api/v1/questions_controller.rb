class Api::V1::QuestionsController < ApiController
  serialization_scope :current_user

  def index
    if current_user
      render json: { questions: Question.where(public: true) }
    else
      redirect_to "/"
    end
  end

end