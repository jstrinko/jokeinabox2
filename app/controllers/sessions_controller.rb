class SessionsController < ApplicationController
  def new
  end
  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])
      sign_in user
      render :json => user
    else 
      render :json => 'Invalid User'
    end
  end
  def destroy
  end
end
