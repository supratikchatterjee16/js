pip3 install jsmin
mkdir build
directories='*/'
for directory in $directories
do
    if [[ directory == 'build'  ]] || [[ directory == 'cdn_server' ]];
    then
        continue
    else
        yourfilenames=$directory'*.js'
        python3.9 -m jsmin $yourfilenames > build/${directory::-1}.min.js
    fi
done
