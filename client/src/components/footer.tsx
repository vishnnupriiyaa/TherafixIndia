import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">therafix</h3>
            <p className="text-muted-foreground mb-6">
              When therapy feels out of reach, we bring it closer. Making mental health care accessible across India.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary-foreground transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary-foreground transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary-foreground transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary-foreground transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/clinics" data-testid="footer-link-therapists">Find Therapists</Link></li>
              <li><Link href="/workshops" data-testid="footer-link-workshops">Group Workshops</Link></li>
              <li><a href="#" data-testid="footer-link-online">Online Therapy</a></li>
              <li><a href="#" data-testid="footer-link-crisis">Crisis Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" data-testid="footer-link-blog">Mental Health Blog</a></li>
              <li><a href="#" data-testid="footer-link-tools">Self-Help Tools</a></li>
              <li><a href="#" data-testid="footer-link-faq">FAQ</a></li>
              <li><a href="#" data-testid="footer-link-privacy">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/contact" data-testid="footer-link-contact">Contact Support</Link></li>
              <li><a href="#" data-testid="footer-link-partner">Become a Partner</a></li>
              <li><a href="#" data-testid="footer-link-therapists-join">For Therapists</a></li>
              <li><a href="#" data-testid="footer-link-emergency">Emergency Resources</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Therafix. All rights reserved. | Made with ❤️ for mental wellness in India
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Certified by:</span>
            <div className="flex space-x-2">
              <span className="bg-primary/20 text-primary-foreground text-xs px-2 py-1 rounded">ISO 27001</span>
              <span className="bg-secondary/20 text-secondary-foreground text-xs px-2 py-1 rounded">HIPAA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
