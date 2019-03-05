class PostsController < ApplicationController
    before_action :logged_in_user, only: [:create, :destroy]
    before_action :correct_user, only: :destroy

    def create
        @post = current_user.posts.build({video_id: post_params[:video], user_id: current_user.id})
        if @post.save
            render status: 200, json: {video: @post.video_id}
        else
            render status: 500, json: {error: 'Could not save video'}
        end
    end

    def destroy
        @post = Post.find_by(id: params[:id])
        @post.destroy
        render status: 200, json: {}
    end


    private
        def post_params
            params.permit(:video)
        end
        def correct_user
            @post = current_user.posts.find_by(id: params[:id])
            if @post.nil?
                render status: 200, json:{}
            end
        end
end