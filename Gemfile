source 'http://rubygems.org'

gem 'rails', '3.1.3'
gem 'thin'
gem 'heroku'

group :production do
  gem 'pg'
end

group :development, :test do
  gem 'sqlite3'
  gem "rspec-rails", "~> 2.6"
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.1.5'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'

group :test do
  # Pretty printed test output
  gem 'turn', '~> 0.8.3', :require => false
end
