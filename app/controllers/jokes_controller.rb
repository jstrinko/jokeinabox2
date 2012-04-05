class JokesController < ApplicationController
  def index
    jokes = Joke.jokes_by(params)
    render :json => {
      jokes: jokes,
      votes: current_user ? Vote.votes_by_user_for_jokes(current_user[:id], jokes) : [],
      users: User.users_by_jokes(jokes)
    }
  end
  def show
    render :json => Joke.find(params[:id])
  end
  def create
    @joke = Joke.new(joke: params[:joke])
    @joke.user_id = current_user[:id]
    logger.warn @joke.user.valid?
    if @joke.save then
      render :json => @joke
    else
      render :json => @joke.errors, status: :unprocessable_entity
    end
  end
end
