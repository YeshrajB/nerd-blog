type Role = 'admin' | 'editor' | 'author' | 'user';

interface Permission {
  id: string;
  action: 'Create' | 'View' | 'Update' | 'Delete';
  resource: 'Post' | 'User' | 'Comment' | 'Tag';
}


// export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
//   admin: [
//     { action: 'create', resource: 'post' },
//     { action: 'read', resource: 'post' },
//     { action: 'update', resource: 'post' },
//     { action: 'delete', resource: 'post' },
//     { action: 'create', resource: 'user' },
//     { action: 'read', resource: 'user' },
//     { action: 'update', resource: 'user' },
//     { action: 'delete', resource: 'user' },
//     { action: 'create', resource: 'comment' },
//     { action: 'read', resource: 'comment' },
//     { action: 'update', resource: 'comment' },
//     { action: 'delete', resource: 'comment' },
//     { action: 'create', resource: 'tag' },
//     { action: 'read', resource: 'tag' },
//     { action: 'update', resource: 'tag' },
//     { action: 'delete', resource: 'tag' },
//   ],
//   editor: [
//     // Editors can manage posts and comments
//     { action: 'create', resource: 'post' },
//     { action: 'read', resource: 'post' },
//     { action: 'update', resource: 'post' },
//     { action: 'delete', resource: 'post' },
//     { action: 'read', resource: 'user' },
//     { action: 'create', resource: 'comment' },
//     { action: 'read', resource: 'comment' },
//     { action: 'update', resource: 'comment' },
//     { action: 'delete', resource: 'comment' },
//     { action: 'create', resource: 'tag' },
//     { action: 'read', resource: 'tag' },
//     { action: 'update', resource: 'tag' },
//   ],
//   author: [
//     // Authors can manage their own posts
//     { action: 'create', resource: 'post' },
//     { action: 'read', resource: 'post' },
//     { action: 'update', resource: 'post' },
//     { action: 'read', resource: 'user' },
//     { action: 'create', resource: 'comment' },
//     { action: 'read', resource: 'comment' },
//     { action: 'create', resource: 'tag' },
//     { action: 'read', resource: 'tag' },
//   ],
//   user: [
//     // Regular users can read posts and manage their own comments
//     { action: 'read', resource: 'post' },
//     { action: 'read', resource: 'user' },
//     { action: 'create', resource: 'comment' },
//     { action: 'read', resource: 'comment' },
//     { action: 'read', resource: 'tag' },
//   ],
// };

// export type { Role, Permission };