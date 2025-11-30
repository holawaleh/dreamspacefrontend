"use client"

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare as FeedbackIcon } from "lucide-react";
import { toast } from "sonner";

export default function FeedbackPanel() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!text.trim()) return toast.error("Please add some feedback before sending");
    setLoading(true);
    try {
      const res = await fetch('/api/admin/note', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: text }) });
      if (!res.ok) throw new Error('Failed to send');
      setText("");
      toast.success('Feedback submitted — thanks!');
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Submission failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="fixed right-4 bottom-8 z-50">
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full border shadow-lg bg-gradient-to-br from-primary/80 to-accent/80 text-white p-3">
              <FeedbackIcon className="w-5 h-5" />
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent side="right" className="w-[380px] sm:w-[420px]">
          <h3 className="text-xl font-semibold mb-2">Send Feedback</h3>
          <p className="text-sm text-muted-foreground mb-4">Share your thoughts, bugs or feature ideas — the team will receive this note.</p>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What would you like to tell us?" className="h-40 mb-4" />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={submit} className="bg-primary" disabled={loading}>{loading ? 'Sending...' : 'Send feedback'}</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
