import os
import json
import urllib
from datetime import datetime

from os.path import isfile, join

dir_path = os.path.dirname(os.path.realpath(__file__))
data_dir = "{d}/data/orgs/".format(d=dir_path)
logo_dir = "{d}/data/logos/".format(d=dir_path)
removable_files = []
no_cd_files = []
downloaded_orgs = []


# loop through all orgs
# if file is modified in last 20 mins 
# download the logo with a new name (<id> _org_log)




for root, dirs, files in os.walk(data_dir):
    for filename in files:
        if not filename.endswith(".json"):
            continue
        
        full_path = '{d}{f}'.format(d=data_dir, f=filename)
        rewrite = False
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
            org_id = details.get('id')

            has_services = True if len(details.get('services', [])) > 0 else False
            has_cd = True if len(details.get('contact_details', [])) > 0 else False
            org_logo = details.get('logo_url')

            if org_logo:
                file_name, file_ext = os.path.splitext(org_logo)
                org_logo_filename = u"{l}{id}_org_logo{e}".format(l=logo_dir, id=org_id, e=file_ext)
                if not os.path.exists(org_logo_filename):
                    with open(org_logo_filename, 'w+'):
                        pass
                urllib.urlretrieve(org_logo, org_logo_filename)

            
            for service in details.get('services', []):
                services_in_detail = service.get('services', [])
                for service_detail in services_in_detail:
                    ser_id = service_detail.get('id')
                    service_logo = service_detail.get('logo_url')
                    service_detail['service_flow_steps'] = []
                    rewrite = True
                    # if service_detail.get('service_flow_steps'):
                    #     service_detail.update({
                    #         'service_flow_steps': []
                    #     })
                    #     rewrite = True
                    
                    if not service_logo:
                        continue

                    # file_name, file_ext = os.path.splitext(service_logo)
                    # ser_log_filename = u"{l}{id}_ser_logo{e}".format(
                    #     l=logo_dir, id=ser_id, e=file_ext)
                    
                    # if not os.path.exists(ser_log_filename):
                    #     with open(ser_log_filename, 'w+'):
                    #         pass
                    # urllib.urlretrieve(service_logo, ser_log_filename)

            if has_services and not has_cd:
                no_cd_files.append(full_path)
            
            if not all([has_services, has_cd]):
                removable_files.append(full_path)
        
        print rewrite
        if rewrite:
            with open(full_path, 'w') as the_file:
                the_file.write(json.dumps(data))



fncd = open("no_cd.txt", "w")
fncd.write(str(no_cd_files))
fnser = open("no_cd_ser.txt", "w")
fnser.write(str(removable_files))

for rem in removable_files:
    try:
        os.remove(rem)
    except:
        pass
            
        

