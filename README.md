# JS library

This is a JS library that is made globally available through Heroku.
If required, this will use the **Edge** addon later on, in order to reduce fetch times.

The library is hosted on : 

https://minjscdn.herokuapp.com/

## What it provides

The folders apart from ```cdn_server``` and ```jsbuilds``` are all JS libraries.

These are stored in a minified format withing ```jsbuilds```,
which is then served through a Flask server(```cdn_server```).

## Using it

Simply fetch libraries in the following format : 

``` https://minjscdn.herokuapp.com/<script_name> ```

Ex : https://minjscdn.herokuapp.com/ui

## Contributing

Fork it, make commits, make a pull request.

A Deployment utility program is available.

Use it through :

```bash
bash ./deploy.sh
# or
./deploy.sh
```

Any and all file with ```.js``` extension will be minified. Nothing is cached.

**You can keep README and .gitignore files without issues**

Any accepted commit, once pushed into the main branch will be available in the same was as any other.
