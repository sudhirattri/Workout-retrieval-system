from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)

CORS(app)
app.secret_key = "5ZN5zi!45QUsGGh"


@app.route("/", methods=["GET", "POST"])
def exercises():
    try:
        with open("data/data.json") as f:
            data = json.load(f)

        response = {}
        response["success"] = True
        response["exercises"] = []

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
    except Exception as e:
        response["success"] = False
        response["detail"] = "There is an error"
        del response["exercises"]
        return jsonify(response)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(port=port, debug=True)
