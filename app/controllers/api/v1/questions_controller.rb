class Api::V1::QuestionsController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index

    user_industry = current_user.industry.name
    industry_category_id = Category.find_by(name: user_industry).id
    industry_questions = Category.find_by(id: industry_category_id).questions
    industry_questions = industry_questions.map do |item|
      {
        id: item.id,
        title: item.title,
        categories: item.categories,
        answer: item.answers.find_by(user: current_user)
      }
    end

    render json: {
      category: user_industry,
      questions: industry_questions
    }
    #using serializer: # render json: industry_questions

  end

  def create
  end

  private
  #def question_params
    # params.require(:answer).permit(:hint,:body)
  #end


end