 
'''
Copyright 2021, Supratik Chatterjee
'''
from setuptools import setup, Extension, find_packages

requirements_noversion = [
'Flask',
'Flask-Babel',
'Flask-BabelEx',
'Flask-Compress',
'Flask-HTTPAuth',
'Flask-Login',
'Flask-Mail',
'Flask-Migrate',
'Flask-ReCaptcha',
'Flask-Security',
'flask-session-captcha',
'Flask-SQLAlchemy',
'Flask-SSLify',
'Flask-Table',
'Flask-WTF',
'ipaddress',
'openpyxl',
'pandas',
'parsedatetime',
'parsel',
'passlib',
'pymongo',
'psycopg2-binary',
'requests',
'SQLAlchemy',
'urllib3',
'websockets',
'bjoern'
]
setup(
	# Meta information
	name				= 'cdn_server',
	version				= '0.0.1',
	author				= 'Supratik Chatterjee',
	author_email		= 'supratikdevm96@gmail.com',
	# license			= '2-clause BSD',
	url					= 'https://github.com/supratikchatterjee16/workbench',
	description			= 'CDN server for personal use',
	keywords			= ['git server python'],
	install_requires	= requirements_noversion,
	# build information
	py_modules			= ['cdn_server'],
	packages			= find_packages(),
	package_dir			= {'cdn_server' : './cdn_server'},
	include_package_data= True,
	package_data		= {'cdn_server' : [
								'frontend/*',
								'frontend/*/*',
								'frontend/*/*/*',
								'frontend/*/*/*/*',
								'frontend/*/*/*/*/*',
								'frontend/*/*/*/*/*/*',
								]},

	zip_safe			= True,
	# https://stackoverflow.com/questions/14399534/reference-requirements-txt-for-the-install-requires-kwarg-in-setuptools-setup-py
	entry_points		= {'console_scripts' : ['cdn_server = cdn_server:run'],},
	# ext_modules			= [bjoern_extension],
	classifiers			= [
		"Programming Language :: Python :: 3",
		"Operating System :: OS Independent",
	],
)
