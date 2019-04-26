import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output

import pandas as pd
import plotly.graph_objs as go

df = pd.read_csv('PatientenI2B2.csv')

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

age_stuff=[0,10,20,30,40,50,60,70,80,90,100]

def generate_table(dataframe, max_rows=133):
    return html.Table(
        # Header
        [html.Tr([html.Th(col) for col in dataframe.columns])] +

        # Body
        [html.Tr([
            html.Td(dataframe.iloc[i][col]) for col in dataframe.columns
        ]) for i in range(min(len(dataframe), max_rows))]
    )


app.layout = html.Div([
	html.H1(
		children="I2B2 Data Demo Dash"
	),
	html.H3(
		children="Male vs Female"
	),
	html.Div(
		children="I2B2 Dataset Male vs Female Demograpic"
	),
    dcc.Graph(id='male-vs-female',
	figure={
		'data': [
			go.Bar(
				x=['M', 'F','NAN'],
				y=[df['SEX'].value_counts()["M"], df['SEX'].value_counts()["F"], (df['SEX'].size-(df['SEX'].value_counts()["M"]+df['SEX'].value_counts()["F"]))]
			)
			
		], 
	}),
	html.H3(
		children="Age"
	),
   html.Div(
		children="I2B2 Dataset Age Demograpic"
	),
	dcc.Graph(id='age',
	figure={
		'data': [
			go.Scatter(
				x=[0,10,20,30,40,50,60,70,80,90,100],
				y=df['AGE']

			)
			
		], 
	}),
	html.H3(
		children="Table of Data",
	),
	html.Div(
		generate_table(df)
	)
])



if __name__ == '__main__':
    app.run_server(debug=True)