var Vote = Backbone.Model.extend({
  url: function() {
    var base = 'votes';
    if (this.isNew()) return base;
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') - this.id;
  }
});
