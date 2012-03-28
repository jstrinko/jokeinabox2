App.Router = Backbone.Router.extend({
  routes: {
    "":		  	"joke_index",
    "jokes/new":	"joke_new",
    "jokes/:id":  	"joke_edit",
    "users/new":        "user_signup",
    "users/:id":        "user_view",
    "users/:id/edit":   "user_edit",
    "sessions/signin":	"session_signin",
    "sessions/signout":	"session_signout"
  },
  initialize: function() {
    if (App.user) {
      new App.Views.Sessions.HeaderView({ model: App.session });
    }
    else {
      new App.Views.Sessions.HeaderSignin({ model: new Session() });
    }
  },
  joke_edit: function(id) {
    var joke = new Joke({ id: id });
    joke.fetch({
      success: function(model, resp) {
	new App.Views.Jokes.Edit({ model: joke }); 
      },
      error: function() {
	new Error({ message: 'Could not find that joke' });
      }
    });
  },
  joke_index: function() {
    var jokes = new App.Collections.Jokes();
    jokes.fetch({
      success: function() {
	new App.Views.Jokes.Index({ collection: jokes });
      },
      error: function() {
	new Error({ message: 'Error loading jokes' });
      }
    });
  },
  joke_new: function() {
    new App.Views.Jokes.Edit({ model: new Joke() });
  },
  user_edit: function(id) {
    var user = new User({ id: id });
    user.fetch(
      {
        success: function(model, resp) {
          new App.Views.Users.Edit({ model: user });
        },
        error: function() {
          new Error({ message: 'You are not authorized to edit this profile.' });
          window.location.hash = '#';
        }
      }
    );
  },
  user_view: function(id) {
    var user = new User({ id: id });
    user.fetch(
      {
        success: function(model, resp) {
          new App.Views.Users.View({ model: user });
        },
        error: function() {
          new Error({ message: 'You are not authorized to view this profile.' });
          window.location.href = '#';
        }
      }
    );
  },
  user_signup: function() {
    new App.Views.Users.Edit({ model: new User() });
  },
  session_signin: function() {
    new App.Views.Sessions.Signin({ model: new Session() });
  },
  session_signout: function() {
    new App.Views.Sessions.Signout({ model: new Session() });
  },
});
