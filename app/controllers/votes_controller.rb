class VotesController < ApplicationController
  def create
    vote = Vote.existing_vote(:joke_id => params[:vote][:joke_id], :user_id => current_user[:id])
    if vote then 
      if vote.updown && params[:vote][:updown] == false then
	vote.joke.upvotes -= 1
	vote.joke.downvotes += 1
      elsif !vote.updown && params[:vote][:updown] then 
	vote.joke.upvotes += 1
	vote.joke.downvotes -= 1
      end
      if vote.update_attributes :updown => params[:vote][:updown] then
	render :json => {
	  :vote => vote,
	  :joke => vote.joke
	}
      else 
	render :json => vote.errors
      end
    else
      vote = Vote.new(params[:vote])
      vote.user_id = current_user.id
      if vote.updown then 
	vote.joke.upvotes += 1
      else
	vote.joke.downvotes += 1
      end
      if vote.save then
	render :json => {
	  :vote => vote,
	  :joke => vote.joke
	}
      else
	render :json => vote.errors
      end
    end
  end
  def destroy
    vote = Vote.find(params[:id])
    if vote.updown then
      vote.joke.upvotes -= 1
    else 
      vote.joke.downvotes -= 1
    end
    (vote.joke.save and vote.destroy) or throw 'unable to delete vote'
    render :json => { :success => true }
  end
end
