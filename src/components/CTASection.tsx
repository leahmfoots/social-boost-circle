
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div id="how-it-works" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 md:p-12 rounded-2xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How RoundAbout <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our simple process helps content creators support each other and grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Connect Your Accounts",
                description: "Link your social media accounts to your RoundAbout profile."
              },
              {
                step: "02",
                title: "Engage With Others",
                description: "Support other creators by engaging with their content."
              },
              {
                step: "03",
                title: "Grow Together",
                description: "Track your growth and earn rewards as others engage with you."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-12 gradient-bg rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/signup">
              <Button size="lg" className="font-medium">Join RoundAbout Today</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
