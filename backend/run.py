from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import base64
import numpy as np
from PIL import Image
from io import BytesIO
import os

app = Flask(__name__)

CORS(app)
app.secret_key = "5ZN5zi!45QUsGGh"

@app.route("/", methods=["GET", "POST"])
def exercises():
    try:
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

    # print(response)
    return jsonify(response)
            for muscle_group in data[equipment]:
                if muscle_group not in request.json["muscle_groups"]:
                    for exercise in data[equipment][muscle_group]:
                        item = {}
                        item["equipment"] = equipment
                        item["muscle_group"] = muscle_group
                        item["exercise"] = exercise
                        response.append(item)

@app.route("/imageRecognize", methods=["POST"])
def recognize():
    image_base64_string = dict(request.form)['image']
    print("request file",len(image_base64_string))
    print(image_base64_string[:200])
    image_base64_string = image_base64_string.replace("data:image/jpeg;base64,", "");
    # image_base64_string = image_base64_string.replace("data:image/jpeg;base64,", "");
    # image_data = base64.decodebytes(bytes(image_base64_string, "utf-8"))
    # image = np.array(image_data)
    im = Image.open(BytesIO(base64.b64decode(image_base64_string)))
    print(im)
    im.show()
    response = []
    return jsonify(response)
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
