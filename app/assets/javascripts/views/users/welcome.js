App.Views.Users.Welcome = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    $(this.el).html(JST['users/welcome']({ model: App.user }));
    $('#app').html(this.el);
  }
});
