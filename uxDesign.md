# UX Design

### Idea formulation

This time was used to get to know the other group members and project brief itself. Having all come from different backgrounds, from music to engineering, a lot of varied and interesting project ideas were put forward. After some discussion we drafted up 4 potential ideas:

**Higher or lower:** A simple game in which the user was asked which was item is "higher or lower", if they get the answer correct they are given a fact about the item which was lower. Below is a small demonstration on the topic of population size but question topics could be on a large variety of things:
ADD PICTURE
The game intention of this game was to be addictive, fun and educational.

**Altitude explorer:** A 2D platformer game with similar mechanics to the app [Doodle Jump] but the user explores different altitudes on earth and in space. The player starts at the bottom of the sea and works their way up into space. As they travel up through different levels they learn facts about what is present at each altitude. For example at 10,927m below sea level the user would be told that this was the deepest manned sea dive ever recorded or at 10,668m above sea level they would be informed that this is the average height at which passenger planes fly. As the user went higher they would then learn about different planets and objects in space. Similar to the other idea this served to be entertaining but also educational.

**Musical instruments through time:** A web page where users can browse musical instruments through time and when they are clicked the sound of the instrument is played. Aimed to teach users about musical anthropology in an engaging way, an interesting topic which our group consider to be overlooked and undervalued compared to other areas of music.

**EmoteMap:** A geographical diary where users can post diary entries which include their current location. Users can then look on the map at their archived posts and see how they were feeling in certain locations. This website idea aims to help users track and improve upon their mental wellbeing.

A lot of time was spent discussing which project idea to use. The idea needed to be useful, original and also fit the brief. We decided that although we felt all the ideas were good, EmoteMap addressed the particularly relevant issue of mental health and isolation. COVID-19 has left many people isolated and struggling to cope with ongoing lockdowns. We decided to use the geographical diary element from the EmoteMap idea but make it so posts can be seen by other users online, making users feel less isolated and more connected. All group members agreed this idea had great potential and decided to finalise this as our project idea.

--------MOVE THE ABOVE TO ANOTHER SECTION--------


### Identification of our target users

Our project aims to boost mental wellbeing, and does not specifically target particular causes of poor mental health. Of course, people of all ages, backgrounds, economic status etc. are capable of suffering. It is for this reason that the field we are working in is applicable to everyone. However, it is our application within this field that may cause different individuals to tend towards (or away from) our app. EmoteMap relies on the desire to share emotion, digitally. We designed a questionnaire to help us get a better understanding of who our target audience is. [IS THERE ANYTHING WE CAN SAY ABOUT HOW OUR FINDINGS INFLUENCED OUR SITE???].


### Early prototyping - paper prototypes and feedback

Our first real visualisation of the website consisted of a paper prototype. This ensured all members of the group were on the same page (no pun intended) regarding the initial layout, and allowed us to easily and to quickly make adjustments during a group discussion. The creation of this prototype really was the first time the ideas we had shared verbally were coming together in a physical, visual form. Because of this, we focused on making it as simple as possible, including only the core features. At this point in time, we had decided that the core features were: ability to signup (and login), be able to zoom in and out of the map, read EmotePosts of other users and create EmotePosts. Our original, finalised paper prototype is shown here:

<p align="center">
<img src="supporting_images/Paper_prototype_start.jpeg" width="400">
</p>

At this point, our prototype consisted of only the ideas we had come up with within the team. Despite the fact that our team consisted of five individuals of different academic backgrounds, we were still prone to 'tunnel vision'. We knew that it was crucial to get external feedback, and as early as possible. We shared our paper prototype with friends and family. At this stage, we understood it was difficult to grasp the concept of the project looking at a paper prototype alone, so we informed the individuals on this beforehand. We were more looking for feedback on our core features. One individual made an important suggestion: to remove the need to signup before interacting with the globe and other user posts. We originally planned it like so to encourage more people to signup. However the individual's reasoning was a stronger point: they warned that the user would be signing up to something they may not completely understand, and in some cases this may turn the potential user away entirely. Of course, we could have put an 'about' page as the splash screen, but it should be interactive, and allow users to learn by doing (this would immediately integrate the ‘serious play’ aspect). We also decided to include a ‘signup’ option on a sidebar. The image below shows the changes we made to our paper prototype as a response:

<p align="center">
<img src="supporting_images/Paper_prototype_before_and_after.jpeg" width="700">
</p>

### On to wireframes

Our paper prototype served well at forming an initial visualisation of the website, and for receiving feedback on core features. In order to gain feedback more related to user experience, we needed to demonstrate the website using a closer representation of a working product. Logically, a wireframe was the next best step. We used [InVision](https://www.invisionapp.com) to do this. Click [here](https://zaki744910.invisionapp.com/console/share/NJ2D65MNBU/572059598) to go to our interactive wireframe. Below is a preview:

<p align="center">
<img src="supporting_images/wireframe_preview.png" width="700">
</p>

Again, we shared the wireframe with friends and family, and coupled it with a questionnaire (I COULD INCLUDE LINK TO COPY OF QUESTIONNAIRE). One user reported that it would be useful to have a key on the map, informing the user on what coloured marker means what. As a direct response to this feedback, we implemented a key, which can be seen in the image below:

<img src="supporting_images/key.png" width="150">



### UX approach – design heuristics/approach, design methods (design fiction / heuristics)
stuff

### Understanding of user group (questionnaires / user stories / interviews)





### Group working methods used (for instance did your team choose a particular style of agile? What communication channels did you use?)
Discord was used for the majority of the written communication. We setup a server and divided it into 6 channels: ‘general’, ‘front-end’, ‘back-end’, ‘ui’, ‘user-testing’ and ‘write-up’. Having individual channels meant that our communication was more organised, and reduced disruption to members working on alternative sections. Discord’s pinning feature also meant that key messages never went missing amongst a sea of other messages.

<img src="supporting_images/discord_channels.png" width="150">

Microsoft Teams was used for video communication, and served perfectly for longer discussions. Often, we would choose video communication for when project-level decisions had to be made. For example, our original idea was to allow users to write a longer, more journal-like post. For multiple reasons, we decided to change the idea so that EmotePosts would be shorter personal updates. One reason was because we were concerned over the users' attention spans. It was more likely that a user would engage in multiple, short, and easy to read posts. This decision really changed our direction, and therefore required the input of all members, and ultimately a unanimous decision.

### Team use of Git, how your team used continuous integration / continuous deployment. Streamlining of workflow throughout.
In addition to the main branch, a 'dev' (development) branch was also created. Those members who were part of producing the website each created their own branch from 'dev'; this ensured that each member could work without being interrupted by conflicts. When a member was ready to submit their work, they would inform the others (via Discord) that they were soon going to merge and push - this avoided divergence of the 'dev' branch. The member would then ensure their 'dev' branch was up to date, merge their branch with 'dev' (after resolving any conflicts), before finally pushing. The member then informed the group of the push. At this point, another member may have requested temporary 'reservation' of the 'dev' branch. After each major feature implementation, members would ensure the stability of the dev branch, before merging it with 'main'.

stuff

[Doodle Jump]: <https://en.wikipedia.org/wiki/Doodle_Jump>
[mapbox]: <https://www.mapbox.com/>
[mapbox heatmap]: <https://docs.mapbox.com/mapbox-gl-js/example/heatmap-layer/>



Next section; [Project Management & development process](sprints.md)
