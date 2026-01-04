import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRating } from "@/components/StarRating";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount(prev => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="border-b border-border py-4 last:border-0">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/10 text-primary">
            {review.author.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-foreground">{review.author}</span>
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
          <StarRating rating={review.rating} size="sm" showValue={false} />
          <p className="text-sm text-muted-foreground mt-2">{review.content}</p>
          <div className="mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHelpful}
              disabled={hasVoted}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <ThumbsUp className={`h-3 w-3 mr-1 ${hasVoted ? 'fill-primary text-primary' : ''}`} />
              Helpful ({helpfulCount})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}