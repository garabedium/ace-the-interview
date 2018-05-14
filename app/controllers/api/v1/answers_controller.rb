class Api::V1::AnswersController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index
    answer = Answer.find_by(user: current_user, question: params[:question_id])
    render json: { answer: answer }
  end

  def show
    answer = Answer.find_by(user: current_user, question: params[:question_id])
    render json: { answer: answer }
  end

  def edit
    @answer = Answer.find(params[:id])
  end

  def update

    @answer = Answer.find(params[:id])

    if current_user && current_user == @answer.user
      @answer = @answer.update(answer_params)

      render json: { questions: user_answers_by_question }
    end
  end

  # def editable_by?(user)
  #   user.admin? || self.user == user
  # end
  # def edit
  #   @answer = Answer.find(params[:id])
  #   if @answer.editable_by?(current_user)

  #   end
  # end

  def new
    @answer = Answer.new
  end

  def create
    answer_absent = Answer.find_by(user:current_user,question: params[:question_id]).nil?

    if !current_user.nil? && answer_absent
      @answer = Answer.new(answer_params)
      @answer.question = Question.find(params[:question_id])
      @answer.user = current_user
      @answer.save

      render json: { questions: user_answers_by_question }
    end

  end


  private
  def answer_params
    params.require(:answer).permit(:hint,:body)
  end


end