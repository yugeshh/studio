
import { DownloadCloud, Laptop, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DownloadPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
      <DownloadCloud className="mx-auto h-16 w-16 text-primary mb-6" />
      <h1 className="text-4xl font-bold tracking-tight mb-4">Download Rhythmic Stream</h1>
      <p className="text-xl text-muted-foreground mb-10">
        Listen to your favorite music anytime, anywhere. Get the app for your device.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="rounded-lg border p-8 shadow-lg flex flex-col items-center">
          <Laptop className="h-12 w-12 text-accent mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Desktop App</h2>
          <p className="text-muted-foreground mb-6">
            Available for Windows and macOS.
          </p>
          <div className="space-x-3">
            <Button size="lg">Download for Windows</Button>
            <Button size="lg" variant="outline">Download for macOS</Button>
          </div>
        </div>
        <div className="rounded-lg border p-8 shadow-lg flex flex-col items-center">
          <Smartphone className="h-12 w-12 text-accent mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Mobile App</h2>
          <p className="text-muted-foreground mb-6">
            Get it on the App Store or Google Play.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="flex items-center gap-2">
              <Image src="https://placehold.co/24x24.png" alt="App Store" width={24} height={24} data-ai-hint="apple store" /> App Store
            </Button>
            <Button size="lg" variant="outline" className="flex items-center gap-2">
              <Image src="https://placehold.co/24x24.png" alt="Google Play" width={24} height={24} data-ai-hint="google play" /> Google Play
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">
        This is a placeholder page. Download links are not functional.
      </p>
    </div>
  );
}
