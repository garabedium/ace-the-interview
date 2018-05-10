class Api::V1::AnswersController < ApiController
  serialization_scope :current_user

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
    if current_user
      answer = Answer.new(answer_params)
      # check answers table if question && current_user already exist
      answer.question = Question.find(params[:question_id])
      answer.user = current_user
      answer.save
    end
  end


  private
  def answer_params
    params.require(:answer).permit(:hint,:body)
  end

end