App.Views.Sessions.Signin = Backbone.View.extend({
  events: {
    "submit form": "signin"
  },
  container: 'app',
  uri: 'sessions/signin',
  initialize: function() {
    this.render();
  },
  signin: function() {
    this.model.save(
      { 
	username: this.$('[name=signin_username]').val(),
	password: this.$('[name=signin_password]').val()
      },
      {
	success: function(model, resp) {
	  App.user = model;
	  new App.Views.Notice({ message: 'Welcome, ' + App.user.attributes.username });
	  new App.Views.Sessions.HeaderView();
	},
	error: function() {
	  new Error({ message: 'Invalid credentials' });
	}
      }
    );
    return false;
  },
  render: function() {
    $(this.el).html(JST[this.uri]({ model: this.model }));
    $('#' + this.container).html(this.el);
    this.$('[name=username]').val(this.model.get('user'));
    this.delegateEvents();
  }
});

App.Views.Sessions.HeaderSignin = App.Views.Sessions.Signin.extend({
  container: 'header',
  uri: 'sessions/header_signin'
});
