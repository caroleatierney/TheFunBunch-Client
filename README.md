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
    1) ensure css is always updated in the dist folder on Client:
        npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch

    2) git commands
            git add -A
            git commit -m ""
            git push
    
    3) on client
        npm run build
    ** It may take about 10 minutes to update

Make sure you are in the right Repo - Client or Server to push changes 

To dump your database for backup you call this command on your terminal

mongodump --uri mongodb+srv://caroleatierney:xxxxxxxxxxxxxxxxx/Sandals --db Sandals --out=/users/carole/dev/portfolio_applications/thefunbunch/backupmongodb

You cannot view the dump

To import your backup file to mongodb you can use the following command on your terminal

mongorestore --db database_name path_to_bson_file


TO DO:

Make responsive
Better images for photo pages - all the same size?
Scroll restoration
back up
Delete password

Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme


Update the latest versions inpackage.json for:
flowbite: https://www.npmjs.com/package/flowbite
flowbite-react: https://www.npmjs.com/package/flowbite-react
nodemon: https://www.npmjs.com/package/nodemon
react: https://www.npmjs.com/package/react
react-dom: https://www.npmjs.com/package/react-dom
react-input-mask: https://www.npmjs.com/package/react-input-mask
react-router-dom: https://www.npmjs.com/package/react-router-dom
