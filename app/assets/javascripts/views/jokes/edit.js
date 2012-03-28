App.Views.Jokes.Edit = Backbone.View.extend({
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
      { joke: this.$('[name=joke]').val() }, 
      {	
	success: function(model, resp) {
	  new App.Views.Notice({ message: msg });
	  var jokes = new App.Collections.Jokes();
	  jokes.fetch({
	    success: function() {
	      window.location.href = '#';
	    },
	    error: function() {
	      new Error({ message: 'Error creating joke.' });
	    }
	  });
	},
	error: function() {
	  new App.Views.Error();
	}
      }
    );
    return false;
  },
  render: function() {
    $(this.el).html(JST['jokes/edit']({ model: this.model }));
    $('#app').html(this.el);
    this.$('[name=joke]').val(this.model.get('joke'));
    this.delegateEvents();
  }
});
