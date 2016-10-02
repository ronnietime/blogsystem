// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

(function() {
  var toggleMenu = function() {
    $('.menu-toggle').on('click', function(e) {
      e.preventDefault();
      var target = $(this),
          menu = $('.slide-menu'),
          body = $('body');
      if (target.hasClass('toggle-on')) {
        target.removeClass('toggle-on');
        menu.removeClass('expanded');
        body.removeClass('sidebar-open');
      } else {
        target.addClass('toggle-on');
        menu.addClass('expanded');
        body.addClass('sidebar-open');
      }
    });
  };

  var initScroll = function() {
    function infiniteScroll() {
      var currentPosition = $(window).scrollTop();

      if (currentPosition > position) {
        if (pagesInfo.nextPageUrl && $(window).scrollTop() + $(window).height() > page_positions[page_positions.length - 1].bottom) {
          $(window).off('scroll', infiniteScroll);
          $.getScript(pagesInfo.nextPageUrl, function() {
            updateState(pagesInfo.nextPageUrl);
          });
        }
      } else {
        if (pagesInfo.prevPageIndex >= 1 && $(window).scrollTop() < page_positions[0].top) {
          var prevPageUrl = location.pathname + '?page=' + pagesInfo.prevPageIndex;
          $(window).off('scroll', infiniteScroll);
          $.getScript(prevPageUrl + '&direction=up', function() {
            updateState(pagesInfo.prevPageIndex == 1 ? location.pathname : prevPageUrl);
            $(document).scrollTop(page_positions[1].top);
          });
        }
      }

      position = currentPosition;
    }

    function getPagesInfo() {
      var pages = $('div[data-page]'),
          firstPage = pages.first(),
          positions = [];

      pages.each(function() {
        var top = $(this).position().top,
            height = $(this).height();
        positions.push({top: top, bottom: top + height})
      });

      return {
        prevPageIndex: firstPage.data('page') - 1,
        nextPageUrl: $('.pagination .next_page').prop('href'),
        positions: positions
      };
    }

    function updateState(url) {
      history.pushState({}, '', url);
      pagesInfo = getPagesInfo();
      page_positions = pagesInfo.positions;
      $(window).on('scroll', infiniteScroll);
    }

    var position = $(window).scrollTop(),
        pagesInfo = getPagesInfo(),
        page_positions = pagesInfo.positions;

    $(window).on('scroll', infiniteScroll);
  };

  $(document).ready(function() {
    toggleMenu();
    Prism.highlightAll();
    initScroll();
  });
}) ();
