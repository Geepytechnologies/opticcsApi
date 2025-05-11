module.exports = {
  apps : [
{
      name: "opticcs", // Change this to your app's name
      script: "build/index.js", 
      watch: false, // Optional: Auto-restart on file changes
      env: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
]
}
