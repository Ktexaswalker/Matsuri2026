import os
import zipfile
import base64
import re
from collections import defaultdict
import ast

def b64_encode(value):
    return base64.b64encode(value.encode()).decode()

def encode_with_counter(counter, value):
    return b64_encode(f"{counter}:{value}")

def read_txt_from_zip(zip_path, suffix):
    with zipfile.ZipFile(zip_path) as z:
        for name in z.namelist():
            if name.endswith(suffix):
                with z.open(name) as f:
                    return f.read().decode("utf-8").splitlines()
    return []

def extract_role(lines):
    for line in lines:
        if line.strip().startswith("rol:"):
            return re.search(r'rol:"(.+?)"', line).group(1)
    return "unknown"

def codificarPartes(words):
    return words.encode().decode()

def parse_fields(lines):
    data = {}
    for line in lines:
        if ":" in line and line != lines[0]:
            key, val = line.split(":", 1)
            if val.startswith("'{") and val.endswith("'"):
                val = val[1:-1]
            data[key.strip()] = val
        if "[".strip(" ") in line and "]".strip(" ") in line:
            words = re.findall(r"'([^']*)'", val)
            print("words",words)
            codificarPartes(words)
    return data

roles = defaultdict(list)

for zip_name in os.listdir():
    if not zip_name.endswith(".zip"):
        continue

    original = read_txt_from_zip(zip_name, "_original.txt")
    base64v = read_txt_from_zip(zip_name, "_base64.txt")

    role = extract_role(original)
    roles[role].append((zip_name, original, base64v))

for role, entries in roles.items():
    entries.sort(key=lambda x: x[0][0].lower())
    counter = 1
    output = []
    output.append(f"const {role} = {{")

    for zip_name, orig_lines, b64_lines in entries:
        orig = parse_fields(orig_lines)
        b64d = parse_fields(b64_lines)

        print("lineasCod: ", b64d)
        output.append(f"  {counter}: {{")

        for key in b64d:
            if key == "id":
                encoded_id = b64_encode(str(counter))
                output.append(f'    id:"{encoded_id}",')
            elif key == "name":
                encoded_name = b64_encode(str(b64d[key]))
                output.append(f'    name:"{encoded_name}",')
            elif key == "rol":
                encoded_rol = b64_encode(str(b64d[key]))
                output.append(f'    rol:"{encoded_rol}",')
            elif key == "descripcion":
                encoded_descripcion = b64_encode(str(b64d[key]))
                output.append(f'    descripcion:"{encoded_descripcion}",')
            elif key == "links":
                encoded_links = b64_encode(str(b64d[key]))
                output.append(f'    links:"{encoded_links}",')
            elif key == "trabajos":
                encoded_trabajos = b64_encode(str(b64d[key]))
                output.append(f'    trabajos:"{encoded_trabajos}",')
            elif key == "tags":
                # print("tags: ",orig[key])
                encoded_tags = b64_encode(str(b64d[key]))
                output.append(f'    tags:"{encoded_tags}",')
            # else:
            #     val = b64d[key]
            #     if key in orig and orig[key] != val:
            #         val = encode_with_counter(counter, val.strip('"'))
            #     elif val != b64d[key]:
            #         output.append(val)
            #     output.append(f'    {key}:{orig[key]}')
            #     output.append(f'    {key}:"{val}",')

        output.append("  },")
        counter += 1

    output.append("};")

    with open(f"{role}.js", "w", encoding="utf-8") as f:
        f.write("\n".join(output))

print("✔ Procesamiento completado")
