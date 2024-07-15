# The Fun Bunch - Client

To start Client - npm run dev
To start Server - nodemon

npm run preview: The vite preview command will boot up a local static web server that serves the files from dist at http://localhost:4173 

npm run preview -- --port 8080

to get changes live, on client:
    1) ensure css is always updated in the dist folder on Client: npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch

    2) git commands
            git add -A
            git commit -m ""
            git push
    
    3) on client
        npm run build
    ** It may take about 10 minutes to update

TO DO:
 add the blog part
 Make responsive
 add a Sal page with a link to the video and picture of sign only if you can make it private
