import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

export function AgenticMode() {
  // Basic SEO for this page (no external deps)
  useEffect(() => {
    const title = "Agentic Mode – Coming in v3";
    const description = "Agentic Mode brings autonomous job search workflows. Coming in version 3.";
    document.title = title;

    const ensureMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    ensureMeta("description", description);

    // Canonical
    let linkEl = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = document.createElement("link");
      linkEl.setAttribute("rel", "canonical");
      document.head.appendChild(linkEl);
    }
    linkEl.setAttribute("href", window.location.origin + "/agentic-mode");
  }, []);

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-heading font-bold">Agentic Mode</h1>
        <p className="text-muted-foreground mt-1">Autonomous workflows to accelerate your job hunt.</p>
      </header>

      <main>
        <section aria-labelledby="agentic-overview">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" aria-hidden="true" />
                <CardTitle id="agentic-overview">Agentic Mode</CardTitle>
              </div>
              <Badge variant="secondary">v3</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Agentic Mode is under active development and will launch in version 3.
                It will orchestrate multi-step job search tasks like parsing job posts,
                tailoring resumes, drafting outreach, and tracking follow-ups—autonomously.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/subscription" aria-label="Subscribe to get notified about Agentic Mode">
                    Get notified
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/ai-assistant">Try AI Assistant</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
