module Refinery
  module Blog
    Post.class_eval do
      def should_generate_new_friendly_id?
        will_save_change_to_attribute?(:custom_url) || will_save_change_to_attribute?(:title)
      end
    end
  end
end
