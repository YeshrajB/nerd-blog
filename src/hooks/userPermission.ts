import { useAuth } from '../contexts/AuthContext';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    admin: [
      { id: 'create', action: 'Create', resource: 'Post' },
      { id: 'view', action: 'View', resource: 'Post' },
      { id: 'update', action: 'Update', resource: 'Post' },
      { id: 'delete', action: 'Delete', resource: 'Post' },
      { id: 'create', action: 'Create', resource: 'User' },
      { id: 'view', action: 'View', resource: 'User' },
      { id: 'update', action: 'Update', resource: 'User' },
      { id: 'delete', action: 'Delete', resource: 'User' },
      { id: 'create', action: 'Create', resource: 'Comment' },
      { id: 'view', action: 'View', resource: 'Comment' },
      { id: 'update', action: 'Update', resource: 'Comment' },
      { id: 'delete', action: 'Delete', resource: 'Comment' },
      { id: 'create', action: 'Create', resource: 'Tag' },
      { id: 'view', action: 'View', resource: 'Tag' },
      { id: 'update', action: 'Update', resource: 'Tag' },
      { id: 'delete', action: 'Delete', resource: 'Tag' },
    ],
    editor: [
      // Editors can manage Posts and Comments
      { id: 'create', action: 'Create', resource: 'Post' },
      { id: 'view', action: 'View', resource: 'Post' },
      { id: 'update', action: 'Update', resource: 'Post' },
      { id: 'delete', action: 'Delete', resource: 'Post' },
      { id: 'view', action: 'View', resource: 'User' },
      { id: 'create', action: 'Create', resource: 'Comment' },
      { id: 'view', action: 'View', resource: 'Comment' },
      { id: 'update', action: 'Update', resource: 'Comment' },
      { id: 'delete', action: 'Delete', resource: 'Comment' },
      { id: 'create', action: 'Create', resource: 'Tag' },
      { id: 'view', action: 'View', resource: 'Tag' },
      { id: 'update', action: 'Update', resource: 'Tag' },
    ],
    author: [
      // Authors can manage their own Posts
      { id: 'create', action: 'Create', resource: 'Post' },
      { id: 'view', action: 'View', resource: 'Post' },
      { id: 'update', action: 'Update', resource: 'Post' },
      { id: 'view', action: 'View', resource: 'User' },
      { id: 'create', action: 'Create', resource: 'Comment' },
      { id: 'view', action: 'View', resource: 'Comment' },
      { id: 'create', action: 'Create', resource: 'Tag' },
      { id: 'view', action: 'View', resource: 'Tag' },
    ],
    user: [
      // Regular users can View Posts and manage their own Comments
      { id: 'view', action: 'View', resource: 'Post' },
      { id: 'view', action: 'View', resource: 'User' },
      { id: 'create', action: 'Create', resource: 'Comment' },
      { id: 'view', action: 'View', resource: 'Comment' },
      { id: 'view', action: 'View', resource: 'Tag' },
    ],
};

export const usePermissions = () => {
  const { user } = useAuth()!;

  const hasPermission = (action: Permission['action'], resource: Permission['resource']) => {
    if (!user) return false;

    return ROLE_PERMISSIONS[user.role].some(permission =>
        permission.action === action && permission.resource === resource
    );
  };

  const hasRole = (role: Role) => {
    return user?.role === role || false;
  };

  return { hasPermission, hasRole };
};