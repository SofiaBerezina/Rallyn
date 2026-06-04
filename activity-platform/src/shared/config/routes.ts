export const ROUTES = {
  LOGIN: "/login",
  FEED: "/",
  PROFILE: "/profile/:id",
  getProfile: (id: string) => `/profile/${id}`,
};
