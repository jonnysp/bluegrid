node node_modules\recess\bin\recess less\bluegrid.less --compile > css\bluegrid.css
node node_modules\recess\bin\recess less\bluegrid.less --compile --compress > css\bluegrid.min.css


copy css\bluegrid.css _docs\css\bluegrid.css /Y
copy css\bluegrid.min.css _docs\css\bluegrid.min.css /Y



copy js\alert.js+js\collapse.js+js\modal.js+js\popover.js+js\tip.js js\bluegrid.js /Y
copy js\bluegrid.js _docs\js\bluegrid.js /Y

pause