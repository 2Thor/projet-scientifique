from flask import Flask, render_template #map on Web page
  
app = Flask(__name__)

@app.route('/')
def map_func():
	return render_template('map.html')

# Main program logic follows:
if __name__ == '__main__':

    app.run(debug = True)


 

        