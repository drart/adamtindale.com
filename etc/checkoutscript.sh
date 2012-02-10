#!/bin/bash  

REPO=$HOME/Sites/adamtindale.com/redesign
SITE=$HOME/test/superwebtest/

cd $REPO
pwd
sed -i '' 's/development/production/' $REPO/site.yaml
hyde gen -r $REPO
rsync -avz --exclude 'blog' --exclude '*.markdown' --exclude '*.DS_Store' --exclude '*.swp' $REPO/deploy/ $SITE
git checkout site.yaml
