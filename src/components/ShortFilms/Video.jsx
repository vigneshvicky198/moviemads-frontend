import { useState } from "react";
import Thumbnail from "./VideoCard/Thumbnail";
import Details from "./VideoCard/Details";

interface VideoCardProps {
  thumbnailUrl?: string;
  duration?: string;
  title?: string;
  channelName?: string;
  channelAvatarUrl?: string;
  views?: string;
  timestamp?: string;
  isVerified?: boolean;
  onClick?: () => void;
}

const VideoCard = ({
  thumbnailUrl = "https://dummyimage.com/300x168/000/fff&text=Video+Thumbnail",
  duration = "12:34",
  title = "Video Title Goes Here - Amazing Content You Don't Want to Miss",
  channelName = "Channel Name",
  channelAvatarUrl = "https://dummyimage.com/36x36/666/fff&text=C",
  views = "123K views",
  timestamp = "2 days ago",
  isVerified = false,
  onClick = () => {},
}: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col w-full max-w-[360px] bg-white  overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <Thumbnail
        thumbnailUrl={thumbnailUrl}
        duration={duration}
        onHover={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        isHovered={isHovered}
      />
      <Details
        title={title}
        channelName={channelName}
        channelAvatarUrl={channelAvatarUrl}
        views={views}
        timestamp={timestamp}
        isVerified={isVerified}
      />
    </div>
  );
};

export default VideoCard;
