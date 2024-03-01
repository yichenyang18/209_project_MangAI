import http.server
import socketserver
import os

# Set the directory containing your files
directory = os.path.abspath('.')

# Define the port you want to run the server on
PORT = 8000

# Create a handler to serve the files
Handler = http.server.SimpleHTTPRequestHandler

# Change to the directory from which you want to serve the files
os.chdir(directory)

# Start the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Serving at port http://localhost:{}".format(PORT))
    httpd.serve_forever()
