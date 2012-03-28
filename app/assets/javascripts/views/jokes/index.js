App.Views.Jokes.Index = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    $(this.el).html(JST['jokes/jokes_collection']({ collection: this.collection }));
    $('#app').html(this.el);
  }
});
