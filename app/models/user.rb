class User < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    has_many :posts, dependent: :destroy
    has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
    has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy
    has_many :followers, through: :passive_relationships
    has_many :following, through: :active_relationships, source: :followed

    has_secure_password

    def timeline
        following_ids = "SELECT followed_id FROM relationships WHERE follower_id = :user_id"
        Post.where("user_id IN (#{following_ids}) OR user_id = :user_id", user_id: id)
    end

    def follow(other)
        following << other
    end

    def unfollow(other)
        following.delete(other)
    end

    def following?(other)
        following.include?(other)
    end
end
