
import { 
  Users, 
  Link, 
  TrendingUp, 
  Award, 
  Shield, 
  ChartBar 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "User Authentication & Profiles",
      description: "Secure email-based authentication with customizable user profiles to showcase your content across platforms."
    },
    {
      icon: <Link className="h-6 w-6" />,
      title: "Social Account Management",
      description: "Connect and manage multiple social media accounts with our easy-to-use platform integrations."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Engagement System",
      description: "Point-based engagement tracking with verification to ensure authentic interactions between creators."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Rewards & Achievements",
      description: "Earn points, badges, and unlock special features as you grow your engagement and support others."
    },
    {
      icon: <ChartBar className="h-6 w-6" />,
      title: "Analytics & Reporting",
      description: "Track your growth with detailed analytics and insights to optimize your social media strategy."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Content Moderation",
      description: "Advanced moderation systems ensure a safe, spam-free environment for genuine community growth."
    }
  ];

  return (
    <div id="features" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Grow Together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools content creators need to grow their social presence through authentic engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all"
            >
              <div className="h-12 w-12 gradient-bg rounded-lg flex items-center justify-center mb-4 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
