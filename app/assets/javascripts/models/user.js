var User = Backbone.Model.extend({
  url: function() {
    var base = 'users';
    if (this.isNew()) return base;
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') - this.id;
  },
  has_voted: function(up_or_down, id) {
    if (App.user && 
      App.user.votes_for_this_user && 
      App.user.votes_for_this_user[id] && 
      (
	(up_or_down == 'up' && App.user.votes_for_this_user[id]['updown']) ||
	(up_or_down == 'down' && App.user.votes_for_this_user[id]['updown'] == false)
      )
    ) {
      return true;    
    }
    else {
      return false;
    }
  }
});
