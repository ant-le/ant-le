# Components

The website will contain reusable components. These are:

1. Header: The header of the website will be a navbar, which on the left
   links to the Home page and on the right links to the remaining
   pages (science, running, music). - when selected, there also should be an item next to the text - when hovering, the item should glow

2. Footer: The footer will be kept minimal with just centered links to
   strava, github and mail. Icons+Descriptions will be used for that.

3. Text Card: Much if the content of the website will be plain text, so
   this card will always constitute such a card. The alignment of the text
   and the background (color vs. transparent) should be passed as a _prop()_.
   The card should be mobile responsvive adn there should be an option to
   also pass a title.

4. BlogCard: This Component should display the metadata defined in the blogpost
   data. There should be a link/button which then links to the respective full
   post as specified in the post attribute.

5. FriendsReferences: This should be a nice card, where the picture should
   be displayed with the name under it. Below, there should be stated the
   text, where friends stated their opinion about me. It should be similar to
   the "What costumers say about us"

6. CardRasterHorizontal: This component should create a fully
   horizonal raster of either BlogCards or FriendsReferences and one should be
   able to navigate left or right to see more cards. This should also work
   on mobile and on desktop, the shouuld be nav buttons for navigation

7. CardGridFull: Here cards are displayed on a grid with defined ncol as
   size and then just be filled with as many rows as possible. Here, one should
   be able to filter based on label, sort based on date and filter based on title.

8. FullBlog: full block posts shoul only be displayed as a pop-up on top
   of the current page.

9. Personal Bests: Here, the personal bests should be displayed in a table format.

10. TrainingChart: This should be a chart which plots the weekly training distance.
    Below, there should be indications of the average and total distances for the current
    year and below a tiny comparison to the last year

# Design of Components

Card Component Design Patterns: Fixed vs Flexible Sizing in Svelte 5

For Svelte 5 card components, the flexible/adaptable approach is the recommended best practice over fixed dimensions. Modern UI design systems prioritize intrinsic sizing with container queries over rigid fixed dimensions. Here's the comprehensive guide for designing your card architecture:
Best Practice: Flexible Card Components

The optimal approach is to make your card components intrinsically sized with the ability to adapt to their containers, rather than having fixed dimensions. This aligns with modern responsive design principles where components should be self-aware and adapt to their context.
Core Design Principles

Intrinsic vs Extrinsic State Pattern

1. Intrinsic properties: Typography, spacing ratios, color schemes, border radius - these should be consistent across all instances
2. Extrinsic properties: Width, height, and layout direction - these should be controlled by the container or higher-level components
