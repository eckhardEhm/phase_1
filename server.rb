require 'webrick'

class MyServer < WEBrick::HTTPServer
  MIME_TYPES = {
    '.html' => 'text/html',
    '.js' => 'application/javascript',
    '.css' => 'text/css',
    '.png' => 'image/png',
    '.jpg' => 'image/jpeg',
    '.jpeg' => 'image/jpeg',
    '.gif' => 'image/gif',
    '.webp' => 'image/webp',
    # Add other MIME types as needed
  }

  def initialize
    super(
      Port: 8080,
      DocumentRoot: Dir.pwd
    )
  end

  def do_GET(req, res)
    path = File.join(Dir.pwd, req.path[1..-1])

    if File.file?(path)
      extname = File.extname(path)
      res.content_type = MIME_TYPES[extname] || 'application/octet-stream'
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
    res.status = 500
    res.body = "Internal Server Error: #{e.message}"
  end
end

server = MyServer.new
trap('INT') { server.shutdown }
server.start
