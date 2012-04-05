class Joke < ActiveRecord::Base
  before_save :default_values
  validates :joke, :uniqueness => true, :length => { :minimum => 1 }
  validates :user_id, :presence => true
  validates_associated :user
  belongs_to :user
  has_many :votes, :dependent => :destroy
  attr_accessible :joke
  def default_values
    self.upvotes ||= 0
    self.downvotes ||= 0
  end
  def my_joke?
    user_id == current_user.id
  end
  def my_vote
    votes.find { |v| v.user_id == current_user.id && v.joke_id == id }
  end
  def self.jokes_by(option)
    conditions = ''
    order = '((upvotes + 1000000) - downvotes) DESC, created_at DESC'
    if option[:sort] == 'recent' then
      order = 'created_at DESC, (upvotes - downvotes) DESC'
    elsif option[:sort] == 'user' then
      conditions = "user_id = #{option[:id]}"
    end
    find(:all, :order => order, :conditions => conditions)
  end
end
