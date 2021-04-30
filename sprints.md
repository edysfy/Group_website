# Sprints & Project Management

## Table of contents

* [Group working methods used](#first)
* [Discussion of team roles](#second)
* [Documentation of your sprints](#third)
* [Git and continuous integration](#fourth)

<a name="first"></a>
## Group working methods used

### COVID-19

Throughout the entirety of this project the UK has been in some degree of national lock down. Due to this, it has not been possible for the team to meet up in person and therefore all interaction within the team has taken place online. This has presented challenges. Without face to face interaction it is more difficult to form personal bonds which can help drive team moral. On top of this being limited to online interaction means jobs can tend to take longer to complete and ideas are more difficult to bounce of each other. To counteract this, we decided early on how we would collaborate and set up the infrastructure we would would require to do so.

### Communication infrastructure

Because of the restrictions mentioned above it was extremely important to keep every group member engaged and involved with the project. Discord was chosen to be our main platform for communication.

#### [Discord]

<td><img src="supporting_images/discord_logo.jpg"></td>

Discord is a free instant messaging platform where users can communicate through messages, voice calls and video calls, send files and more. Users can also set up private chat "servers" which can be divided into specific chat rooms.

We set up a private server on Discord right at the start of the project with a few specific chats: back end, front end and write up but as the project progressed we created more specific channels:

<td><img src="supporting_images/discord_chats.jpg"></td>

Having more specific chat rooms was extremely useful, if we wanted to refer back to a certain message or link we would go to that specific channel instead of trawling through hundreds of messages. Discord also allows you to pin and search for messages. This was great for saving specific ideas, links and files. As well as instant messaging we carried out all our video calls over Discord.

### Workflow strategy

With the ongoing COVID-19 lock downs and other modules requiring attention, we knew our workflow strategy had to be flexible. We wanted our website to be as user driven as possible and given the short time frame it was essential that we had user feedback throughout the design process. For both these reasons we chose to adopt the agile framework.

### Agile

Agile software development refers to software development methodologies which are based around an iterative design process where in each iteration stakeholder input is incorporated. This method provides frequent delivery of small portions of functionality, each portion being fitting with stakeholder requirements.

<td><img src="supporting_images/agile.png"></td>

### Agile and our project

The only stakeholder in our project was the end user. Therefore all feedback at each iteration came from user surveys and interviews. As documented in the [sprints] and [UX] at each stage of the development process we set goals based apon the user feedback collected in the last sprint. Once we had implimented the features described by our sprint goals we then repeated the process evaluating what we had done and getting more user feedback. This process 




<a name="second"></a>
## Discussion of team roles (specialisation is ok!). A summary of individual contributions (note: this is for reference, your team will all receive the same grade!).


<a name="third"></a>
## Sprints

### Sprint 1: Project idea finalisation & set up CI infrastructure

[16-27th feb]

After having got to grips with the brief and decided on an idea, this sprint was concerned with putting together an initial paper draft for our website, and setting up all the things we needed to enable continuous development and integration; namely our angular project and our github repository. We also tentatively began to collect feedback on our initial paper prototype designs.

Sprint aims:

* Clarify project idea and scope
* Create draft of website UX & create paper prototype
* Conduct user survey using paper prototype
* Set up a github repository

This sprint mainly involved discussing what features our website should have and roughly how they might be implimented. We all agreed the webpage's focal point would be a world map in which user posts can be seen and would appear as a heatmap in different colours depending on the mood rating of the post. We also discussed other features such as account creation and post filtering. Being unsure how complex it would be to implement the map we chose to leave these features until after we had implemented the map and posts.

There were some different opinions among the group regarding how the website should be laid-out. Some felt that the login bar should slide in from the side and others felt that a whole new page should open. We decided to draw up paper prototype of both of these cases and conduct a user study to decide (_SEE PAPER PROTOTYPING_ + SURVAY). We wanted our product to be as user driven as possible so getting user feedback early on was crucial.

As well as discussing project ideas this period was used to get familiar with the tech stack we were going to be using and github. We each watched the lectures on Angular and github, set up a shared github repository and got familiar with its protocols by making a few pushes and pulls. Although we intended to specialise into certain areas later on, we all got familiar with the frontend and Angular so further down the line it would be possible to be more flexible if required.

### Sprint 2: Work on feedback + find suitable API

[27th feb - 10th mar]

With the scope of the project and the basic functionalities required established, we began building our website proper, adding in the outlines of our eventual GUI, and crucially deciding on which map api we would use, and starting to implement it.

Sprint aims:

* Review feedback from paper prototyping survey
* Create basic GUI (initially buttons had no functionality)
* Select API for displaying data in a map format
* Intergrate Mapbox API


With group members now familiar with Angular and Github we began adding basic, purely visual, features to our site. Results from our paper prototyping survey helped us decide how our GUI should operate. For example, initial feedback suggested users prefered the login page being a seperate page, rather than a slide in as we had originally invisioned. We also added a navbar, making use of the angular material toolbar element, to the website which included a mockup of our logo and a home button.

After some research it was apparent that [mapbox] provided all the functionality we required, with us chosing it over google maps because of its open source nature and large number of styling options, allowing us to more readily make changes as the project developed. Initially, we simply got a basic map to display along with the aforementioned navbar, as at this stage we were still familiarising ourselves with the mapbox api.

At this point in the project we were intending to use this template data from one of the examples from the documentation (the extensive examples being another reason we chose the mapbox api) in our final product as it showcased how our site would look once many posts had been made. With fairly big steps made towards how we would like the finished project to look aesthetically we were now ready to start adding in some of the websites key functionality!


#### Key implementation issues found: ####
<table>
<tr>
  <th>Area</th>
  <th>User Story</th>
  <th>Issue</th>
  <th>Solution</th>
</tr>
<tr>
  <td>Front End</td>
  <td>User can interact with a navbar and have clear view of the map interface</td>
  <td>navbar and mapbox component were not interacting nicely, with strange scrolling issues panning around the map</td>
  <td>implement routing using angular so that instead of the toolbar and the map being in the mapbox html, the mapbox is loaded from `app.component.html` using a router outlet </td>
</tr>
</table>


### Sprint 3: Serve dummy data from directly from API to frontend + set up data model:

[11th mar - 27th mar]

At this stage of the project is where we began to implement the key features that we would need later for collecting and sending information to and from the backend; we added what would become `geopost.js`. On the backend, we began building the mongo schemas that we would require to store our post data in later stages. At this point is also when we established a test process involving docker to facilitate continuous integration. We also began collecting user feedback on our intial boilerpate website.

Sprint aims for this period;
* Collect initial user feedback
* Set up site so dummy data is served through API route + Add linking to front end + making sure data model working in front end
* build Data Model (user, post) + set up mongo schemas
* implementing docker functionality for continuous integration
* began to implement mapbox heatmap example

This api was initially set up to just return static dummy data - a geoJSON file containing earthquake data from an example in the mapbox api documentation. We then implemented a heatmap template from the mapbox documentation, to both test the api was correctly returning data but also as a base to build off when we add in our own data in later stages; we wanted a heatmap like effect for users emotions rather than earthquake magnitudes!

We used this template to help define and develop our `geoJSON.js` mongo schema; i.e. a data structure that all user posts would follow, including a mood rating, keyword and an explanation (and eventually the username and date/time). We made sure this integrated with our data model of the application [REFERENCE DATA MODEL].

As the complexity of our project began to grow we decided to implement a test process before each git commit and push, to ensure any local changes made did not break the website, which helped facilitate continuous integration as we were constantly compiling and testing our website after changes, and could be confident that code on the live repository was stable. See [our test plan](test_plan.txt) on our repository for details of this testing process.

#### Key implementation issues found: ####
<table>
<tr>
  <th>Area</th>
  <th>User Story</th>
  <th>Issue</th>
  <th>Solution</th>
</tr>
<tr>
  <td>Api/Express</td>
  <td>The user will eventually be able to see up to date data on displayed on the map and can add to that data by making a post </td>
  <td>Intially the api returned a url to some data - however whilst we were exploring how to implement our backend, we discovered that this would add uneccessary processing time and be difficult to update with live data; we would have to transfer data from the database into another server, essentially having to call http fetch requests twice, and requiring a refresh to update the data </td>
  <td>We decided to return an array of geoJSON objects from the api (also supported by mapbox), which would allow us to easily update and manipulate the data in memory by using our post-service to send the data to different components, manipulate the array, and eventually send information to the database, and reduce http get and post requests</td>
<tr>
<tr><tr>
<table>
<br/>

### Sprint 4: Set up mongoDB and import dummy data + user authentification

[28th mar - 10th apr]

This sprint was where we finally began to pull together the disperate elements of the website; our aims involved connecting the data fetching service to a function backend using mondoDB, instead of just returning static template data. This is where we also wanted to begin implementing some user feedback based off user questionnaires centered around our intial mockup. We also set a stretch goal of actually adding user profile, rather than have the posts be completely anonymous.

Our agreed goals for this period were;
* connect mondoDB (mongoose) to front end (so the front end is fetching data from our database)
* add the functionality make posts (i.e. sending data to the front end)
* begin implementing feedback from user study and from lecturers
* finalize key mapbox api functionality (pop ups when hovering over a point on the map)
* if time permits, add users to the database as well


Upon having a team conversation with Marceli, it was recommended that we look into Mongoose as an Object Document Manager to make our lives easier and save time.
After some research, we decided to use Mongoose as the middleman between incoming/outgoing HTTP requests/responses between the API and our database.
The syntax of Mongoose was a lot simpler than raw MongoDb, and it was the right decision as we were able to build the data models in a shorter time.
Mongoose models are a lot easier to initialize as they are capable of setting up default values automatically, and makes it easy to validate the data with simple commands.
MongoDB is inherently schema-less, however, Mongoose allows the developer to define schemas for their data type. This was used fully at the start as we were able quickly, prototype our data models on the backend, building on the schemas developed in sprint 3. Queries are a lot easier to deal with as they allow functions to chain onto the Model and don't require the embedded mnemonics that MongoDb requires so the developer experience was a lot smoother. This is akin to comparing using C to using Python. While C is more efficient and allows more room for flexibility in our code, Python provides a layer of abstraction that makes it a lot easier for scripting and experimenting with abstract ideas.

To implement displaying the post data when a user hovers over a data point on the map required the use of a couple of the features of the mapbox api. Foremost was labeling the map marker layer with the interactive tag; `this.map.addLayer({ id: 'markers', interactive: true, .....})`. This allows the layer to be interacted with through mouse events. We first had the popup be triggered by clicking on the point, but decided it would be more intuitive for it to appear on a mouse hover; we made use of mapbox's `this.map.on('mouseenter', 'markers', (e)....` command to trigger mapbox's pop up feature, which then displays the data points geoJSON properties - which we are fetching from mondoDB as discussed above.

From our user feedback it was clear that first time users struggled to grasp the point of the website, and in fact some suggested we add a section to explain the site; so we did exactly that! We added an "about" component and a link in the toolbar that users could click through to, to learn more about the website. We also changed our colour scheme to a white toolbar on a black map, rather than pink on white, from feedback from our lecturers, and to make more clear the colourful data points on the map (the colours constrasted the black map far more than the white )

We also finally implemented a user-post component, which allows new data to be added to website; this component makes use of angular forms to collect inputted data, which we then transform into geoJSON format using our post-service, to be added to our database. As we had time at the end of this sprint, we also began to add in actual user functionality to the website, along with the `userpost.js` api to enable this - the singup/login buttons on the navbar where changed to actually route through to signup/login pages, which also use angular forms to collect user input and add new users to the database/verify users who are logging in.

#### Key implementation issues found: ####
<table>
<tr>
  <th>Area</th>
  <th>User Story</th>
  <th>Issue</th>
  <th>Solution</th>
</tr>
<tr>
  <td>MongoDB</td>
  <td>stuff</td>
  <td>stuff</td>
  <td>stuff</td>
</tr>
<tr>
  <td>Mapbox</td>
  <td>User can hover over points on the map to see more detail, and can create their own posts to add to the map</td>
  <td>Issues with correctly loading data from the database as opposed to static file</td>
  <td>Mapbox had issues with calling the data directly from the database, so we implemented a geoJSON model which transformed the data from mongo into an object in memory that mapbox could correctly access </td>
</tr>
</table>

### Sprint 5 Users enter more details + can filter by them:

[11th apr - 20th apr]

In this sprint we aimed to add to our website some of the more complex features, like searching through posts, and a user being able to view a timeline of the posts they have made, building upon the core foundation of sending and viewing posts we had established by the end of sprint 4. At this stage we also began transitioning from working on the website proper into gathering final user feedback and beginning to write our project report.

Our sprint aims were;
- users now enter age, gender and can now can be filtered by this (posts linked to user accounts)
- implemented sidebar
- search functionality
- user post history
- at this stage almost feel website is complete. one last survey for UX
- users now have to log in to be able to filter results, encourages posting and engaging with site
- began to start formating write up/readme

To add more functionality when a user logs in, we implemented a sidebar, the state of which was determined by our `sidebar.service`, which we triggered through button presses in our `sidebar.component.html` and `sidebar.component.ts`. Depending on the state of our `sidebar.service` different visual elements would be displayed; for example if the user clicks the postlist icon, the `userpost-display` component is called, which shows a scrollable timeline of the users post history. Another key aspect was the `usersearch-display` which required extensive use of angular services and api calls to our back end in order to return the correct results - the detailed implementation of this is discussed in our [System Implementation](sysImp.md) document.

As the website was nearing completion, we carried out a further round of user questionnaires to gather feedback on the final website design, with some of the resulting design changes discussed in our [UX Design](uxDesign.md) document.

At this stage we were happy our website was in a good place, so we began to start working on the project write up, initially focusing on formatting our README, and producing a rough outline of the content we needed to fill in.

#### Key implementation issues found: ####
<table>
<tr>
  <th>Area</th>
  <th>User Story</th>
  <th>Issue</th>
  <th>Solution</th>
</tr>
<tr>
  <td></td>
  <td></td>
  <td>stuff</td>
  <td>stuff</td>
</tr>
<tr>
  <td>stuff</td>
  <td>stuff</td>
  <td>stuff</td>
  <td>stuff</td>
</tr>
</table>

### Sprint 6 Project Write up:

[21st apr - hand in]

At this stage we were purely focusing on the write up, with our minimal viable product completed. We were however making small changes to design elements as we continued to gather feedback

Our aims for this sprint;
- Finish the write up
- Implement any final changes

Most of our time for this sprint was spent writing, though again we also spent some time formatting and designing our report, and making UX design changes - for example we changed our login buttons to text instead of icons, as our feedback suggested that users found where to login unclear.



<a name="fourth"></a>
## Team use of Git, how your team used continuous integration / continuous deployment. Streamlining of workflow throughout.

[Discord]: (https://discord.com/)

Next section; [Evaluation and Conclusion](evalSect.md)
