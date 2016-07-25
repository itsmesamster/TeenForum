require "sidekiq/pausable"

Sidekiq.configure_client do |config|
  config.redis = {:url => "redis://localhost:6379", :size => 9}
  #config.redis = { :url => "redis://h:pbfcskqo41doc59rvoadqbqpp7b@ec2-54-235-219-225.compute-1.amazonaws.com:7579", :namespace => "sidekiq", :size => 30 }
end

Sidekiq.configure_server do |config|
  config.redis = {:url => "redis://localhost:6379", :size => 9}
  #config.redis =  { :url => "redis://h:pbfcskqo41doc59rvoadqbqpp7b@ec2-54-235-219-225.compute-1.amazonaws.com:7579", :namespace => "sidekiq", :size => 30 }
end