import Image from "next/image";
import Link from "next/link";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <span className="text-4xl mb-4">{icon}</span>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const PricingTier = ({
  name,
  price,
  features,
  recommended = false,
}: {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}) => (
  <div
    className={`relative flex flex-col p-8 bg-white rounded-2xl border ${
      recommended ? "border-[#8811f0] shadow-lg" : "border-gray-200"
    }`}
  >
    {recommended && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8811f0] text-white px-4 py-1 rounded-full text-sm">
        Recommended
      </span>
    )}
    <h3 className="text-xl font-bold mb-2">{name}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold">{price}</span>
      {price !== "Free" && <span className="text-gray-600">/month</span>}
    </div>
    <ul className="flex flex-col gap-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-500"
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
          ? "bg-[#8811f0] text-white hover:bg-blue-600"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      Get Started
    </button>
  </div>
);

const Testimonial = ({
  text,
  author,
  role,
  image,
}: {
  text: string;
  author: string;
  role: string;
  image: string;
}) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
    <Image
      src={image}
      alt={author}
      width={64}
      height={64}
      className="rounded-full mb-4"
    />
    <p className="text-gray-600 mb-4 italic">&ldquo;{text}&rdquo;</p>
    <h4 className="font-bold">{author}</h4>
    <p className="text-gray-500 text-sm">{role}</p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-[#0c0114]">
      {/* Header */}

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text  text-transparent bg-white">
              Turn YouTube Videos into Interactive Lessons
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Transform any YouTube video into an engaging learning experience
              with AI-powered summaries, quizzes, and progress tracking.
            </p>
            <Link href="/dashboard/new">
              <button className="bg-[#8811f0] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#7700d6] transition-colors">
                Get Started Free
              </button>
            </Link>
          </div>
          <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/saas.png"
              alt="Product demo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                aria-label="Play demo video"
                className="bg-white/90 p-4 rounded-full hover:bg-white transition-colors"
              >
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Transform How You Learn
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="📝"
              title="AI Summaries"
              description="Get instant, accurate summaries of any video content powered by advanced AI"
            />
            <FeatureCard
              icon="🧠"
              title="Smart Tests"
              description="Auto-generated quizzes that adapt to your learning progress"
            />
            <FeatureCard
              icon="📈"
              title="Progress Tracking"
              description="Monitor your learning journey with detailed analytics and insights"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              text="This tool has revolutionized how I create educational content for my students."
              author="Sarah Johnson"
              role="Education Consultant"
              image="/useravater.jpg"
            />
            <Testimonial
              text="The AI summaries are incredibly accurate and save me hours of work."
              author="Michael Chen"
              role="Content Creator"
              image="/useravater.jpg"
            />
            <Testimonial
              text="Progress tracking helps me understand exactly where my students need help."
              author="Emma Williams"
              role="Online Instructor"
              image="/useravater.jpg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
