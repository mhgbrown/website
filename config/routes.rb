MorganIo::Application.routes.draw do
  root :to => 'application#index'
  match "/projects/witchifier" => redirect("http://witchifier.morgan.io")
end
