MorganIo::Application.routes.draw do
  resource :witchifier, :only => :show
  root :to => 'application#index'
end
