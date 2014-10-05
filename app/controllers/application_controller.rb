class ApplicationController < ActionController::Base
  protect_from_forgery

  def index
    @sha = `git rev-parse HEAD`
    @short_sha = `git rev-parse --short=7 HEAD`
  end

end
