App.Views.Jokes.Index = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    $(this.el).html(JST['jokes/jokes_collection']({ collection: this.collection }));
    $('#app').html(this.el);
    $('.upvote').click(function() { vote(this); });
    $('.downvote').click(function() { vote(this); });
    $('#joke_link_' + App.selected).addClass('selected');
  },
});
