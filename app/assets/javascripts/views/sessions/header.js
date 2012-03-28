App.Views.Sessions.HeaderView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    $(this.el).html(JST['sessions/header_signedin']());
    $('#header').html(this.el);
  }
});
