import { createContactDraft } from "@/backend/supabase/create_ids";
import Contact from "@/components/v4/Contact";

export const ContactServer = async () => {
    const id = await createContactDraft();
    return <Contact id={id} />;
}