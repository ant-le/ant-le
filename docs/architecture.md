# Tech-Stack
I will use Svelte-Kit (svelte5) together with tailwind-css for developing
this website. The goal is to use ase little third party libraries as
possbile, except for build tailwind-modalities. 

I want to practice Test Driven Development, although this codebase will
not be overly complex. Vitest will be used for this. The code is expected to be 
responsive to various screen formats.

The project will be my personal website where I will talk about my private
and professional work.

# Data
While in the future potentially mitigating to a database, the project will
first be deployed statically. Hence, data will be served client-sided from
fixed type-script definitions. This should faciliate the later mitigation
to a database with APIs. The relevant data will be:
1) Blogpost
    - creationDate: Date
    - title: String
    - image: String/Filepath
    - lables: String[]
    - post: String/Filepath
    - categories: <"science" | "running" | "music">

2) RunningPBs
    - eventDate: Date
    - eventLocation: String
    - distance: <"5k" | "10k" | "HM" | "M" >
    - usedShoe: String

3) FriendsData:
    - name: String
    - image: String/Filepath
    - text: String

4) RunningTraining
    - date: Date
    - distance: number

# Components
The website will contain reusable components. These are:
1) Header: The header of the website will be a navbar, which on the left
links to the Home page and on the right links to the remaining 
pages (science, running, music). 
    - when selected, there also should be an item next to the text
    - when hovering, the item should glow

2) Footer: The footer will be kept minimal with just centered links to
strava, github and mail. Icons+Descriptions will be used for that.

3) Text Card: Much if the content of the website will be plain text, so 
this card will always constitute such a card. The alignment of the text
and the background (color vs. transparent) should be passed as a *prop()*.

4) BlogCard: This Component should display the metadata defined in the blogpost
data. There should be a link/button which then links to the respective full
post as specified in the post attribute. 

5) FriendsReferences: This should be a nice card, where the picture should
be displayed with the name under it. Below, there should be stated the 
text, where friends stated their opinion about me. It should be similar to
the "What costumers say about us" sections.brew install --cask cursor

6) CardRasterHorizontal: This component should create a fully
horizonal raster of either BlogCards or FriendsReferences and one should be 
able to navigate left or right to see more cards.

7) CardGridFull: Here cards are displayed on a grid with defined ncol as
size and then just be filled with as many rows as possible. Here, one should 
be able to filter based on label, sort based on date and filter based on title.

8) FullBlog: full block posts shoul only be displayed as a pop-up on top
of the current page. 

# Navigation
There will be four different pages being:
1) Home: This page will mainy consist of centered text blocks. At the end of 
home, there should be a CardRasterHorizontal of FriendsReferences.

2) Science: The navigation of this page should show two different contents.
    - When first entering the page, there should be centered text blocks. 
    After that, a radom selection of three blog posts of category science 
    should be displayed horizontally.
    - When one wants to scroll down, the second part of the site should appear.
    Here, the full grid off science blog posts shoud appear. 

3) Running: This page should be a grid of three elements, where the left side 
spans the entire page and the right side is divided into two.
    - Left: here, there should be centered textBlocks and after the second
    text block, there should be a CardRasterHorizontal of BlogPosts 
    filtered by type runnung.
    - Right-Top: Here, there should be a graph displaying my current PBs as
    defined in the data in a table.
    - Right-Bottom: Here, there should be a graph visualising the weekly 
    RunningTraining data by distance

4) Music: This can be initially left with placeholders and an icon

