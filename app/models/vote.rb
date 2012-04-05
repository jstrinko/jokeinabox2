class Vote < ActiveRecord::Base
  attr_accessible :joke_id, :updown
  validates :joke_id, :presence => true
  validates :user_id, :presence => true
  validates_inclusion_of :updown, :in => [true, false]
  validates_associated :joke, :user
  belongs_to :joke, :autosave => true
  belongs_to :user
  def self.existing_vote(options) 
    find(:first, :conditions => "user_id = #{options[:user_id]} and joke_id = #{options[:joke_id]}")
  end
  def self.votes_by_user_for_jokes(user_id, jokes) 
    joke_ids = jokes.map{|item| item[:id]}
    find(:all, :conditions => "user_id = #{user_id} and joke_id in (#{joke_ids.join(",")})");
  end
end
