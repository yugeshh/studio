
import { Gem } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PremiumPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
      <Gem className="mx-auto h-16 w-16 text-primary mb-6" />
      <h1 className="text-4xl font-bold tracking-tight mb-4">Unlock Rhythmic Stream Premium</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Experience ad-free music, offline downloads, and high-quality audio.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="rounded-lg border p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Monthly</h2>
          <p className="text-4xl font-bold mb-1">$9.99<span className="text-lg text-muted-foreground">/month</span></p>
          <p className="text-sm text-muted-foreground mb-4">Billed monthly. Cancel anytime.</p>
          <Button size="lg" className="w-full">Get Premium Monthly</Button>
        </div>
        <div className="rounded-lg border p-6 shadow-lg bg-secondary/30 relative">
           <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            Best Value
          </div>
          <h2 className="text-2xl font-semibold mb-2">Annually</h2>
          <p className="text-4xl font-bold mb-1">$99.99<span className="text-lg text-muted-foreground">/year</span></p>
          <p className="text-sm text-muted-foreground mb-4">Save 16% compared to monthly.</p>
          <Button size="lg" className="w-full">Get Premium Annually</Button>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Premium Features:</h3>
      <ul className="list-disc list-inside text-left max-w-md mx-auto text-muted-foreground space-y-1">
        <li>Ad-free listening</li>
        <li>Download music and listen offline</li>
        <li>Play songs in any order</li>
        <li>High-quality audio streaming</li>
        <li>Early access to new features</li>
      </ul>
       <p className="mt-8 text-xs text-muted-foreground">
        This is a placeholder page. Premium features are not yet implemented.
      </p>
    </div>
  );
}
