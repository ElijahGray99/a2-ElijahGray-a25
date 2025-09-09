Acheivements:


Technical

1 - Created a single-page app that both provides a form for users to 
submit data (Left) and always shows the current state of the server-side data. 
Note: this implementation does currently work with multiple users at the same time. I am unsure if that was required.

Currently, a client and server maintain similar data whenever they communicate.
If another user talks and alters data, that change they made will only be visible after
their next update. 

2 - added a form enabling adding and deleting data on the server, also add the ability to modify existing data.

This can be done with the add/edit data form on the left as well as the remove data form on the right.
To add/edit data, input the required data forms. If the ID already exists, that ID will be altered.

To remove data, input the ID from the table you wish to delete.

3 - Added a function to auto sort my data based on my derived field (stress score). My thinking was that
we save server-cpu by offloading the sorting to the user. The server is responsible for just calculating the score.
I think this is a good design principle for future security.



Design

1 - Received feedback from two family members on how to improve the layout. This feedback was given
after I tasked them to make a plan for their extremely real homework assignments. They said my design was intuitive but
could be more visually clear.

Comments:

Father:
"It was a little annoying having to move the mouse all the way down to delete on my laptop."
just keep the two ways of modifying data together.


Sister:
"The table is a little ugly, can you make it easier to see the cells?"
add more contrast between cells.

"I dont like how the cells are the same size, the text looks funny"
make cells widths based on the content within.

Based on feedback: added alternating colors in the table, made the title section stand out, added titles to the form sections, put the remove and add/edit section next to eachother.

2 - Tried to incorporate both flex and gridbox design to get a feel for both of them and how I can use them together.
    It seems like grid is good for the big picture whereas flex seems to be great for making sub-elements look 
    good (The logo and title)




