"use client";

import { useState } from "react";

export default function ImportPage() {
  const [out, setOut] = useState<string>("");
  const [emailOverride, setEmailOverride] = useState("");
  const [passwordOverride, setPasswordOverride] = useState("");

  return (
    <div style={{ padding: 24 }}>
      <h1>Import Student</h1>
      <input type="email" placeholder="Email (optional)" value={emailOverride} onChange={e => setEmailOverride(e.target.value)} />
      <input type="password" placeholder="Password (optional)" value={passwordOverride} onChange={e => setPasswordOverride(e.target.value)} />
      <input type="file" accept=".json" onChange={async e => {
        const file = e.target.files?.[0];
        if (!file) return;
        const text = await file.text();
        const json = JSON.parse(text);
        const email = emailOverride || json.email;
        const password = passwordOverride || json.password;
        const res = await fetch('http://localhost:5009/api/students/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, student: json })
        });
        const data = await res.json();
        setOut(JSON.stringify(data, null, 2));
      }} />
      <pre>{out}</pre>
    </div>
  );
}
