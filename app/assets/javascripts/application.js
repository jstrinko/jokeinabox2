var App = {
  Views: {
    Jokes: {},
    Users: {},
    Sessions: {}
  },
  Collections: {},
  init: function() {
    new App.Router();
  }
};
$(document).ajaxSend(function(e, xhr, settings) {
  xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
});
