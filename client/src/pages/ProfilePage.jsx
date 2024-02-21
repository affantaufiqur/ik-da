import { useLoaderData } from "react-router-dom";

export default function ProfilePage() {
  const data = useLoaderData();
  return (
    <main className="px-4 md:px-12">
      <h1 className="font-dm-display text-2xl font-medium">{data.user.name}</h1>
      <section className="flex flex-col space-y-4">
        {/* Work */}
        <div></div>
        {/* Bookmarks */}
        <div></div>
      </section>
    </main>
  );
}
