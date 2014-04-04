Motion Study
############
:date: 2010-08-03 23:47
:author: Admin
:category: Uncategorized

I took a bunch of pictures and then pasted them together with

``convert $(ls *JPG | sort -n -r) $(ls *JPG | sort -n) -layers OptimizePlus paper.gif``

convert is a tool from the free ImageMagick package. The sort command
organizes the files into numerical order (great for those file names
that cameras tend to import). The -r flag reverses the set in the first
sequences and then I remove it for the second sequence so it loops
nicely. Again, you may have to click on the picture and let it load a
second before you get a nicely looping image.

.. image:: /img/blog/2010/08/papersmall.gif
    :alt: animated gif
