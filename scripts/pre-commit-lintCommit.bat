@echo off
echo '#######################################'
echo '# Pre Commit Check: Lint Commit Message' 
commitlint -e $HUSKY_GIT_PARAMS
echo '# Pre Commit Check: Finished'
echo '#######################################'
