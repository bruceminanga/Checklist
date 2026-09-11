


## ⚡ Quickstart

### Step 1: Run the Local Server

Choose **one** of the options below to serve the application locally:

#### Option A: Using Python's Built-in Server (Fastest)
```bash
python3 -m http.server 8000
```

#### Option B: Using the Custom Server Script
```bash
python3 server.py
```

Once the server is running, open your browser and visit:
👉 **[http://localhost:8000](http://localhost:8000)**

---

### Step 2: Generate a Public Link (Optional)

To share the application over the internet without configuring router port-forwarding or setting up a reverse proxy, open a **second terminal window** and run:

```bash
ssh -R 80:localhost:8000 nokey@localhost.run
```

> **📌 How it works:**  
> `localhost.run` establishes a secure SSH tunnel to your local machine and generates a public HTTPS URL (e.g., `https://your-domain.lhr.life`). Anyone with the link can view your local instance.

---





