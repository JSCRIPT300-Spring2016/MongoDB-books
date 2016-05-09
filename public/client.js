$(function () {
  $.get('/books', function (data) {
    var list = [];

    if (data && Array.isArray(data)) {
      data.forEach(function (item) {
        list.push('<li><span class="delete_link" data-book="' + item._id + '">X</span><a href="/books/' + item._id + '">' + item.title + '</a></li>');
      });
      $('.books-list').append(list);
    }
  });

  $('form').on('submit', function (evt) {
    evt.preventDefault();
    var $form = $(this);

    // serialize will transform our form data into urlencoded notation
    var bookData = $form.serialize();

    $.ajax({
      method: 'POST',
      url: '/books',
      data: bookData
    })
    .done(function (data) {
      var item = '<li><span class="delete_link" data-book="' + data._id + '">X</span><a href="/books/' + data._id + '">' + data.title + '</a></li>';

      $('.books-list').append(item);
      $form.trigger('reset');
    });
  });

  $('.books-list').on('click', '[data-book]', function (evt) {
    if (!confirm('Delete book?')) {
      return false;
    }
    var $target = $(evt.currentTarget);

    $.ajax({
      method: 'DELETE',
      url: '/books/' + $target.data('book'),
    })
    .done(function () {
      $target.closest('li').remove();
    });
  });
});