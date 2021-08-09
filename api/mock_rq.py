import requests

base = "http://localhost:5000/api"
POST_OBJ = {
        "apitext": "This is a test string",
        "apiletter": "a",
        "case_sensitive_search": False,
        "key": 12345
    }
response = requests.put(base, POST_OBJ)
print(response.json())
print(response.status_code)

response2 = requests.get(base)
print(response2.json())

response3 = requests.delete(base, data={"id":0})
print(response3.status_code)