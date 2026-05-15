import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-surface-dark text-ink font-display text-2xl rounded-pill px-6 py-3 bg-brand-purple">
        Token test
      </div>
      <Button variant="outline">Button</Button>
    </div>
  );
}

export default App;
