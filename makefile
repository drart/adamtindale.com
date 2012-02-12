#
#
#
#
#
#
#
# rsync -e ssh  --size-only -avn --exclude 'projects' --exclude 'uc' --exclude ".*" --exclude 'blog' --exclude '*.markdown' deploy/ adamrtindale@adamtindale.com:adamtindale.com/


SITE=adamrtindale@adamtindale.com:adamtindale.com/
RSYNCFLAGS=-avcz
TESTFLAGS=$(RSYNCFLAGS) -n
EXCLUDEFLAGS=--exclude 'blog' --exclude '*.markdown' --exclude 'projects' --exclude '.*' --exclude 'uc'

default: 
	hyde gen -r

push:
	sed -i '' 's/development/production/' site.yaml
	hyde gen -r 
	rsync -e ssh  $(RSYNCFLAGS) $(EXCLUDEFLAGS) deploy/ $(SITE)
	git checkout site.yaml

test:
	sed -i '' 's/development/production/' site.yaml
	hyde gen -r 
	rsync -e ssh $(TESTFLAGS) $(EXCLUDEFLAGS) deploy/ $(SITE)
	git checkout site.yaml

clean:
	rm -rf deploy/
