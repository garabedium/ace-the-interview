class Api::V1::CategoriesController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index
    render json: Category.all.order(name: :asc)
  end

  def show
    render json: Category.find(params[:id]), serializer: CategoryShowSerializer
  end

end