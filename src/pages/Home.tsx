import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Target, 
  BarChart3, 
  Mail,
  Star,
  ArrowRight,
  Menu,
  X,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  Heart
 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import founderVisionImage from '@/assets/founder-vision-illustration.jpg';

interface HomeProps {
  onNavigateToAuth: () => void;
}

export function Home({ onNavigateToAuth }: HomeProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { authState } = useAuth();

  const quotes = [
    "Your dream job is just one application away.",
    "Track your journey, land your dream.",
    "Every rejection is a step closer to acceptance.",
    "Organization is the key to opportunity."
  ];

  const features = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Job Tracking",
      description: "Keep track of all your applications, interviews, and follow-ups in one place."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Progress Analytics",
      description: "Visualize your job search progress with detailed analytics and insights."
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Integration",
      description: "Automatically sync job updates from your email and track responses."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "Job Journa helped me land my dream job at Google. The tracking features are incredible!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content: "Finally, a tool that makes job hunting organized and stress-free. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content: "The analytics helped me understand my application patterns and improve my success rate.",
      rating: 5
    }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="font-heading text-xl font-bold gradient-primary bg-clip-text text-transparent">
                Job Journa
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-foreground hover:text-primary transition-colors"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('newsletter')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Newsletter
              </button>
              <button 
                onClick={() => scrollToSection('feedback')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Feedback
              </button>
              <button 
                onClick={() => scrollToSection('community')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Community
              </button>
              <Button onClick={onNavigateToAuth} className="gradient-primary text-white">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('newsletter')}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Newsletter
                </button>
                <button 
                  onClick={() => scrollToSection('feedback')}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Feedback
                </button>
                <button 
                  onClick={() => scrollToSection('community')}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Community
                </button>
                <Button onClick={onNavigateToAuth} className="gradient-primary text-white w-full">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 -z-10 gradient-primary opacity-25 blur-3xl" aria-hidden="true" />
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Transform Your <span className="gradient-primary bg-clip-text text-transparent">Job Search</span> Journey
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Track applications, analyze progress, and land your dream job with the most powerful job search management platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={onNavigateToAuth}
                className="gradient-primary text-white px-8 py-3 text-lg hover-scale shadow-elegant"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('about')}
                className="px-8 py-3 text-lg hover-scale"
              >
                Learn More
              </Button>
            </div>

            {/* Quote Carousel */}
            <div className="max-w-2xl mx-auto">
              <blockquote className="text-lg font-medium text-muted-foreground italic animate-fade-in">
                "{quotes[Math.floor(Math.random() * quotes.length)]}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Job Journa?
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your job search and maximize your success rate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-card transition-transform hover:-translate-y-1 hover-scale hover:shadow-elegant animate-fade-in">
                <CardContent className="pt-8">
                  <div className="gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-white shadow-elegant">
                    {feature.icon}
                  </div>
                  <h4 className="font-heading text-xl font-semibold mb-3">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story & Founder's Vision Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Elegant background gradient */}
        <div className="absolute inset-0 -z-10 gradient-secondary opacity-20 blur-3xl" aria-hidden="true" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Our Story */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              {/* Left: Text Content */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Heart className="h-5 w-5" />
                    <span className="text-sm font-semibold tracking-wider uppercase">Our Story</span>
                  </div>
                  <h2 className="font-playfair text-4xl lg:text-5xl font-bold leading-tight">
                    Building clarity, calm, and confidence in your career journey.
                  </h2>
                </div>
                
                <Separator className="my-8 bg-primary/20" />
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Job Journa was born from a simple realization — job searching is more than a process; it's an emotional journey.
                  </p>
                  <p>
                    Our founder experienced firsthand how stressful and scattered the job hunt can feel — endless tabs, lost notes, forgotten follow-ups.
                  </p>
                  <p>
                    So she built Job Journa, not as another tracker, but as a <span className="text-foreground font-semibold">career companion</span> — 
                    a calm, intelligent space where you can organize, reflect, and grow through every step of your professional path.
                  </p>
                </div>

                <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 italic text-xl font-playfair text-foreground">
                  "I wanted to create something that feels human — a digital journal that listens, guides, and celebrates progress. 
                  Because finding a job isn't just about applying — it's about becoming."
                </blockquote>
              </div>

              {/* Right: Image */}
              <div className="relative animate-fade-in">
                <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                  <img 
                    src={founderVisionImage} 
                    alt="Elegant journal symbolizing career reflection and growth"
                    className="w-full h-auto object-cover"
                  />
                  {/* Decorative floating elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full gradient-primary opacity-30 blur-2xl" aria-hidden="true" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Founder's Vision */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Image (reversed order on desktop) */}
              <div className="relative animate-fade-in order-2 lg:order-1">
                <Card className="shadow-elegant bg-gradient-to-br from-card to-muted/30 border-primary/10">
                  <CardContent className="p-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-primary mb-6">
                        <Sparkles className="h-5 w-5" />
                        <span className="text-sm font-semibold tracking-wider uppercase">Our Promise</span>
                      </div>
                      
                      <h3 className="font-playfair text-2xl font-bold mb-6">To help you stay:</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          <div>
                            <div className="font-semibold text-foreground">Organized</div>
                            <div className="text-muted-foreground">Every application, resume, and note in one place.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          <div>
                            <div className="font-semibold text-foreground">Motivated</div>
                            <div className="text-muted-foreground">Guided gently by an AI that understands your journey.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          <div>
                            <div className="font-semibold text-foreground">Empowered</div>
                            <div className="text-muted-foreground">With insights that help you grow, not just apply.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Vision Content */}
              <div className="space-y-8 animate-fade-in order-1 lg:order-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-sm font-semibold tracking-wider uppercase">Founder's Vision</span>
                  </div>
                  <h2 className="font-playfair text-4xl lg:text-5xl font-bold leading-tight">
                    Where ambition meets peace of mind
                  </h2>
                </div>
                
                <Separator className="my-8 bg-primary/20" />
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    At Job Journa, we believe clarity and compassion should guide every career move.
                  </p>
                  <p>
                    Our mission is to turn job searching into a <span className="text-foreground font-semibold">mindful experience</span> — 
                    powered by AI, designed with empathy, and built for growth.
                  </p>
                  <p>
                    Job Journa is where ambition meets peace of mind — where technology doesn't overwhelm, it empowers.
                  </p>
                  <p className="text-foreground font-semibold">
                    We're creating not just a product, but a feeling: a sense of progress, calm, and confidence every time you log in.
                  </p>
                </div>

                <div className="pt-8">
                  <Button 
                    size="lg" 
                    onClick={onNavigateToAuth}
                    className="gradient-primary text-white px-10 py-6 text-lg hover-scale shadow-elegant group"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h3 className="font-heading text-3xl lg:text-4xl font-bold mb-8">About Job Journa</h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <p className="text-lg text-muted-foreground mb-6">
                  Job Journa was born from the frustration of managing countless job applications across spreadsheets, emails, and sticky notes. We believe that finding your dream job shouldn't be chaotic.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our platform combines intelligent tracking, insightful analytics, and seamless integrations to transform your job search from overwhelming to organized.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary" className="px-3 py-1">
                    <Users className="h-4 w-4 mr-2" />
                    10K+ Users
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    85% Success Rate
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy First
                  </Badge>
                </div>
              </div>
              <div className="gradient-secondary rounded-lg p-8 text-center transition-transform hover-scale hover:-translate-y-1">
                <h4 className="font-heading text-2xl font-bold mb-4">Our Mission</h4>
                <p className="text-muted-foreground">
                  To empower job seekers with the tools and insights they need to navigate their career journey with confidence and clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-heading text-3xl lg:text-4xl font-bold mb-8 animate-fade-in">Join Our Community</h3>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Connect with thousands of job seekers, share experiences, and get support from our vibrant community.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Community Support</div>
            </div>
          </div>
          <Button size="lg" onClick={onNavigateToAuth} className="gradient-primary text-white hover-scale shadow-elegant">
            Join the Community
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-3xl lg:text-4xl font-bold mb-4 animate-fade-in">Stay Updated</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Get the latest job market insights, career tips, and platform updates delivered to your inbox.
            </p>
            <Card className="shadow-card animate-fade-in">
              <CardContent className="p-8">
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" className="gradient-primary text-white hover-scale shadow-elegant">
                    Subscribe
                  </Button>
                </form>
                <p className="text-sm text-muted-foreground mt-4">
                  No spam, unsubscribe at any time. We respect your privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feedback/Testimonials Section */}
      <section id="feedback" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="font-heading text-3xl lg:text-4xl font-bold mb-4">What Our Users Say</h3>
            <p className="text-xl text-muted-foreground">
              Real feedback from real job seekers who found success with Job Journa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card transition-transform hover:-translate-y-1 hover-scale hover:shadow-elegant animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-heading text-lg font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                Job Journa
              </h4>
              <p className="text-muted-foreground mb-4">
                Transform your job search journey with intelligent tracking and insights.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="story-link hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="story-link hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="story-link hover:text-primary transition-colors">Extensions</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="story-link hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="story-link hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="story-link hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="story-link hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="story-link hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="story-link hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Job Journa. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}