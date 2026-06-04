import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../../shared/ui/Header/Header";
import Navbar from "../../../shared/ui/Navbar/Navbar";
import { CreateActivityModal } from "../../../features/activities/ui";
import FilterActivitiesModal from "../../../features/activities/ui/FilterActivitiesModal/FilterActivitiesModal";
import { useModal } from "../../providers/useModal.ts";
import { useAuth } from "../../../shared/hooks/useAuth.ts";
import type { IActivityFormValues } from "../../../features/activities/model/types.ts";
import { mapActivityFormToPayload } from "../../../features/activities/lib/activityFormMappers.ts";
import { useCreateActivity } from "../../../features/activities/model/useActivities.ts";

const MainLayout = () => {
  const {
    isCreateOpen,
    closeModal,
    isFilterOpen,
    closeFilterModal,
    applyFilters,
    resetFilters,
    currentFilters,
  } = useModal();
  const { pathname } = useLocation();

  const { user } = useAuth();
  const createActivityMutation = useCreateActivity();

  const handleCreate = async (data: IActivityFormValues) => {
    if (!user) return;

    await createActivityMutation.mutateAsync({
      ...mapActivityFormToPayload(data),
      authorId: user.uid,
      createdAt: Date.now(),
    });

    closeModal();
  };

  useEffect(() => {
    resetFilters();
  }, [pathname, resetFilters]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Navbar />

      {isCreateOpen && (
        <CreateActivityModal onClose={closeModal} onCreate={handleCreate} />
      )}

      {isFilterOpen && (
        <FilterActivitiesModal
          filters={currentFilters}
          onApply={applyFilters}
          onClose={closeFilterModal}
        />
      )}
    </div>
  );
};

export default MainLayout;
