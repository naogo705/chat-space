$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = `<div class="main-chat__message-list__group-message">
                    <div class="main-chat__message-list__group-message__list">
                      <div class="main-chat__message-list__group-message__list__name">
                        ${message.user_nickname}
                      </div>
                      <div class="main-chat__message-list__group-message__list__dateinfo">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Message">
                      <p class="Message__content">
                        ${message.content}
                      </p>
                      <img class="Message__image" src="${message.image}">
                    </div>
                </div>`
              return html;
    } else {
      let html = `<div class="main-chat__message-list__group-message">
                    <div class="main-chat__message-list__group-message__list">
                      <div class="main-chat__message-list__group-message__list__name">
                        ${message.user_nickname}
                      </div>
                      <div class="main-chat__message-list__group-message__list__dateinfo">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Message">
                      <p class="Message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
                  return html;
    };
  }

  $('.new-message').on('submit', function(e){
    e.preventDefault();
    let formDate = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formDate,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $('.main-chat__message-list').append(html)
      $('form')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $(".submit-btn").prop("disabled", false);
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    });
  });
});