
import { HelpCircle, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="text-center mb-12">
        <HelpCircle className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-4xl font-bold tracking-tight mb-4">Rhythmic Stream Support</h1>
        <p className="text-xl text-muted-foreground">
          We&apos;re here to help! Find answers to common questions or get in touch with our support team.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="rounded-lg border p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-accent"/>
            FAQ & Help Articles
          </h2>
          <p className="text-muted-foreground mb-4">
            Browse our frequently asked questions and help guides for quick answers.
          </p>
          <Button asChild variant="outline">
            <Link href="/faq">Visit FAQ</Link> 
          </Button>
        </div>
        <div className="rounded-lg border p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <Mail className="h-6 w-6 text-accent"/>
            Contact Us
          </h2>
          <p className="text-muted-foreground mb-4">
            Can&apos;t find what you&apos;re looking for? Send us a message.
          </p>
          <Button asChild>
            <Link href="#contact-form">Send a Message</Link>
          </Button>
        </div>
      </div>

      <div id="contact-form" className="rounded-lg border p-8 shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Send Us a Message</h2>
        <form className="space-y-6">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" placeholder="John Doe" className="mt-1"/>
          </div>
          <div>
            <Label htmlFor="email">Your Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1"/>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Issue with my playlist" className="mt-1"/>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Describe your issue or question in detail..." rows={5} className="mt-1"/>
          </div>
          <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
        </form>
      </div>
      <p className="mt-8 text-xs text-muted-foreground text-center">
        This is a placeholder page. Support systems are not yet fully implemented.
      </p>
    </div>
  );
}
