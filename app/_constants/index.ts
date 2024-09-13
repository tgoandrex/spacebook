export const generateAuthenticatedNavLinks = (userId: number) => [
  { href: "/search", label: "Search" },
  { href: `/user/${userId}/posts`, label: "Profile" },
  { href: "/logout", label: "Log Out" }
];

export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};

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