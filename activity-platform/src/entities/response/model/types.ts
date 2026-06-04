export const RESPONSE_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

export type ResponseStatus =
  (typeof RESPONSE_STATUS)[keyof typeof RESPONSE_STATUS];

export interface IActivityResponse {
  id: string;
  activityId: string;
  authorId: string;
  responderId: string;
  status: ResponseStatus;
  createdAt: number;
}
