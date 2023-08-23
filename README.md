# Task Star Wars Universe Characters

### Some Instructions 

#### Basic Setup

1.  Make sure system have node.js installed(suggested node version is v16.17.0).
2.  Clone this repository.
3.  Now go to the server directory, open the terminal, and run this command- `npm install`.
4.  Same as step 2 go to the client directory, open the terminal, and run this command- `npm install`.<br/>
    we are done with the basic setup now let's run this app.

#### Step for running the app.

1. Go to the server directory, open the terminal, and run this command- `npm run dev`. <br/>It will run our backend. Users can access the server from http://127.0.0.1:5004 or http://localhost:5004
2. Go to the client directory, open the terminal, and run this command- `npm run dev`. <br/>It will run our frontend. Users can access the client from http://127.0.0.1:3004 or http://localhost:3004. Make sure server is running otherwise will not find any data.

#### How to use and some of the functionality of the app.

- ##### Frontend
  1. By default, there will be all the characters(each character's data contains info of their name, gender, skin color, height, eye color, and list of films) from Star Wars will be loaded. Each page contains max of 9 characters information. Users can access other data by changing the page from pagination.
  2. User can search data by character's name. For that user have to write the name into the search text field and press the search button. To find characters users don't have to write full names.
- ##### Backend
  1. `/api/people` : This API returns a object containing totalPage(help to client side how may page are there),totalDataFound(number of total data) and characters(array of character objects). This API fetch data of characters from the `extra_character.json` file.Without any query, it will return only character data for the first page which will be 9 data. Users have to provide the following queries to get data by page and name:<br/>
  -- `/api/people?page=2`[get dat by page] - there are total of 10 pages.<br/>
  -- `/api/people?name=Ackbar`[get dat by name] - this one will return matched characters. Important note: If the user doesn't provide a page number in queries and the system found matches more than 9 then it will return only the first 9 for page 1. So using the API with both queries is highly suggested such as: `/api/people?name=Ack&page=1`. <br/>
  If the user searches by data less than 9 but the page number is given more than 1 it will return data for page 1. Coz page number of more than 1 for this result is invalid.<br/>
  1. `/api/createDataFile` : This API will fetch all data from `https://swapi.dev/api/people` page by page because SWAPI does not provide all data in a single request. After fetching all data this function will populate films and homeworld of all individual characters using their `https://swapi.dev/api/films/:id` and `https://swapi.dev/api/planets/:id` APIs. After doing those steps function will save them in `extra_character.json` file which is role as cache file. <br/>Important note: I already created the file in the root of the server directory. If users want to test it then they have to delete all data from the file and call this API. It will take too long to finish all those steps. And if user delete the `extra_character.json` file from root and cann't be restored it they can find another one in `server/back-ups` folder.

#### How to run unit and e2e test cases.
Make sure 'Basic Setup' steps are completed.
- ##### Frontend e2e testing with Cypress
  1. Make sure the frontend and backend both are running. If not running follow the steps of the 'Step for running the app' part to run them.
  2. Go to the client directory, open the terminal and run this command: `npm run test`.
  3. After step 2 there will be a new window open from there select "E2E Testing". 
  4. Then choose a browser(Chrome is suggested). Then press the button "Start E2E Testing in browser_name".
  5. Another new window will be open now from there click which test you want to run. Such as click on "searchByName.test.js". It will automatically run the test.
  6. For terminating: close the windows or press Ctrl+c in the running terminal.<br/>
  `User can find the test case code in this directory: client/cypress/e2e`
- ##### Backend unit testing with Jest
  1. Name sure the server side/backed not running. If running terminate the action.
  2. Go to the server directory, open the terminal, and run this command: `npm run test`. It will run some test cases and will show the results.
  3. For terminating the test: press Ctrl+c in the running terminal.<br/>
  `User can find the test case code in this directory: server/_tests_`


---

### What I used to build this app.
- ##### Frontend
  - React js : Used react for making frontends. To create the base of the frontend I used 'vite' instead of `npx create-react-app`. Because vite is more optimized for speed and can provide faster build times. It's helps in development when I needs to see the changes in real-time. 
  - Material ui : Used Material ui for pagination and for some UI parts.
  - CSS : Used CSS for styles.
  - Cypress: Used cypress for e2e testing.

- ##### Backend
  - Express js: User Express as a backed library. I choose express because it provide high-performance and low-overhead web framework for Node.js, known for its speed and efficiency in handling web requests.
  - FS module: Use this module to create our `.json` file.
  - Jest: Use jest for unit testing.

---

### What are the problems I faced and how to overcomes them.
- For backend at first I fetch only characters data page by page from SWAPI and store them in `.json` file. Because there are no any other option for filtering data by name. 
- After overcoming this I am facing new problem which is populating data of films and home-world.When fetching data by `/api/people?name=Ack&page=1` api it was taking too much time to get the full data because populating was taking too long.And the reason is each of films and homeworld info are coming from separate  APIs. So add some more steps in `createFileWithData` function you can find it in `people.controller.js`. So now this full function fetch all data for characters and populating with films and homeworld data. Then save in the `.json` file. That's how I make the get data action more faster.

 