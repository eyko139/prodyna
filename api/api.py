from flask import Flask, request, redirect
import json
from flask_restful import Api, Resource, reqparse

#Relocate static folder to react build 
#static url without "/static" prefix
app = Flask(__name__, static_folder="../build", static_url_path="/")
api = Api(app)

#Defining the arguments for PUT requests
resultapi_put_args = reqparse.RequestParser()
resultapi_put_args.add_argument("apitext", type=str, help="Input text", required=True)
resultapi_put_args.add_argument("apiletter", type=str, help="Input letter", required=True)
resultapi_put_args.add_argument("case_sensitive_search", type=bool)
resultapi_put_args.add_argument("key", type=int, required=True)

#Defining the arguments for DELETE requets
resultapi_del_args = reqparse.RequestParser()
resultapi_del_args.add_argument("id", type=int, required=True)

#Storing results
results = []

#Calculating the how many times a letter occures in the text
def calc_letter_occurances(text, input_letter, case_sensitive = False):

    count = 0

    # Perform case sensitive search
    if case_sensitive == True:
        for letter in text:
            if letter == input_letter:
                count += 1

    # Perform case insensitive search - both user inputs are transformed to lower case
    if case_sensitive == False:
        for letter in text.lower():
            if letter == input_letter.lower():
                count += 1
    return count

class Resultapi(Resource):

    def get(self):
        return results, 200

    def put(self):
        args = resultapi_put_args.parse_args()
        is_case_sensitive = args["case_sensitive_search"]
        input_text = args["apitext"]
        input_letter = args["apiletter"]
        input_key = args["key"]

        count = calc_letter_occurances(input_text, input_letter, is_case_sensitive)

        occurances = {"occurances": count}
        results.insert(0, { "text":input_text,
                        "letter":input_letter,
                        "is_case_sensitive":is_case_sensitive,
                        "letter_occurances": count,
                        "id": input_key
                        })

        return {"url": "/result"}, 201
    
    def delete(self):
        args = resultapi_del_args.parse_args()
        del results[args["id"]]
        return 200
         

api.add_resource(Resultapi, "/api")

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/result")
def result():
    return app.send_static_file("index.html")