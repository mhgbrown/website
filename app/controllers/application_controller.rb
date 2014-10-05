class ApplicationController < ActionController::Base
  protect_from_forgery

  def index
    g = Git.open('.', :log => Logger.new(STDOUT))
    commit = g.gcommit('HEAD')
    @sha = commit.sha
  end

end
