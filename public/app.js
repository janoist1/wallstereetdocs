(function ($) {
  const container = $('body > .container')
  const navBar = $('.navbar button[aria-label="Toggle navigation"]')

  function loadPage(url) {
    $.get(url)
      .done(function (data) {
        container.html(data)
      })
      .fail(function (err) {
        alert(err)
      })
  }

  function isNavBarOpen() {
    return navBar.attr('aria-expanded') === "true"
  }

  $('.nav-link').click(function () {
    if (isNavBarOpen()) {
      navBar.click()
    }

    loadPage(event.target.href)

    return false
  })

})(jQuery)
