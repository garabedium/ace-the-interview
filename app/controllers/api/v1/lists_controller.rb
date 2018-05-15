class Api::V1::ListsController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index

    lists = current_user.lists
    # list_questions = lists.map do |list|
    #   {
    #     id: list[:id],
    #     name: list[:name],
    #     questions: list.questions
    #   }
    # end
    # render json: { lists: list_questions }

    render json: lists

  end

  def show
    lists = current_user.lists
    render json: lists.find(params[:id]), serializer: ListShowSerializer
  end

  # def new
  #   list = List.new
  # end

  def create
    list = List.new(list_params)
    list.user = current_user
    list.save

    # lists = current_user.lists

    # list_questions = lists.map do |list|
    #   {
    #     id: list[:id],
    #     name: list[:name],
    #     questions: list.questions
    #   }
    # end

    render json: {id: list.id, name: list.name}

  end

  private
  def list_params
    params.require(:list).permit(:name)
  end

end
