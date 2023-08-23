# Task Star Wars Universe Characters

### Some Instructions 

#### Basic Setup

1.  Make sure system have node.js installed(suggested node version is v16.17.0) if not please download form nodejs website and install. Also user can download and install NVM in there system. Which will help to switch between different versions of node.js easily.
2.  Clone this repository.
3.  Now go to the server directory, open the terminal, and run this command- `npm install`.
4.  Same as step 2 go to the client directory, open the terminal, and run this command- `npm install`.<br/>
    we are done with the basic setup now let's run this app.

#### Step for running the app.

1. Go to the server directory, open the terminal, and run this command- `npm run dev`. <br/>It will run our backend. Users can access the server from http://127.0.0.1:5004 or http://localhost:5004. And if anything running on that port(`:5004`) user have to terminate it or change the port from `server/config`.
2. Go to the client directory, open the terminal, and run this command- `npm run dev`. <br/>It will run our frontend. Users can access the client from http://127.0.0.1:3004 or http://localhost:3004. Make sure the server is running otherwise will not find any data. And if anything running on that port(`:3004`) user have to terminate it or change the port from command which will be founded in `client/package.json`.
##### or
1. The user can run/start the server and client together. For that first, go to any of those directory server or client, open the terminal, and run this command- `npm run both-end`. It will run both end together.

#### How to use and some of the functionality of the app.
Make sure the 'Basic Setup' steps are completed.
- ##### Frontend
  1. By default, there will be all the characters(each character's data contains info of their name, gender, skin color, height, eye color,homeworld, and list of films) from Star Wars will be loaded. Each page contains max of 9 characters information. Users can access other data by changing the page from pagination. And the characters are sorted by their name.
  2. The user can search data by character's name. For that user has to write the name into the search text field and press the search button. To find characters users don't have to write full names.
- ##### Backend
  1. `/api/people` : This API returns an object if success which is containing totalPage(help to client-side how many pages are there),totalDataFound(number of total data), and characters(array of character objects where the data are sorted by name). This API fetches data of characters from the `extra_character.json` file. Without any query, it will return only character data for the first page which will be 9 data. Users have to provide the following queries to get data by page and name:<br/>
  -- `/api/people?page=2`[get data by page] - there are total of 10 pages.<br/>
  -- `/api/people?name=Ackbar`[get data by name] - this one will return matched characters. <br/> Important note: If the user doesn't provide a page number in queries and the system found matches data more than 9 then it will return only the first 9 data for page 1. So using the API with both queries is highly suggested such as: `/api/people?name=Ack&page=1`. <br/>
  Also, if the user searches by data less than 9 but the page number is given more than 1 it will return data for page 1. Coz page number of more than 1 for this result is invalid.<br/>
  1. `/api/createDataFile`: This API will fetch all data from `https://swapi.dev/api/people` page by page because SWAPI does not provide all data in a single request. After fetching all data this function will populate films and homeworld of all individual characters using their `https://swapi.dev/api/films/:id` and `https://swapi.dev/api/planets/:id` APIs. After doing those steps function will save them in `extra_character.json` file which is role as cache file. <br/>Important note: I already created the file in the root of the server directory. If users want to test it then they have to delete all data from the file and call this API. It will take too long to finish all those steps. And if user delete the `extra_character.json` file from the root and can't be restored they can find another one in `server/back-ups` folder.

#### How to run unit and e2e test cases.
Make sure the 'Basic Setup' steps are completed.
- ##### Frontend e2e testing with Cypress
  1. Make sure the frontend and backend both are running. If not running follow the steps of the 'Step for running the app' part to run them first.
  2. Go to the client directory, open the terminal, and run this command: `npm run test`.
  3. After step 2 there will be a new window open from there select "E2E Testing". 
  4. Then choose a browser(Chrome is suggested). Then press the button "Start E2E Testing in browser_name".
  5. Another new window will be open now from there click which test want to run. Such as clicking on "searchByName.test.js". It will automatically run the test.
  6. For terminating: close the windows or press Ctrl+c in the running terminal.<br/>
  `User can find the test case code in this directory: client/cypress/e2e`
- ##### Backend unit testing with Jest
  1. No need to run backend or frontend to run jest. Also if they are running no need to terminate them. Because jest will user port `5005`. But if anything running on that port user have to terminate it or change the port from `server/config`.
  2. Go to the server directory, open the terminal, and run this command: `npm run test`. It will run some test cases and will show the results.
  3. For terminating the test(if not terminated auto): press Ctrl+c in the running terminal.<br/>
  `User can find the test case code in this directory: server/_tests_`


---

### What I have used to build this app.
- ##### Frontend
  - react js : Used react for making frontends. To create the base of the frontend I used 'vite' instead of `npx create-react-app`. Because vite is more optimized for speed and can provide faster build times. It's helps in development when I need to see the changes in real-time. 
  - material ui : Used Material ui for pagination and for some UI parts.
  - css : Used CSS for styles.
  - cypress: Used cypress for e2e testing.

- ##### Backend
  - express js: User Express as a backed library. I choose express because it provides a high-performance and low-overhead web framework for Node.js, known for its speed and efficiency in handling web requests.
  - fs module: Use this module to create our `.json` file.
  - node-fetch : Use this module to fetch data from SWAPI in our node js.
  - dotenv: This module loads environment variables from a .env file into process.env.
  - body-parser: This module is used to process the data that is sent by the client in an HTTP request body.
  - nodemon: This one automatically restarts our node app when it detects any changes in our code base. Help to develop faster.
  - jest: Use jest for unit testing.

---

### What are the problems I faced and how to overcome them.
- For the backend at first, I fetch only characters data page by page from SWAPI and store them in `.json` file. Because there are no other options for filtering data by name. 
- After overcoming this I am facing a new problem which is populating data of films and home-world.When fetching data by such as `/api/people?name=Ack&page=1` API it was taking too much time to get the full data because populating was taking too long. And the reason is each of the films and homeworld info are coming from separate  APIs. So add some more steps in `createFileWithData` function user can find it in `people.controller.js`. So now this full function fetches all data for characters and populates with films and homeworld data. Then save in the `.json` file. That's how I make the process of get data more faster.

 
