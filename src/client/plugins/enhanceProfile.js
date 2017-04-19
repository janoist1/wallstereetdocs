(function($) {
  $.fn.enhanceProfile = function() {
    const profile = $(this)

    // keys
    profile.find('.key').each(function () {
      const formatted = $(this).html()
        .split('_')
        .map(i => i[0].toUpperCase() + i.substr(1).toLowerCase())
        .join(' ') + ':'

      $(this).html(formatted)
    })

    // dates
    profile
      .find('.field-created_at, .field-updated_at')
      .find('.value')
      .dateFormat('dd/MM/yyyy HH:mm:ss')
  }
})(jQuery)
