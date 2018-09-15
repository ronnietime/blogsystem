Refinery::Blog.configure do |config|
  Refinery::Blog.user_class = "Refinery::Authentication::Devise::User"
end
