from flask import Flask, request, redirect, jsonify
from flask_cors import CORS, cross_origin
import json
from flask_restful import Api, Resource, reqparse

app = Flask(__name__, static_folder="../public/", template_folder="../public")
api = Api(app)
CORS(app)

resultapi_put_args = reqparse.RequestParser()
resultapi_put_args.add_argument("apitext", type=str, help="Input text", required=True)
resultapi_put_args.add_argument("apiletter", type=str, help="Input letter", required=True)
resultapi_put_args.add_argument("case_sensitive_search", type=bool)
# resultapi_put_args.add_argument("key", type=int, required=True)


results = []

class Resultapi(Resource):

    def get(self):
        return results

    def put(self):
        args = resultapi_put_args.parse_args()
        is_case_sensitive = args["case_sensitive_search"]
        input_text = args["apitext"]
        input_letter = args["apiletter"]
        # input_key = args["key"]
        count = 0
        # Perform case sensitive search
        if args["case_sensitive_search"] == True:
            for letter in input_text:
                if letter == input_letter:
                    count += 1

        # Perform case insensitive search - both user inputs are transformed to lower case
        if args["case_sensitive_search"] == False:
            for letter in input_text.lower():
                if letter == input_letter.lower():
                    count += 1

        occurances = {"occurances": count}
        results.append({ "text":input_text,
                        "letter":input_letter,
                        "is_case_sensitive":is_case_sensitive,
                        "letter_occurances": count
                        })

        return {"url": "/result"}
         

api.add_resource(Resultapi, "/hello")

# @app.route("/api/input", methods=["POST"])
# @cross_origin()
# def input():
    
#     # Retrieve user input from post request
#     response = request.get_json()
#     text = response["text"]
#     input_letter = response["letter"]
#     case_sensitive_search = response["caseSensitivity"]
#     count = 0

#     # Perform case sensitive search
#     if case_sensitive_search == True:
#         for letter in text:
#             if letter == input_letter:
#                 count += 1

#     # Perform case insensitive search - both user inputs are transformed to lower case
#     if case_sensitive_search == False:
#         for letter in text.lower():
#             if letter == input_letter.lower():
#                 count += 1

#     # Writing results to json file and returning result page URL
#     json_file = "results.json"
#     results = { "occurances": count,
#                 "text": text,
#                 "case_sensitive_search": case_sensitive_search
#                 }  
#     with open(json_file, "w+") as file:
#         json.dump(results, file)
#         file.close()

#     return { "url": "/result" }

# @app.route("/api/result", methods=["GET"])
# def result():
#     with open("results.json") as file:
#         results = json.load(file)

#     return results
