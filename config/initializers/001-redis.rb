if Rails.env.development? && ENV['DISCOURSE_FLUSH_REDIS']
  puts "Flushing redis (development mode)"
  $redis.flushall
end
uri = URI.parse(ENV["REDISTOGO_URL"] || "redis://localhost:6379/" )
REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
#REDIS = Redis.new(url: ENV["HEROKU_REDIS_BLUE_URL"])
if defined?(PhusionPassenger)
    PhusionPassenger.on_event(:starting_worker_process) do |forked|
        if forked
            Discourse.after_fork
        else
            # We're in conservative spawning mode. We don't need to do anything.
        end
    end
end

