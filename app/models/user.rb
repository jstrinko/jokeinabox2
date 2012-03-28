class User < ActiveRecord::Base
  attr_accessible :username, :email, :password, :password_confirmation
  has_secure_password
  before_save :create_remember_token

  validates :username, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\2+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, 
#    format: { with: VALID_EMAIL_REGEX }, 
    uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }
  validates :password_confirmation, presence: true
  def to_json(options ={})
    super(options.merge(:only => [ :id, :username, :email ]))
  end
  private
  def create_remember_token
    self.remember_token = SecureRandom.urlsafe_base64
  end
end
