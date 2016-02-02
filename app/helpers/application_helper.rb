module ApplicationHelper
  def navigation_menu is_top
    presenter = Refinery::Pages::MenuPresenter.new(refinery_menu_pages, self)
    presenter.css = is_top ? 'nav' : 'nav bottom-nav'
    presenter.list_tag_css= 'menu'
    presenter.dom_id = ''
    presenter.selected_css = 'current'
    presenter.active_css = 'current'
    presenter.first_css = ''
    presenter.last_css = ''
    presenter
  end
end
