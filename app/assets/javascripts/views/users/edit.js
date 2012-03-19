UserApp.Views.User.Edit = Backbone.View.extend(
  {
    events: {
      "submit form": "save"
    },
    initialize: function() {
      this.render();
    },
  }
);
