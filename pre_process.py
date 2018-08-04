import os
import json
from datetime import datetime

from os.path import isfile, join

dir_path = os.path.dirname(os.path.realpath(__file__))
data_dir = "{d}/data/orgs/".format(d=dir_path)

removable_files = []
no_cd_files = []

for root, dirs, files in os.walk(data_dir):
    for filename in files:
        if not filename.endswith(".json"):
            continue
        
        full_path = '{d}{f}'.format(d=data_dir, f=filename)
        with open(full_path) as f:
            # time = os.path.getmtime(full_path)
            # if datetime.fromtimestamp(time).date() < datetime.today().date():
            #     removable_files.append(full_path)
            
            data = json.load(f)
            is_success = True if ('success' in data) and (data['success'] == True) else False
            if not is_success:
                removable_files.append(full_path)
                continue
            
            details = data['details']
            has_services = True if len(details.get('services', [])) > 0 else False
            has_cd = True if len(details.get('contact_details', [])) > 0 else False

            if has_services and not has_cd:
                no_cd_files.append(full_path)
            
            if not all([has_services, has_cd]):
                removable_files.append(full_path)

fncd = open("no_cd.txt", "w")
fncd.write(str(no_cd_files))
fnser = open("no_cd_ser.txt", "w")
fnser.write(str(removable_files))

for rem in removable_files:
    try:
        os.remove(rem)
    except:
        pass
            
        

