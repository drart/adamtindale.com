Website Overhaul Update
#######################
:date: 2011-07-01 22:50
:author: Admin
:category: Uncategorized
:TIMEZONE: America/Edmonton

I am trying to overhaul the website. I have been spending a lot of time
researching what system I should use and how I should do things.

I have settled on `Hyde`_. It is a python based engine that utilizes
`Jinja2`_ tempates, which are very close to `Django`_. Right now I use 2
different content management systems that dynamically load and have
different logins and passwords and I really don't need it. I love Hyde's
idea of having static pages. There is nothing to login to on the net. No
access points for hackers or spambots or script kiddies. I like that.

The downsides of Hyde is that it is quite big and flexible and requires
some learning if you want to do something other than a boilerplate site.
Currently the documentation isn't great but sufficient to get going.
What Hyde really has is a few people who have open sourced their code to
generate their sites (!!). I stumbled across `James Clarke`_'s site
today and found it super useful.

With a templating system that allows for some real power under the hood
I will be able to keep the look and feel of the site much more
consistent and make a global change by only shifting a template. Right
now I have some old youtube links on the site that use the <object> tag
instead of the new <iframe> tag. They both work but I had to do a little
massaging on each to get them to sit in. I have written a macro for
Jinja that allows for a very simple way to integrate youtube links. If I
change this macro then all youtube links will be updated across the
whole site (once I recompile, of course).

After lots of sitting by a tree I came to the realization that I had
places and media to put on the site. Also, that I felt that academic
items were media items, just like pictures or other traditional media
assets. So, I came up with this layout idea for all of my project pages.

Project Page

-  Title
-  People
-  Main Link (if any)
-  Blurb
-  Main Image (if any)
-  Description (if any)
-  Events (in the future, if any)
-  Soundcloud embed (if any)
-  Youtube embed (if any)
-  Publications (if any)
-  Code (if any)
-  Past Events (if any)
-  Other Images (if any)
-  Other Links (if any)
-  Tweet this
-  Comments (if allowed by me)

This can be handled nicely by Hyde. I would also like to be able to tag
a project page as old and have it not included in my current list of
projects but have it grouped in old projects, as I have now. No problem
with Hyde's categories.

The major bonus of this system for me is git. I can make a git project
out of this and everything gets stored in a format that both get and I
can read. With Wordpress, indexhibit, or other mysql based sites only
machines or super database wizards can read the files created and do
anything with them. With Hyde and some careful planning, all of the
content is a simple text file (or image file).

I am still a little dubious about comments on the site. I have received
1 non-spam comment in two years. So, I am looking into `disqus`_ to
handle comments. The nice thing is that I can add them after I get the
skeleton up and running.

There are some dirty Hyde details that I will start blogging about as I
get my feet wet. Until then, any thoughts or links I might need please
email me or put something in the comments here.

Happy Canada Day!

.. _Hyde: http://ringce.com/hyde
.. _Jinja2: http://jinja.pocoo.org/
.. _Django: https://www.djangoproject.com/
.. _James Clarke: http://jamesclarke.net/
.. _disqus: http://disqus.com/
