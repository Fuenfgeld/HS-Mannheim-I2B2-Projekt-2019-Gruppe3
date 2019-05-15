import json
from flask import Flask, jsonify
from crossdomain import crossdomain

app = Flask(__name__)


@app.route('/')
@crossdomain(origin='*')
def index():
    return jsonify({"Hello" : "World"}), 200


@app.route("/data", methods=['GET','POST'])
@crossdomain(origin='*')
def test():
    data = {
        	'A': .08167,
        	'B': .01492,
        	'C': .02782,
        	'D': .04253,
        	'E': .12702,
        	'F': .02288,
        	'G': .02015,
        	'H': .06094,
        	'I': .06966,
        	'J': .00153,
        	'K': .00772,
        	'L': .04025,
        	'M': .02406,
        	'N': .06749,
        	'O': .07507,
        	'P': .01929,
        	'Q': .00095,
        	'R': .05987,
        	'S': .06327,
        	'T': .09056,
        	'U': .02758,
        	'V': .00978,
        	'W': .02360,
        	'X': .00150,
        	'Y': .01974,
        	'Z': .00074
    }
    return jsonify(data)

@app.route("/flaredemo", methods=['GET','POST'])
@crossdomain(origin='*')
def datatrans(): 
    with open('flareSample.json', 'r') as f:
        flareSample = json.load(f)
        
    return jsonify(flareSample)

if __name__ == '__main__':
    app.run(debug = True)