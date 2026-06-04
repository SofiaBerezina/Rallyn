import type { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-[200px]">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
