import * as React from "react";
import { ActivityList } from "../../features/activities/ui";
import { useModal } from "../../app/providers/useModal.ts";

const FeedPage: React.FC = () => {
  const { currentFilters } = useModal();
  return (
    <div className="p-4">
      <ActivityList hideOwn={true} filters={currentFilters} />
    </div>
  );
};

export default FeedPage;
