interface PricingTierProps {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

const PricingTier = ({
  name,
  price,
  features,
  recommended = false,
}: PricingTierProps) => (
  <div
    className={`relative flex flex-col p-8 bg-black/50 backdrop-blur-sm rounded-2xl border ${
      recommended ? "border-[#ff6b00] shadow-lg" : "border-white/10"
    }`}
  >
    {recommended && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff6b00] text-white px-4 py-1 rounded-full text-sm">
        Recommended
      </span>
    )}
    <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold text-white">{price}</span>
      {price !== "Free" && <span className="text-white/70">/month</span>}
    </div>
    <ul className="flex flex-col gap-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-white/70">
          <svg
            className="w-5 h-5 text-[#ff6b00]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <button
      className={`mt-auto py-3 px-6 rounded-lg font-medium transition-colors ${
        recommended
          ? "bg-[#ff6b00] text-white hover:bg-[#ff8533]"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      Get Started
    </button>
  </div>
);

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingTier
            name="Basic"
            price="Free"
            features={[
              "5 video conversions/month",
              "Basic AI summaries",
              "Standard quizzes",
              "Basic analytics",
            ]}
          />
          <PricingTier
            name="Pro"
            price="$29"
            features={[
              "Unlimited video conversions",
              "Advanced AI summaries",
              "Custom quizzes",
              "Detailed analytics",
              "Priority support",
            ]}
            recommended={true}
          />
          <PricingTier
            name="Team"
            price="$99"
            features={[
              "Everything in Pro",
              "Team collaboration",
              "Admin dashboard",
              "API access",
              "Custom branding",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
