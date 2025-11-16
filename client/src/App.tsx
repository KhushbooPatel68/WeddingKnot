import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Photos from "@/pages/Photos";
import Events from "@/pages/Events";
import Travel from "@/pages/Travel";
import ThingsToDo from "@/pages/ThingsToDo";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/photos" component={Photos} />
      <Route path="/events" component={Events} />
      <Route path="/travel" component={Travel} />
      <Route path="/things-to-do" component={ThingsToDo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
