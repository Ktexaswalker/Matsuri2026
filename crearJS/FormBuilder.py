import tkinter as tk
from tkinter import filedialog, messagebox
import base64
import zipfile
import os

MAX_NAME = 40
MAX_DESC = 255
MAX_TRAB = 100
MAX_LINKS = 5
MAX_TAGS = 5
MAX_IMG_SIZE = 500 * 1024  # 500 KB

TAG_OPCIONES = ["Logistics", "Entrance", "Information", "Children",
    "Catering", "Drinks", "Marketing", "SocialMedia", "Design",
    "Web", "Photography", "Video", "Security", "FirstAid", "Crowdfunding",
    "Yukata", "Info area"
]
ROL_OPCIONES = [
    "Volunteer", "Artist", "Vendor", "Sponsor", "Staff", "Organization"
]

def b64(text):
    return base64.b64encode(text.encode("utf-8")).decode("utf-8")

class App:
    def __init__(self, root):
        self.root = root
        root.title("FormBuilder")

        self.links = []
        self.tags = []
        self.image_path = None

        tk.Label(root, text="Name").pack()
        self.name = tk.Entry(root)
        self.name.pack()

        tk.Label(root, text="Description").pack()
        self.descrip = tk.Text(root, height=4)
        self.descrip.pack()

        tk.Label(root, text="Role").pack()
        self.role = tk.StringVar(root)
        self.role.set(ROL_OPCIONES[0])
        tk.OptionMenu(root, self.role, *ROL_OPCIONES).pack()

        tk.Label(root, text="Job").pack()
        self.trabj = tk.Text(root, height=2)
        self.trabj.pack()

        tk.Label(root, text="Links").pack()
        self.link_entry = tk.Entry(root)
        self.link_entry.pack()
        tk.Button(root, text="Add link", command=self.add_link).pack()
        tk.Button(root, text="Delete link", command=self.delete_link).pack()

        self.links_label = tk.Label(root, text="")
        self.links_label.pack()

        tk.Label(root, text="Tags").pack()
        self.tag_var = tk.StringVar(root)
        self.tag_var.set(TAG_OPCIONES[0])
        tk.OptionMenu(root, self.tag_var, *TAG_OPCIONES).pack()
        tk.Button(root, text="Add tag", command=self.add_tag).pack()
        tk.Button(root, text="Delete tag", command=self.delete_tag).pack()

        self.tags_label = tk.Label(root, text="")
        self.tags_label.pack()

        tk.Button(root, text="Select PNG Image", command=self.select_image).pack()
        self.image_label = tk.Label(root, text="No image selected")
        self.image_label.pack()

        tk.Button(root, text="GUARDAR", command=self.save).pack(pady=10)

    def add_link(self):
        if len(self.links) >= MAX_LINKS:
            return
        link = self.link_entry.get().strip()
        if link:
            self.links.append(link)
            self.link_entry.delete(0, tk.END)
            self.links_label.config(text=", ".join(self.links))
    def delete_link(self):
        if (self.links):
            self.links.pop()
        self.links_label.config(text=self.links)

    def add_tag(self):
        if len(self.tags) >= MAX_TAGS:
            return
        tag = self.tag_var.get()
        if tag not in self.tags:
            self.tags.append(tag)
            self.tags_label.config(text=", ".join(self.tags))

    def delete_tag(self):
        if (self.tags):
            self.tags.pop()
        self.tags_label.config(text=self.tags)

    def select_image(self):
        path = filedialog.askopenfilename(filetypes=[("PNG Images", "*.png")])
        if not path:
            return
        if os.path.getsize(path) > MAX_IMG_SIZE:
            messagebox.showerror("Error", "Image exceeds 500 KB")
            return
        self.image_path = path
        self.image_label.config(text=os.path.basename(path))

    def save(self):
        name = self.name.get().strip()
        descrip = self.descrip.get("1.0", "end").strip()
        rol = self.role.get().strip()
        trabj = self.trabj.get("1.0", "end").strip()

        if not name or not self.image_path:
            messagebox.showerror("Error", "Name and image required")
            return

        id_b64 = b64("1")

        data_b64 = f'''1: {{
    id:"{id_b64}",
    name:"{b64(name)}",
    rol:"{b64(rol)}",
    descripcion:"{b64(descrip)}",
    links: [{", ".join(f'"{b64(l)}"' for l in self.links)}],
    trabajos:"{b64(trabj)}",
    tags: [{", ".join(f'"{b64(t)}"' for t in self.tags)}]
}}'''

        data_plain = f'''1: {{
    id:"1",
    name:"{name}",
    rol:"{rol}",
    descripcion:"{descrip}",
    links: {self.links},
    trabajos:"{trabj}",
    tags: {self.tags}
}}'''

        zip_name = f"{name}.zip"
        with zipfile.ZipFile(zip_name, "w") as z:
            z.write(self.image_path, f"{name}.png")
            z.writestr(f"{name}_base64.txt", data_b64)
            z.writestr(f"{name}_original.txt", data_plain)

        messagebox.showinfo("OK", f"Created {zip_name}")

root = tk.Tk()
app = App(root)
root.mainloop()
