
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/30 pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="font-bold text-xl">RoundAbout</span>
            </Link>
            <p className="text-muted-foreground">
              Growing social media presence through mutual engagement and support.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/guidelines" className="text-muted-foreground hover:text-primary transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RoundAbout WebTraffic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</Link>
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Facebook</Link>
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Instagram</Link>
            <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
