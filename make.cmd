@ECHO OFF

cd node
ECHO "make bluegrid.css"
node.exe node_modules\less\bin\lessc ..\less\bluegrid.less > ..\css\bluegrid.css
node.exe node_modules\less\bin\lessc ..\less\bluegrid.less --yui-compress > ..\css\bluegrid.min.css
cd ..
 
copy css\bluegrid.css _docs\css\bluegrid.css /Y > nul
copy css\bluegrid.min.css _docs\css\bluegrid.min.css /Y > nul


Echo "make bluegrid.js"
copy /b js\alert.js+js\collapse.js+js\modal.js+js\popover.js+js\tip.js js\bluegrid.js /Y > nul
copy js\bluegrid.js _docs\js\bluegrid.js /Y > nul


pause