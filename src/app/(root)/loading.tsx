import { Loader2 } from "lucide-react";
const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-gray-400 flex items-center justify-center">
      <Loader2 width={64} height={64} className="animate-spin"/>
    </div>
  );
};

export default Loading;
