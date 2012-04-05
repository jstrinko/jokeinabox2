App.Views.Sessions.Signin = Backbone.View.extend({
  events: {
    "submit form": "signin"
  },
  container: 'app',
  uri: 'sessions/signin',
  initialize: function() {
    this.render();
  },
  signin: function() {
    this.model.save(
      { 
	username: this.$('[name=signin_username]').val(),
	password: this.$('[name=signin_password]').val()
      },
      {
	success: function(model, resp) {
	  hide_signin_popup();
	  App.user = new User(model);
	  window.location.href = '#users/welcome';
	},
	error: function() {
	  new Error({ message: 'Invalid credentials' });
	}
      }
    );
    return false;
  },
  render: function() {
    $(this.el).html(JST[this.uri]({ model: this.model }));
    $('#' + this.container).html(this.el);
    this.$('[name=signin_username]').val(this.model.get('user'));
    this.delegateEvents();
  }
});

App.Views.Sessions.HeaderSignin = App.Views.Sessions.Signin.extend({
  container: 'header',
  uri: 'sessions/header_signin'
});

var popup_status = 0;
function show_signin_popup() {
  center_popup('signin_popup');
  if (popup_status == 0) {
    $('#popup_background').css({ 'opacity': '0.7' });
    $('#popup_background').fadeIn('slow');
    $('#signin_popup').fadeIn('slow');
    popup_status = 1;
    $('[name=signin_username]').focus();
  }
  return false;
}
function hide_signin_popup() {
  if (popup_status == 1) {
    $('#popup_background').fadeOut('slow');
    $('#signin_popup').fadeOut('slow');
    popup_status = 0;
  }
  return false;
}
function center_popup(id) {
  var w_width = document.documentElement.clientWidth;
  var w_height = document.documentElement.clientHeight;
  var p_height = $('#' + id).height();
  var p_width = $('#' + id).width();
  $('#' + id).css({
    'position': 'absolute',
    'top': w_height/2 - p_height/2,
    'left': w_width/2 - p_width/2
  });
} 

