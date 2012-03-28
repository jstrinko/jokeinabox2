class Joke < ActiveRecord::Base
  scope :limited, :limit => 50
  scope :ordered, :order => '(upvotes - downvotes) desc'
  attr_accessible :upvotes, :downvotes, :joke, :posting_user
  def to_json(options ={})
    super(options.merge(:only => [ :id, :upvotes, :downvotes, :joke, :posting_user, :created_at ]))
  end
end
