UserApp.Views.Users.View = Backbone.View.extend(
  {
    initialize: function() {
      this.user = this.options.user;
      this.render();
    },
    render: function() {
      if (this.user) {
	var out = "<h3>" + this.user.name + "</h3>";
      }
      else {
	var out = "<h3>No such user!</h3>";
      }
      $(this.el).html(out);
      $('#app').html(this.el);
    }
  }
);
