
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="py-24 px-4 container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Grow your <span className="gradient-text">social presence</span> through mutual engagement
          </h1>
          <p className="text-lg text-muted-foreground">
            RoundAbout helps content creators grow together through authentic engagement, meaningful interactions, and a supportive community.
          </p>
          <div className="flex gap-4 pt-2">
            <Link to="/signup">
              <Button size="lg" className="font-medium">Get Started Free</Button>
            </Link>
            <Link to="#how-it-works">
              <Button size="lg" variant="outline" className="font-medium">How It Works</Button>
            </Link>
          </div>
          <div className="pt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/80 to-secondary/80 border-2 border-white flex items-center justify-center"
                >
                  <span className="text-white text-xs font-medium">U{i}</span>
                </div>
              ))}
            </div>
            <span>Join <span className="font-medium text-foreground">1,000+</span> content creators already growing together</span>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-3xl -z-10"></div>
            <div className="bg-white p-4 border rounded-xl shadow-lg">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                  alt="Social media engagement" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Your Growth Stats</h3>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Points</p>
                    <p className="text-xl font-semibold text-primary">1,250</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Engagements", value: "543" },
                    { label: "New Followers", value: "128" },
                    { label: "Growth Rate", value: "+24%" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-3 rounded-md shadow-sm">
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                      <div className="font-medium">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
