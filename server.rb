require 'webrick'

# Create a custom WEBrick server
class MyServer < WEBrick::HTTPServer
  def initialize
    super(
      Port: 8080,
      DocumentRoot: Dir.pwd
    )
  end

  # Serve files and handle errors
  def do_GET(req, res)
    path = File.join(Dir.pwd, req.path[1..-1])

    if File.file?(path)
      # Serve the requested file
      res.content_type = WEBrick::HTTPUtils.mime_type(File.extname(path))
      res.body = File.read(path)
      res['Cache-Control'] = 'no-cache, no-store, must-revalidate'
      res['Pragma'] = 'no-cache'
      res['Expires'] = '0'
    else
      # Serve index.html if file is not found
      res.content_type = 'text/html'
      res.body = File.read(File.join(Dir.pwd, 'index.html'))
      res['Cache-Control'] = 'no-cache, no-store, must-revalidate'
      res['Pragma'] = 'no-cache'
      res['Expires'] = '0'
    end
  rescue => e
    # Handle any unexpected errors
    res.status = 500
    res.body = "Internal Server Error: #{e.message}"
  end
end

# Start the server
server = MyServer.new

# Handle server shutdown
trap('INT') { server.shutdown }
server.start
