Rails.application.routes.draw do
  root "application#index"
  get "/projects/witchifier" => redirect("http://witchifier.morgan.io")
end
