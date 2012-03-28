var Session = Backbone.Model.extend({
  url: function() {
    var base = 'sessions';
    if (this.isNew()) return base;
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id
  }
});

