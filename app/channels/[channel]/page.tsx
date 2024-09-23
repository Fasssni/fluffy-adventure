import { TelegramAdder } from "@/components/telegram-adder";

export default function Channel({ params }: { params: { channel: string } }) {
  const channelsObj: Record<string, () => React.ReactNode> = {
    tg: () => <TelegramAdder />,
    waba: () => <p>not available</p>,
    insta: () => <p>not available</p>,
  };
  const Component = channelsObj[params.channel] || (() => <p>No channel</p>);
  return (
    <div className="pl-[56px]">
      <Component />
    </div>
  );
}
