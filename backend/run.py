from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app)
app.secret_key = "5ZN5zi!45QUsGGh"


@app.route("/", methods=["GET", "POST"])
def exercises():
    with open("data/data.json") as f:
        data = json.load(f)

    response = []

    for equipment in request.json["equipments"]:
        for muscle_group in request.json["muscle_groups"]:
            print(equipment, muscle_group)
            if equipment in data and muscle_group in data[equipment]:
                for exercise in data[equipment][muscle_group]:
                    item = {}
                    item["equipment"] = equipment
                    item["muscle_group"] = muscle_group
                    item["exercise"] = exercise
                    response.append(item)

    for equipment in request.json["equipments"]:
        for muscle_group in data[equipment]:
            if muscle_group not in request.json["muscle_groups"]:
                for exercise in data[equipment][muscle_group]:
                    item = {}
                    item["equipment"] = equipment
                    item["muscle_group"] = muscle_group
                    item["exercise"] = exercise
                    response.append(item)

    # print(response)

    return jsonify(response)


if __name__ == "__main__":
    app.run(port=5001, debug=True)
