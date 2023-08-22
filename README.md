# task-star-wars-universe

### Installation guide

#### Basic Setup

1.  Make sure system have node.js installed(suggested node version is v16.17.0).
2.  Clone this repository.
3.  Now go to the server directory, open terminal and run this command- `npm install`
4.  Same as step 2 go to client directory, open terminal and run this command- `npm install`
    we are done with basic setup now lets run this app.

#### Step for running the app.

1. Go to the server directory, open terminal and run this command- `npm run dev` . It will run our backend. You can access server from http://127.0.0.1:5004 or http://localhost:5004
2. Go to the client directory, open terminal and run this command- `npm run dev` . It will run our frontend. You can access client from http://127.0.0.1:3004 or http://localhost:3004

#### How to use and what are the functionality of the app.

- ##### Frontend
  1. By default, there will be all the characters(each characters data contains info of there name,gender,skin color,height,eye color and list of films) from Star Wars will be loaded. Each page contains max of 9 characters information. User can access other data by changing the page from pagination.
  2. User can search data by characters name. For that user have to right the name and press search button. To find characters user donn't have to write full name.
- ##### Backend
 1. `/api/people` : By this api user can fetch data of characters from `extra_character.json` file. Without any query it will return only data for first page which is 9 data. User have to provide following queries to get data by page and name:
  -- `/api/people?page=2`[get dat by page] - there are total of 10 pages.
  -- `/api/people?name=Ackbar`[get dat by name] - this one will return matched characters. Important note: If user donn't provide page number in queries and system found match more then 9 then it will return only first 9 for page 1. So use the API with both queries such as: `/api/people?name=Ackbar&page=1`. 
  If user searched by data less then 9 but page number is given more then 1 it will return data for page 1. Coz page number more then 1 for this data is invalid.
  1. `/api/createDataFile` : This api will fetch all data from `https://swapi.dev/api/people` page by page because SWAPI does not provide all data in a single request. After fetching all data this function will populate films of all individual data using there `https://swapi.dev/api/films` API. After doing those steps function will save them in `extra_character.json` file. Important note: I already created the file in root of server directory. If user want to test it then they have to delete all data from the file and call this API. It will take too long time to finsh it. 
