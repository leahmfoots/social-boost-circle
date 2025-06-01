
import MessagingCenter from "@/components/messaging/MessagingCenter";

const MessagingPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Connect and collaborate with other creators</p>
      </div>
      <MessagingCenter />
    </div>
  );
};

export default MessagingPage;
