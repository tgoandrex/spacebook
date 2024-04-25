// (Only temporary while backend is disabled)
import cow from "../_assets/images/cow.jpg";
import duck from "../_assets/images/duck.jpg";
import goat from "../_assets/images/goat.jpg";
import parakeet from "../_assets/images/parakeet.jpg";
import penguin from "../_assets/images/penguin.jpg";

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

export const adminTableHeadersPosts = ["ID", "Author", "Content", "Created At", "Controls"];

export const adminTableHeadersPhotos = ["ID", "Author", "Content", "Preview", "Created At", "Controls"];

export const adminTableHeadersUsers = ["ID", "Username", "Restricted?", "Created At", "Controls"];

export const adminTableHeadersReports = ["ID", "Reporter", "Reporter Message", "Reported Entity", "Admin Action", "Created At", "Controls"];


// (Only temporary while backend is disabled)
export const users = [
  { id: 1, username: "tgoandrex", role: "Admin", createdAt: "August 2, 12:00", restricted: false, followers: [{id: 2, username: "guy123"}]},
  { id: 2, username: "guy123", role: "User", createdAt: "August 3, 11:00", restricted: false, followers: [{id: 1, username: "tgoandrex"}]}
];

// (Only temporary while backend is disabled)
export const posts = [
  { id: 1, author: {id: 1, username: "tgoandrex"}, createdAt: "August 5, 12:00", content: "Test Post 1", likes: 2, commentIds: [1] },
  { id: 2, author: {id: 1, username: "tgoandrex"}, createdAt: "August 6, 11:00", content: "Test Post 2", likes: 0, commentIds: [2, 3, 4, 5] },
  { id: 3, author: {id: 1, username: "tgoandrex"}, createdAt: "August 7, 2:00", content: "Test Post 3", likes: 4, commentIds: [] },
  { id: 4, author: {id: 1, username: "tgoandrex"}, createdAt: "August 8, 4:40", content: "Test Post 4", likes: 1, commentIds: [6, 7] },
  { id: 5, author: {id: 1, username: "tgoandrex"}, createdAt: "August 9, 1:00", content: "Test Post 5", likes: 7, commentIds: [8] }
];

// (Only temporary while backend is disabled)
export const photos = [
  { id: 1, src: cow, description: "A Cow", author: {id: 1, username: "tgoandrex"}, createdAt: "August 5, 4:00", content: "Test Photo 1", likes: 1, commentIds: [] },
  { id: 2, src: duck, description: "A Duck", author: {id: 1, username: "tgoandrex"}, createdAt: "August 6, 3:00", content: "Test Photo 2", likes: 1, commentIds: [9, 10] },
  { id: 3, src: goat, description: "A Goat", author: {id: 1, username: "tgoandrex"}, createdAt: "August 7, 1:00", content: "Test Photo 3", likes: 1, commentIds: [11] },
  { id: 4, src: parakeet, description: "A Parakeet", author: {id: 1, username: "tgoandrex"}, createdAt: "August 8, 1:00", content: "Test Photo 4", likes: 1, commentIds: [12, 13, 14] },
  { id: 5, src: penguin, description: "A Penguin", author: {id: 1, username: "tgoandrex"}, createdAt: "August 9, 10:00", content: "Test Photo 5", likes: 1, commentIds: [15, 16, 17, 18] }
];

// (Only temporary while backend is disabled)
export const comments = [
  { id: 1, author: {id: 2, username: "guy123"}, createdAt: "August 5, 2:25", content: "Test Comment 1", likes: 2 },
  { id: 2, author: {id: 2, username: "guy123"}, createdAt: "August 6, 12:25", content: "Test Comment 2", likes: 1 },
  { id: 3, author: {id: 2, username: "guy123"}, createdAt: "August 6, 1:35", content: "Test Comment 3", likes: 1 },
  { id: 4, author: {id: 2, username: "guy123"}, createdAt: "August 6, 5:00", content: "Test Comment 4", likes: 0 },
  { id: 5, author: {id: 2, username: "guy123"}, createdAt: "August 6, 7:25", content: "Test Comment 5", likes: 0 },
  { id: 6, author: {id: 2, username: "guy123"}, createdAt: "August 8, 7:25", content: "Test Comment 6", likes: 1 },
  { id: 7, author: {id: 2, username: "guy123"}, createdAt: "August 8, 9:50", content: "Test Comment 7", likes: 0 },
  { id: 8, author: {id: 2, username: "guy123"}, createdAt: "August 9, 1:10", content: "Test Comment 8", likes: 3 },
  { id: 9, author: {id: 2, username: "guy123"}, createdAt: "August 5, 5:10", content: "Test Comment 9", likes: 2 },
  { id: 10, author: {id: 2, username: "guy123"}, createdAt: "August 6, 8:55", content: "Test Comment 10", likes: 2 },
  { id: 11, author: {id: 2, username: "guy123"}, createdAt: "August 7, 5:00", content: "Test Comment 11", likes: 2 },
  { id: 12, author: {id: 2, username: "guy123"}, createdAt: "August 8, 2:30", content: "Test Comment 12", likes: 2 },
  { id: 13, author: {id: 2, username: "guy123"}, createdAt: "August 8, 7:45", content: "Test Comment 13", likes: 2 },
  { id: 14, author: {id: 2, username: "guy123"}, createdAt: "August 8, 9:10", content: "Test Comment 14", likes: 2 },
  { id: 15, author: {id: 2, username: "guy123"}, createdAt: "August 9, 10:45", content: "Test Comment 15", likes: 2 },
  { id: 16, author: {id: 2, username: "guy123"}, createdAt: "August 9, 11:45", content: "Test Comment 16", likes: 2 },
  { id: 17, author: {id: 2, username: "guy123"}, createdAt: "August 9, 11:55", content: "Test Comment 17", likes: 2 },
  { id: 18, author: {id: 2, username: "guy123"}, createdAt: "August 9, 7:45", content: "Test Comment 18", likes: 2 }
];

// (Only temporary while backend is disabled)
export const reports = [
  { id: 1, type: "Offensive Content", reporterMessage: "Test Report 1", reporter: {id: 1, username: "tgoandrex"}, reportedEntity: {id: 1, type: "post"}, resolved: false, adminMessage: "", createdAt: "August 2, 12:00"},
  { id: 2, type: "Other", reporterMessage: "Test Report 2", reporter: {id: 1, username: "tgoandrex"}, reportedEntity: {id: 2, type: "comment"}, resolved: false, adminMessage: "", createdAt: "August 3, 1:45"},
  { id: 3, type: "Threats or Violence", reporterMessage: "Test Report 3", reporter: {id: 1, username: "tgoandrex"}, reportedEntity: {id: 4, type: "post"}, resolved: false, adminMessage: "", createdAt: "August 4, 2:00"},
  { id: 4, type: "Other", reporterMessage: "Test Report 4", reporter: {id: 1, username: "tgoandrex"}, reportedEntity: {id: 3, type: "photo"}, resolved: true, adminMessage: "Test 4", createdAt: "August 5, 7:10"},
];