#from flask_wtf import FlaskForm
#from wtforms import StringField, PasswordField, SubmitField, EmailField, TelField, DateTimeField, SelectField
#from wtforms.validators import DataRequired


# class CoachCreationForm(FlaskForm):
#     type = SelectField('Coach Type', choices=[('0', 'AC'), ('1', 'Non AC'), ('2','Seater')], validators=[DataRequired()])
#     # password = PasswordField('Password', validators=[DataRequired()])
#     submit = SubmitField('Create Coach')

# class CoachRemovalForm(FlaskForm):
#     number = StringField('Coach Number', validators=[DataRequired()])
#     submit = SubmitField('Remove Coach')

# class CoachTypeChangeForm(FlaskForm):
#     number = StringField('Coach Number', validators=[DataRequired()])
#     type = SelectField('Coach Type', choices=[('0', 'AC'), ('1', 'Non AC'), ('2','Seater')], validators=[DataRequired()])
#     submit = SubmitField('Update Coach')

# class DateCreationForm(FlaskForm):
#     date = DateTimeField('Scheduled Time', validators=[DataRequired()])
#     # password = PasswordField('Password', validators=[DataRequired()])
#     submit = SubmitField('Schedule date')


# class BookingForm(FlaskForm):
#     coach = StringField('Coach', validators=[DataRequired()])
#     seats = StringField('Seats', validators=[DataRequired()])
#     submit = SubmitField('Create Booking')

# class WordAddForm(FlaskForm):
#     word = StringField('Word', validators=[DataRequired()], render_kw={'placeholder':'Type a word...'})
#     submit = SubmitField('Add Word')
