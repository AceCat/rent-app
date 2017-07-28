class ApplicationController < Sinatra::Base

  options '*' do
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Headers'] = 'content-type'
    response['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,DELETE'
    200
  end

	before do
		response['Access-Control-Allow-Origin'] = '*'
    	content_type :json
		path = request.fullpath.split("?")[0]

		if path.include? '/users' || request.request_method == 'OPTIONS'
			puts "users pass"
			pass
		else
			token = params[:token]
			user = User.find_by(token: token)
			puts user
			if user
				pass
			else	
				halt 403
			end
		end
	end

end