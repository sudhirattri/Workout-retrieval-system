from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import base64
import numpy as np
from PIL import Image
from io import BytesIO
import os
from tensorflow import keras
import tensorflow as tf
# model_path = './model/model_pretrained_resnet'
# model = keras.models.load_model(model_path)

def get_model_tf():
    #Reading the model from JSON file
    with open("./model//renet.json", 'r') as json_file:
        json_savedModel= json_file.read()

    
    model = tf.keras.models.model_from_json(json_savedModel)
    model.load_weights('./model//model.h5')
    return model

model_tf =get_model_tf()

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
                        response["exercises"].append(item)

        for equipment in request.json["equipments"]:
            if equipment in data:
                for muscle_group in data[equipment]:
                    if muscle_group not in request.json["muscle_groups"]:
                        for exercise in data[equipment][muscle_group]:
                            item = {}
                            item["equipment"] = equipment
                            item["muscle_group"] = muscle_group
                            item["exercise"] = exercise
                            response["exercises"].append(item)

        return jsonify(response)

    except Exception as e:
        response["success"] = False
        response["detail"] = "There is an error"
        del response["exercises"]
        return jsonify(response)
    # print(response)
    # return jsonify(response)


@app.route("/imageRecognize", methods=["POST"])
def recognize():
    image_base64_string = dict(request.form)["image"]
    print("request file", len(image_base64_string))
    print(image_base64_string[:200])
    image_base64_string = image_base64_string.replace("data:image/jpeg;base64,", "")
    # image_base64_string = image_base64_string.replace("data:image/jpeg;base64,", "");
    # image_data = base64.decodebytes(bytes(image_base64_string, "utf-8"))
    # image = np.array(image_data)
    im = Image.open(BytesIO(base64.b64decode(image_base64_string)))

    prediction,probs = predict_image(im)
    print(prediction,probs)
    # im.show()
    response = {}
    response["success"] = True
    response["equipment"] = str(prediction)
    response["probs"] = str(probs)

    return jsonify(response)
    # print(response)

def predict_image(image):
    image = image.resize((224,224))
    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_batch = np.expand_dims(img_array, axis=0)
    arr = model_tf.predict(img_batch)
    maxi = 0
    cur=-1
    for i in range (0,6):
        if(arr[0][i]>maxi):
            maxi = arr[0][i]
            cur=i
    names = ['Aerobic Steppers','Bench Press','Bicycle','Dumb Bell','Elliptical','Leg Press','Pec Deck','Rowing','Treadmill']

    return names[cur],maxi

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(port=port, debug=True)
