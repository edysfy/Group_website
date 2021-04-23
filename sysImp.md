## Table of contents
* [System Implementation](#system)
* [UX Design](#uxdesign)
* [Sprints & Project Management](#sprints)

<a name="system"></a>
## System Implementation
### Stack architecture and system design (e.g. class diagrams, sequence diagrams)
stuff
### Back End - MongoDB - database implementation, the data model that you developed your back end from (e.g. entity relationship diagrams)
**MongoDB**

**geoJsonSchema**: This holds all information relating to user posts. For user posts to be displayed ont the map correctly the post content (*postSchema*) and coordinates (*geoPositionSchema*) are required. *userDetails* in *postSchema* connects posts to the account which created the post and is used when filtering results.

**userSchema**: This holds all the information relating to registered user accounts.

![Entity Relationship Diagram](mongoDBerd.jpg)

EmoteMap provides 5 integral features which interface with the back end:

**Account creation**: The user is asked to enter a username and password (password is entered twice to ensure user has entered the password correctly). These details are then sent to the database via the API route user.js. Once received on the backend a response is returned through the API which is either successful, in which case an account is added to the database, or it is unsuccessful meaning the requested username is already in use and the account could not be created. If the response was unsuccessful the user is informed their account could not be created and that they should use a different username. Date of birth, gender and age are all set to null by default and can only be set once the user has logged in.   

**Login**: After the user has created an account, they are then able to log in using their set credentials. The user’s entered username and password are sent to the backend via the API route user.js and queried on the database. If no matching username is found an unsuccessful response is returned and the user is prompted that they have entered an incorrect username. If a matching username is found (password is hashed and compared? Check with hari)
**Post creation**: Posts can only be created when the user is logged in and are sent from the front end to the database via the API route geopost.js. The content of the post along with the users account name are added to the post database.

**Display all user posts**: When a user first opens EmoteMap every single user post is displayed. To achieve this, once the website opened a request for every single user post is made via the API route geopost.js. These posts are then passed to Mapbox as a geoJSON array and displayed on the map.

**Filter user posts and display**: User posts can be filtered by date, gender, age, mood and keyword.  Initially all these parameters are set to show all posts, for example the age range is set to 0 – 100 and gender is set to both male and female. Excluding the keyword, these parameters determine what posts are fetched from the database. Before the database is queried userSchema is joined with geoJsonSchema so each post contains also the user’s attributes. Whenever one of these parameters is changed the database is queried again loading in all the geoJSON points which adhere to the criteria into a geoJSON array in memory. This geoJSON array is then passed to Mapbox to be displayed on the map. When a user enters a keyword and presses search all posts found in the pre filtered geoJSON array with similar keywords are returned.

### Middle Tier - Express, Node, the RESTful API
Our project makes use of ExpressJs to build 3 core RESTful apis for our application; search.js, user.js, and geopost.js. The most important api is likely geopost.js; it serves as the main link between the front and backend, handling fetching and posting geoJSON data to and from our mapbox component and our mongoDB database. It uses http get requests to fetch an array of geoJSON data (all of the user posts – data points containing location, keywords, date/time of the post, user details and the post description) which is utilised by our services to pipe the data into components where needed.  Similarly, http post requests are used to take data from user input forms in components in the front end, and send them to our database for permanent storage. Http delete requests are also utilised for removing posts from the database, should a user request it from the front end.

The user.js and search.js apis function similarly, but instead focus on fetching user data and search results respectively. User.js handles adding new users to the database when they sign up on the front end, and then consequently logging them in (http post), updating that data when a user chooses to input their date of birth and gender (using http put) and fetching user data if needed (http get).

The search.js api is primarly concerned around generating constraints for fetching data from the database based on the users input in the searchfield in the side bar (e.g. fetching all posts made 10 or less days ago); it again does this through a http post request, but then also utilising functions from our GeoJson schema and filtering functions from the api to correctly populate an array to return to our user-search service which is then piped to the front end components to be displayed.

### Front End - Angular. Details of implementation
#### Angular Material
#### Forms
#### Mapbox
[Mapbox API](https://docs.mapbox.com/mapbox-gl-js/api/)

As our application is centred around displaying information on a map, one of the key aspects in developing the front end was to find and utilise a mapping api which could provide us with the display and interactivity features we needed. We considered other services, the most obvious being google maps, but decided to go with mapbox as not only is it open source, but had a far higher number of free map requests (50k vs 28k for google), and is comparatively lighter on resources to render the map within an application. It also has numerous graphical display options with easy-to-use documentation and examples to help us get our application running quickly. The mapbox-component is the central component within our angular application, with most of the central components being called from the mapbox-component html.

The following is an overview of the key aspects of the api which we utilised. The first and most obvious is the map layer; the api provides numerous styles of world maps to display (we chose a dark colour scheme to better highlight the information in our data layers, to be covered shortly), which we initialise in the components ngOnInit function. The next and arguably most important aspect is the use of the “map.addSource” and “map.addLayer” api functions; within the addSource function is a key use of our geopost api and post service in angular; the component uses the service to call the api, which in turn fetches geoJson data (a special format of json files which stores coordinates and properties of data points) which contains all of the user posts. The mapbox api then stores this geoJson data in the component, which we then utilise in two addLayer functions.

The addLayer function from the api provides numerous different styles of data presentation for displaying data on top of the map layer. Our first use of the function uses the “circle” type; the api allows us to display circles at each data-points’ location from the geoJson, and colour these circles depending on the data-points’ properties; we colour these circles based on the so called mood-rating that a user picks when making a post to our website – this provides the key functionality of the entire site, allowing users to see patterns in people’s emotions across the map, based on the circle colours. The addLayer function can also be configured such that its visibility is based on a certain zoom level of the map; we utilise this so that when a user has zoomed in the circle layer appears, but when they are zoomed out, the second layer – a heatmap layer – appears. The “heatmap” type is another layer type, and we use it to display the density of user points at a location, with different colours indicating more or less points clustered in a specific location.
There are a few other key features of the api we use, centred around mouse events. Firstly, we utilise the api’s popup feature, such that when the circle layer is rendered (i.e. the user is zoomed in enough), when a user hovers the mouse over one of the displayed circles, a pop up appears, loading in the specific post data (keyword, rating and description) of that data point from the geoJson data. We also utilise the map.on(click) function to call our userpost-component in a dialog box, so a user can make a post at a specific location by clicking there if they are zoomed in enough. This component also utilises our geopost api and post service, but this time to send data to our database rather than fetch it.

Finally, we use the api’s map.flyto function to move and zoom in on specific data points, which we call using an event listener in the mapbox-component html from a button click in the usersearch-display-component (which displays posts resulting from a user search).

### Additional elements and components e.g. authentification. Tell us about any other aspects not covered above!
stuff
### Deployment details (including Docker), include how you have been achieving continuous integration and deployment
stuff

<a name="uxdesign"></a>
## UX Design
### Design Process and Early prototyping and ideation (including mood boards and paper prototyping)
stuff

### Understanding of user group (questionnaires / user stories / interviews)
To ensure that we continued to develop a website with the user in mind, we gathered user feedback throughout the project. This started as early as our paper prototypes, and proved to be useful. For example, the first paper prototype (which was also shared) demonstrated that new users would be greeted wth an empty globe. They would then have to signup before gaining the ability to interact with the map. This was our initial plan because we wanted to encourage users to signup, however, user feedback revealed something important to us: the user was confused as to what signing up would allow them to do (aka they did not understand the purpose of the website straight away). We thought this may start to turn away newcomers. We changed the paper prototype to demonstrate to users that they could zoom in/out of the map, and read EmotePosts as soon as they enter the website. This also meant that the ‘serious play’ aspect was integrated immediately, and the user would learn in an active manner. We decided to include a ‘signup’ option on a sidebar. After implementing these changes, users grasped the concept much quicker when shown the paper prototype.

The wireframe was also shared with external individuals, to gather further feedback (in the form of an accompanying quetionnaire). The results of the questionnaire revealed potential improvements, which we then implemented. For example, one of the questions asked: ‘How would you go about improving the website?’. One answer suggested including a key for the different coloured markers. The image below shows the final state of the key that we decided to implement as a response to this feedback.


<a name="sprints"></a>
## Sprints & Project Management
stuff
