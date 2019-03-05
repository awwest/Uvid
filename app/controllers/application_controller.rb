class ApplicationController < ActionController::Base
    include SessionsHelper
    protect_from_forgery with: :null_session

    def index
        render :file => "/public/_index.html"
    end

    private
        def logged_in_user
            unless logged_in?
              render status: 401, json: {error: "INVALID"}
            end
        end
end
