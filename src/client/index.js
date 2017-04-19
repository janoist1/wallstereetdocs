// the following assets need to be required somewhere in order to make webpack aware of them
require('../assets/styles.css')
require('./plugins/dateFormat')
require('./plugins/enhanceProfile')

(function ($) {
  const content = $('body > .content')
  const navBar = $('.navbar button[aria-label="Toggle navigation"]')

  function loadPage(url) {
    $.get(url)
      .done(function (data) {
        updatePage(data)
      })
      .fail(function (err) {
        alert(err)
      })
  }

  function isNavBarOpen() {
    return navBar.attr('aria-expanded') === "true"
  }

  function initNavigation() {
    $('a:not(.external)').click(function () {
      if (isNavBarOpen()) {
        navBar.click()
      }

      loadPage(event.target.href)

      return false
    })
  }

  function updatePage(html) {
    content.html(html)

    const page = content.find('> div').attr('data-page')

    console.log('PAGE:', page)

    switch (page) {
      case 'profile':
        content.enhanceProfile()
        break;
    }
  }

  initNavigation()
  updatePage()
})(jQuery)
