# Hexo configuration
BASEDIR=$(CURDIR)
OUTPUTDIR=$(BASEDIR)/public

# Deployment configuration
FTP_HOST=localhost
FTP_USER=anonymous
FTP_TARGET_DIR=/

SSH_HOST=adamtindale.com
SSH_PORT=22
SSH_USER=adamrtindale
SSH_TARGET_DIR=adamtindale.com/

RSYNCFLAGS=-avcz
RSYNC_TESTFLAGS=$(RSYNCFLAGS) -n --delete --itemize-changes
#RSYNC_EXCLUDES=--exclude='projects' --exclude='.*'  
RSYNC_EXCLUDES=--exclude='.*'  

DROPBOX_DIR=~/Dropbox/Public/

help:
	@echo 'Makefile for a hexo Web site                                           '
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make html                        generate the web site              '
	@echo '   make clean                       remove the generated files         '
	@echo '   make serve                       serve site at http://localhost:4000'
	@echo '   make develop                     generate and serve                 '
	@echo '   make watch                       generate with file watching        '
	@echo '   make deploy                      deploy using hexo                  '
	@echo '   make new-post TITLE="title"      create new blog post               '
	@echo '   make new-page TITLE="title"      create new page                    '
	@echo '   ssh_upload                       upload the web site via SSH        '
	@echo '   rsync_upload                     upload the web site via rsync+ssh  '
	@echo '   rsync_test                       test rsync files via rsync+ssh     '
	@echo '   dropbox_upload                   upload the web site via Dropbox    '
	@echo '   ftp_upload                       upload the web site via FTP        '
	@echo '   github                           upload the web site via gh-pages   '
	@echo '                                                                       '

html: clean
	hexo generate
	@echo 'Done'

clean:
	hexo clean

serve:
	hexo serve

develop:
	hexo generate && hexo serve

watch:
	hexo generate --watch

deploy:
	hexo deploy

build-deploy: clean
	hexo generate
	hexo deploy

new-post:
	hexo new post "$(TITLE)"

new-page:
	hexo new page "$(TITLE)"

publish: html
	@echo 'Site generated and ready for deployment'

ssh_upload: html
	scp -P $(SSH_PORT) -r $(OUTPUTDIR)/* $(SSH_USER)@$(SSH_HOST):$(SSH_TARGET_DIR)

rsync_upload: html
	rsync -e "ssh -p $(SSH_PORT)"  $(RSYNCFLAGS) $(RSYNC_EXCLUDES) $(OUTPUTDIR)/ $(SSH_USER)@$(SSH_HOST):$(SSH_TARGET_DIR)

rsync_test: html
	rsync -e "ssh -p $(SSH_PORT)" $(RSYNC_TESTFLAGS) $(RSYNC_EXCLUDES) $(OUTPUTDIR)/ $(SSH_USER)@$(SSH_HOST):$(SSH_TARGET_DIR)

dropbox_upload: html
	cp -r $(OUTPUTDIR)/* $(DROPBOX_DIR)

ftp_upload: html
	lftp ftp://$(FTP_USER)@$(FTP_HOST) -e "mirror -R $(OUTPUTDIR) $(FTP_TARGET_DIR) ; quit"

github: html
	ghp-import $(OUTPUTDIR)
	git push origin gh-pages

.PHONY: html help clean serve develop watch deploy build-deploy new-post new-page publish ssh_upload rsync_upload rsync_test dropbox_upload ftp_upload github