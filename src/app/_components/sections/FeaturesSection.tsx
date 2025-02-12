interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="flex flex-col items-center p-6 bg-black/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-white/10">
    <span className="text-4xl mb-4">{icon}</span>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-white/70 text-center">{description}</p>
  </div>
);

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
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
  );
}
