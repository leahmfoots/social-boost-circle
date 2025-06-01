
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Calendar, Target } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'weekly' | 'monthly' | 'custom';
  participants: number;
  maxParticipants: number;
  prize: string;
  startDate: string;
  endDate: string;
  progress: number;
  isJoined: boolean;
  rules: string[];
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Video Creator Challenge',
    description: 'Create 7 videos in 7 days with minimum 1000 views each',
    type: 'weekly',
    participants: 156,
    maxParticipants: 200,
    prize: '$500 + Premium Account',
    startDate: '2024-01-15',
    endDate: '2024-01-22',
    progress: 65,
    isJoined: false,
    rules: [
      'Videos must be at least 60 seconds long',
      'Original content only',
      'Must use #CreatorChallenge hashtag',
      'Minimum 1000 views per video'
    ]
  },
  {
    id: '2',
    title: 'Engagement Master',
    description: 'Get the highest engagement rate across all platforms',
    type: 'monthly',
    participants: 89,
    maxParticipants: 100,
    prize: '$1000 Cash Prize',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    progress: 23,
    isJoined: true,
    rules: [
      'Must post on at least 3 platforms',
      'Minimum 5 posts per week',
      'Engagement rate calculated weekly',
      'No fake engagement allowed'
    ]
  },
  {
    id: '3',
    title: 'Collaboration Contest',
    description: 'Partner with other creators for maximum reach',
    type: 'custom',
    participants: 45,
    maxParticipants: 50,
    prize: 'Feature on Platform + $250',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    progress: 78,
    isJoined: false,
    rules: [
      'Must collaborate with at least 2 other creators',
      'Joint content creation required',
      'Cross-promotion mandatory',
      'Document collaboration process'
    ]
  }
];

export const GroupChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { 
              ...challenge, 
              isJoined: true, 
              participants: challenge.participants + 1 
            }
          : challenge
      )
    );
  };

  const handleLeaveChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { 
              ...challenge, 
              isJoined: false, 
              participants: Math.max(0, challenge.participants - 1) 
            }
          : challenge
      )
    );
  };

  const getTypeColor = (type: Challenge['type']) => {
    switch (type) {
      case 'weekly': return 'bg-blue-500';
      case 'monthly': return 'bg-green-500';
      case 'custom': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Group Challenges</h2>
          <p className="text-muted-foreground">Compete with other creators and win amazing prizes</p>
        </div>
        <Button>Create Challenge</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {challenges.map(challenge => (
          <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    {challenge.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {challenge.description}
                  </p>
                </div>
                <Badge className={getTypeColor(challenge.type)}>
                  {challenge.type}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{challenge.participants}/{challenge.maxParticipants} participants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>{challenge.prize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(challenge.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Ends {new Date(challenge.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
              </div>

              <div>
                <h4 className="font-medium mb-2">Challenge Rules:</h4>
                <ul className="text-sm space-y-1">
                  {challenge.rules.slice(0, 2).map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                  {challenge.rules.length > 2 && (
                    <li className="text-muted-foreground">
                      +{challenge.rules.length - 2} more rules...
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex gap-2">
                {challenge.isJoined ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleLeaveChallenge(challenge.id)}
                    >
                      Leave Challenge
                    </Button>
                    <Button className="flex-1">View Progress</Button>
                  </>
                ) : (
                  <>
                    <Button 
                      className="flex-1"
                      onClick={() => handleJoinChallenge(challenge.id)}
                      disabled={challenge.participants >= challenge.maxParticipants}
                    >
                      {challenge.participants >= challenge.maxParticipants ? 'Full' : 'Join Challenge'}
                    </Button>
                    <Button variant="outline">View Details</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
