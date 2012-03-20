class UsersController < ApplicationController
  def index
  end
  def show
    render :json => Users.find(params[:id])
  end
  def create
    user = User.create! params
    render :json => user
  end
  def update
    user = Users.find(params[:id])
    user.update_attributes! params
    render :json => user
  end
end
