import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown, Zap, Bot } from 'lucide-react';

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Just Vibes',
    subtitle: 'Kickstart Plan — Free Forever',
    price: '₹0',
    period: '/month',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    description: 'Perfect for: Students, first-time job hunters',
    features: [
      'Add up to 10 jobs',
      'Use 1 resume + 1 cover letter',
      'Basic AI Cover Letter Generator',
      'Job status tracker (applied → interview → offer/rejected)',
      'Notes, reminders, timeline view',
      'Dark/light mode toggle'
    ],
    useCase: "You're starting small — but starting right. Build your application habit with structure and clarity.",
    buttonText: 'Current Plan',
    isPopular: false
  },
  {
    id: 'level-up',
    name: 'Level Up',
    subtitle: 'Glow Up Plan',
    price: '₹499',
    period: '/month',
    icon: Zap,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    description: 'Perfect for: Job seekers applying regularly',
    features: [
      'Everything in Just Vibes, plus:',
      'Unlimited job applications',
      'Multiple resumes + cover letters',
      'AI Cover Letter with resume + JD context',
      'Job source tagging (LinkedIn, Indeed, referrals)',
      'Priority support'
    ],
    useCase: "You're applying like a pro and need a smarter way to manage the chaos — this plan helps you stand out and stay on top.",
    buttonText: 'Upgrade Now',
    isPopular: true
  },
  {
    id: 'main-character',
    name: 'Main Character',
    subtitle: 'Boss Mode',
    price: '₹1199',
    period: '/month',
    icon: Crown,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    description: 'Perfect for: High-performance job seekers & coaches',
    features: [
      'Everything in Level Up, plus:',
      'Workspace management for coaching/agency use',
      'Invite VAs or career coaches',
      'Exportable application reports & analytics',
      'Job funnel insights: drop-offs, rejections, win rate',
      'Live chat & email priority support'
    ],
    useCase: "You're not playing games. You want insights, structure, and data-backed decisions — because your career is the main story.",
    buttonText: 'Go Boss Mode',
    isPopular: false
  },
  {
    id: 'ghost-mode',
    name: 'Ghost Mode',
    subtitle: 'Autopilot Plan',
    price: '₹2499',
    period: '/month',
    icon: Bot,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    description: 'Perfect for: AI-savvy users who want automation',
    features: [
      'Everything in Boss Mode, plus:',
      'Chrome Extension to auto-save job applications',
      'Smart email parsing to track responses automatically',
      'AI resume recommendations for each job',
      'GPT-4 powered AI Assistant for prep + strategy',
      'Weekly insights: "Which role should you follow-up on?"'
    ],
    useCase: "You're busy building your empire — let AI manage the job hunt for you, while you close offers like a boss.",
    buttonText: 'Go Autopilot',
    isPopular: false
  }
];

export function Subscription() {
  const [currentPlan] = useState('free'); // This would come from user context/auth

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Choose Your Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From starting out to going full automation mode — pick the plan that matches your job hunt ambitions.
          </p>
        </div>

        {/* Current Subscription Status */}
        <div className="mb-12">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Current Subscription</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Just Vibes Plan</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Free Forever</p>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {subscriptionPlans.map((plan) => {
            const IconComponent = plan.icon;
            const isCurrent = currentPlan === plan.id;
            
            return (
              <Card 
                key={plan.id} 
                className={`relative transition-all duration-300 hover:shadow-elegant ${
                  plan.isPopular ? 'ring-2 ring-primary shadow-card' : ''
                } ${isCurrent ? plan.borderColor : ''}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-3 rounded-full ${plan.bgColor} mb-4`}>
                    <IconComponent className={`h-8 w-8 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold mb-1">
                    🌱 {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium">
                    {plan.subtitle}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      ✅ Features:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="text-green-500 mr-2 mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use Case */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      🎯 Use Case:
                    </h4>
                    <p className="text-sm text-muted-foreground italic">
                      {plan.useCase}
                    </p>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full ${isCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
                    variant={plan.isPopular ? 'default' : 'outline'}
                    disabled={isCurrent}
                  >
                    {isCurrent ? 'Current Plan' : plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ or Additional Info */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Need Help Choosing?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">✨ New to Job Hunting?</h4>
                  <p className="text-sm text-muted-foreground">
                    Start with <strong>Just Vibes</strong> — it's free forever and gives you all the basics to build good habits.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🚀 Applying Regularly?</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Level Up</strong> is perfect for active job seekers who need unlimited applications and smarter AI help.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🧠 Want Data & Insights?</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Main Character</strong> gives you analytics, team features, and everything you need to dominate your job search.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🤖 Love Automation?</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Ghost Mode</strong> lets AI handle the heavy lifting while you focus on closing offers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}