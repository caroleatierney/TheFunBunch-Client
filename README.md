# The Fun Bunch - Client

          className="font-margarine font-bold text-center bg-transparent 
          text-yellow-100 text-xl 
          smallestMobile:text-amber-500 smallestMobile:text-xl 
          smallMobile:text-emerald-500 smallMobile:text-2xl
          smallMedMobile:text-fuchsia-500 smallMediumMobile:text-3xl
          regularMobile:text-lime-200 regularMobile:text-xl
          tablet:text-purple-500 tablet:text-4xl
          laptop:text-cyan-300 laptop:text-5xl
          desktop:text-blue-500 desktop:text-5xl
          largeScreen:text-rose-300
          reallyLargeScreen:text-amber-500

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
