# Use Nginx image to serve static files
FROM nginx:alpine

# Copy your frontend files into Nginx default directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
