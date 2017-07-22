require 'SecureRandom'

class UserController < ApplicationController

	get '/' do
		User.all.to_json
	end

	get '/:id' do
		id = params[:id]
		user = User.find(id)
		user.to_json
	end

	post '/register' do
		user_details = JSON.parse(request.body.read)
		user = User.new
		user.email = user_details["email"]
		user.password = user_details["password"]
		user.zip_code = user_details["zip_code"]
		user.token = SecureRandom.hex
		user.save
		user.to_json
	end

	post '/login' do
		content_type :json
		login_details = JSON.parse(request.body.read)
		user = User.find_by({email: login_details["email"]})
		if user && user.authenticate(login_details["password"])
			user.to_json
		else
			"Access denied"
		end
	end


end