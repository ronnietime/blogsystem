Refinery::Authentication::Devise::User.class_eval do
  if self.respond_to?(:devise)
    devise :database_authenticatable, :registerable, :recoverable, :timeoutable,
           :trackable, :validatable, authentication_keys: [:login]
  end
end
