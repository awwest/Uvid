class SessionsController < ApplicationController
  def create
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      log_in(user)
      puts session[:user_id]
      render status: 200, json: {id: user.id}
    else
      render status: 400, json: {error: "Incorrect login information"}
    end
  end

  def destroy
    log_out
    render status: 200, json: {}
  end
end
