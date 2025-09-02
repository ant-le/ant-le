# Tech-Stack

I will use Svelte-Kit (svelte5) together with tailwind-css for developing
this website. The goal is to use ase little third party libraries as
possbile, except for build tailwind-modalities.

I want to practice Test Driven Development, although this codebase will
not be overly complex. Vitest will be used for this. The code is expected to be
responsive to various screen formats.

The project will be my personal website where I will talk about my private
and professional work.

# Navigation

There will be four different pages being:

1. Home: This page will mainy consist of centered text blocks. At the end of
   home, there should be a CardRasterHorizontal of FriendsReferences.

2. Science: The navigation of this page should show two different contents.
    - When first entering the page, there should be centered text blocks.
      After that, a radom selection of three blog posts of category science
      should be displayed horizontally.
    - When one wants to scroll down, the second part of the site should appear.
      Here, the full grid off science blog posts shoud appear.

3. Running: This page should be a grid of three elements, where the left side
   spans the entire page and the right side is divided into two. - Left: here, there should be centered textBlocks and after the second
   text block, there should be a CardRasterHorizontal of BlogPosts
   filtered by type runnung. - Right-Top: Here, there should be a graph displaying my current PBs as
   defined in the data in a table. - Right-Bottom: Here, there should be a graph visualising the weekly
   RunningTraining data by distance

4. Music: This can be initially left with placeholders and an icon
