"use client";

import { useState } from "react";

export default function FrequentQuestionSection() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  return (
    <section className="w-full py-20 bg-emerald-50">
      <div className="container mx-auto px-4 max-w-3xl bg-white shadow-md py-10 px-24 rounded-md">
        <h2 className="text-4xl font-semibold text-center mb-12 text-emerald-700">
          Frequently Asked Questions
        </h2>
        {[
          {
            q: "Do I need my own racquet?",
            a: "We can provide equipment for beginners, but bringing your own is recommended if possible.",
          },
          {
            q: "What skill levels do you coach?",
            a: "We coach everyone — from complete beginners to competitive tournament players.",
          },
          {
            q: "How do I book a session?",
            a: "Simply contact us via email or phone to arrange your first session.",
          },
        ].map((faq, i) => (
          <div key={i} className="border-b py-4">
            <button
              className="w-full text-left font-semibold flex justify-between items-center"
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              {faq.q}
              <span>{faqOpen === i ? "−" : "+"}</span>
            </button>
            {faqOpen === i && <p className="mt-2 text-gray-700">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
