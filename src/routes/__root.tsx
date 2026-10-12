import { Link, Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { primaryClass, secondaryClass } from "@/components/site/ui";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DEMO Hospital" },
      {
        name: "description",
        content:
          "DEMO Hospital is a private hospital in West Bengal. This website is a working draft. Clinical details appear only when the hospital confirms them.",
      },
      { name: "theme-color", content: "#f4efe6" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Outfit:wght@300;400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-clip bg-ivory font-sans text-ink antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-chalk focus:px-4 focus:py-3"
          >
            Skip to content
          </a>
          <Header />
          <Outlet />
          <Footer />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 py-24">
      <p className="text-xs font-medium uppercase tracking-brand text-sage-deep">404</p>
      <h1 className="mt-4 font-display text-5xl leading-display text-ink">This page is not part of the hospital site.</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        The address may be mistyped, or the page has not been published. Nothing medical is missing from this screen.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className={primaryClass}>
          Return home
        </Link>
        <Link to="/contact" className={secondaryClass}>
          Contact
        </Link>
      </div>
    </main>
  );
}
