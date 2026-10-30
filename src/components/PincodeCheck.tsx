"use client";

import { useState } from "react";

export default function PincodeCheck() {
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");
  const [valid, setValid] = useState(true);

  function check() {
    if (!/^[1-9]\d{5}$/.test(pin)) {
      setValid(false);
      setMsg("Enter a valid 6-digit pincode.");
      return;
    }
    setValid(true);
    // Demo only: no real serviceability data behind this.
    const eta = new Date(Date.now() + (3 + (Number(pin) % 3)) * 86_400_000);
    const day = eta.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
    setMsg(`Delivery by ${day} · Free · Cash on delivery available (demo)`);
  }

  return (
    <div>
      <label htmlFor="pin" className="text-sm font-bold">Check delivery</label>
      <div className="mt-1 flex max-w-sm gap-2">
        <input
          id="pin"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Enter pincode"
          className="w-full rounded-lg border border-line bg-bg px-3 py-2"
        />
        <button type="button" onClick={check} className="rounded-lg border border-accent px-4 font-bold text-accent">
          Check
        </button>
      </div>
      {msg ? (
        <p role="status" className={`mt-2 text-sm font-medium ${valid ? "text-good" : "text-red-700"}`}>{msg}</p>
      ) : null}
    </div>
  );
}
