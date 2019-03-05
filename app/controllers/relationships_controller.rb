class RelationshipsController < ApplicationController
    before_action :logged_in_user

    def create
        user = User.find(params[:followed_id])
        current_user.follow(user)
        render status: 200, json: {followed: user.id}
    end

    def destroy
        user = Relationship.find_by(followed_id: params[:id], follower_id: current_user.id).followed
        current_user.unfollow(user)
        render status: 200, json: {unfollowed: user.id}
    end

end
