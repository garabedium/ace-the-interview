class Api::V1::QuestionsController < ApiController
  serialization_scope :current_user

  def index

    if current_user
      # questions_public = Question.where(public: true)
      # questions_hash = questions_public.each do |item|
      #   "question" => {
      #     "title" =>  item["title"]
      #   }
      # end
      # render json: {
      #   questions: Question.where(public: true)
      # }
      questions = Question.where(public: true)
      render json: questions

    else
      redirect_to "/"
    end
  end

end