require 'rotp'

Refinery::Authentication::Devise::SessionsController.class_eval do
  before_action :check_otp, :only => [:create]

  protected

  def check_otp
    name = params[:authentication_devise_user][:login]
    otp = params[:otp]
    userId = Refinery::Authentication::Devise::User.where(["username = ? OR email = ?", name, name]).order(:id).limit(1).pluck(:id)[0];
    raise RuntimeError if (otp.blank? || userId.blank?)

    secret = Token.where(["refinery_authentication_devise_user_id = ?", userId]).order(:id).limit(1).pluck(:secret)[0];
    raise RuntimeError if secret.blank?

    totp = ROTP::TOTP.new(secret)
    raise RuntimeError if !totp.verify(otp)

  rescue RuntimeError
    flash[:error] = t('wrong_username_otp')
    logger.error("Wrong username/email or wrong OTP was entered. Username: [#{name}]. OTP: [#{otp}].")
    redirect_to :back
  end
end
