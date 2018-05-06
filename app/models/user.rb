class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :industry

  validates :first_name, presence: true
  validates :last_name, presence: true
  # validates :industry, presence: true
  validates :zip, presence: true

end
