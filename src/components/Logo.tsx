import { Clapperboard } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Clapperboard className="w-7 h-7 text-primary-foreground" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-display text-xl leading-none tracking-wider text-foreground">
          FREE
        </span>
        <span className="font-display text-xl leading-none tracking-wider text-primary">
          DATION
        </span>
      </div>
    </div>
  );
};

export default Logo;
