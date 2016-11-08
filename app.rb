require 'rubygems'
require 'rack/cache'
require 'sinatra'
require 'pony'

use Rack::Cache

before do
  cache_control :public, :must_revalidate, :max_age => 60
end

get '/' do
  cache_control :public, :max_age => 36000
  @title = 'Adam Fidler - Front End Developer'
  @body_id = 'home'
  erb :index, :layout => :'layout'
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
