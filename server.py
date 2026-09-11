import http.server
import json
import os

PORT = 8000
BACKUP_DIR = "backups"

class DevOpsHandler(http.server.SimpleHTTPRequestHandler):
    # ⚡ SPEED FIX: Disables reverse DNS lookup (stops the 3-second lag on Linux)
    def address_string(self):
        return self.client_address[0]

    def do_POST(self):
        if self.path == "/api/backup":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length).decode("utf-8")
            
            try:
                data = json.loads(body)
                company_key = data.get("company_key", "backup")
                filename = f"{company_key}-devops-sprint.json"
                
                os.makedirs(BACKUP_DIR, exist_ok=True)
                filepath = os.path.join(BACKUP_DIR, filename)
                
                formatted = json.dumps(data, indent=2)
                
                # Change Detection: Stop immediately if content hasn't changed
                if os.path.exists(filepath):
                    with open(filepath, "r", encoding="utf-8") as f:
                        if f.read() == formatted:
                            self._respond(200, {"status": "no_change", "file": filepath})
                            return

                # Overwrite the file directly
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(formatted)
                
                self._respond(200, {"status": "saved", "file": filepath})
            except Exception as e:
                self._respond(500, {"error": str(e)})
        else:
            self.send_error(404, "Not Found")

    def _respond(self, code, payload):
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode("utf-8"))

# Allows restarting server.py immediately without "Address already in use" errors
http.server.HTTPServer.allow_reuse_address = True

print(f"🚀 DevOps Sprint Hub running on http://127.0.0.1:{PORT}")
print(f"📁 Auto-backups configured for folder: ./{BACKUP_DIR}/")
http.server.HTTPServer(("0.0.0.0", PORT), DevOpsHandler).serve_forever()