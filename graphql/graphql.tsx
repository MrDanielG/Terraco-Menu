import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** Dinero scalar type to represent money */
  Dinero: any;
};



/** A dish describing an option for consumers. */
export type Dish = {
  __typename?: 'Dish';
  _id: Scalars['String'];
  /** The name shown to costumers . */
  name: Scalars['String'];
  /** A short description about this dish. */
  description: Scalars['String'];
  /** An optional image URL to represent this dish. */
  url_img?: Maybe<Scalars['String']>;
  /** The final price to the consumer. */
  price: Scalars['Dinero'];
  /** The average rating of the dish. */
  score?: Maybe<Scalars['Float']>;
  /** List of dish categories as simple strings, i.e. "drinks", "salads", etc. */
  categories: Array<Scalars['String']>;
  preparation_time?: Maybe<Scalars['DateTime']>;
};

/** Partial dish data used as query or mutation input. */
export type DishDataInput = {
  /** The name shown to costumers . */
  name: Scalars['String'];
  /** A short description about this dish. */
  description: Scalars['String'];
  /** An optional image URL to represent this dish. */
  url_img?: Maybe<Scalars['String']>;
  /** The final price to the consumer. */
  price: Scalars['Dinero'];
  /** List of dish categories as simple strings, i.e. "drinks", "salads", etc. */
  categories: Array<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

/** A menu is an aggregation of dishes. */
export type Menu = {
  __typename?: 'Menu';
  _id: Scalars['String'];
  /** The title of this menu. */
  title: Scalars['String'];
  /** A short description about this menu. */
  description: Scalars['String'];
  /** An optional image URL to represent this menu. */
  url_img?: Maybe<Scalars['String']>;
  /** Weather the menu is active or not. Could be used to show or hide it */
  isActive: Scalars['Boolean'];
  /** List of dishes associated with this menu. */
  dishes: Array<Dish>;
};

/** Partial menu data used as query or mutation input. */
export type MenuDataInput = {
  title: Scalars['String'];
  /** A short description about this menu. */
  description?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  url_img?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  updateUser: User;
  delUserById: Scalars['Int'];
  delUserByEmail: Scalars['Int'];
  login: LoginResponse;
  addRole: Role;
  updateRole: Role;
  delRoleById: Scalars['Boolean'];
  delRoleByName: Scalars['Boolean'];
  addMenu: Menu;
  addDishToMenu: Menu;
  removeDishFromMenu: Menu;
  updateMenu: Menu;
  delMenuById: Scalars['Int'];
  addDish: Dish;
  updateDish: Dish;
  delDishById: Scalars['Int'];
  generateTable: Table;
  setTableName: Table;
  delTableById: Scalars['Int'];
  createOrder: Order;
  addItemToOrder: Order;
  delItemFromOrder: Order;
  createOrderItem: OrderItem;
  sumToOrderItem: OrderItem;
  delOrderItemById: Scalars['Int'];
  generateTicket: Ticket;
};


export type MutationAddUserArgs = {
  data: UserDataInput;
};


export type MutationUpdateUserArgs = {
  data: UserDataInput;
  id: Scalars['String'];
};


export type MutationDelUserByIdArgs = {
  id: Scalars['String'];
};


export type MutationDelUserByEmailArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddRoleArgs = {
  data: RoleDataInput;
};


export type MutationUpdateRoleArgs = {
  data: RoleDataInput;
  id: Scalars['String'];
};


export type MutationDelRoleByIdArgs = {
  id: Scalars['String'];
};


export type MutationDelRoleByNameArgs = {
  name: Scalars['String'];
};


export type MutationAddMenuArgs = {
  data: MenuDataInput;
};


export type MutationAddDishToMenuArgs = {
  idDish: Scalars['String'];
  idMenu: Scalars['String'];
};


export type MutationRemoveDishFromMenuArgs = {
  idDish: Scalars['String'];
  idMenu: Scalars['String'];
};


export type MutationUpdateMenuArgs = {
  data: MenuDataInput;
  id: Scalars['String'];
};


export type MutationDelMenuByIdArgs = {
  id: Scalars['String'];
};


export type MutationAddDishArgs = {
  data: DishDataInput;
};


export type MutationUpdateDishArgs = {
  data: DishDataInput;
  id: Scalars['String'];
};


export type MutationDelDishByIdArgs = {
  id: Scalars['String'];
};


export type MutationGenerateTableArgs = {
  name: Scalars['String'];
};


export type MutationSetTableNameArgs = {
  name: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDelTableByIdArgs = {
  id: Scalars['String'];
};


export type MutationCreateOrderArgs = {
  tableId: Scalars['String'];
};


export type MutationAddItemToOrderArgs = {
  orderId: Scalars['String'];
  orderItemId: Scalars['String'];
};


export type MutationDelItemFromOrderArgs = {
  orderId: Scalars['String'];
  orderItemId: Scalars['String'];
};


export type MutationCreateOrderItemArgs = {
  dishId: Scalars['String'];
  quantity: Scalars['Float'];
};


export type MutationSumToOrderItemArgs = {
  idOrderItem: Scalars['String'];
  value?: Maybe<Scalars['Int']>;
};


export type MutationDelOrderItemByIdArgs = {
  id: Scalars['String'];
};


export type MutationGenerateTicketArgs = {
  vat?: Maybe<Scalars['Float']>;
  paymentMethod?: Maybe<Scalars['String']>;
  orderId: Scalars['String'];
};

/** A restaurant order. */
export type Order = {
  __typename?: 'Order';
  _id: Scalars['String'];
  orderNumber: Scalars['Float'];
  table: Table;
  items: Array<OrderItem>;
  start_time: Scalars['DateTime'];
  end_time?: Maybe<Scalars['DateTime']>;
};

/** An order's entry item. */
export type OrderItem = {
  __typename?: 'OrderItem';
  _id: Scalars['String'];
  /** The recorded dish name. */
  dish: Dish;
  /** Units ordered by the customer. */
  quantity: Scalars['Float'];
  /** Whether if this order item can be edited */
  canChange: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  userById?: Maybe<User>;
  userByEmail?: Maybe<User>;
  roles: Array<Role>;
  roleByName: Role;
  menus: Array<Menu>;
  menuById?: Maybe<Menu>;
  dishes: Array<Dish>;
  dishById?: Maybe<Dish>;
  serchDishes?: Maybe<Array<Dish>>;
  tables: Array<Table>;
  tableById: Table;
  tableByIdNumber: Table;
  orders: Array<Order>;
  orderById: Order;
  orderItems: Array<OrderItem>;
  tickets: Array<Ticket>;
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryRoleByNameArgs = {
  name: Scalars['String'];
};


export type QueryMenuByIdArgs = {
  id: Scalars['String'];
};


export type QueryDishByIdArgs = {
  id: Scalars['String'];
};


export type QuerySerchDishesArgs = {
  searchTerms: Scalars['String'];
};


export type QueryTableByIdArgs = {
  id: Scalars['String'];
};


export type QueryTableByIdNumberArgs = {
  idNumber: Scalars['Float'];
};


export type QueryOrderByIdArgs = {
  id: Scalars['String'];
};

/** Permissions group that can be assigned to an User. */
export type Role = {
  __typename?: 'Role';
  _id: Scalars['String'];
  /** The unique name of this group. */
  name: Scalars['String'];
  /** A list of permission string constants. */
  permissions: Array<Scalars['String']>;
};

/** Partial role data used as query or mutation input. */
export type RoleDataInput = {
  name: Scalars['String'];
  permissions: Array<Scalars['String']>;
};

export type Table = {
  __typename?: 'Table';
  _id: Scalars['String'];
  /** The unique table number identificator. */
  tableNumber: Scalars['Float'];
  /** A descriptive name for this table. */
  name?: Maybe<Scalars['String']>;
  /** Stored token to build an obfuscated URL. */
  token: Scalars['String'];
  /** Wheather the table is enabled or not. */
  enabled: Scalars['Boolean'];
};

/** Generated Ticked from an order */
export type Ticket = {
  __typename?: 'Ticket';
  _id: Scalars['String'];
  orderId: Scalars['String'];
  /** Unique number for this selling transaction. */
  ticketNumber: Scalars['Float'];
  /** When the ticket was generated. */
  timestamp: Scalars['DateTime'];
  /** Registered table name or identifier. */
  tableName: Scalars['String'];
  total: Scalars['Dinero'];
  /** The payment method used by the customer. */
  paymentMethod: Scalars['String'];
  /** Value Added Tax */
  vat: Scalars['Float'];
  items: Array<TicketItem>;
};

/** A ticket entry item to register costumer consume. */
export type TicketItem = {
  __typename?: 'TicketItem';
  _id: Scalars['String'];
  /** Units sold to customer */
  quantity: Scalars['Float'];
  /** The dish name at selling time. */
  dishName: Scalars['String'];
  /** The dish price at selling time. */
  dishPrice: Scalars['Dinero'];
  /** The result of dishPrice times quantity. */
  amount: Scalars['Dinero'];
};

/** User profile data. */
export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Role>;
};

/** Partial user data used as query or mutation input. */
export type UserDataInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  loginPassword: Scalars['String'];
  loginEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type AddMenuMutationVariables = Exact<{
  addMenuData: MenuDataInput;
}>;


export type AddMenuMutation = { __typename?: 'Mutation', addMenu: { __typename?: 'Menu', _id: string, title: string, description: string, url_img?: Maybe<string>, isActive: boolean } };

export type AddDishMutationVariables = Exact<{
  addDishData: DishDataInput;
}>;


export type AddDishMutation = { __typename?: 'Mutation', addDish: { __typename?: 'Dish', _id: string, name: string, description: string, url_img?: Maybe<string>, price: any, preparation_time?: Maybe<any>, categories: Array<string> } };

export type AddDishToMenuMutationVariables = Exact<{
  addDishToMenuIdDish: Scalars['String'];
  addDishToMenuIdMenu: Scalars['String'];
}>;


export type AddDishToMenuMutation = { __typename?: 'Mutation', addDishToMenu: { __typename?: 'Menu', _id: string, title: string, dishes: Array<{ __typename?: 'Dish', _id: string, name: string, price: any }> } };

export type GetUserByEmailQueryVariables = Exact<{
  userByEmailEmail: Scalars['String'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail?: Maybe<{ __typename?: 'User', _id: string, email: string, name: string, roles: Array<{ __typename?: 'Role', name: string, _id: string }> }> };

export type GetMenusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenusQuery = { __typename?: 'Query', menus: Array<{ __typename?: 'Menu', _id: string, title: string, isActive: boolean, description: string, url_img?: Maybe<string> }> };


export const LoginDocument = gql`
    mutation Login($loginPassword: String!, $loginEmail: String!) {
  login(password: $loginPassword, email: $loginEmail) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginPassword: // value for 'loginPassword'
 *      loginEmail: // value for 'loginEmail'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const AddMenuDocument = gql`
    mutation AddMenu($addMenuData: MenuDataInput!) {
  addMenu(data: $addMenuData) {
    _id
    title
    description
    url_img
    isActive
  }
}
    `;
export type AddMenuMutationFn = Apollo.MutationFunction<AddMenuMutation, AddMenuMutationVariables>;

/**
 * __useAddMenuMutation__
 *
 * To run a mutation, you first call `useAddMenuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMenuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMenuMutation, { data, loading, error }] = useAddMenuMutation({
 *   variables: {
 *      addMenuData: // value for 'addMenuData'
 *   },
 * });
 */
export function useAddMenuMutation(baseOptions?: Apollo.MutationHookOptions<AddMenuMutation, AddMenuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMenuMutation, AddMenuMutationVariables>(AddMenuDocument, options);
      }
export type AddMenuMutationHookResult = ReturnType<typeof useAddMenuMutation>;
export type AddMenuMutationResult = Apollo.MutationResult<AddMenuMutation>;
export type AddMenuMutationOptions = Apollo.BaseMutationOptions<AddMenuMutation, AddMenuMutationVariables>;
export const AddDishDocument = gql`
    mutation AddDish($addDishData: DishDataInput!) {
  addDish(data: $addDishData) {
    _id
    name
    description
    url_img
    price
    preparation_time
    categories
  }
}
    `;
export type AddDishMutationFn = Apollo.MutationFunction<AddDishMutation, AddDishMutationVariables>;

/**
 * __useAddDishMutation__
 *
 * To run a mutation, you first call `useAddDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDishMutation, { data, loading, error }] = useAddDishMutation({
 *   variables: {
 *      addDishData: // value for 'addDishData'
 *   },
 * });
 */
export function useAddDishMutation(baseOptions?: Apollo.MutationHookOptions<AddDishMutation, AddDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDishMutation, AddDishMutationVariables>(AddDishDocument, options);
      }
export type AddDishMutationHookResult = ReturnType<typeof useAddDishMutation>;
export type AddDishMutationResult = Apollo.MutationResult<AddDishMutation>;
export type AddDishMutationOptions = Apollo.BaseMutationOptions<AddDishMutation, AddDishMutationVariables>;
export const AddDishToMenuDocument = gql`
    mutation AddDishToMenu($addDishToMenuIdDish: String!, $addDishToMenuIdMenu: String!) {
  addDishToMenu(idDish: $addDishToMenuIdDish, idMenu: $addDishToMenuIdMenu) {
    _id
    title
    dishes {
      _id
      name
      price
    }
  }
}
    `;
export type AddDishToMenuMutationFn = Apollo.MutationFunction<AddDishToMenuMutation, AddDishToMenuMutationVariables>;

/**
 * __useAddDishToMenuMutation__
 *
 * To run a mutation, you first call `useAddDishToMenuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDishToMenuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDishToMenuMutation, { data, loading, error }] = useAddDishToMenuMutation({
 *   variables: {
 *      addDishToMenuIdDish: // value for 'addDishToMenuIdDish'
 *      addDishToMenuIdMenu: // value for 'addDishToMenuIdMenu'
 *   },
 * });
 */
export function useAddDishToMenuMutation(baseOptions?: Apollo.MutationHookOptions<AddDishToMenuMutation, AddDishToMenuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDishToMenuMutation, AddDishToMenuMutationVariables>(AddDishToMenuDocument, options);
      }
export type AddDishToMenuMutationHookResult = ReturnType<typeof useAddDishToMenuMutation>;
export type AddDishToMenuMutationResult = Apollo.MutationResult<AddDishToMenuMutation>;
export type AddDishToMenuMutationOptions = Apollo.BaseMutationOptions<AddDishToMenuMutation, AddDishToMenuMutationVariables>;
export const GetUserByEmailDocument = gql`
    query getUserByEmail($userByEmailEmail: String!) {
  userByEmail(email: $userByEmailEmail) {
    _id
    email
    name
    roles {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetUserByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByEmailQuery({
 *   variables: {
 *      userByEmailEmail: // value for 'userByEmailEmail'
 *   },
 * });
 */
export function useGetUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
      }
export function useGetUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export type GetUserByEmailQueryHookResult = ReturnType<typeof useGetUserByEmailQuery>;
export type GetUserByEmailLazyQueryHookResult = ReturnType<typeof useGetUserByEmailLazyQuery>;
export type GetUserByEmailQueryResult = Apollo.QueryResult<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const GetMenusDocument = gql`
    query GetMenus {
  menus {
    _id
    title
    isActive
    description
    url_img
  }
}
    `;

/**
 * __useGetMenusQuery__
 *
 * To run a query within a React component, call `useGetMenusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMenusQuery(baseOptions?: Apollo.QueryHookOptions<GetMenusQuery, GetMenusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMenusQuery, GetMenusQueryVariables>(GetMenusDocument, options);
      }
export function useGetMenusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenusQuery, GetMenusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMenusQuery, GetMenusQueryVariables>(GetMenusDocument, options);
        }
export type GetMenusQueryHookResult = ReturnType<typeof useGetMenusQuery>;
export type GetMenusLazyQueryHookResult = ReturnType<typeof useGetMenusLazyQuery>;
export type GetMenusQueryResult = Apollo.QueryResult<GetMenusQuery, GetMenusQueryVariables>;