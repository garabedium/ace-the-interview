class Api::V1::QuestionsController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index

    user_industry = current_user.industry.name
    industry_category_id = Category.find_by(name: user_industry).id
    question = Category.find_by(id: industry_category_id).questions.sample(1)[0]
    categories = question.categories
    answer = question.answers.find_by(user: current_user)

    # industry_question = industry_questions.map do |item|
    #   {
    #     id: item.id,
    #     title: item.title,
    #     categories: item.categories,
    #     answer: item.answers.find_by(user: current_user)
    #   }
    # end

    render json: {
      question: question,
      answer: answer,
      categories: categories
    }

    # render json: industry_question[0] # use with serializer

  end

  def show

  end

  def new
    @question = Question.new
  end

  def create
    @question = Question.new(question_params)
    @question.user = current_user
    @question.save

    render json: { questions: user_answers_by_question }
  end


  private
  def question_params
    params.require(:question).permit(:title)
  end

end