import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Hint } from '@/components/hint';
import { useChatbox } from '@/store/use-chatbox';

export function ChatToggleButton() {
  const { collapsed, onToggle } = useChatbox();

  const Icon = collapsed ? PanelRightOpen : PanelRightClose;
  const label = collapsed ? 'Open chat' : 'Close chat';

  return (
    <Hint label={label} side="top" asChild>
      <button
        className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        onClick={onToggle}
      >
        <Icon className="size-5 fill-white" />
      </button>
    </Hint>
  );
}
