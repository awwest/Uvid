class UsersController < ApplicationController
    before_action :logged_in_user, only: [:account]
    # before_filter :logged_in_user, only: [:edit]
    # before_action :correct_user,   only: [:edit, :update]

    def index
      @users = User.paginate(page: params[:page]).as_json(only: [:id, :name], include: { 
        posts: {only: :id},
        followers: {only: :follower_id},
        following: {only: :followed_id}
        })

      render status: 200, json: {users: @users}
    end

    def show
      @user = User.find(params[:id])
      @posts = @user.posts.paginate(page: params[:page])
      render json: {
        id: @user.id,
        posts: @posts, 
        name: @user.name, 
        followers: @user.followers,
        following: @user.following,
        isFollowedByCurrentUser: current_user.following?(@user),
        isCurrentUser: current_user.id == @user.id
      }
    end
  
    def create
      @user = User.new(user_params)
      if @user.save
        log_in @user
        render status: 200, json: {id: @user.id}
      else
        render status: 400, json: {error: "Invalid"}
      end
    end
  
    def following
      @user = User.find(params[:id])
      @users = @user.following.paginate(page: params[:page])
      render status: 200, json: {following: @users}
    end

    def followers
      @user = User.find(params[:id])
      @users = @user.followers.paginate(page: params[:page])
      render status: 200, json: {followers: @users}
    end

    def account
      if !current_user.nil?
        render status: 200, json: {}
      else
        render status: 401, json:{error: "User not logged in"}
      end
    end
    # def edit
    #   @user = User.find(params[:id])
    # end
  
    private
  
      def user_params
        params.require(:user).permit(:name, :password,
                                     :password_confirmation)
      end

      def logged_in_user
        unless logged_in?
          render status: 401, json: {error: "INVALID"}
        end
      end

      def correct_user
        @user = User.find(params[:id])
        if @user == current_user
          redirect_to(feed_url)
        end
      end
  end