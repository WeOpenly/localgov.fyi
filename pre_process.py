import os
import glob
import json
import urllib
import urllib2
from datetime import datetime

from os.path import isfile, join

dir_path = os.path.dirname(os.path.realpath(__file__))
DSP_HOST = os.getenv('DSP_HOST', 'http://127.0.0.1:8090')
YUSUF_HOST = os.getenv('YUSUF_HOST', 'http://127.0.0.1:8010')
token = os.getenv('DSP_TOKEN', '811')

org_data_dir = "{d}/data/orgs/".format(d=dir_path)
ser_data_dir = "{d}/data/sers/".format(d=dir_path)
rewrite_dir = "{d}/data/rewrites/".format(d=dir_path)
logo_dir = "{d}/data/logos/".format(d=dir_path)
service_glossary_dir = "{d}/data/service_glossary/".format(d=dir_path)
all_dir = "{d}/data/all_locations/".format(d=dir_path)

print(all_dir)

for directory in [org_data_dir, ser_data_dir, rewrite_dir, logo_dir, service_glossary_dir, all_dir]:

    if not os.path.exists(directory):
        os.makedirs(directory)

    for f in glob.glob(directory + '*.*'):
        os.remove(f)


# loop through all orgs
# if file is modified in last 20 mins
# download the logo with a new name (<id> _org_log)


# for root, dirs, files in os.walk(data_dir):
#     for filename in files:
#         if not filename.endswith(".json"):
#             continue

#         full_path = '{d}{f}'.format(d=data_dir, f=filename)
#         rewrite = False
#         with open(full_path) as f:
#             # time = os.path.getmtime(full_path)
#             # if datetime.fromtimestamp(time).date() < datetime.today().date():
#             #     removable_files.append(full_path)

#             data = json.load(f)
#             is_success = True if ('success' in data) and (data['success'] == True) else False
#             if not is_success:
#                 removable_files.append(full_path)
#                 continue

#             details = data['details']
#             org_id = details.get('id')

#             has_services = True if len(details.get('services', [])) > 0 else False
#             has_cd = True if len(details.get('contact_details', [])) > 0 else False
#             org_logo = details.get('logo_url')

#             if org_logo:
#                 file_name, file_ext = os.path.splitext(org_logo)
#                 org_logo_filename = u"{l}{id}_org_logo{e}".format(l=logo_dir, id=org_id, e=file_ext)
#                 if not os.path.exists(org_logo_filename):
#                     with open(org_logo_filename, 'w+'):
#                         pass
#                 urllib.urlretrieve(org_logo, org_logo_filename)


#             for service in details.get('services', []):
#                 services_in_detail = service.get('services', [])
#                 for service_detail in services_in_detail:
#                     ser_id = service_detail.get('id')
#                     service_logo = service_detail.get('logo_url')
#                     service_detail['service_flow_steps'] = []
#                     rewrite = True

#                     if not service_detail.get('delivery_enabled', False):
#                         service_detail.update({
#                             'delivery_enabled': False
#                         })
#                         rewrite = True

#                     if not service_detail.get('service_steps'):
#                         service_detail.update({
#                             'service_steps': []
#                         })
#                         rewrite = True
#                     # if service_detail.get('service_flow_steps'):
#                     #     service_detail.update({
#                     #         'service_flow_steps': []
#                     #     })
#                     #     rewrite = True

#                     if not service_logo:
#                         continue

#                     # file_name, file_ext = os.path.splitext(service_logo)
#                     # ser_log_filename = u"{l}{id}_ser_logo{e}".format(
#                     #     l=logo_dir, id=ser_id, e=file_ext)

#                     # if not os.path.exists(ser_log_filename):
#                     #     with open(ser_log_filename, 'w+'):
#                     #         pass
#                     # urllib.urlretrieve(service_logo, ser_log_filename)

#             if has_services and not has_cd:
#                 no_cd_files.append(full_path)

#             if not all([has_services, has_cd]):
#                 removable_files.append(full_path)

#         print rewrite
#         if rewrite:
#             with open(full_path, 'w') as the_file:
#                 the_file.write(json.dumps(data))


# fncd = open("no_cd.txt", "w")
# fncd.write(str(no_cd_files))
# fnser = open("no_cd_ser.txt", "w")
# fnser.write(str(removable_files))

# for rem in removable_files:
#     try:
#         os.remove(rem)
#     except:
#         pass


def get_orgs():
    print(DSP_HOST, token)
    res = urllib2.urlopen(
        '{h}/arthur/org_pages?token={t}'.format(h=DSP_HOST, t=token))
    response = json.load(res)
    org_rewrites_file = '{d}{o}.txt'.format(d=rewrite_dir, o='org_rewrites')

    if not os.path.exists(org_data_dir):
        os.makedirs(org_data_dir)

    rewrites_string = ''

    if response and 'success' in response:
        orgs = response.get('orgs')
        if not orgs:
            return

        for org in orgs:
            filename = org.get('id')
            full_path = '{d}{f}.json'.format(d=org_data_dir, f=filename)
            org_slug = org.get('url_slug')

            if filename and org_slug:
                new_string = "\norganization/{f}/     /organization/{s}/   301!".format(
                    f=filename, s=org_slug)
                rewrites_string = rewrites_string + new_string

            with open(full_path, 'w+') as f:
                json.dump(org, f)

            org_logo = org.get('logo_url')
            if not org_logo:
                continue

            file_name, file_ext = os.path.splitext(org_logo)
            org_logo_filename = u"{l}{id}_org_logo{e}".format(
                l=logo_dir, id=filename, e=file_ext)

            if not os.path.exists(org_logo_filename):
                with open(org_logo_filename, 'w+'):
                    pass

            urllib.urlretrieve(org_logo, org_logo_filename)

        if rewrites_string:
            with open('_redirects', 'a') as f:
                f.write(rewrites_string)


def get_services():
    res = urllib2.urlopen(
        '{h}/arthur/ser_pages?token={t}'.format(h=DSP_HOST, t=token))
    response = json.load(res)

    ser_rewrites_file = '{d}{o}.txt'.format(d=rewrite_dir, o='ser_rewrites')
    if not os.path.exists(ser_data_dir):
        os.makedirs(ser_data_dir)

    rewrites_string = ''
    if response and 'success' in response:
        sers = response.get('services')

        for ser in sers:
            filename = ser.get('service').get('id')
            if not filename:
                continue

            ser_slug = ser.get('service').get('url_slug')

            if filename and ser_slug:
                new_string = "\nservice/{f}/     /service/{s}/   301!".format(
                    f=filename, s=ser_slug)
                rewrites_string = rewrites_string + new_string

            full_path = '{d}{f}.json'.format(d=ser_data_dir, f=filename)

            with open(full_path, 'w+') as f:
                json.dump(ser, f)

            service_logo = ser.get('service').get('logo_url')
            # if not service_logo:
            continue

            file_name, file_ext = os.path.splitext(service_logo)
            ser_logo_filename = u"{l}{id}_ser_logo{e}".format(
                l=logo_dir, id=filename, e=file_ext)

            if not os.path.exists(ser_logo_filename):
                with open(ser_logo_filename, 'w+'):
                    pass
            urllib.urlretrieve(service_logo, ser_logo_filename)

        if rewrites_string:
            with open('_redirects', 'a') as f:
                f.write(rewrites_string)


def get_service_glossary_items():
    res = urllib2.urlopen(
        '{h}/arthur/service_glossary_overview?token={t}'.format(h=DSP_HOST, t=token))
    sg_items = json.load(res)
    if sg_items and 'success' in sg_items:
        items = sg_items.get('details')
        for item in items:
            serice_glossary_item_slug = item.get('service_name_slug')
            ser_glossary_item_file_name = u"{d}{n}.json".format(
                d=service_glossary_dir, n=serice_glossary_item_slug)
            with open(ser_glossary_item_file_name, 'w+') as file_to_write:
                json.dump(item, file_to_write)


def get_all_locations():
    res = urllib2.urlopen(
        '{h}/arthur/all_locations?token={t}'.format(h=DSP_HOST, t=token))
    orgs = json.load(res)
    all_orgs_file = u"{d}{n}.json".format(d=all_dir, n="orgs")
    items = orgs.get('details')

    if orgs and 'success' in orgs:
        with open(all_orgs_file, 'w+') as file_to_write:
            json.dump(orgs, file_to_write)


def write_standard_redirects():
    print(DSP_HOST, YUSUF_HOST)
    redirs = """/org_images/* http://storage.googleapis.com/evergov-dev3-dsp-uploads/organization_logo_uploads/:splat 200!
    
    /api/yusuf/* {y}/:splat 200!

/blog/* https://blogevergov.wordpress.com/:splat 200!

/api/dsp/* {d}/:splat 200!

https://evergov.netlify.com/* https://evergov.com/:splat 301!

http://evergov.netlify.com/* https://evergov.com/:splat 301!

/app/*  /app/auth/callback/  200
/app/*  /app/  200
/app/*  /app/profile/  200
/deep_link/*  /deep_link/  200
/search/*  /search/  200

""".format(y=YUSUF_HOST, d=DSP_HOST)
    print(redirs)
    with open('_redirects', 'w+') as f:
        f.write(redirs)


write_standard_redirects()
print("redirects done")
get_orgs()
print("orgs done")
get_services()
print("services done")
get_service_glossary_items()
print("service glossary pages done")
get_all_locations()
print("all locations done")
