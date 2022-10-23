/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation Register($email: String!, $username: String!) {\n    createUser(\n      email: $email\n      username: $username\n    ) {\n      success\n      errors\n      user {\n        email\n        username\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  query getUserQuery($email: String!) {\n    getUser(email: $email) {\n      errors\n      success\n      user {\n        displayImg\n        username\n        email\n        bio\n      }\n    }\n  }\n": types.GetUserQueryDocument,
    "\n  mutation updateUserQuery(\n    $email: String!\n    $username: String\n    $bio: String\n    $displayImg: String\n  ) {\n    updateUser(\n      username: $username\n      bio: $bio\n      displayImg: $displayImg\n      email: $email\n    ) {\n      errors\n      success\n    }\n  }\n": types.UpdateUserQueryDocument,
};

export function graphql(source: "\n  mutation Register($email: String!, $username: String!) {\n    createUser(\n      email: $email\n      username: $username\n    ) {\n      success\n      errors\n      user {\n        email\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($email: String!, $username: String!) {\n    createUser(\n      email: $email\n      username: $username\n    ) {\n      success\n      errors\n      user {\n        email\n        username\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query getUserQuery($email: String!) {\n    getUser(email: $email) {\n      errors\n      success\n      user {\n        displayImg\n        username\n        email\n        bio\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUserQuery($email: String!) {\n    getUser(email: $email) {\n      errors\n      success\n      user {\n        displayImg\n        username\n        email\n        bio\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateUserQuery(\n    $email: String!\n    $username: String\n    $bio: String\n    $displayImg: String\n  ) {\n    updateUser(\n      username: $username\n      bio: $bio\n      displayImg: $displayImg\n      email: $email\n    ) {\n      errors\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation updateUserQuery(\n    $email: String!\n    $username: String\n    $bio: String\n    $displayImg: String\n  ) {\n    updateUser(\n      username: $username\n      bio: $bio\n      displayImg: $displayImg\n      email: $email\n    ) {\n      errors\n      success\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;