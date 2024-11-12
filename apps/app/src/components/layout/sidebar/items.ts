import { Icons } from "@gigflow/ui/icons";
import { Gift, Globe, Key, ShieldCheck, Webhook } from "lucide-react";

export type NavItem = {
  name: string;
  icon: any;
  href: string;
  exact?: boolean;
};
export type BetaFeatures = "callink" | "referrals" | "webhooks";
export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      : "http://localhost:3000";
export const ITEMS: Record<
  string,
  {
    name?: string;
    items: (args: {
      slug: string;
      flags?: Record<BetaFeatures, boolean>;
    }) => NavItem[];
  }[]
> = {
  // Top-level
  default: [
    {
      items: ({ slug }) => [
        {
          name: "Home",
          icon: Icons.Hyperlink,
          href: `${APP_DOMAIN}${slug}`,
          exact: true,
        },
        {
          name: "Transactions",
          icon: Icons.LinesY,
          href: `${APP_DOMAIN}${slug}/transactions`,
        },
        {
          name: "Jobs",
          icon: Icons.CursorRays,
          href: `${APP_DOMAIN}${slug}/jobs`,
        },

        {
          name: "Timesheets",
          icon: Icons.Time,
          href: `${APP_DOMAIN}${slug}/tracker`,
        },
        {
          name: "Settings",
          icon: Icons.Gear,
          href: `${APP_DOMAIN}${slug}/settings/accounts`,
        },
      ],
    },
  ],

  // User Financials
  userFinancials: [
    {
      name: "Financials",
      items: () => [
        {
          name: "Transactions",
          icon: Icons.Gear2,
          href: "/financials/transactions",
          exact: true,
        },
      ],
    },
  ],

  // Workspace settings
  workspaceSettings: [
    {
      name: "Workspace",
      items: ({ slug, flags }) => [
        {
          name: "General",
          icon: Icons.Gear2,
          href: `/${slug}/settings`,
          exact: true,
        },
        {
          name: "Domains",
          icon: Globe,
          href: `/${slug}/settings/domains`,
        },
        {
          name: "Library",
          icon: Icons.Books2,
          href: `/${slug}/settings/library`,
        },
        {
          name: "Billing",
          icon: Icons.Receipt2,
          href: `/${slug}/settings/billing`,
        },
        {
          name: "People",
          icon: Icons.Users6,
          href: `/${slug}/settings/people`,
        },
        {
          name: "Integrations",
          icon: Icons.ConnectedDots,
          href: `/${slug}/settings/integrations`,
        },
        {
          name: "Security",
          icon: ShieldCheck,
          href: `/${slug}/settings/security`,
        },
        ...(flags?.referrals
          ? [
              {
                name: "Referrals",
                icon: Gift,
                href: `/${slug}/settings/referrals`,
              },
            ]
          : []),
      ],
    },
    {
      name: "Developer",
      items: ({ slug, flags }) => [
        {
          name: "API Keys",
          icon: Key,
          href: `/${slug}/settings/tokens`,
        },
        {
          name: "OAuth Apps",
          icon: Icons.CubeSettings,
          href: `/${slug}/settings/oauth-apps`,
        },
        ...(flags?.webhooks
          ? [
              {
                name: "Webhooks",
                icon: Webhook,
                href: `/${slug}/settings/webhooks`,
              },
            ]
          : []),
      ],
    },
    {
      name: "Account",
      items: ({ slug }) => [
        {
          name: "Notifications",
          icon: Icons.CircleInfo,
          href: `/${slug}/settings/notifications`,
        },
      ],
    },
  ],

  // User settings
  userSettings: [
    {
      name: "Account",
      items: () => [
        {
          name: "General",
          icon: Icons.Gear2,
          href: "/account/settings",
          exact: true,
        },
        {
          name: "Security",
          icon: ShieldCheck,
          href: "/account/settings/security",
        },
        {
          name: "API Keys",
          icon: Key,
          href: "/account/settings/tokens",
        },
      ],
    },
  ],
};

export const CLIENT_ITEMS: Record<
  string,
  {
    name?: string;
    items: (args: {
      slug: string;
      flags?: Record<BetaFeatures, boolean>;
    }) => NavItem[];
  }[]
> = {
  // Top-level
  default: [
    {
      items: ({ slug }) => [
        {
          name: "Home",
          icon: Icons.Hyperlink,
          href: `${APP_DOMAIN}${slug}`,
          exact: true,
        },
        {
          name: "Invoices",
          icon: Icons.LinesY,
          href: `${APP_DOMAIN}${slug}/invoices`,
        },
        {
          name: "Jobs",
          icon: Icons.CursorRays,
          href: `${APP_DOMAIN}${slug}/jobs`,
        },
        {
          name: "Transactions",
          icon: Icons.DollarSign,
          href: `${APP_DOMAIN}${slug}/transactions`,
        },
        {
          name: "Timesheets",
          icon: Icons.Time,
          href: `${APP_DOMAIN}${slug}/tracker`,
        },
        {
          name: "Settings",
          icon: Icons.Gear,
          href: `${APP_DOMAIN}${slug}/settings/accounts`,
        },
      ],
    },
  ],

  // User Financials
  userFinancials: [
    {
      name: "Financials",
      items: () => [
        {
          name: "Transactions",
          icon: Icons.Gear2,
          href: "/financials/transactions",
          exact: true,
        },
      ],
    },
  ],

  // Workspace settings
  workspaceSettings: [
    {
      name: "Workspace",
      items: ({ slug, flags }) => [
        {
          name: "General",
          icon: Icons.Gear2,
          href: `/${slug}/settings`,
          exact: true,
        },
        {
          name: "Domains",
          icon: Globe,
          href: `/${slug}/settings/domains`,
        },
        {
          name: "Library",
          icon: Icons.Books2,
          href: `/${slug}/settings/library`,
        },
        {
          name: "Billing",
          icon: Icons.Receipt2,
          href: `/${slug}/settings/billing`,
        },
        {
          name: "People",
          icon: Icons.Users6,
          href: `/${slug}/settings/people`,
        },
        {
          name: "Integrations",
          icon: Icons.ConnectedDots,
          href: `/${slug}/settings/integrations`,
        },
        {
          name: "Security",
          icon: ShieldCheck,
          href: `/${slug}/settings/security`,
        },
        ...(flags?.referrals
          ? [
              {
                name: "Referrals",
                icon: Gift,
                href: `/${slug}/settings/referrals`,
              },
            ]
          : []),
      ],
    },
    {
      name: "Developer",
      items: ({ slug, flags }) => [
        {
          name: "API Keys",
          icon: Key,
          href: `/${slug}/settings/tokens`,
        },
        {
          name: "OAuth Apps",
          icon: Icons.CubeSettings,
          href: `/${slug}/settings/oauth-apps`,
        },
        ...(flags?.webhooks
          ? [
              {
                name: "Webhooks",
                icon: Webhook,
                href: `/${slug}/settings/webhooks`,
              },
            ]
          : []),
      ],
    },
    {
      name: "Account",
      items: ({ slug }) => [
        {
          name: "Notifications",
          icon: Icons.CircleInfo,
          href: `/${slug}/settings/notifications`,
        },
      ],
    },
  ],

  // User settings
  userSettings: [
    {
      name: "Account",
      items: () => [
        {
          name: "General",
          icon: Icons.Gear2,
          href: "/account/settings",
          exact: true,
        },
        {
          name: "Security",
          icon: ShieldCheck,
          href: "/account/settings/security",
        },
        {
          name: "API Keys",
          icon: Key,
          href: "/account/settings/tokens",
        },
      ],
    },
  ],
};
