/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  place: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  type: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  fileName: Scalars['String'];
  id: Scalars['ID'];
};

export type Listing = {
  __typename?: 'Listing';
  address: Address;
  canPayBank: Scalars['Boolean'];
  canPayCash: Scalars['Boolean'];
  canTrade: Scalars['Boolean'];
  description: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Maybe<Image>>;
  isSellListing: Scalars['Boolean'];
  materials: Array<Maybe<Material>>;
  priceMax: Scalars['Float'];
  priceMin: Scalars['Float'];
  status: Scalars['Int'];
  title: Scalars['String'];
  user: User;
  volume: Scalars['Float'];
  wantToTradeFor: Array<Maybe<Category>>;
  weight: Scalars['Float'];
};

export type ListingResult = {
  __typename?: 'ListingResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  listing?: Maybe<Listing>;
  success: Scalars['Boolean'];
};

export type ListingsResult = {
  __typename?: 'ListingsResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  listings?: Maybe<Array<Maybe<Listing>>>;
  success: Scalars['Boolean'];
};

export type Material = {
  __typename?: 'Material';
  type?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createListing: ListingResult;
  createUser: UserResult;
  deleteListing: ListingResult;
  deleteUser: UserResult;
  updateListing: ListingResult;
  updateUser: UserResult;
};


export type MutationCreateListingArgs = {
  address: Scalars['String'];
  canPayBank: Scalars['Boolean'];
  canPayCash: Scalars['Boolean'];
  canTrade: Scalars['Boolean'];
  description: Scalars['String'];
  images: Array<InputMaybe<Scalars['String']>>;
  isSellListing: Scalars['Boolean'];
  materials: Array<InputMaybe<Scalars['String']>>;
  priceMax: Scalars['Float'];
  priceMin: Scalars['Float'];
  status: Scalars['String'];
  title: Scalars['String'];
  userEmail: Scalars['String'];
  volume?: InputMaybe<Scalars['Float']>;
  wantToTradeFor: Array<InputMaybe<Scalars['String']>>;
  weight?: InputMaybe<Scalars['Float']>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteListingArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  email: Scalars['String'];
};


export type MutationUpdateListingArgs = {
  address?: InputMaybe<Scalars['String']>;
  canPayBank?: InputMaybe<Scalars['Boolean']>;
  canPayCash?: InputMaybe<Scalars['Boolean']>;
  canTrade?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  isSellListing?: InputMaybe<Scalars['Boolean']>;
  materials?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  priceMax?: InputMaybe<Scalars['Float']>;
  priceMin?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  volume?: InputMaybe<Scalars['Float']>;
  wantToTradeFor?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  weight?: InputMaybe<Scalars['Float']>;
};


export type MutationUpdateUserArgs = {
  address?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  displayImg?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  preferredDistance?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getListing: ListingResult;
  getUser: UserResult;
  listListings: ListingsResult;
  listUsers: UsersResult;
};


export type QueryGetListingArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserArgs = {
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Address>;
  bio: Scalars['String'];
  displayImg: Scalars['String'];
  email: Scalars['String'];
  preferredDistance: Scalars['Int'];
  username: Scalars['String'];
};

export type UserResult = {
  __typename?: 'UserResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type UsersResult = {
  __typename?: 'UsersResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success: Scalars['Boolean'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResult', success: boolean, errors?: Array<string | null> | null, user?: { __typename?: 'User', email: string, username: string } | null } };

export type GetUserQueryQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserQueryQuery = { __typename?: 'Query', getUser: { __typename?: 'UserResult', errors?: Array<string | null> | null, success: boolean, user?: { __typename?: 'User', displayImg: string, username: string, email: string, bio: string } | null } };

export type UpdateUserQueryMutationVariables = Exact<{
  email: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  displayImg?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserQueryMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResult', errors?: Array<string | null> | null, success: boolean } };


export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayImg"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQueryQuery, GetUserQueryQueryVariables>;
export const UpdateUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bio"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayImg"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"bio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bio"}}},{"kind":"Argument","name":{"kind":"Name","value":"displayImg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayImg"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UpdateUserQueryMutation, UpdateUserQueryMutationVariables>;