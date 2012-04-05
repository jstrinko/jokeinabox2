class User < ActiveRecord::Base
  attr_accessible :username, :email, :password, :password_confirmation
  has_secure_password
  before_save :create_remember_token

  validates :username, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\2+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, 
    uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }, :on => :create
  validates :password_confirmation, :presence => true, :on => :create
  has_many :votes, :dependent => :destroy
  has_many :jokes, :dependent => :destroy
  def to_json(options ={})
    super(options.merge(:only => [ :id, :username ]))
  end
  def self.users_by_jokes(jokes)
    user_ids = jokes.map{|item| item[:user_id]}
    find(:all,  :conditions => "id in (#{user_ids.join(',')})")
  end
  private
  def create_remember_token
    self.remember_token = SecureRandom.urlsafe_base64
  end
end
