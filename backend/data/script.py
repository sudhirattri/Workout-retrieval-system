import json
from venv import create

with open("./data.json") as f:
    data = json.load(f)

def create_exercises_json():
    exercises = {}
    id = 1

    for equipment in data:
        for muscle_group in data[equipment]:
            for ex in data[equipment][muscle_group]:
                print(ex)
                for name, description in ex.items():
                # name = ex[0]
                # description = ex[1]

                    # print(name, description)
                    exercises[id] = {"name": name, "description": description, "equipment": equipment, "muscle_group": muscle_group}
                    id += 1

    out_file = open("./index/exercises.json", "w")                

    json.dump(exercises, out_file)
        
def create_equipment_posting_lists():
    id = 1
    equipment_posting_lists = {}

    for equipment in data:
        for muscle_group in data[equipment]:
            for ex in data[equipment][muscle_group]:
                # print(ex)
                for name, description in ex.items():
                # name = ex[0]
                # description = ex[1]

                    # print(name, description)
                    if equipment not in equipment_posting_lists:
                        equipment_posting_lists[equipment] = []

                    equipment_posting_lists[equipment].append(id)
                    id += 1

    out_file = open("./index/equipment_posting_lists.json", "w")                

    json.dump(equipment_posting_lists, out_file)

def create_equipment_posting_lists():
    id = 1
    equipment_posting_lists = {}

    for equipment in data:
        for muscle_group in data[equipment]:
            for ex in data[equipment][muscle_group]:
                # print(ex)
                for name, description in ex.items():
                # name = ex[0]
                # description = ex[1]

                    # print(name, description)
                    if equipment not in equipment_posting_lists:
                        equipment_posting_lists[equipment] = []

                    equipment_posting_lists[equipment].append(id)
                    id += 1

    out_file = open("./index/equipment_posting_lists.json", "w")                

    json.dump(equipment_posting_lists, out_file)    

def create_muscle_posting_lists():
    id = 1
    muscle_posting_lists = {}

    for equipment in data:
        for muscle_group in data[equipment]:
            for ex in data[equipment][muscle_group]:
                # print(ex)
                for name, description in ex.items():
                # name = ex[0]
                # description = ex[1]

                    # print(name, description)
                    if muscle_group not in muscle_posting_lists:
                        muscle_posting_lists[muscle_group] = []

                    muscle_posting_lists[muscle_group].append(id)
                    id += 1

    out_file = open("./index/muscle_posting_lists.json", "w")                

    json.dump(muscle_posting_lists, out_file)    


def get_exercise(equipments, muscles):
    with open("./index/equipment_posting_lists.json") as f:
        eq_posting_list = json.load(f)

    # print(eq_posting_list)

    set1 = set()

    for eq in equipments:
        set1.update(eq_posting_list[eq])

    with open("./index/muscle_posting_lists.json") as f:
        m_posting_list = json.load(f)

    set2 = set()

    for m in muscles:
        set2.update(m_posting_list[m])

    A_and_B = list(set1.intersection(set2))
    res = list(A_and_B)
    res += list(set1.difference(A_and_B))

    with open("./index/exercises.json") as f:
        exercises = json.load(f)    

    ex = []

    for id in res:
        ex.append(exercises[str(id)])

    return ex

# create_exercises_json()
# create_equipment_posting_lists()
# create_muscle_posting_lists()

ex = get_exercise(["Dumbbells", "Kettlebells"], ["Upper Arms"])

for e in ex:
    print("Name:", e["name"])
    print("Description:", e["description"])
    print("Equipment:", e["equipment"])
    print("Muscle Group:", e["muscle_group"])
    print()