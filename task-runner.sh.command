#!/bin/bash
###############
# Task Runner #
###############

# To make this file runnable:
#     $ chmod +x *.sh.command

banner="Simple Node Server Starter Project"
projectHome=$(cd $(dirname $0); pwd)

setupTools() {
   cd $projectHome
   echo
   echo $banner
   echo $(echo $banner | sed s/./=/g)
   pwd
   test -d .git && git pull --ff-only
   echo
   echo "Node.js:"
   which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
   node --version
   npm install --no-fund
   npm update
   npm outdated
   echo
   }

runSpecs() {
   cd $projectHome
   echo "Specifications:"
   npm test
   }

startServer() {
   cd $projectHome
   echo "Starting server:"
   npm start
   echo
   }

setupTools
runSpecs
startServer
