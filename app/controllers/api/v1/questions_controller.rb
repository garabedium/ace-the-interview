class Api::V1::QuestionsController < ApiController
  serialization_scope :current_user

  def answers_by_questions
    questions_public = Question.where(public: true)
    questions = questions_public.map do |item|
      {
        question: {
          title: item.title,
          answer: item.answers.find_by(user: current_user)
        }
      }
    end

  end

  def index
    if current_user
      render json: { questions: answers_by_questions }
    else
      redirect_to "/"
    end
  end

end