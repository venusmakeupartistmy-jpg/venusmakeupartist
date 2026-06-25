import { AdminLoginForm } from "@/components/admin-login";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/admin") ? params.next : "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-rose-100 bg-white/85 p-8 shadow-xl shadow-rose-100/50">
        <p className="text-sm uppercase tracking-[0.2em] text-rose-700">
          Venus Admin
        </p>
        <h1 className="mt-3 font-serif text-3xl text-rose-950">Sign in</h1>
        <p className="mt-2 text-sm text-rose-800/70">
          Access your live sales ledger and record new bookings.
        </p>
        <div className="mt-8">
          <AdminLoginForm nextPath={nextPath} />
        </div>
      </div>
    </main>
  );
}
