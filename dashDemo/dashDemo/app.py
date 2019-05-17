import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output

import pandas as pd
import plotly.graph_objs as go

df = pd.read_csv('PatientenI2B2.csv')

def generate_table(dataframe, max_rows=133):
    return html.Table(
        # Header
        [html.Tr([html.Th(col) for col in dataframe.columns])] +

        # Body
        [html.Tr([
            html.Td(dataframe.iloc[i][col]) for col in dataframe.columns
        ]) for i in range(min(len(dataframe), max_rows))]
    )


trace_age = go.Histogram(
				x=list(df.AGE),
				name='age')

trace_ageM = go.Histogram(
				x=list(df.AGE[df.SEX == "M"]),
				name = "Male",
				opacity=0.75)

trace_ageF = go.Histogram(
				x=list(df.AGE[df.SEX == "F"]),
				name = "Female",
				opacity=0.75)

dataAge1 = [trace_age]
dataAge2 = [trace_ageM,trace_ageF]

layoutAge2 = go.Layout(barmode='overlay')

figAge2 = go.Figure(data = dataAge2,layout = layoutAge2)

layout = dict(title="Alters Verteilung",schowlegend=False)

figAge1 = dict(data=dataAge1,layout=layout)

app = dash.Dash(__name__)

app.layout = html.Div([
	html.H1(
		children="I2B2 Data Demo Dash"
	),
	html.H3(
		children="Maenlich vs Weiblich"
	),
	html.Div(
		children="Maenlich vs Weiblich Demographie"
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
		children="Alter"
	),
   html.Div(
		children="Alters Demographie"
	),
	dcc.Graph(id='age1',
	figure=figAge1
	),
	html.H3(
		children="Alters Verteilung F vs. M",
	),
	html.Div(
		children="Alters Demographie beider geschlechter"
	),
	dcc.Graph(id='age2',
	figure=figAge2
	),
	html.H3(
		children="Table of Data",
	),
	html.Div(
		generate_table(df)
	)
])



if __name__ == '__main__':
    app.run_server(debug=True)