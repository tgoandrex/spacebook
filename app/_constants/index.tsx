export const navLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" }
];

export const authFormFields = [
  { label: "Email", type: "email" },
  { label: "Password", type: "password" }
]

// (Only temporary while backend is disabled)
export const posts = [
  { id: 1, authorEmail: "tgoandrex@gmail.com", createdAt: "August 5, 12:00", content: "Test Post 1", comments: [
    {authorEmail: "guy123@hotmail.com", createdAt: "August 5, 2:25", content: "Test Comment 1"}
  ] },
  { id: 2, authorEmail: "tgoandrex@gmail.com", createdAt: "August 6, 11:00", content: "Test Post 2", comments: [
    {authorEmail: "guy123@hotmail.com", createdAt: "August 6, 12:25", content: "Test Comment 2"},
    {authorEmail: "guy123@hotmail.com", createdAt: "August 6, 1:35", content: "Test Comment 3"},
    {authorEmail: "guy123@hotmail.com", createdAt: "August 6, 5:00", content: "Test Comment 4"},
    {authorEmail: "guy123@hotmail.com", createdAt: "August 6, 7:25", content: "Test Comment 5"},
  ] },
  { id: 3, authorEmail: "tgoandrex@gmail.com", createdAt: "August 7, 2:00", content: "Test Post 3", comments: [
  ] },
  { id: 4, authorEmail: "tgoandrex@gmail.com", createdAt: "August 8, 4:40", content: "Test Post 4", comments: [
    {authorEmail: "guy123@hotmail.com", createdAt: "August 8, 7:25", content: "Test Comment 6"},
    {authorEmail: "guy123@hotmail.com", createdAt: "August 8, 9:50", content: "Test Comment 7"}
  ] },
  { id: 5, authorEmail: "tgoandrex@gmail.com", createdAt: "August 9, 1:00", content: "Test Post 5", comments: [
    {authorEmail: "guy123@hotmail.com", createdAt: "August 9, 1:10", content: "Test Comment 8"}
  ] }
]