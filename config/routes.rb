MorganIo::Application.routes.draw do
  resource :witchifier, :only => :show, :controller => :witchifier
  root :to => 'application#index'
end
