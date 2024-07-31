import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="loader ">
      <Loader2 className="animate-spin text-primary" />
      <p className="text-primary">Loading...</p>
    </div>
  );
};

export default Loader;
