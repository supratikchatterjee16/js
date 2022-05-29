from re import L

from sqlalchemy import func
from pandas import read_sql_table, read_sql_query, DataFrame

from incubyte_crud.core import forms
from incubyte_crud import server

orm = server.orm

# class UserContact(orm.Model):
# 	entry_id = orm.Column(orm.Integer, primary_key=True)
# 	user_id = orm.Column(orm.ForeignKey('user.id'))
# 	user = orm.relationship('User')
# 	email = orm.Column(orm.String(320), unique=True)
# 	phone = orm.Column(orm.String(15), unique=True)
# 	def __init__(self, user_id, email, phone):
# 		self.user_id = user_id
# 		self.email = email
# 		self.phone = phone


#class Words(orm.Model):
    #id = orm.Column(orm.Integer, primary_key=True)
    #word = orm.Column(orm.String(50), unique=True)

    #def __init__(self, word):
        #self.word = word

    #@staticmethod
    #def create(word):
        #temp = Words(word)
        #try:
            #orm.session.add(temp)
            #orm.session.commit()
        #except:
            #return False
        #return True

    #@staticmethod
    #def read_all():
        #df = read_sql_table('words', orm.engine)
        #return df.to_json(orient='split')

    #@staticmethod
    #def update(old, modified):
        #temp = Words.query.filter_by(word=old).first()
        #temp.word = modified
        #orm.session.commit()

    #@staticmethod
    #def delete(word):
        #orm.session.query(Words).filter(Words.word == word).delete()
        #orm.session.commit()
