if ! command -v terser &> /dev/null
then
    echo "terser could not be found"
    echo "attempting install"
    sudo apt install uglifyjs.terser
fi

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
        terser --config-file terser_config.json --comments -o jsbuilds/${directory::-1}.min.js  -- $yourfilenames 
    fi
done
