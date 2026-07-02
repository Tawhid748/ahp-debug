"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "subscribe", email }),
    });

    setLoading(false);

    if (!res.ok) {
      setError(true);
      return;
    }

    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div className="mb-10 py-5 px-8 border border-[var(--light-gold)]/30 inline-block">
        <p className="text-[1.5rem] text-[var(--light-gold)] font-bold uppercase tracking-[3px]">
          You&apos;re on the list!
        </p>
        <p className="text-[1.3rem] text-[var(--light-gray)] mt-1">
          We&apos;ll be in touch with updates and exclusive offers.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* .subscribe-form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-stretch max-w-[60rem] mx-auto mb-[3rem] h-[3.5rem] rounded-[0.75rem] overflow-hidden border border-[var(--light-gold)]/40 focus-within:border-[var(--light-gold)] focus-within:shadow-[0_0_0_3px_var(--light-gold)]/10 [transition:border-color_250ms,box-shadow_250ms]"
      >
        {/* .subscribe-input */}
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
          required
          placeholder="Enter your email address"
          disabled={loading}
          className="min-w-0 flex-1 h-full px-3 sm:px-5 border-none bg-[var(--black)] text-[var(--white)] font-[family-name:var(--font-small)] text-[1.1rem] sm:text-[1.5rem] outline-none rounded-l-[0.75rem] placeholder:text-[var(--light-gray)]"
        />
        {/* .subscribe-btn */}
        <button
          type="submit"
          disabled={loading}
          className="h-full px-4 sm:px-8 border-none font-[family-name:var(--font-small)] font-bold text-[0.85rem] sm:text-[1.15rem] uppercase tracking-[0.15em] sm:tracking-[0.2em] whitespace-nowrap shrink-0 rounded-r-[0.75rem] bg-[var(--light-gold)] text-black hover:bg-[var(--black)] hover:text-[var(--light-gold)] [transition:background-color_250ms,color_250ms] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Sending…" : "Subscribe"}
        </button>
      </form>
      {error && (
        <p className="mt-3 text-[1.2rem] text-[hsl(0,70%,60%)]">
          Something went wrong. Please try again.
        </p>
      )}
    </>
  );
}