class JokesController < ApplicationController
  def index
    render :json => Joke.limited.ordered.all
  end
  def show
    render :json => Joke.find(params[:id])
  end
  def create
    joke = Joke.create! params
    render :json => joke
  end
  def update
    joke = Joke.find(params[:id])
    document.update_attributes! params
    render :json => joke
  end
end
