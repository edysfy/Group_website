
## Table of contents
* [Team](#team)
* [Introduction](#intro)
* [Background and Motivation](#backgrnd)
* [System Implementation](#system)
* [UX Design](#uxdesign)
* [Sprints & Project Management](#sprints)
* [Evaluation](#eval)
* [Conclusion](#conc)

#Title: EmoteMap

<a name="team"></a>
## Team
•	Name / photo / role for each team member.

Hari Patel  [Team Leader, Product/Systems Designer,Front-end, Back-end, Database]  
![Image of Hari](https://www.linkedin.com/in/hari-patel-027b89129/detail/photo/)  
Alfred Graham  [Front-end]
![Image of Hari](https://cdn.discordapp.com/attachments/824036552023867425/832652855018127420/145314026_1899328656885019_6092633530819469484_n_1.jpg)  
Edward Hammersley  [Front-end]
![Image of Ed](https://www.linkedin.com/in/edward-h-3332211b0/detail/photo/)     
Zaki Gill  [Front-end, Academic&Market Research, User-Testing/Prototyping]
![Image of Zaki](https://www.linkedin.com/in/zaki-gill-8bb020171/?originalSubdomain=uk)  
Tarn Williamson  [Front-end]
![Image of Tarn](https://www.linkedin.com/in/tarn-williamson-8b2029153/detail/photo/)  

<a name="intro"></a>
# Introduction

•	Abstract. Motivation for the project, framing of the problem and a high-level overview of the system.  
 •	Project Objectives. The high level goals of the project and the contribution towards solving the problem. A checklist against which the team can evaluate their success.  
 •	Video. Short (1-2min) - demo video to explain your system (think Kickstarter).

### Abstract
(re-do this at the very end) During lockdown there has been an increase in mental health issues and isolation amongst people. We sought to address this problem by developing a communal/global map that allows users to pin and write logs about how they feel at certain times and locations. If a user is not logged in or authenticated they can only see that map and read posts but not create or edit posts. Once the user logs in they can select a location during the day and vent their thoughts at a particular location. There will be a timeline function where the user can choose to see what they wrote about across time and space. The users pins will be different from other users so they can distinguish them. This effectively acts as an interactive diary. Users can also comment on other posts to give a sense of community {enter how community aids happiness}. There will also be a search bar that allows users/non-users to search for key terms and display pins/posts across the global relating to that term. This application is a fun way to allow users to vent and communicate with others while allowing people to view trends of emotional state across the globe, which helps with loneliness and brings awareness to mental health topics.  
### objectives
 1 - Create a writing tool that allows self-reflection in a similar way to blogging.  
 2 - Create a peer-led support network where users can interact with each other as a community.    
 3 - Create a tool that raises awareness and information through a visual heat-map based on an accumulation of users' mental health in different geolocations.


<a name="backgrnd"></a>
## Background and Motivation
### The Problem
Our team addresses both the problem of poor  mental health globally, and the inadequacy of today's mainstream social media in addressing it. To make the problem more digestible we decided to define it in two parts. Firstly, we explain the issue of poor mental health which has become significantly worse as a result of the global lockdown. After this, we address the related issue of online culture's inadequacy to acknowledge the first problem and can be, in fact, detrimental to it.

### Framing The Problem part 1: Mental illness globally
Our team seeks to address the problem of mental illness globally. We do not believe that you can define mental illness simply as sadness or insanity. It is not a binary or exclusive concept in this way. Rather, we see it as a complex and universal problem. A time series curated by the Institute for Health Metrics Evaluation demonstrates that in a recent year about 13% of the global population suffered from some kind of mental disorder (Guardian, 2011). The British charity, Mind, refers to a statistic that one in four people will experience some form of mental illness in a given year  (Mind, 2021). Over in America it has been noted by the Anxiety and Depression Association of America that anxiety disorders are the most common mental illness in the US, effecting 40 million adults in the US aged 18 and older (ADAA, 2021). Ironically, although anxiety is a highly treatable thing, only 36.9% of toes suffering receive treatment (ADAA, 2021).  

We view mental illness as a global phenomenon, experienced in different ways around the world. For example, the incidence of catastrophic healthcare expenditure in Mexican households caring for a person with a mental disorder (Castro et. al, 2020) is not a naturally relatable topic for someone experiencing depression in the UK. Simultaneously, those Mexicans suffering from catastrophic healthcare expenditure will find it hard to find shared coping mechanisms with Syrians dealing with mental distress in ongoing conflict and non-conflict settings during COVID-19. Emotemap seeks to unite people experiencing this universal and complex phenomenon at a local level.  

This part of the problem is particularly prominent today as a result of lockdown and social distancing measures. 60% of adults and 68% of young people have said their mental health has worsened during lockdown (Mind, 2021). In addition to this many, who have never previously experienced mental health problems, have seen their mental health and wellbeing decline during lockdown (Mind, 2021).

### Framing The Problem part 2: Current online societies are detrimental to mental health
The compulsive use of social media amongst our population is increasing. By 2022 it is forecast that there will be 3 billion active monthly users of social media and therefore has become an integral part of society. As our lives become more heavily dependant on online culture, the impact that it has on our mental health is exacerbated.  

Mainstream social platforms are detrimental to humans' mental health. Harris and Pettman believe that algorithms in mainstream social media platforms hijack our psychological vulnerabilities and exploit our minds' weaknesses by playing to our emotional disposition of seeking social reassurance (Harris, 2016). On the surface, social media appears to be ultra-social and therefore we use it in the hope that it will make us feel less alone. However, after continued use it becomes evident that each user has their own inner life, which we are not part of. Through noticing this users receive a strong 'rebound loneliness' (Pettman, 2016:20). In agreement with this, according to a new Cigna study, 7 out of 10 heavy social media users reported feelings of loneliness.  

Harris agrees with this, arguing that our social approval is in the hands of tech companies (Harris, 2016) due to their emotionally addictive nature. In this way, social media can be likened to gambling due to the issue of instant gratification (Song et. al, 2004). Dopamine, which increases the general of goal-directed behaviour, is released when checking social media. Therefore, the use of manipulative algorithms in mainstream social media platforms account for the aggressive emotional attachment of many users. This kind of emotional addiction leads to detrimental impacts on humans such as low self-esteem. The Royal Society of Public Health recently found that 9 in 10 females say that they are unhappy with the way they look.  

As a result of this developing dependency on social media, we believe that it is our duty to learn to find new, more positive ways of interacting with each other and attaining to our mental health. Barak and Grohol bring to light that two thirds of all people with diagnosable mental disorders do not seek treatment and therefore internet-based interventions provide the outreach dimension that mental health services have always sought (Barak & Grohol, 2011). We believe that by encouraging a culture of sharing experiences and emotions, an thus the way in which we use online platforms as a communications modality, people can feel less inhibited which may encourage self-reflection and healing.  

See the next section where we delve deeper into how blogging and online peer-led support groups can help solve this problem...  

### How can blogging for self-reflection and online peer-led support groups help?
Scheff is a sociologist who has emphasised that unresolved emotional distress gives rise to neurotic patterns of behaviour that can be dissipated by catharsis in the form of writing or blogging (Scheff, 1979). This brings to light that the re-experiencing of distressful emotions through writing can uncover the unconscious source of emotional distress and lead to an improvement in attitude and behaviour. In agreement with this, Ulrich and Lutgendorf argue that writing about trauma with focus on cognition and emotions associated with that trauma allows people to develop greater awareness of the positive benefits that have come from that situation (Ulrich & Lutgendorf, 2002).  

Barak and Grohol have brought to light that online peer-led support groups have existed online since the 1980s (Barak & Grohol, 2011). They believe that not all mental health interventions need explicitly professional or psychotherapeutic techniques. Mutual self-help support groups rely on individuals to provide asynchronous general emotional support and information to one another, generally without a professional’s intervention or guidance (Barak & Grohol, 2011). Online peer-led groups appear to be equally effective as information providing websites. This is exemplified by Freemen, whose 2009 study involved the analysis of 238 college students's interactions with online websites and mutual support groups. One of the two groups only viewed websites with information about student problems whilst the other had additional access to an online mutual support group. The latter group improved both in terms of well-being and satisfaction with life (Barak & Grohol, 2011).   

In agreement with this, Bakar and Moore did a study on MySpace and discovered that those users who blogged frequently increased their social integration and friendship satisfaction scores compared to those who did not (Bakar & Moore, 2008).

## How will EmoteMap solve the problem?
### By introducing a more positive way for users to interact online
We are not trying to reduce the interaction that humans have with online social platforms, it is clear that this will inevitably increase in forthcoming years. Instead, we want to address create an aspect to online sociality that is similarly interactive to current mainstream social media platforms but addresses mental health explicitly. For example, a topic of discussion within a post on EmoteMap could be on the anxiety induced by the use of Instagram.

### By Creating an environment whereby users can be both self-reflective and feel supported by a community of users
Blogs offer mental health intervention in a similar way to journaling. Although journalling has traditional been done in private to complement psychology, blogging has taken many would-be private journals and turned them public (Bakar & Moore, 2008). Feedback from others can help an individual learn to view feelings and thoughts in ways differently to how they would if they were left to their own devices

### By solving a global problem locally
The complexity of the issue of global mental illness means that there is no universal solution. We also acknowledge that those suffering mentally may be doing so due to culturally dependant reason. Therefore, a teacher facing stress, anxiety and depressing at the beginning of the academic year during the COVID-19 pandemic (Santamaría & Mondragon, 2021) may search keywords such as 'stress, anxiety, teachers, COVID'. The posts they read will most likely be completely different to those of someone experiencing intimate partner violence and unhealthy alcohol use in the Zambia.




### Industry Review: What differentiates EmoteMap?
#### Website 1 - The Mental Elf https://www.nationalelfservice.net/mental-health/  
##### Summary:
The Mental Elf is a 'no misinformation' mental health blogging website started by information scientist, Andre Tomlin. The blog is now a team of contributors aiming to bring fresh perspectives and considerable knowledge and clinical experience when talking about mental health.  

##### How EmoteMap solves the problem differently:
Although their enlightening information can provide those trying to understand their mental health better the relevant knowledge, Emote Map aims to build more of a positive way for users to interact online. We aim to create a communal feel, whereby users can both be self-reflective as well as feel supported by other users who have had similar experiences and emotions.


#### Website 2 - Young Minds https://youngminds.org.uk
##### Summary:
YoungMinds has partnered with 02 to gather tips and advise on how to enjoy a more positive time online. They work to tackle issues such as 'What kind of social media feed do I have?', 'How can I deal with online bullying?', or 'How can I block, mute, or report other accounts?'  

##### How EmoteMap solves the problem differently:  
Although YoungMinds is addressing the negative impact that social media can have on the mental health of users head on, EmoteMap provides guidance to users for a variety of issues. We understand that a major contributing factor to mental health may be related to the use of social media, however we account for more factors than just this. We understand that global mental illness does not have a quick-fix. It is a complex and universal problem, which is why we encourage groups of users to unite over shared cultural and topical issues.


#### Website 3 - The Mighty https://themighty.com
##### Summary:
The Mighty publish real stories by real people living with disability, disease and mental illness. They aim to build a safe platform for their community to share stories, connect with others and raise support for the causes they believe in.

##### How EmoteMap solves the problem differently:
The Mighty are building a positive online community in the same way that we seek to. We see light in this, as EmoteMap makes the user the heart of the website too. They themselves are a great starting point when it comes to solving the problem of global health mentally. However, Emote Map's interactive map interface enables the user to gain a localised understanding of a very much  global problem in a way that The Mighty does not. EmoteMap strives to engage the user through its interactive interface in order to create a positive environment for users to interact.









<a name="system"></a>
## System Implementation
### Stack architecture and system design (e.g. class diagrams, sequence diagrams)
stuff
### Back End - MongoDB - database implementation, the data model that you developed your back end from (e.g. entity relationship diagrams)
stuff
### Middle Tier - Express, Node, the RESTful API
Our project makes use of ExpressJs to build 3 core RESTful apis for our application; search.js, user.js, and geopost.js. The most important api is likely geopost.js; it serves as the main link between the front and backend, handling fetching and posting geoJSON data to and from our mapbox component and our mongoDB database. It uses http get requests to fetch an array of geoJSON data (all of the user posts – data points containing location, keywords, date/time of the post, user details and the post description) which is utilised by our services to pipe the data into components where needed.  Similarly, http post requests are used to take data from user input forms in components in the front end, and send them to our database for permanent storage. Http delete requests are also utilised for removing posts from the database, should a user request it from the front end.

The user.js and search.js apis function similarly, but instead focus on fetching user data and search results respectively. User.js handles adding new users to the database when they sign up on the front end, and then consequently logging them in (http post), updating that data when a user chooses to input their date of birth and gender (using http put) and fetching user data if needed (http get).

The search.js api is primarly concerned around generating constraints for fetching data from the database based on the users input in the searchfield in the side bar (e.g. fetching all posts made 10 or less days ago); it again does this through a http post request, but then also utilising functions from our GeoJson schema and filtering functions from the api to correctly populate an array to return to our user-search service which is then piped to the front end components to be displayed.

### Front End - Angular. Details of implementation
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
stuff

<a name="sprints"></a>
## Sprints & Project Management
stuff

<a name="eval"></a>
## Evaluation
stuff

<a name="conc"></a>
## Conclusion
scope and future work must go here...
Perhaps hometown / lived location could be something you grab from the user too
(1 liked)
some more things we can add to the documenation
this is rreally important guys
this feedback
"I mean a user history mode that is mapped could be quite interesting, however, there is one thing I want you to think about (not necessarily to develop anything, but just to think about for your future work section of the report). Simply, how will this data be used and who will use it?

If I clicked on your Edgware Earthquake post, how could I support you? This is where you make the jump from raising awareness, to going further
