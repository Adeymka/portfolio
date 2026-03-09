import MessagesManager from "@/components/admin/MessagesManager";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Messages | Admin",
  description: "Messages du formulaire de contact",
};

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  let messages: { id: string; name: string; email: string; subject: string | null; message: string; is_read: boolean; created_at: string }[] = [];
  try {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    messages = (data ?? []) as typeof messages;
  } catch {
    messages = [];
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-bold text-fb-text">
          Messages
        </h1>
        <p className="text-sm text-fb-text-secondary">
          Admin / Messages du formulaire contact
        </p>
      </div>
      <MessagesManager initialMessages={messages} />
    </div>
  );
}
