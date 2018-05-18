class Api::V1::QuestionListsController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def create
    question_list = QuestionList.new
    question_list.list = List.find(params[:list])
    question_list.question = Question.find(params[:question])
    question_list.save

    render json: { status: "ok" }
  end

  private

  # def question_list_params
  #   params.permit(:list,:question)
  # end

end