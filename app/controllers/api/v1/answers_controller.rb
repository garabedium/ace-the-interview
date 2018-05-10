class Api::V1::AnswersController < ApiController
  serialization_scope :current_user

  def answers_by_questions
    questions_public = Question.where(public: true)
    questions = questions_public.map do |item|
      {
        question: {
          id: item.id,
          title: item.title,
          answer: item.answers.find_by(user: current_user)
        }
      }
    end
  end

  def index
    # show all answers for a question:
    # question = Question.find(params[:question_id])
    # answers = question.answers
    if current_user
      answer = Answer.find_by(user: current_user, question: params[:question_id])
      render json: { answer: answer }
    else
      redirect_to "/"
    end
    # answer = Answer.find_by(user: current_user.id, params[:question_id])
    # render json: { questions: Question.where(public: true) }
  end

  def show
    # show answer for a given question:
    # binding.pry
    # question = Question.find(params[:question_id])
  end

  def create
    answer_absent = Answer.find_by(user:current_user,question: params[:question_id]).nil?

    if !current_user.nil? && answer_absent
      answer = Answer.new(answer_params)
      answer.question = Question.find(params[:question_id])
      answer.user = current_user
      answer.save

      render json: { questions: answers_by_questions }
    end

  end


  private
  def answer_params
    params.require(:answer).permit(:hint,:body)
  end

end