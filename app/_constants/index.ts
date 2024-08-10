export const generateAuthenticatedNavLinks = (userId: number) => [
  { href: "/search", label: "Search" },
  { href: `/user/${userId}/posts`, label: "Profile" },
  { href: "/logout", label: "Log Out" }
];

export const navLinksUnauthenticated = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" }
];

export const profileNavLinks = [
  { href: "posts", label: "Posts" },
  { href: "photos", label: "Photos" },
  { href: "followers", label: "Followers" }
];

export const adminTableHeadersPostsAndComments = ["ID", "Author", "Content", "Created At", "Controls"];

export const adminTableHeadersPhotos = ["ID", "Author", "Content", "Preview", "Created At", "Controls"];

export const adminTableHeadersUsers = ["ID", "Username", "Restricted?", "Created At", "Controls"];

export const adminTableHeadersReports = ["ID", "Reporter", "Reporter Message", "Reported Entity ID", "Admin Action", "Created At", "Controls"];