import { SetMetadata } from "@nestjs/common";

// Typically reference is 'userId'
// Example usage of CustomPermission Decorator:
// NOTE: roles and reference are both optional but if you use the decorator without none of them, then you are only using the CustomPermission Guard and you can remove the decorator
// @CustomPermission({
//     roles: ['admin'] // optional
//     reference: 'userId' // optional ('id' is default)
// })
export const CustomPermission = (params: { roles?: string[], reference?: string } = { roles: [], reference: 'id' }) => SetMetadata("customPermission", params);
