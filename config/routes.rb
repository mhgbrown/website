MorganIo::Application.routes.draw do
  resources :projects, :only => :index do
  	collection do
  		resource :witchifier, :only => :show, :controller => :witchifier
  	end
  end

  root :to => 'application#index'
end
