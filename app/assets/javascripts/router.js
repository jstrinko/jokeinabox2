App.Router = Backbone.Router.extend({
  routes: {
    "":		  	"joke_index",
    "jokes_by/:sort":	"joke_index",
    "jokes_by/:sort/:id": "joke_index",
    "jokes/new":	"joke_new",
    "jokes/:id":  	"joke_edit",
    "users/new":        "user_signup",
    "users/welcome":	"user_welcome",
    "users/:id":        "user_view",
    "users/:id/edit":   "user_edit",
    "sessions/signin":	"session_signin",
    "sessions/signout":	"session_signout",
  },
  initialize: function() {
    if (App.user) {
      new App.Views.Sessions.HeaderView({ model: new Session() });
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
  joke_index: function(sort, id) {
    var jokes = new App.Collections.Jokes();
    if (sort) {
      if (sort == 'user') {
	if (App.user && App.user.id == id) {
	  App.selected = 'mine';
	}
      }
      else {
	App.selected = sort;
      }
    }
    else {
      App.selected = 'top';
    }
    jokes.url = '/jokes?sort=' + sort + '&id=' + id;
    fetch_jokes(jokes);
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
  user_welcome: function() {
    new App.Views.Users.Welcome({ model: App.user });
  },
  session_signin: function() {
    new App.Views.Sessions.Signin({ model: new Session() });
  },
  session_signout: function() {
    new App.Views.Sessions.Signout({ model: new Session() });
  },
});
function fetch_jokes(jokes) {
  jokes.fetch({
    success: function(collection, response) {
      var joke_collection = new App.Collections.Jokes(response['jokes']); /* hack */
      var votes = response['votes'];
      var users = response['users'];
      if (!App.user_cache) {
	App.user_cache = new Array();
      }
      for(var x=0; x<users.length; x++) {
	var user_data = users[x];
	App.user_cache[user_data.id] = new User(user_data);
      }
      if (App.user) {
	if (!App.user.votes_for_this_user) {
	  App.user.votes_for_this_user = new Array();
	}
	for(var x=0; x<votes.length; x++) {
	  var vote = votes[x];
	  App.user.votes_for_this_user[vote['joke_id']] = vote;
	}
      }
      new App.Views.Jokes.Index({ collection: joke_collection });
    },
    error: function() {
      new Error({ message: 'Error loading jokes' });
    }
  });
}
