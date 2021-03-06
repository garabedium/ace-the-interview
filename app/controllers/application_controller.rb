class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery unless: -> {request.format.json?}

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit(:email, :password, :password_confirmation, :first_name, :last_name, :zip, :industry_id)
    end
  end

  def after_sign_in_path_for(resource)
    '/app'
  end

  def after_sign_up_path_for(resource)
    '/app'
  end

  def authorize_user
    if !user_signed_in?
      redirect_to root_path
    end
  end

end
