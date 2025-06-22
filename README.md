# Textura E-commerce Platform 
 
Modern fashion e-commerce application with React frontend and Node.js backend. 
 
## Structure 
- `/backend` - Node.js Express API server 

## FrontEnd fix if encountered
# Remove node_modules directory and lock file
rd /s /q node_modules
del package-lock.json

# Clean npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Run front cd
npm run dev

# Run backend
node server.js

