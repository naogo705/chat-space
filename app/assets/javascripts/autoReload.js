$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
        `<div class="main-chat__message-list__group-message" data-message-id=${message.id}>
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
      let html =
       `<div class="main-chat__message-list__group-message" data-message-id=${message.id}>
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

  let reloadMessages = function() {
    let last_message_id = $('.main-chat__message-list__group-message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});