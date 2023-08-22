# Task Star Wars Universe Characters

### Installation guide

#### Basic Setup

1.  Make sure system have node.js installed(suggested node version is v16.17.0).
2.  Clone this repository.
3.  Now go to the server directory, open the terminal, and run this command- `npm install`.
4.  Same as step 2 go to the client directory, open the terminal, and run this command- `npm install`.<br/>
    we are done with the basic setup now let's run this app.

#### Step for running the app.

1. Go to the server directory, open the terminal, and run this command- `npm run dev`. <br/>It will run our backend. Users can access the server from http://127.0.0.1:5004 or http://localhost:5004
2. Go to the client directory, open the terminal, and run this command- `npm run dev`. <br/>It will run our frontend. Users can access the client from http://127.0.0.1:3004 or http://localhost:3004

#### How to use and some of the functionality of the app.

- ##### Frontend
  1. By default, there will be all the characters(each character's data contains info of their name, gender, skin color, height, eye color, and list of films) from Star Wars will be loaded. Each page contains max of 9 characters information. Users can access other data by changing the page from pagination.
  2. User can search data by character's name. For that user have to write the name into the search text field and press the search button. To find characters users don't have to write full names.
- ##### Backend
  1. `/api/people` : By this API user can fetch data of characters from the `extra_character.json` file. Without any query, it will return only data for the first page which is 9 data. Users have to provide the following queries to get data by page and name:<br/>
  -- `/api/people?page=2`[get dat by page] - there are total of 10 pages.<br/>
  -- `/api/people?name=Ackbar`[get dat by name] - this one will return matched characters. Important note: If the user doesn't provide a page number in queries and the system found matches more than 9 then it will return only the first 9 for page 1. So using the API with both queries is highly suggested such as: `/api/people?name=Ackbar&page=1`. <br/>
  If the user searches by data less than 9 but the page number is given more than 1 it will return data for page 1. Coz page number of more than 1 for this result is invalid.<br/>
  2. `/api/createDataFile` : This API will fetch all data from `https://swapi.dev/api/people` page by page because SWAPI does not provide all data in a single request. After fetching all data this function will populate films of all individual data using their `https://swapi.dev/api/films` API. After doing those steps function will save them in `extra_character.json` file. Important note: I already created the file in the root of the server directory. If users want to test it then they have to delete all data from the file and call this API. It will take too long to finish all those steps.

#### How to run unit tests and e2e test cases.
- ##### Frontend e2e testing with Cypress
  1. Make sure the frontend and backend both are running. If not running follow the steps of the 'Step for running the app' part to run them.
  2. Go to the client directory, open the terminal and run this command: `npm run test`.
  3. After step 2 there will be a new window open from there select "E2E Testing". 
  4. Then choose a browser(Chrome is suggested). Then press the button "Start E2E Testing in browser_name".
  5. Another new window will be open now from there click which test you want to run. Such as click on "searchByName.test.js". It will automatically run the test.
  6. For terminating: close the windows or press Ctrl+c in the running terminal.
<br/>`User can find the test case code in this directory: client/cypress/e2e`
- ##### Backend unit testing with Jest
  1. Name sure the server side/backed not running. If running terminate the action.
  2. Go to the server directory, open the terminal, and run this command: `npm run test`. It will run some test cases and will show the results.
  3. For terminating the test: press Ctrl+c in the running terminal.
 <br/>`User can find the test case code in this directory: server/_tests_`
  
