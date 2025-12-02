export default function FooterSection() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Branding */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-700">
            GSM Tennis Academy
          </h3>
          <p className="mt-3 text-sm text-gray-600 max-w-xs">
            Connecting players across the UK with qualified, independent tennis
            coaches.
          </p>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a
                href="/terms-and-conditions"
                className="hover:text-emerald-700"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-emerald-700">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/cookie-policy" className="hover:text-emerald-700">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="/refunds" className="hover:text-emerald-700">
                Refunds & Cancellations
              </a>
            </li>
            <li>
              <a href="/coach-agreement" className="hover:text-emerald-700">
                Coach Agreement
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              Email:{" "}
              <a
                href="mailto:support@gsmtennisacademy.co.uk"
                className="hover:text-emerald-700"
              >
                support@gsmtennisacademy.co.uk
              </a>
            </li>
            <li>Location: United Kingdom</li>
          </ul>
        </div>

        {/* Socials / Placeholder */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Follow Us
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-emerald-700">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-700">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-700">
                Twitter / X
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-6 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} GSM Tennis Academy. All rights
        reserved.
      </div>
    </footer>
  );
}
