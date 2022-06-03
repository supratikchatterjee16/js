import os
# Default configurations:
config = {
    # "BASE_DIR": "/home/supratik/Documents/data-attached/space/projects/conceivilize_site/git-server/test/",
    "SERVER_NAME": "minjscdn.herokuapp.com",
    # "SQLALCHEMY_DATABASE_URI": "postgres+psycopg2://workbench:workbench@localhost:5432/workbench",
    # "SQLALCHEMY_DATABASE_URI": 'postgresql://cdfhkfxs:PynQ9IKe_Yce9S4xgs2s-ji2dMB5N3Kg@john.db.elephantsql.com/cdfhkfxs',
    "SQLALCHEMY_DATABASE_URI": "sqlite:///"+os.path.join(os.getcwd(), 'random.sqlite'),
    "SQLALCHEMY_BINDS": {},
    "SQLALCHEMY_TRACK_MODIFICATIONS": False,
    "PERMANANENT_SESSION_LIFETIME": 7776000.0,
    "APPLICATION_ROOT": "/",
    "PREFERRED_URL_SCHEME": "https",
    "JSON_AS_ASCII": True,
    "JSON_SORT_KEYS": True,
    "TRAP_HTTP_EXCEPTIONS": True,
    "CAPTCHA_ENABLE": False,
    "MAIL_ENABLE": False,
    "LDAP_ENABLE": False,
    "SUBNET_MASK": 32
}
