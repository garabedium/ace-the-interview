class Api::V1::ListsController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index

    lists = current_user.lists

    list_questions = lists.map do |list|
      {
        list:{
          id: list[:id],
          name: list[:name],
          questions: list.questions
        }
      }
    end

    render json: { lists: list_questions }
  end

end