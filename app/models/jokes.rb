class Jokes < ActiveRecord::Base
  named_scope :limited, :limit => 50
  named_scope :ordered, :order => '(upvotes - downvotes) desc'
  attr_accessible :upvotes, :downvotes, :joke, :posting_user
  def to_json(options ={})
    super(options.merge(:only => [ :id, :upvotes, :downvotes, :joke, :posting_user, :created_at ])
  end
end
