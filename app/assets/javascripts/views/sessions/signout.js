App.Views.Sessions.Signout = Backbone.View.extend({
  initialize: function() {
    this.signout();
  },
  signout: function() {
    Backbone.sync('delete', new Session({ id: 1 }));
    App.user = null;
    $(this.el).html("<div class='signout'>You are now signed out</div>");
    $('#app').html(this.el);
    new App.Views.Sessions.HeaderSignin({ model: new Session() });
  }
});
