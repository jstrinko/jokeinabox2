JokeApp.Controllers.Jokes = Backbone.Controller.extend({
  routes: {
    "jokes/:id":  "edit",
    "":		  "index",
    "new":	  "newJoke"
  },
  edit: {
    var joke = new Joke({ id: id });
    joke.fetch({
      success: function(model, resp) {
	new JokeApp.Views.Edit({ model: joke }); 
      },
      error: function() {
	new Error({ message: 'Could not find that joke' });
      }
    });
  },
  index: function() {
    var jokes = new JokeApp.Collections.Jokes();
    jokes.fetch({
      success: function() {
	new JokeApp.Views.Index({ collection: jokes });
      },
      error: function() {
	new Error({ message: 'Error loading jokes' });
      }
    });
  },
  newJoke: function() {
    new JokeApp.Views.Edit({ model: new Joke() });
  }
});
