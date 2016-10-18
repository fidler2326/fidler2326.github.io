require 'rubygems'
require 'sinatra'
require 'pony'

get '/' do
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
    redirect '/success'
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
      :user_name            => ENV['fidler2326'],
      :password             => ENV['Yewaka170!'],
      :authentication       => :plain,
      :enable_starttls_auto => true,
      :domain               => 'localhost'
    }
  }
end
