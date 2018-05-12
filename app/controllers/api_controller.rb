class ApiController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def user_answers_by_question
    questions_public = Question.where(public: true)
    questions = questions_public.map do |item|
      {
        question: {
          id: item.id,
          title: item.title,
          categories: item.categories,
          answer: item.answers.find_by(user: current_user)
        }
      }
    end
  end

end