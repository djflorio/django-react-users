from rest_framework import permissions


class IsUserOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Only allow request if the user matches to object user,
        # or if user is admin.
        return obj.id == request.user.id or request.user.is_staff
