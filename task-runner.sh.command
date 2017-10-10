#!/bin/sh
# Task Runner

# To make this file runnable:
#      $ chmod +x *.sh.command

projectHome=$(cd $(dirname $0); pwd)

info() {
     # Check for Node.js installation and download project dependencies
     cd $projectHome
     pwd
     echo
     echo "Node.js:"
     which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
     node --version
     test -d node_modules || npm install
     npm update
     npm outdated
     echo
     }

runTests() {
     cd $projectHome
     echo "Testing:"
     npm test
     }

startServer() {
     cd $projectHome
     echo "Starting server:"
     npm start
     echo
     }

echo
echo "Simple Node Server Starter Project"
echo "=================================="
info
runTests
startServer
