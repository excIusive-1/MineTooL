from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/text-gradient')
def text_gradient():
    return render_template('text_gradient.html')

@app.route('/web-gradient')
def web_gradient():
    return render_template('web_gradient.html')

@app.route('/calculators')
def calculators():
    return render_template('calculators.html')

if __name__ == '__main__':
    app.run(debug=True)
  
