"use client";

import { useState } from "react";
import {
  ADMIN_API_LOGIN_PATH,
  ADMIN_LOGIN_PATH,
} from "@/lib/admin-path";

type Props = {
  services: string[];
  onServicesUpdated: (services: string[]) => void;
};

export function AdminSettingsPanel({ services, onServicesUpdated }: Props) {
  const [open, setOpen] = useState(false);
  const [draftServices, setDraftServices] = useState<string[]>(services);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [savingServices, setSavingServices] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  function openPanel() {
    setDraftServices(services);
    setOpen(true);
    setMessage("");
    setError("");
  }

  function updateService(index: number, value: string) {
    setDraftServices((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  }

  function addService() {
    setDraftServices((current) => [...current, ""]);
  }

  function removeService(index: number) {
    setDraftServices((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function saveServices() {
    setSavingServices(true);
    setMessage("");
    setError("");

    const response = await fetch("/api/settings", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ services: draftServices }),
    });

    setSavingServices(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not save service names.");
      return;
    }

    const data = (await response.json()) as { services: string[] };
    onServicesUpdated(data.services);
    setDraftServices(data.services);
    setMessage("Service names updated.");
  }

  async function savePassword() {
    setSavingPassword(true);
    setMessage("");
    setError("");

    if (newPassword.length < 8) {
      setSavingPassword(false);
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setSavingPassword(false);
      setError("New passwords do not match.");
      return;
    }

    const response = await fetch("/api/settings/password", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    if (!response.ok) {
      setSavingPassword(false);
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not change password.");
      return;
    }

    setSavingPassword(false);
    setOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    await fetch(ADMIN_API_LOGIN_PATH, { method: "DELETE", credentials: "include" });
    window.location.href = `${ADMIN_LOGIN_PATH}?passwordUpdated=1`;
  }

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        className="rounded-full border border-rose-200 px-4 py-2 text-sm text-rose-900 transition hover:bg-rose-50"
      >
        Settings
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/40 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-rose-100 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-rose-700">
                  Settings
                </p>
                <h2 className="mt-2 font-serif text-3xl text-rose-950">
                  Dashboard preferences
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-rose-200 px-3 py-1 text-sm text-rose-800"
              >
                Close
              </button>
            </div>

            {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
            {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}

            <section className="mt-8">
              <h3 className="font-serif text-2xl text-rose-950">Service names</h3>
              <p className="mt-1 text-sm text-rose-800/70">
                Update the preset services shown when recording a sale.
              </p>

              <div className="mt-4 space-y-3">
                {draftServices.map((service, index) => (
                  <div key={`service-${index}`} className="flex gap-2">
                    <input
                      value={service}
                      onChange={(event) => updateService(index, event.target.value)}
                      className="flex-1 rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
                      placeholder="Service name"
                    />
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      disabled={draftServices.length <= 1}
                      className="rounded-xl border border-rose-200 px-4 py-3 text-sm text-rose-800 disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={addService}
                  className="rounded-xl border border-rose-200 px-4 py-3 text-sm text-rose-900"
                >
                  Add service
                </button>
                <button
                  type="button"
                  onClick={() => void saveServices()}
                  disabled={savingServices}
                  className="rounded-xl bg-rose-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                  {savingServices ? "Saving..." : "Save service names"}
                </button>
              </div>
            </section>

            <section className="mt-10 border-t border-rose-100 pt-8">
              <h3 className="font-serif text-2xl text-rose-950">Change password</h3>
              <p className="mt-1 text-sm text-rose-800/70">
                Use your current login password, then choose a new one with at
                least 8 characters. You will be signed out to confirm the new
                password works.
              </p>

              <div className="mt-4 grid gap-4">
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-rose-950">
                    Current password
                  </span>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    className="w-full rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-rose-950">
                    New password
                  </span>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="w-full rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-rose-950">
                    Confirm new password
                  </span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={() => void savePassword()}
                disabled={savingPassword}
                className="mt-4 rounded-xl bg-rose-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
              >
                {savingPassword ? "Updating..." : "Update password"}
              </button>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
