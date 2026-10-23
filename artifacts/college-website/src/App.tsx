import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { Layout } from '@/components/layout';
import Home from '@/pages/home';
import Admissions from '@/pages/admissions';
import Disclosure from '@/pages/disclosure';
import { Pharmacy, Engineering, Polytechnic } from '@/pages/institution';
import { About, Administration, Research, StudentLife, Committees, Notices, Gallery, Contact, NotFoundPage } from '@/pages/info';

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/pharmacy" component={Pharmacy} />
          <Route path="/engineering" component={Engineering} />
          <Route path="/polytechnic" component={Polytechnic} />
          <Route path="/admissions" component={Admissions} />
          <Route path="/about" component={About} />
          <Route path="/administration" component={Administration} />
          <Route path="/research" component={Research} />
          <Route path="/student-life" component={StudentLife} />
          <Route path="/campus-life" component={StudentLife} />
          <Route path="/committees" component={Committees} />
          <Route path="/notices" component={Notices} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/disclosure" component={Disclosure} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFoundPage} />
        </Switch>
      </RoutedErrorBoundary>
    </Layout>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
