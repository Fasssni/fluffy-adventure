import { ChannelBox } from "@/components/channel-box";
import { useRouter } from "next/navigation";

export default function ChannelsPage() {
  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Integrations
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {data.map((integration, index) => (
          <ChannelBox integration={integration} />
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    title: "Telegram",
    description: "Connect with your customers on Telegram.",
    imageUrl:
      "https://cdn3.iconfinder.com/data/icons/social-media-chamfered-corner/154/telegram-512.png",
    link: "tg",
  },
  {
    title: "WhatsApp",
    description: "Stay in touch with your customers through WhatsApp.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/4494/4494494.png",
    link: "waba",
  },
  {
    title: "Instagram",
    description: "Manage your Instagram interactions seamlessly.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png",
    link: "instagram",
  },
  {
    title: "Gmail",
    description: "Integrate with Gmail for efficient email communication.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968534.png",
    link: "gmail",
  },
];
