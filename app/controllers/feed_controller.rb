class FeedController < ApplicationController
    def index
      if logged_in?
        @videos = current_user.timeline.paginate(page: params[:page])
        users = []
        @videos.each do |v|
          user = {
            "name" => User.find_by(id: v.user_id).name,
            "video" => v.id
          }
          users.push(user)
        end
        render(
          status: 200,
          json: { videos: @videos, users: users, page: params[:page] }
        )
      else
        render status: 200, json: {videos: Posts.paginate(page: params[:page])}
      end
    end
  end