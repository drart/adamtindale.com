PELICAN=pelican
PELICANOPTS=-v

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/output
CONFFILE=$(BASEDIR)/pelicanconf.py
PUBLISHCONF=$(BASEDIR)/publishconf.py

FTP_HOST=localhost
FTP_USER=anonymous
FTP_TARGET_DIR=/

SSH_HOST=adamtindale.com
SSH_PORT=22
SSH_USER=adamrtindale
SSH_TARGET_DIR=adamtindale.com/

RSYNCFLAGS=-avcz
RSYNC_TESTFLAGS=$(RSYNCFLAGS) -n
RSYNC_EXCLUDES=--exclude='projects' --exclude='.*'  
OLD_RSYNC_FLAGS='-P -rvz'

DROPBOX_DIR=~/Dropbox/Public/

help:
	@echo 'Makefile for a pelican Web site                                        '
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make html                        (re)generate the web site          '
	@echo '   make clean                       remove the generated files         '
	@echo '   make regenerate                  regenerate files upon modification '
	@echo '   make publish                     generate using production settings '
	@echo '   make serve                       serve site at http://localhost:8000'
	@echo '   make devserver                   start/restart develop_server.sh    '
	@echo '   ssh_upload                       upload the web site via SSH        '
	@echo '   rsync_upload                     upload the web site via rsync+ssh  '
	@echo '   rsync_test                       test rsync files via rsync+ssh     '
	@echo '   dropbox_upload                   upload the web site via Dropbox    '
	@echo '   ftp_upload                       upload the web site via FTP        '
	@echo '   github                           upload the web site via gh-pages   '
	@echo '                                                                       '


html: clean $(OUTPUTDIR)/index.html
	@echo 'Done'

$(OUTPUTDIR)/%.html:
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

clean:
	find $(OUTPUTDIR) -mindepth 1 -delete

regenerate: clean
	$(PELICAN) -r $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

serve:
	cd $(OUTPUTDIR) && python -m SimpleHTTPServer

devserver:
	$(BASEDIR)/develop_server.sh restart

publish:
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(PUBLISHCONF) $(PELICANOPTS)

ssh_upload: publish
	scp -P $(SSH_PORT) -r $(OUTPUTDIR)/* $(SSH_USER)@$(SSH_HOST):$(SSH_TARGET_DIR)

rsync_upload: publish
	rsync -e "ssh -p $(SSH_PORT)"  $(RSYNCFLAGS) $(RSYNC_EXCLUDES) $(OUTPUTDIR)/ $(SSH_USER)@$(SSH_HOST):$(SSH_TARGET_DIR)

rsync_test: publish
	rsync -e "ssh -p $(SSH_PORT)" $(RSYNC_TESTFLAGS) $(RSYNC_EXCLUDES) $(OUTPUTDIR)/ $(SSH_USER)@$(SSH_HOST):$(SSH_TARGET_DIR)

dropbox_upload: publish
	cp -r $(OUTPUTDIR)/* $(DROPBOX_DIR)

ftp_upload: publish
	lftp ftp://$(FTP_USER)@$(FTP_HOST) -e "mirror -R $(OUTPUTDIR) $(FTP_TARGET_DIR) ; quit"

github: publish
	ghp-import $(OUTPUTDIR)
	git push origin gh-pages

.PHONY: html help clean regenerate serve devserver publish ssh_upload rsync_upload dropbox_upload ftp_upload github

# # derived from this rsync command that worked well for publishing
# # rsync -e ssh  --size-only -avn --exclude 'projects' --exclude 'uc' --exclude ".*" --exclude 'blog' --exclude '*.markdown' deploy/ adamrtindale@adamtindale.com:adamtindale.com/
#
# 	push:
# 	hyde gen -r 
# 	rsync -e ssh  $(RSYNCFLAGS) $(EXCLUDEFLAGS) deploy/ $(SITE)
#
# 	test:
# 	hyde gen -r 
# 	rsync -e ssh $(TESTFLAGS) $(EXCLUDEFLAGS) deploy/ $(SITE)
# SYNCFLAGS=-avcz
# TESTFLAGS=$(RSYNCFLAGS) -n
