import { describe, it, expect } from "vitest";
import {
  mapActivityToFormValues,
  mapActivityFormToPayload,
} from "./activityFormMappers";
import type { IActivity, IActivityFormValues } from "../model/types";
import { ACTIVITY_CATEGORIES } from "../../../shared/config/activities/categories.ts";

describe("Activity Form Mappers", () => {
  const mockActivity: IActivity = {
    id: "1",
    title: "Футбол в парке",
    description: "Приходите в парк в субботу",
    category: ACTIVITY_CATEGORIES.SPORT,
    location: "Парк Горького",
    date: new Date("2024-05-18T14:30:00"),
    authorId: "user123",
    createdAt: Date.now(),
    responsesCount: 3,
  };

  describe("mapActivityToFormValues", () => {
    it("should map activity to form values correctly", () => {
      const result = mapActivityToFormValues(mockActivity);

      expect(result).toEqual({
        title: "Футбол в парке",
        description: "Приходите в парк в субботу",
        category: ACTIVITY_CATEGORIES.SPORT,
        location: "Парк Горького",
        date: "2024-05-18T14:30",
      });
    });

    it("should format date correctly for datetime-local input", () => {
      const activity: IActivity = {
        ...mockActivity,
        date: new Date("2024-12-25T09:05:00"),
      };

      const result = mapActivityToFormValues(activity);
      expect(result.date).toBe("2024-12-25T09:05");
    });

    it("should handle single-digit month and day with padding", () => {
      const activity: IActivity = {
        ...mockActivity,
        date: new Date("2024-01-05T08:03:00"),
      };

      const result = mapActivityToFormValues(activity);
      expect(result.date).toBe("2024-01-05T08:03");
    });
  });

  describe("mapActivityFormToPayload", () => {
    it("should map form values to payload with Date object", () => {
      const formValues: IActivityFormValues = {
        title: "Бег в лесу",
        description: "Утренняя пробежка",
        category: ACTIVITY_CATEGORIES.SPORT,
        location: "Лес",
        date: "2024-06-01T06:00",
      };

      const result = mapActivityFormToPayload(formValues);

      expect(result.title).toBe("Бег в лесу");
      expect(result.date).toBeInstanceOf(Date);
      expect(result.date).toEqual(new Date("2024-06-01T06:00"));
    });

    it("should preserve all form fields in payload", () => {
      const formValues: IActivityFormValues = {
        title: "Йога",
        description: "Сеанс релаксации",
        category: ACTIVITY_CATEGORIES.SPORT,
        location: "Студия йоги",
        date: "2024-07-10T19:00",
      };

      const result = mapActivityFormToPayload(formValues);

      expect(result).toHaveProperty("title", "Йога");
      expect(result).toHaveProperty("description", "Сеанс релаксации");
      expect(result).toHaveProperty("category", ACTIVITY_CATEGORIES.SPORT);
      expect(result).toHaveProperty("location", "Студия йоги");
    });
  });
});
