import { Badge } from '@/components/atoms/Badge';
import { Botanical } from '@/types/strapi';

interface BotanicalTagListProps {
  items?: Botanical[];
  max?: number;
  className?: string;
}

export function BotanicalTagList({ items, max = 4, className = '' }: BotanicalTagListProps) {
  if (!items?.length) return null;

  const visible  = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {visible.map((b) => (
        <Badge key={b.id} variant="emerald">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-light shrink-0 animate-pulse-dot" />
          {b.name}
        </Badge>
      ))}
      {overflow > 0 && (
        <Badge variant="muted">+{overflow} more</Badge>
      )}
    </div>
  );
}
