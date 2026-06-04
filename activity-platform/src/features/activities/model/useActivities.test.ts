import { describe, expect, it, vi } from "vitest";
import { useActivities } from "./useActivities";

vi.mock("../../../services/activityService.ts", () => ({
  createActivity: vi.fn(),
  deleteActivity: vi.fn(),
  updateActivity: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn((options) => options),
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));

import { useQuery } from "@tanstack/react-query";
import { ACTIVITY_CATEGORIES } from "../../../shared/config/activities/categories.ts";

describe("useActivities", () => {
  it("calls useQuery with correct config", () => {
    const filters = {
      category: ACTIVITY_CATEGORIES.SPORT,
      location: "Moscow",
    };

    useActivities(filters);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: [
          "activities",
          ACTIVITY_CATEGORIES.SPORT,
          "Moscow",
          undefined,
        ],
      }),
    );
  });
});
