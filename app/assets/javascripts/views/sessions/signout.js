App.Views.Sessions.Signout = Backbone.View.extend({
  initialize: function() {
    this.signout();
  },
  signout: function() {
    this.model.destroy();
    App.user = {};
    $(this.el).html(JST['sessions/signout']());
    $('#app').html(this.el);
  }
});
