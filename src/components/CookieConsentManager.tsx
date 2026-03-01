"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const STORAGE_KEY = "cookie-consent-v1";

type ConsentPreferences = {
  essential: true;
  analytics: boolean;
  updatedAt: string;
};

function readStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as ConsentPreferences;
    if (typeof parsed.analytics !== "boolean") {
      return null;
    }

    return {
      essential: true,
      analytics: parsed.analytics,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function writeStoredConsent(analytics: boolean): ConsentPreferences {
  const next: ConsentPreferences = {
    essential: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Keep in-memory state even if storage is blocked.
  }

  return next;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

type Props = {
  gaId?: string;
};

export default function CookieConsentManager({ gaId }: Props) {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);

  useEffect(() => {
    const current = readStoredConsent();
    // Read client-side storage after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(current);
    setAnalyticsOptIn(current?.analytics ?? false);
    setIsHydrated(true);

    const onOpen = () => {
      const latest = readStoredConsent();
      setAnalyticsOptIn(latest?.analytics ?? false);
      setSettingsOpen(true);
    };

    window.addEventListener("open-cookie-settings", onOpen);
    return () => {
      window.removeEventListener("open-cookie-settings", onOpen);
    };
  }, []);

  function saveConsent(analytics: boolean) {
    const next = writeStoredConsent(analytics);
    setConsent(next);
    setAnalyticsOptIn(analytics);
    setSettingsOpen(false);
  }

  const analyticsEnabled = consent?.analytics === true;
  const panelOpen = isHydrated && (settingsOpen || consent === null);

  return (
    <>
      {gaId && analyticsEnabled ? (
        <Script
          id="google-analytics-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
          onLoad={() => {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(...args: unknown[]) {
              window.dataLayer.push(args);
            };
            window.gtag("js", new Date());
            window.gtag("config", gaId, { anonymize_ip: true });
          }}
        />
      ) : null}

      {analyticsEnabled ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setAnalyticsOptIn(consent?.analytics ?? false);
          setSettingsOpen(true);
        }}
        className="cookie-settings-button"
      >
        Cookie settings
      </button>

      {panelOpen ? (
        <section
          className="cookie-banner"
          role="dialog"
          aria-modal="false"
          aria-label="Cookie settings"
        >
          <p className="cookie-banner-title">Cookie settings</p>
          <p>
            Essential cookies are always on. Optional analytics cookies help us
            understand website performance.
          </p>
          <label className="cookie-toggle">
            <input
              type="checkbox"
              checked={analyticsOptIn}
              onChange={(event) => setAnalyticsOptIn(event.target.checked)}
            />
            Allow analytics cookies
          </label>
          <div className="cookie-banner-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => saveConsent(false)}
            >
              Reject non-essential
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => saveConsent(analyticsOptIn)}
            >
              Save preferences
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={() => saveConsent(true)}
            >
              Accept all
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
