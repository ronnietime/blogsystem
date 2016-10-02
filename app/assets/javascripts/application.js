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

function toggleMenu() {
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
}

// Current page starts from 1
function initScroll(currentPage, totalPages) {
  function buildUrl(pageIndex) {
    return location.pathname + (pageIndex == 1 ? '' : '?page=' + pageIndex);
  }

  function infiniteScroll() {
    var currentWindowTop = $(window).scrollTop();

    if (currentWindowTop > windowTop) {
      // Scroll down
      if (currentPage < totalPages && currentWindowTop + $(window).height() > pageTops[currentPage + 1]) {
        currentPage++;
        $(window).off('scroll', infiniteScroll);
        if ($('div[data-page=' + currentPage + ']').length === 0) {
          $('#posts').append(window.pageHtmls[currentPage]);
          pageTops = getTops();
        }
        history.pushState({}, '', buildUrl(currentPage));
        if (currentPage < totalPages && !window.pageHtmls[currentPage + 1]) {
          $.getScript(buildUrl(currentPage + 1), function () {
            $(window).on('scroll', infiniteScroll);
          });
        } else {
          $(window).on('scroll', infiniteScroll);
        }
      }
    }

    if (currentWindowTop < windowTop) {
      // Scroll up
      if (currentPage >= 2 && currentWindowTop < pageTops[currentPage]) {
        currentPage--;
        $(window).off('scroll', infiniteScroll);
        if ($('div[data-page=' + currentPage + ']').length === 0) {
          $('#posts').prepend(window.pageHtmls[currentPage]);
          pageTops = getTops();
          $(document).scrollTop(pageTops[currentPage + 1] - pageTopOffset);
        }
        history.pushState({}, "", buildUrl(currentPage));
        if (currentPage >= 2 && !window.pageHtmls[currentPage - 1]) {
          $.getScript(buildUrl(currentPage - 1), function () {
            $(window).on('scroll', infiniteScroll);
          })
        } else {
          $(window).on('scroll', infiniteScroll);
          $('#additional-top').remove();
        }
      }
    }

    windowTop = currentWindowTop;
  }

  function getTops() {
    var pages = $('div[data-page]'),
        positions = [];

    pages.each(function(index) {
      var top = $(this).position().top - pageTopOffset - headerHeight,
          pageIndex = parseInt($(this).data('page'));
      positions[pageIndex] = top;
      if (index === pages.length - 1) {
        positions[pageIndex + 1] = top + $(this).height();
      }
    });

    return positions;
  }

  window.pageHtmls = [];
  var windowTop = $(window).scrollTop(),
      headerHeight = $('.site-header').outerHeight(),
      pageTopOffset = parseInt($('.post').eq(0).css('margin-top')),
      pageTops = getTops();

  // Prefetch previous page and next page
  if (currentPage > 1) {
    $.getScript(buildUrl(currentPage - 1));
  }
  if (currentPage < totalPages) {
    $.getScript(buildUrl(currentPage + 1));
  }

  if ($('body').hasClass('listing')) {
    $(window).on('scroll', infiniteScroll);
  }
}

$(document).ready(function() {
  toggleMenu();
  Prism.highlightAll();
  window.scrollTo(0, $('#additional-top').height() || 0);
});
