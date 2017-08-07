require('bundler')
Bundler.require


run Sinatra::Application

ActiveRecord::Base.establish_connection(
	:adapter => 'postgresql',
	:database => 'rental_app'
)

require './Controllers/ApplicationController'
require './Models/UserModel'
require './Controllers/UserController'

map('/users'){run UserController}
