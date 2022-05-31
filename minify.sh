pip3 -q install jsmin
if [ ! -d "jsbuilds" ];
then
    mkdir jsbuilds
fi
directories='*/'
for directory in $directories
do
    if [[ $directory == 'jsbuilds/'  ]] || [[ $directory == 'cdn_server/'  ]];
    then
        continue
    else
        yourfilenames=$directory'*.js'
        python3.9 -m jsmin $yourfilenames > jsbuilds/${directory::-1}.min.js
    fi
done
