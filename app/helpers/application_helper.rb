module ApplicationHelper
  def navigation_menu
    presenter = Refinery::Pages::MenuPresenter.new(refinery_menu_pages, self)
    presenter.css = 'main-navigation'
    presenter.list_tag_css= 'menu'
    presenter.dom_id = ''
    presenter.selected_css = 'current-menu-item'
    presenter.active_css = 'current-menu-item'
    presenter.first_css = ''
    presenter.last_css = ''
    presenter
  end
end
