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


// (Only temporary while backend is disabled)
export const users = [
  { id: 1, username: "tgoandrex", role: "Admin", createdAt: new Date("August 2, 12:00"), restricted: false, followers: [{id: 2, username: "guy123"}]},
  { id: 2, username: "guy123", role: "User", createdAt: new Date("August 3, 11:00"), restricted: false, followers: [{id: 1, username: "tgoandrex"}]}
];

// (Only temporary while backend is disabled)
export const posts = [
  { id: 1, author: {id: 1, username: "tgoandrex"}, createdAt: new Date("August 5, 12:00"), content: "Test Post 1", likes:  [{userId: 1, postId: 1, createdAt: new Date("August 5, 2:25")}], commentIds: [1] },
  { id: 2, author: {id: 1, username: "tgoandrex"}, createdAt: new Date("August 6, 11:00"), content: "Test Post 2", likes: [{userId: 1, postId: 1, createdAt: new Date("August 5, 2:25")}], commentIds: [2, 3, 4, 5] },
  { id: 3, author: {id: 1, username: "tgoandrex"}, createdAt: new Date("August 7, 2:00"), content: "Test Post 3", likes: [{userId: 1, postId: 1, createdAt: new Date("August 5, 2:25")}], commentIds: [] },
  { id: 4, author: {id: 1, username: "tgoandrex"}, createdAt: new Date("August 8, 4:40"), content: "Test Post 4", likes: [{userId: 1, postId: 1, createdAt: new Date("August 5, 2:25")}], commentIds: [6, 7] },
  { id: 5, author: {id: 1, username: "tgoandrex"}, createdAt: new Date("August 9, 1:00"), content: "Test Post 5", likes: [{userId: 1, postId: 1, createdAt: new Date("August 5, 2:25")}], commentIds: [8] }
];

// (Only temporary while backend is disabled)
export const photos = [
  { id: 1, url: "/cow", description: "A Cow", author: {id: 1, username: "tgoandrex"}, createdAt: new Date("August 5, 4:00"), content: "Test Photo 1", likes: [{userId: 1, photoId: 1, createdAt: new Date("August 5, 2:25")}], commentIds: [] },
  { id: 2, url: "/duck", description: "A Duck", author: {id: 1, username: "tgoandrex"}, createdAt: new Date("August 6, 3:00"), content: "Test Photo 2", likes: [{userId: 1, photoId: 1, createdAt: new Date("August 5, 2:25")}], commentIds: [9, 10] },
  { id: 3, url: "/goat", description: "A Goat", author: {id: 1, username: "tgoandrex"}, createdAt: new Date("August 7, 1:00"), content: "Test Photo 3", likes: [{userId: 1, photoId: 1, createdAt: new Date("August 5, 2:25")}], commentIds: [11] },
  { id: 4, url: "/parakeet", description: "A Parakeet", author: {id: 1, username: "tgoandrex"}, createdAt: new Date("August 8, 1:00"), content: "Test Photo 4", likes: [{userId: 1, photoId: 1, createdAt: new Date("August 5, 2:25")}], commentIds: [12, 13, 14] },
  { id: 5, url: "/penguin", description: "A Penguin", author: {id: 1, username: "tgoandrex"}, createdAt: new Date("August 9, 10:00"), content: "Test Photo 5", likes: [{userId: 1, photoId: 1, createdAt: new Date("August 5, 2:25")}], commentIds: [15, 16, 17, 18] }
];

// (Only temporary while backend is disabled)
export const comments = [
  { id: 1, author: {id: 2, username: "guy123"}, createdAt: new Date("August 5, 2:25"), content: "Test Comment 1", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 2, author: {id: 2, username: "guy123"}, createdAt: new Date("August 6, 12:25"), content: "Test Comment 2", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 3, author: {id: 2, username: "guy123"}, createdAt: new Date("August 6, 1:35"), content: "Test Comment 3", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 4, author: {id: 2, username: "guy123"}, createdAt: new Date("August 6, 5:00"), content: "Test Comment 4", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 5, author: {id: 2, username: "guy123"}, createdAt: new Date("August 6, 7:25"), content: "Test Comment 5", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 6, author: {id: 2, username: "guy123"}, createdAt: new Date("August 8, 7:25"), content: "Test Comment 6", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 7, author: {id: 2, username: "guy123"}, createdAt: new Date("August 8, 9:50"), content: "Test Comment 7", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 8, author: {id: 2, username: "guy123"}, createdAt: new Date("August 9, 1:10"), content: "Test Comment 8", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 9, author: {id: 2, username: "guy123"}, createdAt: new Date("August 5, 5:10"), content: "Test Comment 9", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 10, author: {id: 2, username: "guy123"}, createdAt: new Date("August 6, 8:55"), content: "Test Comment 10", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 11, author: {id: 2, username: "guy123"}, createdAt: new Date("August 7, 5:00"), content: "Test Comment 11", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 12, author: {id: 2, username: "guy123"}, createdAt: new Date("August 8, 2:30"), content: "Test Comment 12", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 13, author: {id: 2, username: "guy123"}, createdAt: new Date("August 8, 7:45"), content: "Test Comment 13", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 14, author: {id: 2, username: "guy123"}, createdAt: new Date("August 8, 9:10"), content: "Test Comment 14", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 15, author: {id: 2, username: "guy123"}, createdAt: new Date("August 9, 10:45"), content: "Test Comment 15", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 16, author: {id: 2, username: "guy123"}, createdAt: new Date("August 9, 11:45"), content: "Test Comment 16", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 17, author: {id: 2, username: "guy123"}, createdAt: new Date("August 9, 11:55"), content: "Test Comment 17", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] },
  { id: 18, author: {id: 2, username: "guy123"}, createdAt: new Date("August 9, 7:45"), content: "Test Comment 18", likes:  [{userId: 1, commentId: 1, createdAt: new Date("August 5, 2:25")}] }
];

// (Only temporary while backend is disabled)
export const reports = [
  { id: 1, type: "Offensive Content", reporterMessage: "Test Report 1", reporter: {id: 1, username: "tgoandrex"}, reportedEntity: {id: 1, type: "post"}, resolved: false, adminMessage: "", createdAt: new Date("August 2, 12:00")},
  { id: 2, type: "Other", reporterMessage: "Test Report 2", reporter: {id: 1, username: "tgoandrex"}, reportedEntity: {id: 2, type: "comment"}, resolved: false, adminMessage: "", createdAt: new Date("August 3, 1:45")},
  { id: 3, type: "Threats or Violence", reporterMessage: "Test Report 3", reporter: {id: 1, username: "tgoandrex"}, reportedEntity: {id: 4, type: "post"}, resolved: false, adminMessage: "", createdAt: new Date("August 4, 2:00")},
  { id: 4, type: "Other", reporterMessage: "Test Report 4", reporter: {id: 1, username: "tgoandrex"}, reportedEntity: {id: 3, type: "photo"}, resolved: true, adminMessage: "Test 4", createdAt: new Date("August 5, 7:10")},
];