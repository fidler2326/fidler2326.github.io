require 'rubygems'
require 'sinatra'
require 'pony'

get '/' do
  @title = 'Adam Fidler - Front End Developer'
  @body_id = 'home'
  erb :index, :layout => :'layout'
  set :static_cache_control, [:public, :max_age => 300]
end

post '/' do
  configure_pony
  name = params[:name]
  sender_email = params[:email]
  message = params[:message]
  logger.error params.inspect
  begin
    Pony.mail(
      :from => "#{name}<#{sender_email}>",
      :to => 'fidler2326@gmail.com',
      :subject =>"#{name} has contacted you",
      :body => "#{message}",
    )
    redirect '/'
  rescue
    @exception = $!
    erb :error
  end
end

def configure_pony
  Pony.options = {
    :via => :smtp,
    :via_options => {
      :address              => 'smtp.sendgrid.net',
      :port                 => '587',
      :user_name            => ENV['SENDGRID_USERNAME'],
      :password             => ENV['SENDGRID_PASSWORD'],
      :authentication       => :plain,
      :enable_starttls_auto => true,
      :domain               => 'heroku.com'
    }
  }
end
