import { describe, it, expect } from "vitest";
import { enrichActivitiesWithUsers } from "./enrichActivities";
import type { IActivity } from "../model/types";
import type { IUserProfile } from "../../profile/model/types";
import { ACTIVITY_CATEGORIES } from "../../../shared/config/activities/categories.ts";

const dateNow = Date.now();

describe("enrichActivitiesWithUsers", () => {
  const mockUsers: IUserProfile[] = [
    {
      id: "user1",
      name: "Иван",
      email: "ivan1@example.com",
      avatar: "https://example.com/avatar1.jpg",
      telegram: "ivan_123",
    },
    {
      id: "user2",
      name: "Мария",
      email: "maria@example.com",
      avatar: "https://example.com/avatar2.jpg",
      telegram: "maria_456",
    },
  ];

  const mockActivities: IActivity[] = [
    {
      id: "activity1",
      title: "Футбол",
      description: "Игра в футбол",
      category: ACTIVITY_CATEGORIES.SPORT,
      location: "Пермь",
      date: new Date("2024-05-20"),
      authorId: "user1",
      createdAt: dateNow,
      responsesCount: 2,
    },
    {
      id: "activity2",
      title: "Йога",
      description: "Занятие йогой",
      category: ACTIVITY_CATEGORIES.SPORT,
      location: "Москва",
      date: new Date("2024-05-21"),
      authorId: "user2",
      createdAt: dateNow,
      responsesCount: 0,
    },
  ];

  it("should enrich activities with user authors", () => {
    const result = enrichActivitiesWithUsers(mockActivities, mockUsers);

    expect(result).toHaveLength(2);
    expect(result[0].author).toEqual(mockUsers[0]);
    expect(result[1].author).toEqual(mockUsers[1]);
  });

  it("should preserve all activity properties", () => {
    const result = enrichActivitiesWithUsers(mockActivities, mockUsers);

    expect(result[0]).toHaveProperty("id", "activity1");
    expect(result[0]).toHaveProperty("title", "Футбол");
    expect(result[0]).toHaveProperty("location", "Пермь");
  });

  it("should handle missing user gracefully", () => {
    const activitiesWithMissingUser: IActivity[] = [
      {
        id: "activity3",
        title: "Теннис",
        description: "Матч теннис",
        category: ACTIVITY_CATEGORIES.SPORT,
        location: "Москва",
        date: new Date("2024-05-22"),
        authorId: "user999",
        createdAt: dateNow,
        responsesCount: 1,
      },
    ];

    const result = enrichActivitiesWithUsers(
      activitiesWithMissingUser,
      mockUsers,
    );

    expect(result[0].author).toBeUndefined();
  });

  it("should handle empty activities array", () => {
    const result = enrichActivitiesWithUsers([], mockUsers);

    expect(result).toEqual([]);
  });

  it("should handle empty users array", () => {
    const result = enrichActivitiesWithUsers(mockActivities, []);

    expect(result[0].author).toBeUndefined();
    expect(result[1].author).toBeUndefined();
  });

  it("should return new array instance", () => {
    const result = enrichActivitiesWithUsers(mockActivities, mockUsers);

    expect(result).not.toBe(mockActivities);
    expect(result[0]).not.toBe(mockActivities[0]);
  });
});
