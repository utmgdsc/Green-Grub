# Code for prettifying and seperating data
import json
 
# Opening JSON file
def convert(file_path: str):
    with open(file_path) as json_file:
        dict_data = json.load(json_file)
    return dict_data

# product name, image, sustainiblity score, nutrition score

def parse_and_organize_response(response):
    data = response.json()

    # Organize data as needed. This is just an example.
    organized_data = {
        'product_name': data.get('product', {}).get('product_name'),
        'image': data.get('product', {}).get('image_url'),
        'nutri_score': nutri_score(data),
        'sustainability' : sustainbility_score(data)
        # Add more fields as needed
    }

    print(organized_data)
    return organized_data


'''
    the nutri-score in the data base is converted from a letter grade to a numerical score
    "a" = 5
    "b" = 4
    "c" = 3
    "d" = 2
    "e" = 1

    If the grade is not between a and e, return 0 which signifies an unknown score
'''
def nutri_score(data) -> int:
    grade = data.get('product', {}).get('nutriscore_grade')
    scores = {"a": 5, "b": 4, "c": 3, "d": 2, "e": 1}
    if grade in scores:
        return scores[grade]
    else: 
        return 0


'''
    the sustainbility_score in the data base is converted from a letter grade to a numerical score
    "a" = 5
    "b" = 4
    "c" = 3
    "d" = 2
    "e" = 1
'''
def sustainbility_score(data) -> int:
    grade = data.get('product', {}).get('ecoscore_grade')
    print("sus", grade)
    scores = {"a": 5, "b": 4, "c": 3, "d": 2, "e": 1}
    if grade in scores:
        return scores[grade]
    else: 
        return 0




def parse_and_organize_response(data):
    # Organize data as needed. This is just an example.
    organized_data = {
        'product_name': data.get('product', {}).get('product_name'),
        'image': data.get('product', {}).get('image'),
        'nutri_score': nutri_score(data),
        'sustainability' : sustainbility_score(data)
        # Add more fields as needed
    }

    return organized_data

data_dict = convert("example_input.json")
print(parse_and_organize_response(data_dict))
print(data_dict.get('product', {}).get('image_url'))

