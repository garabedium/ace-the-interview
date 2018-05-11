class Api::V1::AnswersController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

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

    answer = Answer.find_by(user: current_user, question: params[:question_id])
    render json: { answer: answer }

    # answer = Answer.find_by(user: current_user.id, params[:question_id])
    # render json: { questions: Question.where(public: true) }
  end

  def show
    # show answer for a given question:
    # binding.pry
    # question = Question.find(params[:question_id])
    answer = Answer.find_by(user: current_user, question: params[:question_id])
    render json: { answer: answer }
  end

  # def editable_by?(user)
  #   user.admin? || self.user == user
  # end
  # def edit
  #   @answer = Answer.find(params[:id])
  #   if @answer.editable_by?(current_user)

  #   end
  # end

  def edit
    @answer = Answer.find(params[:id])
  end

  def update
    @answer = Answer.find(params[:id])
    if !current_user.nil? && current_user == @answer.user
      @answer = @answer.update(answer_params)

      render json: { questions: answers_by_questions }
    end
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

  def authorize_user
    if !user_signed_in?
      # flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end

end