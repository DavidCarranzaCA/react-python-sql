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
    SELECT 
    *,
    a.ArtistName 
    FROM Events
    INNER JOIN Artist a ON a.EventId = Events.Event 
    """)
    data = cur.fetchall()
    return jsonify(data)

@app.route("/newevent", methods=['POST'])
def newevent():
    data = request.get_json()
    ename = data.get('eventname')
    elocation = data.get('eventlocation')
    artist = data.get('artist')
    eimage = 'https://picsum.photos/400/?random'
    cur = mysql.connection.cursor()
    insert_data = (str(ename), str(elocation), str(eimage))
    event_sql = "INSERT INTO Events (`EventName`, `EventLocation`, `EventImage`) VALUES (%s,%s,%s)"
    
    cur.execute(event_sql, insert_data)
    id = cur.lastrowid
    print(id)

    artist_data = (str(artist), id)
    artist_sql = "INSERT INTO Artist (`ArtistName`, `EventId`) VALUES (%s, %s)"
    cur.execute(artist_sql, artist_data)
    mysql.connection.commit()
    print(data)
    return str(data)

@app.route('/delete', methods=['DELETE'])
def delete():
    data = request.get_json()
    print(data)
    id = data
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM Artist WHERE EventId = %s" % (id))
    cur.execute("DELETE FROM Events WHERE Event = %s" % (id))
    mysql.connection.commit()
    return str(data)

if __name__ == "__main__":
    app.run()