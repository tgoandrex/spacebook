export const navLinksAuthenticated = [
  { href: "", label: "Login", modal: true },
  { href: "", label: "Register", modal: true }
];

export const navLinksUnauthenticated = [
  { href: "/user/1", label: "Profile", modal: false },
  { href: "/logout", label: "Log Out", modal: false }
];

export const authFormFields = [
  { label: "Email", type: "email" },
  { label: "Password", type: "password" }
]

// (Only temporary while backend is disabled)
export const posts = [
  { id: 1, authorEmail: "tgoandrex@gmail.com", createdAt: "August 5, 12:00", content: "Test Post 1", likes: 2, comments: [
    {id: 1, authorEmail: "guy123@hotmail.com", createdAt: "August 5, 2:25", content: "Test Comment 1", likes: 2}
  ] },
  { id: 2, authorEmail: "tgoandrex@gmail.com", createdAt: "August 6, 11:00", content: "Test Post 2", likes: 0, comments: [
    {id: 2, authorEmail: "guy123@hotmail.com", createdAt: "August 6, 12:25", content: "Test Comment 2", likes: 1},
    {id: 3, authorEmail: "guy123@hotmail.com", createdAt: "August 6, 1:35", content: "Test Comment 3", likes: 1},
    {id: 4, authorEmail: "guy123@hotmail.com", createdAt: "August 6, 5:00", content: "Test Comment 4", likes: 0},
    {id: 5, authorEmail: "guy123@hotmail.com", createdAt: "August 6, 7:25", content: "Test Comment 5", likes: 0},
  ] },
  { id: 3, authorEmail: "tgoandrex@gmail.com", createdAt: "August 7, 2:00", content: "Test Post 3", likes: 4, comments: [
  ] },
  { id: 4, authorEmail: "tgoandrex@gmail.com", createdAt: "August 8, 4:40", content: "Test Post 4", likes: 1, comments: [
    {id: 6, authorEmail: "guy123@hotmail.com", createdAt: "August 8, 7:25", content: "Test Comment 6", likes: 1},
    {id: 7, authorEmail: "guy123@hotmail.com", createdAt: "August 8, 9:50", content: "Test Comment 7", likes: 0}
  ] },
  { id: 5, authorEmail: "tgoandrex@gmail.com", createdAt: "August 9, 1:00", content: "Test Post 5", likes: 7, comments: [
    {id: 8, authorEmail: "guy123@hotmail.com", createdAt: "August 9, 1:10", content: "Test Comment 8", likes: 3}
  ] }
]