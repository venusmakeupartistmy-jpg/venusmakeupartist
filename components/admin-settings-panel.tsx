"use client";

import { useState } from "react";
import {
  ADMIN_API_LOGIN_PATH,
  ADMIN_LOGIN_PATH,
} from "@/lib/admin-path";
import { packagesByCategory, type WebsitePackage } from "@/lib/website-packages";

type Props = {
  services: string[];
  whatsappNumber: string;
  websitePackages: WebsitePackage[];
  onServicesUpdated: (services: string[]) => void;
  onWhatsAppUpdated: (whatsappNumber: string) => void;
  onWebsitePackagesUpdated: (websitePackages: WebsitePackage[]) => void;
};

export function AdminSettingsPanel({
  services,
  whatsappNumber,
  websitePackages,
  onServicesUpdated,
  onWhatsAppUpdated,
  onWebsitePackagesUpdated,
}: Props) {
  const [open, setOpen] = useState(false);
  const [draftServices, setDraftServices] = useState<string[]>(services);
  const [draftWhatsApp, setDraftWhatsApp] = useState(whatsappNumber);
  const [draftWebsitePackages, setDraftWebsitePackages] =
    useState<WebsitePackage[]>(websitePackages);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [savingServices, setSavingServices] = useState(false);
  const [savingWhatsApp, setSavingWhatsApp] = useState(false);
  const [savingWebsitePackages, setSavingWebsitePackages] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  function openPanel() {
    setDraftServices(services);
    setDraftWhatsApp(whatsappNumber);
    setDraftWebsitePackages(websitePackages);
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

  function updateWebsitePackage(
    id: string,
    field: keyof Pick<WebsitePackage, "title" | "description" | "priceLabel">,
    value: string,
  ) {
    setDraftWebsitePackages((current) =>
      current.map((pkg) => (pkg.id === id ? { ...pkg, [field]: value } : pkg)),
    );
  }

  async function saveWebsitePackages() {
    setSavingWebsitePackages(true);
    setMessage("");
    setError("");

    const response = await fetch("/api/settings", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ websitePackages: draftWebsitePackages }),
    });

    setSavingWebsitePackages(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not save website packages.");
      return;
    }

    const data = (await response.json()) as { websitePackages: WebsitePackage[] };
    onWebsitePackagesUpdated(data.websitePackages);
    setDraftWebsitePackages(data.websitePackages);
    setMessage("Website packages updated.");
  }

  function renderPackageFields(
    label: string,
    packages: WebsitePackage[],
  ) {
    return (
      <div className="mt-6 space-y-4">
        <p className="text-xs tracking-[0.15em] text-rose-700 uppercase">{label}</p>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-xl border border-rose-100 bg-rose-50/40 p-4"
          >
            <label className="block text-sm">
              <span className="mb-2 block font-medium text-rose-950">Package name</span>
              <input
                value={pkg.title}
                onChange={(event) =>
                  updateWebsitePackage(pkg.id, "title", event.target.value)
                }
                className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
              />
            </label>
            <label className="mt-3 block text-sm">
              <span className="mb-2 block font-medium text-rose-950">Description</span>
              <textarea
                value={pkg.description}
                onChange={(event) =>
                  updateWebsitePackage(pkg.id, "description", event.target.value)
                }
                rows={3}
                className="w-full resize-y rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
              />
            </label>
            <label className="mt-3 block text-sm">
              <span className="mb-2 block font-medium text-rose-950">Price label</span>
              <input
                value={pkg.priceLabel}
                onChange={(event) =>
                  updateWebsitePackage(pkg.id, "priceLabel", event.target.value)
                }
                placeholder="From RM 450"
                className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
              />
            </label>
          </div>
        ))}
      </div>
    );
  }

  const { bridal, event } = packagesByCategory(draftWebsitePackages);

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

  async function saveWhatsApp() {
    setSavingWhatsApp(true);
    setMessage("");
    setError("");

    const response = await fetch("/api/settings", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whatsappNumber: draftWhatsApp }),
    });

    setSavingWhatsApp(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not save WhatsApp number.");
      return;
    }

    const data = (await response.json()) as { whatsappNumber: string };
    onWhatsAppUpdated(data.whatsappNumber);
    setDraftWhatsApp(data.whatsappNumber);
    setMessage("WhatsApp number updated.");
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
        aria-label="Settings"
        title="Settings"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rose-200 text-rose-900 transition hover:bg-rose-50 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="hidden text-sm sm:inline">Settings</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/40 p-0 sm:items-center sm:p-4 sm:py-8">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] border border-rose-100 bg-white p-4 shadow-2xl sm:rounded-[2rem] sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-700 sm:text-sm">
                  Settings
                </p>
                <h2 className="mt-2 font-serif text-2xl text-rose-950 sm:text-3xl">
                  Dashboard preferences
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 rounded-full border border-rose-200 px-3 py-1 text-sm text-rose-800"
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
                  <div key={`service-${index}`} className="flex flex-col gap-2 sm:flex-row">
                    <input
                      value={service}
                      onChange={(event) => updateService(index, event.target.value)}
                      className="min-w-0 flex-1 rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
                      placeholder="Service name"
                    />
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      disabled={draftServices.length <= 1}
                      className="rounded-xl border border-rose-200 px-4 py-3 text-sm text-rose-800 disabled:opacity-40 sm:shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={addService}
                  className="w-full rounded-xl border border-rose-200 px-4 py-3 text-sm text-rose-900 sm:w-auto"
                >
                  Add service
                </button>
                <button
                  type="button"
                  onClick={() => void saveServices()}
                  disabled={savingServices}
                  className="w-full rounded-xl bg-rose-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-60 sm:w-auto"
                >
                  {savingServices ? "Saving..." : "Save service names"}
                </button>
              </div>
            </section>

            <section className="mt-10 border-t border-rose-100 pt-8">
              <h3 className="font-serif text-2xl text-rose-950">Website packages</h3>
              <p className="mt-1 text-sm text-rose-800/70">
                Edit the package names, descriptions, and prices shown on your public
                homepage.
              </p>

              {renderPackageFields("Bridal packages", bridal)}
              {renderPackageFields("Event packages", event)}

              <button
                type="button"
                onClick={() => void saveWebsitePackages()}
                disabled={savingWebsitePackages}
                className="mt-6 w-full rounded-xl bg-rose-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-60 sm:w-auto"
              >
                {savingWebsitePackages ? "Saving..." : "Save website packages"}
              </button>
            </section>

            <section className="mt-10 border-t border-rose-100 pt-8">
              <h3 className="font-serif text-2xl text-rose-950">WhatsApp number</h3>
              <p className="mt-1 text-sm text-rose-800/70">
                Shown on your public website for booking enquiries. Use country
                code without + (e.g. 60123456789). Leave blank to hide the button.
              </p>

              <label className="mt-4 block text-sm">
                <span className="mb-2 block font-medium text-rose-950">Number</span>
                <input
                  value={draftWhatsApp}
                  onChange={(event) => setDraftWhatsApp(event.target.value)}
                  className="w-full rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="60123456789"
                  inputMode="tel"
                />
              </label>

              <button
                type="button"
                onClick={() => void saveWhatsApp()}
                disabled={savingWhatsApp}
                className="mt-4 w-full rounded-xl bg-rose-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-60 sm:w-auto"
              >
                {savingWhatsApp ? "Saving..." : "Save WhatsApp number"}
              </button>
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
                className="mt-4 w-full rounded-xl bg-rose-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-60 sm:w-auto"
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
