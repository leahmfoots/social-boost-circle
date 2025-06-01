
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Link, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Zap,
  Mail,
  Database,
  Smartphone
} from 'lucide-react';

interface PlatformConnection {
  id: string;
  name: string;
  type: 'social' | 'email' | 'crm' | 'automation';
  connected: boolean;
  icon: string;
  description: string;
  features: string[];
}

const availablePlatforms: PlatformConnection[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    type: 'social',
    connected: false,
    icon: '💼',
    description: 'Professional networking platform',
    features: ['Post scheduling', 'Engagement tracking', 'Lead generation']
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    type: 'social',
    connected: false,
    icon: '📌',
    description: 'Visual discovery platform',
    features: ['Pin scheduling', 'Board management', 'Analytics']
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    type: 'social',
    connected: false,
    icon: '👻',
    description: 'Multimedia messaging platform',
    features: ['Story posting', 'Snap insights', 'Audience growth']
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    type: 'email',
    connected: false,
    icon: '📧',
    description: 'Email marketing platform',
    features: ['List management', 'Campaign automation', 'Analytics']
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    type: 'crm',
    connected: false,
    icon: '🏢',
    description: 'Customer relationship management',
    features: ['Contact management', 'Deal tracking', 'Pipeline automation']
  },
  {
    id: 'zapier',
    name: 'Zapier',
    type: 'automation',
    connected: true,
    icon: '⚡',
    description: 'Automation platform',
    features: ['Workflow automation', 'App connections', 'Trigger actions']
  }
];

export const PlatformConnections = () => {
  const [platforms, setPlatforms] = useState<PlatformConnection[]>(availablePlatforms);
  const [webhookUrl, setWebhookUrl] = useState('');

  const handleConnect = (platformId: string) => {
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, connected: !platform.connected }
          : platform
      )
    );
  };

  const getTypeIcon = (type: PlatformConnection['type']) => {
    switch (type) {
      case 'social': return <Smartphone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'crm': return <Database className="w-4 h-4" />;
      case 'automation': return <Zap className="w-4 h-4" />;
      default: return <Link className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: PlatformConnection['type']) => {
    switch (type) {
      case 'social': return 'bg-blue-500';
      case 'email': return 'bg-green-500';
      case 'crm': return 'bg-purple-500';
      case 'automation': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const groupedPlatforms = platforms.reduce((acc, platform) => {
    if (!acc[platform.type]) acc[platform.type] = [];
    acc[platform.type].push(platform);
    return acc;
  }, {} as Record<string, PlatformConnection[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Platform Integrations</h2>
          <p className="text-muted-foreground">Connect your favorite platforms and tools</p>
        </div>
        <Button>
          <Link className="w-4 h-4 mr-2" />
          Add Custom Integration
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Platforms</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map(platform => (
              <Card key={platform.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{platform.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getTypeColor(platform.type)} variant="secondary">
                            {getTypeIcon(platform.type)}
                            <span className="ml-1 capitalize">{platform.type}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {platform.connected ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Features:</h4>
                    <ul className="text-xs space-y-1">
                      {platform.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`connect-${platform.id}`}
                        checked={platform.connected}
                        onCheckedChange={() => handleConnect(platform.id)}
                      />
                      <Label htmlFor={`connect-${platform.id}`} className="text-sm">
                        {platform.connected ? 'Connected' : 'Connect'}
                      </Label>
                    </div>
                    {platform.connected && (
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {Object.entries(groupedPlatforms).map(([type, typePlatforms]) => (
          <TabsContent key={type} value={type}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {typePlatforms.map(platform => (
                <Card key={platform.id} className="hover:shadow-lg transition-shadow">
                  {/* Same card content as above */}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{platform.icon}</span>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                      </div>
                      {platform.connected ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`connect-${type}-${platform.id}`}
                          checked={platform.connected}
                          onCheckedChange={() => handleConnect(platform.id)}
                        />
                        <Label htmlFor={`connect-${type}-${platform.id}`} className="text-sm">
                          {platform.connected ? 'Connected' : 'Connect'}
                        </Label>
                      </div>
                      {platform.connected && (
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Add your Zapier webhook URL to trigger automations
            </p>
          </div>
          <Button disabled={!webhookUrl}>Test Webhook</Button>
        </CardContent>
      </Card>
    </div>
  );
};
