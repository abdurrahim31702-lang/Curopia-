import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/site/wordmark";
import { primaryClass } from "@/components/site/ui";

const links = [
  { to: "/about", label: "About", exact: true },
  { to: "/departments", label: "Departments", exact: false },
  { to: "/doctors", label: "Doctors", exact: false },
  { to: "/services", label: "Services", exact: true },
  { to: "/gallery", label: "Gallery", exact: true },
  { to: "/contact", label: "Contact", exact: true },
] as const;

export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-md">
      <p className="border-b border-line px-5 py-2 text-center text-xs leading-relaxed text-ink-soft sm:px-8">
        Working draft. Contact details, departments, and clinical facts are placeholders until the hospital confirms them.
      </p>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 sm:px-8">
        <Link to="/" aria-label="DEMO Hospital, home" className="mr-auto">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="text-sm text-ink data-[status=active]:text-sage-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="min-h-11 px-2 text-sm text-ink"
          onClick={() => setEmergencyOpen(true)}
        >
          Emergency
        </button>
        <Link to="/appointments" className={`${primaryClass} hidden sm:inline-flex`}>
          <span className="lg:hidden">Enquire</span>
          <span className="hidden lg:inline">Request an appointment</span>
        </Link>
        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger className="inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden" aria-label="Open menu">
            <Menu className="size-5" aria-hidden="true" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-chalk px-6 py-6 outline-none">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-2xl text-ink">Menu</Dialog.Title>
                <Dialog.Close className="inline-flex min-h-11 min-w-11 items-center justify-center" aria-label="Close menu">
                  <X className="size-5" aria-hidden="true" />
                </Dialog.Close>
              </div>
              <nav className="mt-8 flex flex-col" aria-label="Mobile">
                {links.map((item) => (
                  <Link key={item.to} to={item.to} className="border-b border-line py-4 text-lg text-ink">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link to="/appointments" className={`${primaryClass} mt-8`}>
                Request an appointment
              </Link>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <Dialog.Root open={emergencyOpen} onOpenChange={setEmergencyOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,32rem)] -translate-x-1/2 -translate-y-1/2 bg-chalk p-6 outline-none sm:p-8">
            <Dialog.Title className="font-display text-3xl leading-display text-ink">Emergency contact</Dialog.Title>
            <Dialog.Description className="mt-4 text-base leading-relaxed text-ink-soft">
              DEMO Hospital has not published an emergency telephone number. This button does not place a call.
            </Dialog.Description>
            <p className="mt-4 text-base leading-relaxed text-ink">
              If this is a medical emergency, contact local emergency services. Do not use the appointment form, and do not wait on this website.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Dialog.Close className={primaryClass}>Close</Dialog.Close>
              <Link to="/contact" className="inline-flex min-h-11 items-center px-2 text-sm text-ink underline" onClick={() => setEmergencyOpen(false)}>
                Contact page
              </Link>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
