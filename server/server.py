from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__, static_folder="../dist", template_folder="../src")
app.config["CACHE_TYPE"] = "null"
app.config['MYSQL_HOST'] = 'test.cleul5jqviz8.us-west-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'test'
app.config['MYSQL_PASSWORD'] = 'thisisatest12'
app.config['MYSQL_DB'] = 'test'
mysql = MySQL(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/getevents", methods=['GET'])
def getevents():
    cur = mysql.connection.cursor()
    cur.execute("""
    SELECT * FROM Events 
    """)
    data = cur.fetchall()
    return jsonify(data)

@app.route("/newevent", methods=['POST'])
def newevent():
    data = request.get_json()
    ename = data.get('eventname')
    elocation = data.get('eventlocation')
    eimage = data.get('eventimage')
    cur = mysql.connection.cursor()
    insert_data = (str(ename), str(elocation), str(eimage))
    cur.execute("INSERT INTO Events (`EventName`, `EventLocation`, `EventImage`) VALUES (%s,%s,%s)", insert_data)
    mysql.connection.commit()
    print(data)
    return str(data)

if __name__ == "__main__":
    app.run()