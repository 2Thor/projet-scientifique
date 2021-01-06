from flask import Flask #map on Web page

app = Flask(__name__)

@app.route('/')
def map_func():
	return render_template('map.html')
if __name__ == '__main__':
    app.run(debug = True)