#!/usr/bin/env python
# -*- coding: utf-8 -*- #

#THEME = "mmenu-pelican"
THEME = "simple-animation"

SITENAME = 'Adam Tindale'
SITESUBTITLE = ''
SITEURL = 'http://www.adamtindale.com'

ARTICLE_PATHS = ['blog']
ARTICLE_URL = 'blog/{category}/{slug}/'
ARTICLE_SAVE_AS = 'blog/{category}/{slug}/index.html'

AUTHOR = 'Adam Tindale'
AUTHOR_URL = False
AUTHOR_SAVE_AS = False
AUTHORS_URL = False
AUTHORS_SAVE_AS = False

PDF_GENERATOR = False

PAGE_PATHS = ['pages']
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'

CATEGORY_SAVE_AS = 'blog/{slug}/index.html'
CATEGORY_URL = 'blog/{slug}/'

ARCHIVES_SAVE_AS = 'blog/archives/index.html'
#FEED_ATOM = 'blog/feeds/'
#FEED_RSS = 'blog/feeds/'

TAG_SAVE_AS = False
TAG_URL = False

INDEX_SAVE_AS = 'blog/index.html'

TIMEZONE = 'America/Toronto'
# http://stackful-dev.com/static-site-jinja-pelican-shared-templates.html

DEFAULT_LANG = 'en'

DEFAULT_DATE_FORMAT = '%A %B %d, %Y'

# Blogroll
# LINKS =  ('Pelican', 'http://docs.notmyidea.org/alexis/pelican/')

DEFAULT_PAGINATION = 5

#PAGINATED_DIRECT_TEMPLATES = (
#    ('index'),
#)

DEFAULT_CATEGORY = 'Uncategorized'
DIRECT_TEMPLATES = ('index', 'archives')


IGNORE_FILES = ['.DS_Store', '.DS_store']

# http://docs.getpelican.com/en/3.3.0/settings.html#using-pagination-patterns
PAGINATION_PATTERNS = (
        (1, '{base_name}/', '{base_name}/index.html'),
        (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)


MENUITEMS = (
        ('Home', ''),
        ('Bio/CV/Events', 'info'),
        ('Projects', 'projects'),
        ('Research', 'research'),
        ('Code', 'code'),
        )
DISPLAY_PAGES_ON_MENU = False

STATIC_PATHS = [
        'img',
        'js/jquery.github-activity.js',
        'js/jquery.timeago.js',
        'js/jquery.knob.js',
        'js/flocking-all.min.js',
        'js/prism.js',
        'css/prism.css',
        'missing.html',
        'records/record.html',
        'records/simple.html',
        'records/oscillate.html',
        'records/sphere.html',
        'flocking/template.html',
        'flocking/waveshapetest.html',
        ]

EXTRA_PATH_METADATA = {
        'js/jquery.github-activity.js' : {'path': 'theme/js/jquery.github-activity.js'},
        'js/jquery.knob.js' : {'path': 'theme/js/jquery.knob.js'},
        'js/jquery.timeago.js' : {'path': 'theme/js/jquery.timeago.js'},
        'js/prism.js' : {'path': 'theme/js/prism.js'},
        'css/prism.js' : {'path': 'theme/css/prism.css'},
        'js/flocking-all.min.js' : {'path': 'theme/js/flocking-all.min.js'},
        'records/record.html' : {'path': 'record/index.html'}, 
        'records/simple.html' : {'path': 'simple/index.html'}, 
        'records/oscillate.html' : {'path': 'oscillate/index.html'}, 
        'records/sphere.html' : {'path': 'sphere/index.html'}, 
        }

GITHUB_URL = 'https://github.com/drart/'

SOCIAL = (
    #('twitter', 'http://twitter.com/adamtindale'),
    ('github', 'https://github.com/drart/adamtindale.com'),
    ('email', '&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#97;&#100;&#97;&#109;&#64;&#97;&#100;&#97;&#109;&#116;&#105;&#110;&#100;&#97;&#108;&#101;&#46;&#99;&#111;&#109;'),
    ('stackoverflow', 'http://stackoverflow.com/users/1945902/adam-tindale'),
    ('soundcloud', 'https://soundcloud.com/adamtindale'), 
    ('googlescholar', 'http://scholar.google.ca/citations?user=cy820NIAAAAJ&hl=en'), 
    )

# theme variables
BLOGTITLE = 'Adam\'s Blog' 
BLOGDIR = 'blog' 
RECENT_BLOG = True

WORKTITLE = 'Online Pieces'
WORKLINKS = (
        ('Slide (2017)', 'http://www.adamtindale.com/slide'), 
        ('OSCILLATE (2015)', 'http://www.adamtindale.com/oscillate'), 
        ('SIMPLE (2013)', 'http://www.adamtindale.com/simple'), 
        ('RECORD (2011)', 'http://www.adamtindale.com/record'), 
        ('Sphere (2010)', 'http://www.adamtindale.com/sphere'),
   )


PLUGIN_PATHS = ['pelican-plugins']
#PLUGINS = ['neighbors', 'code_include', 'pelican_gist', 'gist_directive', 'pelican_git']
PLUGINS = ['neighbors', 'code_include',  'gist_directive']

GIT_CACHE_ENABLED = True

SITEMAP = {
        'format': 'xml',
        'changefreqs': {
            'articles': 'monthly',
            'indexes': 'daily',
            'pages': 'monthly'
            }
        }


LOAD_CONTENT_CACHE = False
