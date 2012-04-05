class UsersController < ApplicationController
  def index
    render :json => User.all
  end
  def show
    render :json => User.find(params[:id])
  end
  def create
    user = User.create!(username: params[:username], password: params[:password], password_confirmation: params[:password_confirmation], email: params[:email])
    if user
      sign_in user
      render :json => user
    end
  end
  def update
    user = User.find(params[:id])
    user.update_attributes!(username: params[:username], password: params[:password], password_confirmation: params[:password_confirmation], email: params[:email])
    render :json => user
  end
end
