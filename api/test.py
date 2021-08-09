from api import app, calc_letter_occurances
import unittest
import requests

#Testing calc function
teststring1 = "This is a mock string"
teststring2 = "ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
teststring3 = ""

class CalcTest(unittest.TestCase):
    def test1(self):
        occurances = calc_letter_occurances(teststring1, "a", False)
        self.assertEqual(occurances, 1)

    def test2(self):
        occurances = calc_letter_occurances(teststring2, "D", True)
        self.assertEqual(occurances, 1)
    
    def test3(self):
        occurances = calc_letter_occurances(teststring3, "z", True)
        self.assertEqual(occurances, 0)

#Testing API
class ApiTest(unittest.TestCase):
    API_URL = "http://localhost:5000/api"
    POST_OBJ = {
        "apitext": "This is a test string",
        "apiletter": "a",
        "case_sensitive_search": False,
        "key": 12345
    }

    #Put request
    def test_1_post_req(self):
        res = requests.put(ApiTest.API_URL, ApiTest.POST_OBJ)
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.json(), {"url": "/result"})

    #GET request after PUT => should return the POST_OBJ
    def test_2_get_req(self):
        res = requests.get(ApiTest.API_URL)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json(), [{'text': 'This is a test string', 'letter': 'a', 'is_case_sensitive': True, 'letter_occurances': 1, 'id': 12345}])

    def test_3_del_req(self):
        res = requests.delete(ApiTest.API_URL, data={"id":0})
        self.assertEqual(res.status_code, 200)
        res_get = requests.get(ApiTest.API_URL)
        self.assertEqual(res_get.json(), [])
    
        

if __name__ == "__main__":
    unittest.main()