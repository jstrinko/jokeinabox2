var Joke = Backbone.Model.extend({
  url: function() {
    var base = 'jokes';
    if (this.isNew()) return base;
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id
  },
  total_votes: function() {
    var total = this.get('upvotes') - this.get('downvotes');
    return total ? total : '0';
  }
});

function vote(el) {
  var info = el.id.split('_');
  var vote = new Vote({ updown: info[0] == 'up' ? true : false, joke_id: info[1] });
  vote.save(
    {},
    {
      success: function(model, resp) {
	var vote = new Vote(resp['vote']);
	var joke = new Joke(resp['joke']);
	var up = $('#up_' + vote.get('joke_id'));
	var down = $('#down_' + vote.get('joke_id'));
	up.removeClass();
	down.removeClass();
	if (vote.get('updown')) {
	  up.addClass('upvoted');
	  down.addClass('downvote');
	}
	else {
	  down.addClass('downvoted');
	  up.addClass('upvote');
	}
	$('#votes_' + vote.get('joke_id')).html(joke.get('upvotes') - joke.get('downvotes'));
      },
      error: function() {
	new App.Views.Error();
      }
    }
  );
}
