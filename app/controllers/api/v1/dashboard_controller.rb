class Api::V1::DashboardController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index
    questions = current_user.questions
    industry = current_user.industry
    answers = current_user.answers
    lists = current_user.lists

    questions_answers = answers.map do |item|
      {
        question: item.question,
        answer: item.body,
        categories: item.question.categories
      }
    end

    render json: {
      questions_created: questions,
      questions_answered: questions_answers,
      lists: lists,
      industry: {
        industry: industry.name,
        id: industry.id
      }
    }
  end


end