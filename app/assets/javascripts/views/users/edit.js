App.Views.Users.Edit = Backbone.View.extend({
  events: {
    "submit form": "save"
  },
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.render();
  },
  save: function() {
    var msg = this.model.isNew() ? 'Successfully Created!' : 'Saved!';
    this.model.save(
      { 
	username: this.$('[name=username]').val(),
	password: this.$('[name=password]').val(),
	password_confirmation: this.$('[name=password_confirmation]').val(),
	email: this.$('[name=email]').val()
      },
      {
	success: function(model, resp) {
	  App.user = model;
	  new App.Views.Sessions.HeaderView();
	  new App.Views.Users.Welcome();
	},
	error: function() {
	  new App.Views.Error();
	}
      }
    );
    return false;
  },
  render: function() {
    $(this.el).html(JST['users/edit']({ model: this.model }));
    $('#app').html(this.el);
    this.$('[name=username]').val(this.model.get('username'));
    this.delegateEvents();
  }
});
