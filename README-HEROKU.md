# Deploying to Heroku

## Prerequisites
Ensure you have a Heroku account and have installed the Heroku CLI.  
Log in to Heroku CLI using the command:
```
heroku login
```

## Deployment Steps

### 1. Create a Heroku Application
```
heroku create your-app-name
```

### 2. Set Buildpack for Docker
```
heroku stack:set container -a your-app-name
```

### 3. Configure Required Environment Variables
You can set environment variables through the Heroku web interface or using the CLI:
```
heroku config:set VITE_APP_DOMAIN=your-domain -a your-app-name
```

#### Important Environment Variables:
- **VITE_APP_DOMAIN**: Your application’s domain  
- **VITE_BACKEND_URL**: URL of the backend API (if applicable)  
- **VITE_CORS_PROXY_URL**: URL of the CORS proxy (if needed)  
- **VITE_TMDB_READ_API_KEY**: TMDB API key (if using TMDB)  
- **VITE_PWA_ENABLED**: Enable/disable PWA functionality ("true" or "false")  

### 4. Deploy to Heroku
```
git add .
git commit -m "Prepare for deployment to Heroku"
git push heroku main
```
If you are working on a branch other than `main`, use:
```
git push heroku your-branch:main
```

### 5. Open the Application
```
heroku open -a your-app-name
```

## Troubleshooting

### Check Logs
```
heroku logs --tail -a your-app-name
```

### Restart Application
```
heroku restart -a your-app-name
```

## Notes
- The application uses `serve` to serve built static files.  
- Heroku automatically assigns a port via the `PORT` environment variable.  
- The `Dockerfile` is configured to work with Heroku.  
- The `heroku.yml` file defines how Heroku builds and runs the application.

