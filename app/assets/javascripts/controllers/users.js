UserApp.Controllers.Users = Backbone.Controller.extend(
  {
    routes: {
      "users/:id":	"view",
      "users/:id/edit":	"edit",
      "users/new":	"signup",
      "users/signin":	"signin"
    },
    edit: function(id) {
      var user = new User({ id: id });
      user.fetch(
	{
	  success: function(model, resp) {
	    new UserApp.Views.Users.Edit({ model: user });
	  },
	  error: function() {
	    new Error({ message: 'You are not authorized to edit this profile.' });
	    window.location.hash = '#';
	  }
	}
      );
    },
    view: function(id) {
      var user = new User({ id: id });
      user.fetch(
	{
	  success: function(model, resp) {
	    new UserApp.Views.Users.View({ model: user });
	  },
	  error: function() {
	    new Error({ message: 'You are not authorized to view this profile.' });
	    window.location.href = '#';
	  }
	}
      );
    },
    signup: function() {
      new UserApp.Views.Users.Edit({ model: new User() });
    },
    signin: function() {
      new UserApp.Views.Users.Signin({ model: new User() });
    }
  }
);
