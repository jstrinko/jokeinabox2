class JokesController < ApplicationController
  def index
    render :json => Joke.limited.ordered.all
  end
  def show
    render :json => Joke.find(params[:id])
  end
  def create
    joke = Joke.create! :joke => params[:joke]
    render :json => joke
  end
  def update
    joke = Joke.find(params[:id])
    joke.update_attributes! :joke => params[:joke] 
    render :json => joke
  end
end
