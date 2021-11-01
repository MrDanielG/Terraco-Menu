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

export type CreateOrderItemsInput = {
  dishId: Scalars['String'];
  quantity: Scalars['Float'];
};

export type DaySalesStats = {
  __typename?: 'DaySalesStats';
  dayOfMonth: Scalars['Int'];
  dayOfWeek: Scalars['Int'];
  month: Scalars['Int'];
  sales?: Maybe<Array<Ticket>>;
  salesCount: Scalars['Int'];
  tableName: Scalars['String'];
  tableNumber: Scalars['Int'];
  totalSum: Scalars['Dinero'];
  year: Scalars['Int'];
};

/** A dish describing an option for consumers. */
export type Dish = {
  __typename?: 'Dish';
  _id: Scalars['String'];
  /** List of dish categories as simple strings, i.e. "drinks", "salads", etc. */
  categories: Array<Scalars['String']>;
  /** A short description about this dish. */
  description: Scalars['String'];
  /** The name shown to costumers . */
  name: Scalars['String'];
  preparation_time?: Maybe<Scalars['DateTime']>;
  /** The final price to the consumer. */
  price: Scalars['Dinero'];
  /** The average rating of the dish. */
  score?: Maybe<Scalars['Float']>;
  /** An optional image URL to represent this dish. */
  url_img?: Maybe<Scalars['String']>;
};

/** Partial dish data used as query or mutation input. */
export type DishDataInput = {
  /** List of dish categories as simple strings, i.e. "drinks", "salads", etc. */
  categories: Array<Scalars['String']>;
  /** A short description about this dish. */
  description: Scalars['String'];
  /** The name shown to costumers . */
  name: Scalars['String'];
  /** The final price to the consumer. */
  price: Scalars['Dinero'];
  /** An optional image URL to represent this dish. */
  url_img?: Maybe<Scalars['String']>;
};

export type DishSalesStats = {
  __typename?: 'DishSalesStats';
  dishName: Scalars['String'];
  month: Scalars['Int'];
  totalSales: Scalars['Dinero'];
  totalUnits: Scalars['Int'];
  year: Scalars['Int'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

/** A menu is an aggregation of dishes. */
export type Menu = {
  __typename?: 'Menu';
  _id: Scalars['String'];
  /** A short description about this menu. */
  description: Scalars['String'];
  /** List of dishes associated with this menu. */
  dishes: Array<Dish>;
  /** Weather the menu is active or not. Could be used to show or hide it */
  isActive: Scalars['Boolean'];
  /** The title of this menu. */
  title: Scalars['String'];
  /** An optional image URL to represent this menu. */
  url_img?: Maybe<Scalars['String']>;
};

/** Partial menu data used as query or mutation input. */
export type MenuDataInput = {
  /** A short description about this menu. */
  description?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  title: Scalars['String'];
  url_img?: Maybe<Scalars['String']>;
};

export type MonthSalesStats = {
  __typename?: 'MonthSalesStats';
  dayOfMonth: Scalars['Int'];
  dayOfWeek: Scalars['Int'];
  month: Scalars['Int'];
  total: Scalars['Dinero'];
  year: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDish: Dish;
  addDishToMenu: Menu;
  addItemsToOrder: Order;
  addMenu: Menu;
  addRole: Role;
  addUser: User;
  changeOrderItemsStatus: Order;
  createOrder: Order;
  createOrderItem: OrderItem;
  createOrderItems: Array<OrderItem>;
  delDishById: Scalars['Int'];
  delItemsFromOrder: Order;
  delMenuById: Scalars['Int'];
  delOrderItemById: Scalars['Int'];
  delRoleById: Scalars['Boolean'];
  delRoleByName: Scalars['Boolean'];
  delTableById: Scalars['Int'];
  delUserByEmail: Scalars['Int'];
  delUserById: Scalars['Int'];
  generateTable: Table;
  generateTicket: Ticket;
  login: LoginResponse;
  removeDishFromMenu: Menu;
  setTableName: Table;
  setTicketStatus?: Maybe<Ticket>;
  sumToOrderItem: OrderItem;
  updateDish: Dish;
  updateMenu: Menu;
  updateRole: Role;
  updateTable: Table;
  updateUser: User;
};


export type MutationAddDishArgs = {
  data: DishDataInput;
};


export type MutationAddDishToMenuArgs = {
  idDish: Scalars['String'];
  idMenu: Scalars['String'];
};


export type MutationAddItemsToOrderArgs = {
  itemsIds: Array<Scalars['String']>;
  orderId: Scalars['String'];
};


export type MutationAddMenuArgs = {
  data: MenuDataInput;
};


export type MutationAddRoleArgs = {
  data: RoleDataInput;
};


export type MutationAddUserArgs = {
  data: UserDataInput;
};


export type MutationChangeOrderItemsStatusArgs = {
  orderId: Scalars['String'];
  status: Status;
};


export type MutationCreateOrderArgs = {
  itemsIds: Array<Scalars['String']>;
  tableId: Scalars['String'];
};


export type MutationCreateOrderItemArgs = {
  dishId: Scalars['String'];
  quantity: Scalars['Float'];
};


export type MutationCreateOrderItemsArgs = {
  items: Array<CreateOrderItemsInput>;
};


export type MutationDelDishByIdArgs = {
  id: Scalars['String'];
};


export type MutationDelItemsFromOrderArgs = {
  itemsIds: Array<Scalars['String']>;
  orderId: Scalars['String'];
};


export type MutationDelMenuByIdArgs = {
  id: Scalars['String'];
};


export type MutationDelOrderItemByIdArgs = {
  id: Scalars['String'];
};


export type MutationDelRoleByIdArgs = {
  id: Scalars['String'];
};


export type MutationDelRoleByNameArgs = {
  name: Scalars['String'];
};


export type MutationDelTableByIdArgs = {
  id: Scalars['String'];
};


export type MutationDelUserByEmailArgs = {
  email: Scalars['String'];
};


export type MutationDelUserByIdArgs = {
  id: Scalars['String'];
};


export type MutationGenerateTableArgs = {
  name: Scalars['String'];
};


export type MutationGenerateTicketArgs = {
  orderId: Scalars['String'];
  paymentMethod?: Maybe<Scalars['String']>;
  vat?: Maybe<Scalars['Float']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveDishFromMenuArgs = {
  idDish: Scalars['String'];
  idMenu: Scalars['String'];
};


export type MutationSetTableNameArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSetTicketStatusArgs = {
  status: TicketStatus;
  tikcetId: Scalars['String'];
};


export type MutationSumToOrderItemArgs = {
  idOrderItem: Scalars['String'];
  value?: Maybe<Scalars['Int']>;
};


export type MutationUpdateDishArgs = {
  data: DishDataInput;
  id: Scalars['String'];
};


export type MutationUpdateMenuArgs = {
  data: MenuDataInput;
  id: Scalars['String'];
};


export type MutationUpdateRoleArgs = {
  data: RoleDataInput;
  id: Scalars['String'];
};


export type MutationUpdateTableArgs = {
  data: TableInputData;
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UserDataInput;
  id: Scalars['String'];
};

/** A restaurant order. */
export type Order = {
  __typename?: 'Order';
  _id: Scalars['String'];
  end_time?: Maybe<Scalars['DateTime']>;
  items: Array<OrderItem>;
  orderNumber: Scalars['Int'];
  start_time: Scalars['DateTime'];
  table: Table;
};

/** An order's entry item. */
export type OrderItem = {
  __typename?: 'OrderItem';
  _id: Scalars['String'];
  /** The recorded dish name. */
  dish: Dish;
  /** Units ordered by the customer. */
  quantity: Scalars['Int'];
  /** Whether if this order is pending, cooking, served, being paid or paid. */
  status: Status;
};

export type Query = {
  __typename?: 'Query';
  daySales: Array<DaySalesStats>;
  dishById?: Maybe<Dish>;
  dishSales: Array<DishSalesStats>;
  dishes: Array<Dish>;
  menuById?: Maybe<Menu>;
  menus: Array<Menu>;
  monthSales: Array<MonthSalesStats>;
  orderById: Order;
  orderItems: Array<OrderItem>;
  orders: Array<Order>;
  roleByName: Role;
  roles: Array<Role>;
  serchDishes?: Maybe<Array<Dish>>;
  tableById?: Maybe<Table>;
  tableByIdNumber?: Maybe<Table>;
  tables: Array<Table>;
  ticketById: Ticket;
  tickets: Array<Ticket>;
  userByEmail?: Maybe<User>;
  userById?: Maybe<User>;
  users: Array<User>;
  yearSales: Array<YearSalesStats>;
};


export type QueryDaySalesArgs = {
  day: Scalars['Float'];
  month: Scalars['Float'];
  status?: Maybe<TicketStatus>;
  timezone: Scalars['String'];
  year: Scalars['Float'];
};


export type QueryDishByIdArgs = {
  id: Scalars['String'];
};


export type QueryDishSalesArgs = {
  status?: Maybe<TicketStatus>;
  timezone: Scalars['String'];
  year: Scalars['Float'];
};


export type QueryMenuByIdArgs = {
  id: Scalars['String'];
};


export type QueryMonthSalesArgs = {
  month: Scalars['Float'];
  status?: Maybe<TicketStatus>;
  timezone: Scalars['String'];
  year: Scalars['Float'];
};


export type QueryOrderByIdArgs = {
  id: Scalars['String'];
};


export type QueryRoleByNameArgs = {
  name: Scalars['String'];
};


export type QuerySerchDishesArgs = {
  searchTerms: Scalars['String'];
};


export type QueryTableByIdArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryTableByIdNumberArgs = {
  idNumber: Scalars['Float'];
};


export type QueryTicketByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryYearSalesArgs = {
  status?: Maybe<TicketStatus>;
  timezone: Scalars['String'];
  year: Scalars['Float'];
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

/** Order and order item status */
export enum Status {
  Beingpaid = 'BEINGPAID',
  Cooking = 'COOKING',
  Paid = 'PAID',
  Pending = 'PENDING',
  Served = 'SERVED'
}

export type Subscription = {
  __typename?: 'Subscription';
  orderChanges: Order;
  ticketChanges: Ticket;
};

export type Table = {
  __typename?: 'Table';
  _id: Scalars['String'];
  /** Wheather the table is enabled or not. */
  enabled: Scalars['Boolean'];
  /** A descriptive name for this table. */
  name?: Maybe<Scalars['String']>;
  /** The unique table number identificator. */
  tableNumber: Scalars['Int'];
  /** Stored token to build an obfuscated URL. */
  token: Scalars['String'];
};

export type TableInputData = {
  /** Wheather the table is enabled or not. */
  enabled?: Maybe<Scalars['Boolean']>;
  /** A descriptive name for this table. */
  name?: Maybe<Scalars['String']>;
  /** The unique table number identificator. */
  tableNumber?: Maybe<Scalars['Int']>;
  /** Stored token to build an obfuscated URL. */
  token?: Maybe<Scalars['String']>;
};

/** Generated Ticked from an order */
export type Ticket = {
  __typename?: 'Ticket';
  _id: Scalars['String'];
  items: Array<TicketItem>;
  orderId: Scalars['String'];
  /** The payment method used by the customer. */
  paymentMethod: Scalars['String'];
  /** Wether if the ticket is being paid, was paid or canceled */
  status: TicketStatus;
  /** Registered table name or identifier. */
  tableName: Scalars['String'];
  /** Registered table number. */
  tableNumber: Scalars['Int'];
  /** Unique number for this selling transaction. */
  ticketNumber: Scalars['Int'];
  /** When the ticket was generated. */
  timestamp: Scalars['DateTime'];
  total: Scalars['Dinero'];
  /** Value Added Tax */
  vat: Scalars['Float'];
};

/** A ticket entry item to register costumer consume. */
export type TicketItem = {
  __typename?: 'TicketItem';
  _id: Scalars['String'];
  /** The result of dishPrice times quantity. */
  amount: Scalars['Dinero'];
  /** The dish name at selling time. */
  dishName: Scalars['String'];
  /** The dish price at selling time. */
  dishPrice: Scalars['Dinero'];
  /** Units sold to customer */
  quantity: Scalars['Float'];
};

/** Ticket status */
export enum TicketStatus {
  Beingpaid = 'BEINGPAID',
  Canceled = 'CANCELED',
  Paid = 'PAID'
}

/** User profile data. */
export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Role>;
};

/** Partial user data used as query or mutation input. */
export type UserDataInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type YearSalesStats = {
  __typename?: 'YearSalesStats';
  month: Scalars['Int'];
  total: Scalars['Dinero'];
  year: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  loginPassword: Scalars['String'];
  loginEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type AddMenuMutationVariables = Exact<{
  addMenuData: MenuDataInput;
}>;


export type AddMenuMutation = { __typename?: 'Mutation', addMenu: { __typename?: 'Menu', _id: string, title: string, description: string, url_img?: string | null | undefined, isActive: boolean } };

export type AddDishMutationVariables = Exact<{
  addDishData: DishDataInput;
}>;


export type AddDishMutation = { __typename?: 'Mutation', addDish: { __typename?: 'Dish', _id: string, name: string, description: string, url_img?: string | null | undefined, price: any, preparation_time?: any | null | undefined, categories: Array<string> } };

export type AddDishToMenuMutationVariables = Exact<{
  addDishToMenuIdDish: Scalars['String'];
  addDishToMenuIdMenu: Scalars['String'];
}>;


export type AddDishToMenuMutation = { __typename?: 'Mutation', addDishToMenu: { __typename?: 'Menu', _id: string, title: string, dishes: Array<{ __typename?: 'Dish', _id: string, name: string, price: any, url_img?: string | null | undefined }> } };

export type GenerateTableMutationVariables = Exact<{
  generateTableName: Scalars['String'];
}>;


export type GenerateTableMutation = { __typename?: 'Mutation', generateTable: { __typename?: 'Table', _id: string, tableNumber: number, name?: string | null | undefined, token: string, enabled: boolean } };

export type UpdateTableMutationVariables = Exact<{
  updateTableData: TableInputData;
  updateTableId: Scalars['String'];
}>;


export type UpdateTableMutation = { __typename?: 'Mutation', updateTable: { __typename?: 'Table', _id: string, tableNumber: number, name?: string | null | undefined, token: string, enabled: boolean } };

export type CreateOrderMutationVariables = Exact<{
  createOrderItemsIds: Array<Scalars['String']> | Scalars['String'];
  createOrderTableId: Scalars['String'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', _id: string, orderNumber: number, table: { __typename?: 'Table', _id: string, name?: string | null | undefined, tableNumber: number }, items: Array<{ __typename?: 'OrderItem', _id: string, status: Status, quantity: number, dish: { __typename?: 'Dish', name: string, _id: string, price: any, url_img?: string | null | undefined } }> } };

export type CreateOrderItemsMutationVariables = Exact<{
  createOrderItemsItems: Array<CreateOrderItemsInput> | CreateOrderItemsInput;
}>;


export type CreateOrderItemsMutation = { __typename?: 'Mutation', createOrderItems: Array<{ __typename?: 'OrderItem', _id: string, quantity: number, status: Status, dish: { __typename?: 'Dish', name: string, _id: string, price: any, url_img?: string | null | undefined } }> };

export type AddItemsToOrderMutationVariables = Exact<{
  addItemsToOrderOrderId: Scalars['String'];
  addItemsToOrderItemsIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddItemsToOrderMutation = { __typename?: 'Mutation', addItemsToOrder: { __typename?: 'Order', _id: string, orderNumber: number, table: { __typename?: 'Table', _id: string, name?: string | null | undefined, tableNumber: number }, items: Array<{ __typename?: 'OrderItem', _id: string, status: Status, quantity: number, dish: { __typename?: 'Dish', name: string, _id: string, price: any, url_img?: string | null | undefined } }> } };

export type ChangeOrderItemsStatusMutationVariables = Exact<{
  changeOrderItemsStatusStatus: Status;
  changeOrderItemsStatusOrderId: Scalars['String'];
}>;


export type ChangeOrderItemsStatusMutation = { __typename?: 'Mutation', changeOrderItemsStatus: { __typename?: 'Order', _id: string, items: Array<{ __typename?: 'OrderItem', status: Status, quantity: number, _id: string, dish: { __typename?: 'Dish', name: string } }> } };

export type GenerateTicketMutationVariables = Exact<{
  orderId: Scalars['String'];
  paymentMethod?: Maybe<Scalars['String']>;
  vat?: Maybe<Scalars['Float']>;
}>;


export type GenerateTicketMutation = { __typename?: 'Mutation', generateTicket: { __typename?: 'Ticket', _id: string, orderId: string, ticketNumber: number, timestamp: any, tableName: string, total: any, paymentMethod: string, vat: number, items: Array<{ __typename?: 'TicketItem', _id: string, quantity: number, dishName: string, dishPrice: any, amount: any }> } };

export type SetTicketStatusMutationVariables = Exact<{
  setTicketStatusStatus: TicketStatus;
  setTicketStatusTikcetId: Scalars['String'];
}>;


export type SetTicketStatusMutation = { __typename?: 'Mutation', setTicketStatus?: { __typename?: 'Ticket', _id: string, status: TicketStatus } | null | undefined };

export type RemoveDishFromMenuMutationVariables = Exact<{
  removeDishFromMenuIdDish: Scalars['String'];
  removeDishFromMenuIdMenu: Scalars['String'];
}>;


export type RemoveDishFromMenuMutation = { __typename?: 'Mutation', removeDishFromMenu: { __typename?: 'Menu', title: string, _id: string, dishes: Array<{ __typename?: 'Dish', name: string, _id: string }> } };

export type DelDishByIdMutationVariables = Exact<{
  delDishByIdId: Scalars['String'];
}>;


export type DelDishByIdMutation = { __typename?: 'Mutation', delDishById: number };

export type GetUserByEmailQueryVariables = Exact<{
  userByEmailEmail: Scalars['String'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail?: { __typename?: 'User', _id: string, email: string, name: string, roles: Array<{ __typename?: 'Role', name: string, _id: string }> } | null | undefined };

export type GetMenusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenusQuery = { __typename?: 'Query', menus: Array<{ __typename?: 'Menu', _id: string, isActive: boolean, url_img?: string | null | undefined, title: string, description: string, dishes: Array<{ __typename?: 'Dish', _id: string, name: string, description: string, url_img?: string | null | undefined, price: any, score?: number | null | undefined, categories: Array<string>, preparation_time?: any | null | undefined }> }> };

export type GetDishesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDishesQuery = { __typename?: 'Query', dishes: Array<{ __typename?: 'Dish', _id: string, name: string, description: string, url_img?: string | null | undefined, price: any, score?: number | null | undefined, categories: Array<string>, preparation_time?: any | null | undefined }> };

export type GetTablesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTablesQuery = { __typename?: 'Query', tables: Array<{ __typename?: 'Table', _id: string, tableNumber: number, name?: string | null | undefined, enabled: boolean, token: string }> };

export type GetTableByIdQueryVariables = Exact<{
  tableByIdId: Scalars['String'];
}>;


export type GetTableByIdQuery = { __typename?: 'Query', tableById?: { __typename?: 'Table', _id: string, tableNumber: number, name?: string | null | undefined, token: string, enabled: boolean } | null | undefined };

export type GetDishByIdQueryVariables = Exact<{
  dishByIdId: Scalars['String'];
}>;


export type GetDishByIdQuery = { __typename?: 'Query', dishById?: { __typename?: 'Dish', _id: string, name: string, description: string, url_img?: string | null | undefined, price: any, score?: number | null | undefined, categories: Array<string>, preparation_time?: any | null | undefined } | null | undefined };

export type GetMenuByIdQueryVariables = Exact<{
  menuByIdId: Scalars['String'];
}>;


export type GetMenuByIdQuery = { __typename?: 'Query', menuById?: { __typename?: 'Menu', _id: string, title: string, description: string, url_img?: string | null | undefined, isActive: boolean, dishes: Array<{ __typename?: 'Dish', _id: string, name: string, url_img?: string | null | undefined, price: any }> } | null | undefined };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', _id: string, orderNumber: number, start_time: any, end_time?: any | null | undefined, table: { __typename?: 'Table', name?: string | null | undefined, tableNumber: number }, items: Array<{ __typename?: 'OrderItem', _id: string, quantity: number, status: Status, dish: { __typename?: 'Dish', name: string } }> }> };

export type GetOrderByIdQueryVariables = Exact<{
  orderByIdId: Scalars['String'];
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', orderById: { __typename?: 'Order', _id: string, orderNumber: number, start_time: any, table: { __typename?: 'Table', _id: string, tableNumber: number, name?: string | null | undefined, token: string, enabled: boolean }, items: Array<{ __typename?: 'OrderItem', _id: string, quantity: number, status: Status, dish: { __typename?: 'Dish', description: string, name: string, price: any, _id: string } }> } };

export type GetDishSalesQueryVariables = Exact<{
  dishSalesTimezone: Scalars['String'];
  dishSalesYear: Scalars['Float'];
}>;


export type GetDishSalesQuery = { __typename?: 'Query', dishSales: Array<{ __typename?: 'DishSalesStats', month: number, year: number, dishName: string, totalUnits: number, totalSales: any }> };

export type GetYearSalesQueryVariables = Exact<{
  yearSalesTimezone: Scalars['String'];
  yearSalesYear: Scalars['Float'];
}>;


export type GetYearSalesQuery = { __typename?: 'Query', yearSales: Array<{ __typename?: 'YearSalesStats', month: number, year: number, total: any }> };

export type GetMonthSalesQueryVariables = Exact<{
  monthSalesTimezone: Scalars['String'];
  monthSalesMonth: Scalars['Float'];
  monthSalesYear: Scalars['Float'];
}>;


export type GetMonthSalesQuery = { __typename?: 'Query', monthSales: Array<{ __typename?: 'MonthSalesStats', year: number, month: number, dayOfMonth: number, dayOfWeek: number, total: any }> };

export type GetDailySalesQueryVariables = Exact<{
  daySalesTimezone: Scalars['String'];
  daySalesDay: Scalars['Float'];
  daySalesMonth: Scalars['Float'];
  daySalesYear: Scalars['Float'];
}>;


export type GetDailySalesQuery = { __typename?: 'Query', daySales: Array<{ __typename?: 'DaySalesStats', year: number, tableNumber: number, tableName: string, totalSum: any, salesCount: number, sales?: Array<{ __typename?: 'Ticket', total: any, timestamp: any }> | null | undefined }> };

export type GetTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTicketsQuery = { __typename?: 'Query', tickets: Array<{ __typename?: 'Ticket', _id: string, timestamp: any, status: TicketStatus, paymentMethod: string, tableName: string, tableNumber: number, total: any, vat: number, items: Array<{ __typename?: 'TicketItem', quantity: number, dishName: string, dishPrice: any, amount: any, _id: string }> }> };

export type GetTicketByIdQueryVariables = Exact<{
  ticketByIdId: Scalars['String'];
}>;


export type GetTicketByIdQuery = { __typename?: 'Query', ticketById: { __typename?: 'Ticket', _id: string, status: TicketStatus, orderId: string, ticketNumber: number, timestamp: any, tableName: string, tableNumber: number, total: any, paymentMethod: string, vat: number } };

export type OrderChangesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OrderChangesSubscription = { __typename?: 'Subscription', orderChanges: { __typename?: 'Order', _id: string, orderNumber: number, end_time?: any | null | undefined, start_time: any, table: { __typename?: 'Table', name?: string | null | undefined, tableNumber: number, _id: string }, items: Array<{ __typename?: 'OrderItem', _id: string, quantity: number, status: Status, dish: { __typename?: 'Dish', name: string } }> } };

export type TicketChangesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TicketChangesSubscription = { __typename?: 'Subscription', ticketChanges: { __typename?: 'Ticket', _id: string, orderId: string, ticketNumber: number, timestamp: any, tableName: string, tableNumber: number, total: any, paymentMethod: string, vat: number, status: TicketStatus, items: Array<{ __typename?: 'TicketItem', _id: string, quantity: number, dishName: string, dishPrice: any, amount: any }> } };


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
      url_img
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
export const GenerateTableDocument = gql`
    mutation GenerateTable($generateTableName: String!) {
  generateTable(name: $generateTableName) {
    _id
    tableNumber
    name
    token
    enabled
  }
}
    `;
export type GenerateTableMutationFn = Apollo.MutationFunction<GenerateTableMutation, GenerateTableMutationVariables>;

/**
 * __useGenerateTableMutation__
 *
 * To run a mutation, you first call `useGenerateTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTableMutation, { data, loading, error }] = useGenerateTableMutation({
 *   variables: {
 *      generateTableName: // value for 'generateTableName'
 *   },
 * });
 */
export function useGenerateTableMutation(baseOptions?: Apollo.MutationHookOptions<GenerateTableMutation, GenerateTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateTableMutation, GenerateTableMutationVariables>(GenerateTableDocument, options);
      }
export type GenerateTableMutationHookResult = ReturnType<typeof useGenerateTableMutation>;
export type GenerateTableMutationResult = Apollo.MutationResult<GenerateTableMutation>;
export type GenerateTableMutationOptions = Apollo.BaseMutationOptions<GenerateTableMutation, GenerateTableMutationVariables>;
export const UpdateTableDocument = gql`
    mutation UpdateTable($updateTableData: TableInputData!, $updateTableId: String!) {
  updateTable(data: $updateTableData, id: $updateTableId) {
    _id
    tableNumber
    name
    token
    enabled
  }
}
    `;
export type UpdateTableMutationFn = Apollo.MutationFunction<UpdateTableMutation, UpdateTableMutationVariables>;

/**
 * __useUpdateTableMutation__
 *
 * To run a mutation, you first call `useUpdateTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTableMutation, { data, loading, error }] = useUpdateTableMutation({
 *   variables: {
 *      updateTableData: // value for 'updateTableData'
 *      updateTableId: // value for 'updateTableId'
 *   },
 * });
 */
export function useUpdateTableMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTableMutation, UpdateTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTableMutation, UpdateTableMutationVariables>(UpdateTableDocument, options);
      }
export type UpdateTableMutationHookResult = ReturnType<typeof useUpdateTableMutation>;
export type UpdateTableMutationResult = Apollo.MutationResult<UpdateTableMutation>;
export type UpdateTableMutationOptions = Apollo.BaseMutationOptions<UpdateTableMutation, UpdateTableMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($createOrderItemsIds: [String!]!, $createOrderTableId: String!) {
  createOrder(itemsIds: $createOrderItemsIds, tableId: $createOrderTableId) {
    _id
    orderNumber
    table {
      _id
      name
      tableNumber
    }
    items {
      _id
      status
      quantity
      dish {
        name
        _id
        price
        url_img
      }
    }
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      createOrderItemsIds: // value for 'createOrderItemsIds'
 *      createOrderTableId: // value for 'createOrderTableId'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreateOrderItemsDocument = gql`
    mutation CreateOrderItems($createOrderItemsItems: [CreateOrderItemsInput!]!) {
  createOrderItems(items: $createOrderItemsItems) {
    _id
    quantity
    status
    dish {
      name
      _id
      price
      url_img
    }
  }
}
    `;
export type CreateOrderItemsMutationFn = Apollo.MutationFunction<CreateOrderItemsMutation, CreateOrderItemsMutationVariables>;

/**
 * __useCreateOrderItemsMutation__
 *
 * To run a mutation, you first call `useCreateOrderItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderItemsMutation, { data, loading, error }] = useCreateOrderItemsMutation({
 *   variables: {
 *      createOrderItemsItems: // value for 'createOrderItemsItems'
 *   },
 * });
 */
export function useCreateOrderItemsMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderItemsMutation, CreateOrderItemsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderItemsMutation, CreateOrderItemsMutationVariables>(CreateOrderItemsDocument, options);
      }
export type CreateOrderItemsMutationHookResult = ReturnType<typeof useCreateOrderItemsMutation>;
export type CreateOrderItemsMutationResult = Apollo.MutationResult<CreateOrderItemsMutation>;
export type CreateOrderItemsMutationOptions = Apollo.BaseMutationOptions<CreateOrderItemsMutation, CreateOrderItemsMutationVariables>;
export const AddItemsToOrderDocument = gql`
    mutation AddItemsToOrder($addItemsToOrderOrderId: String!, $addItemsToOrderItemsIds: [String!]!) {
  addItemsToOrder(
    orderId: $addItemsToOrderOrderId
    itemsIds: $addItemsToOrderItemsIds
  ) {
    _id
    orderNumber
    table {
      _id
      name
      tableNumber
    }
    items {
      _id
      status
      quantity
      dish {
        name
        _id
        price
        url_img
      }
    }
  }
}
    `;
export type AddItemsToOrderMutationFn = Apollo.MutationFunction<AddItemsToOrderMutation, AddItemsToOrderMutationVariables>;

/**
 * __useAddItemsToOrderMutation__
 *
 * To run a mutation, you first call `useAddItemsToOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemsToOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemsToOrderMutation, { data, loading, error }] = useAddItemsToOrderMutation({
 *   variables: {
 *      addItemsToOrderOrderId: // value for 'addItemsToOrderOrderId'
 *      addItemsToOrderItemsIds: // value for 'addItemsToOrderItemsIds'
 *   },
 * });
 */
export function useAddItemsToOrderMutation(baseOptions?: Apollo.MutationHookOptions<AddItemsToOrderMutation, AddItemsToOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemsToOrderMutation, AddItemsToOrderMutationVariables>(AddItemsToOrderDocument, options);
      }
export type AddItemsToOrderMutationHookResult = ReturnType<typeof useAddItemsToOrderMutation>;
export type AddItemsToOrderMutationResult = Apollo.MutationResult<AddItemsToOrderMutation>;
export type AddItemsToOrderMutationOptions = Apollo.BaseMutationOptions<AddItemsToOrderMutation, AddItemsToOrderMutationVariables>;
export const ChangeOrderItemsStatusDocument = gql`
    mutation ChangeOrderItemsStatus($changeOrderItemsStatusStatus: Status!, $changeOrderItemsStatusOrderId: String!) {
  changeOrderItemsStatus(
    status: $changeOrderItemsStatusStatus
    orderId: $changeOrderItemsStatusOrderId
  ) {
    _id
    items {
      status
      quantity
      _id
      dish {
        name
      }
    }
  }
}
    `;
export type ChangeOrderItemsStatusMutationFn = Apollo.MutationFunction<ChangeOrderItemsStatusMutation, ChangeOrderItemsStatusMutationVariables>;

/**
 * __useChangeOrderItemsStatusMutation__
 *
 * To run a mutation, you first call `useChangeOrderItemsStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOrderItemsStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOrderItemsStatusMutation, { data, loading, error }] = useChangeOrderItemsStatusMutation({
 *   variables: {
 *      changeOrderItemsStatusStatus: // value for 'changeOrderItemsStatusStatus'
 *      changeOrderItemsStatusOrderId: // value for 'changeOrderItemsStatusOrderId'
 *   },
 * });
 */
export function useChangeOrderItemsStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOrderItemsStatusMutation, ChangeOrderItemsStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeOrderItemsStatusMutation, ChangeOrderItemsStatusMutationVariables>(ChangeOrderItemsStatusDocument, options);
      }
export type ChangeOrderItemsStatusMutationHookResult = ReturnType<typeof useChangeOrderItemsStatusMutation>;
export type ChangeOrderItemsStatusMutationResult = Apollo.MutationResult<ChangeOrderItemsStatusMutation>;
export type ChangeOrderItemsStatusMutationOptions = Apollo.BaseMutationOptions<ChangeOrderItemsStatusMutation, ChangeOrderItemsStatusMutationVariables>;
export const GenerateTicketDocument = gql`
    mutation GenerateTicket($orderId: String!, $paymentMethod: String, $vat: Float) {
  generateTicket(orderId: $orderId, paymentMethod: $paymentMethod, vat: $vat) {
    _id
    orderId
    ticketNumber
    timestamp
    tableName
    total
    paymentMethod
    vat
    items {
      _id
      quantity
      dishName
      dishPrice
      amount
    }
  }
}
    `;
export type GenerateTicketMutationFn = Apollo.MutationFunction<GenerateTicketMutation, GenerateTicketMutationVariables>;

/**
 * __useGenerateTicketMutation__
 *
 * To run a mutation, you first call `useGenerateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTicketMutation, { data, loading, error }] = useGenerateTicketMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      paymentMethod: // value for 'paymentMethod'
 *      vat: // value for 'vat'
 *   },
 * });
 */
export function useGenerateTicketMutation(baseOptions?: Apollo.MutationHookOptions<GenerateTicketMutation, GenerateTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateTicketMutation, GenerateTicketMutationVariables>(GenerateTicketDocument, options);
      }
export type GenerateTicketMutationHookResult = ReturnType<typeof useGenerateTicketMutation>;
export type GenerateTicketMutationResult = Apollo.MutationResult<GenerateTicketMutation>;
export type GenerateTicketMutationOptions = Apollo.BaseMutationOptions<GenerateTicketMutation, GenerateTicketMutationVariables>;
export const SetTicketStatusDocument = gql`
    mutation SetTicketStatus($setTicketStatusStatus: TicketStatus!, $setTicketStatusTikcetId: String!) {
  setTicketStatus(
    status: $setTicketStatusStatus
    tikcetId: $setTicketStatusTikcetId
  ) {
    _id
    status
  }
}
    `;
export type SetTicketStatusMutationFn = Apollo.MutationFunction<SetTicketStatusMutation, SetTicketStatusMutationVariables>;

/**
 * __useSetTicketStatusMutation__
 *
 * To run a mutation, you first call `useSetTicketStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTicketStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTicketStatusMutation, { data, loading, error }] = useSetTicketStatusMutation({
 *   variables: {
 *      setTicketStatusStatus: // value for 'setTicketStatusStatus'
 *      setTicketStatusTikcetId: // value for 'setTicketStatusTikcetId'
 *   },
 * });
 */
export function useSetTicketStatusMutation(baseOptions?: Apollo.MutationHookOptions<SetTicketStatusMutation, SetTicketStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetTicketStatusMutation, SetTicketStatusMutationVariables>(SetTicketStatusDocument, options);
      }
export type SetTicketStatusMutationHookResult = ReturnType<typeof useSetTicketStatusMutation>;
export type SetTicketStatusMutationResult = Apollo.MutationResult<SetTicketStatusMutation>;
export type SetTicketStatusMutationOptions = Apollo.BaseMutationOptions<SetTicketStatusMutation, SetTicketStatusMutationVariables>;
export const RemoveDishFromMenuDocument = gql`
    mutation RemoveDishFromMenu($removeDishFromMenuIdDish: String!, $removeDishFromMenuIdMenu: String!) {
  removeDishFromMenu(
    idDish: $removeDishFromMenuIdDish
    idMenu: $removeDishFromMenuIdMenu
  ) {
    title
    dishes {
      name
      _id
    }
    _id
  }
}
    `;
export type RemoveDishFromMenuMutationFn = Apollo.MutationFunction<RemoveDishFromMenuMutation, RemoveDishFromMenuMutationVariables>;

/**
 * __useRemoveDishFromMenuMutation__
 *
 * To run a mutation, you first call `useRemoveDishFromMenuMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDishFromMenuMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDishFromMenuMutation, { data, loading, error }] = useRemoveDishFromMenuMutation({
 *   variables: {
 *      removeDishFromMenuIdDish: // value for 'removeDishFromMenuIdDish'
 *      removeDishFromMenuIdMenu: // value for 'removeDishFromMenuIdMenu'
 *   },
 * });
 */
export function useRemoveDishFromMenuMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDishFromMenuMutation, RemoveDishFromMenuMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveDishFromMenuMutation, RemoveDishFromMenuMutationVariables>(RemoveDishFromMenuDocument, options);
      }
export type RemoveDishFromMenuMutationHookResult = ReturnType<typeof useRemoveDishFromMenuMutation>;
export type RemoveDishFromMenuMutationResult = Apollo.MutationResult<RemoveDishFromMenuMutation>;
export type RemoveDishFromMenuMutationOptions = Apollo.BaseMutationOptions<RemoveDishFromMenuMutation, RemoveDishFromMenuMutationVariables>;
export const DelDishByIdDocument = gql`
    mutation DelDishById($delDishByIdId: String!) {
  delDishById(id: $delDishByIdId)
}
    `;
export type DelDishByIdMutationFn = Apollo.MutationFunction<DelDishByIdMutation, DelDishByIdMutationVariables>;

/**
 * __useDelDishByIdMutation__
 *
 * To run a mutation, you first call `useDelDishByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelDishByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [delDishByIdMutation, { data, loading, error }] = useDelDishByIdMutation({
 *   variables: {
 *      delDishByIdId: // value for 'delDishByIdId'
 *   },
 * });
 */
export function useDelDishByIdMutation(baseOptions?: Apollo.MutationHookOptions<DelDishByIdMutation, DelDishByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DelDishByIdMutation, DelDishByIdMutationVariables>(DelDishByIdDocument, options);
      }
export type DelDishByIdMutationHookResult = ReturnType<typeof useDelDishByIdMutation>;
export type DelDishByIdMutationResult = Apollo.MutationResult<DelDishByIdMutation>;
export type DelDishByIdMutationOptions = Apollo.BaseMutationOptions<DelDishByIdMutation, DelDishByIdMutationVariables>;
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
    isActive
    url_img
    title
    description
    dishes {
      _id
      name
      description
      url_img
      price
      score
      categories
      preparation_time
    }
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
export const GetDishesDocument = gql`
    query GetDishes {
  dishes {
    _id
    name
    description
    url_img
    price
    score
    categories
    preparation_time
  }
}
    `;

/**
 * __useGetDishesQuery__
 *
 * To run a query within a React component, call `useGetDishesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDishesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDishesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDishesQuery(baseOptions?: Apollo.QueryHookOptions<GetDishesQuery, GetDishesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDishesQuery, GetDishesQueryVariables>(GetDishesDocument, options);
      }
export function useGetDishesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDishesQuery, GetDishesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDishesQuery, GetDishesQueryVariables>(GetDishesDocument, options);
        }
export type GetDishesQueryHookResult = ReturnType<typeof useGetDishesQuery>;
export type GetDishesLazyQueryHookResult = ReturnType<typeof useGetDishesLazyQuery>;
export type GetDishesQueryResult = Apollo.QueryResult<GetDishesQuery, GetDishesQueryVariables>;
export const GetTablesDocument = gql`
    query getTables {
  tables {
    _id
    tableNumber
    name
    enabled
    token
  }
}
    `;

/**
 * __useGetTablesQuery__
 *
 * To run a query within a React component, call `useGetTablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTablesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTablesQuery(baseOptions?: Apollo.QueryHookOptions<GetTablesQuery, GetTablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTablesQuery, GetTablesQueryVariables>(GetTablesDocument, options);
      }
export function useGetTablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTablesQuery, GetTablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTablesQuery, GetTablesQueryVariables>(GetTablesDocument, options);
        }
export type GetTablesQueryHookResult = ReturnType<typeof useGetTablesQuery>;
export type GetTablesLazyQueryHookResult = ReturnType<typeof useGetTablesLazyQuery>;
export type GetTablesQueryResult = Apollo.QueryResult<GetTablesQuery, GetTablesQueryVariables>;
export const GetTableByIdDocument = gql`
    query getTableById($tableByIdId: String!) {
  tableById(id: $tableByIdId) {
    _id
    tableNumber
    name
    token
    enabled
  }
}
    `;

/**
 * __useGetTableByIdQuery__
 *
 * To run a query within a React component, call `useGetTableByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTableByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTableByIdQuery({
 *   variables: {
 *      tableByIdId: // value for 'tableByIdId'
 *   },
 * });
 */
export function useGetTableByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTableByIdQuery, GetTableByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTableByIdQuery, GetTableByIdQueryVariables>(GetTableByIdDocument, options);
      }
export function useGetTableByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTableByIdQuery, GetTableByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTableByIdQuery, GetTableByIdQueryVariables>(GetTableByIdDocument, options);
        }
export type GetTableByIdQueryHookResult = ReturnType<typeof useGetTableByIdQuery>;
export type GetTableByIdLazyQueryHookResult = ReturnType<typeof useGetTableByIdLazyQuery>;
export type GetTableByIdQueryResult = Apollo.QueryResult<GetTableByIdQuery, GetTableByIdQueryVariables>;
export const GetDishByIdDocument = gql`
    query getDishById($dishByIdId: String!) {
  dishById(id: $dishByIdId) {
    _id
    name
    description
    url_img
    price
    score
    categories
    preparation_time
  }
}
    `;

/**
 * __useGetDishByIdQuery__
 *
 * To run a query within a React component, call `useGetDishByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDishByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDishByIdQuery({
 *   variables: {
 *      dishByIdId: // value for 'dishByIdId'
 *   },
 * });
 */
export function useGetDishByIdQuery(baseOptions: Apollo.QueryHookOptions<GetDishByIdQuery, GetDishByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDishByIdQuery, GetDishByIdQueryVariables>(GetDishByIdDocument, options);
      }
export function useGetDishByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDishByIdQuery, GetDishByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDishByIdQuery, GetDishByIdQueryVariables>(GetDishByIdDocument, options);
        }
export type GetDishByIdQueryHookResult = ReturnType<typeof useGetDishByIdQuery>;
export type GetDishByIdLazyQueryHookResult = ReturnType<typeof useGetDishByIdLazyQuery>;
export type GetDishByIdQueryResult = Apollo.QueryResult<GetDishByIdQuery, GetDishByIdQueryVariables>;
export const GetMenuByIdDocument = gql`
    query getMenuById($menuByIdId: String!) {
  menuById(id: $menuByIdId) {
    _id
    title
    description
    url_img
    isActive
    dishes {
      _id
      name
      url_img
      price
    }
  }
}
    `;

/**
 * __useGetMenuByIdQuery__
 *
 * To run a query within a React component, call `useGetMenuByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuByIdQuery({
 *   variables: {
 *      menuByIdId: // value for 'menuByIdId'
 *   },
 * });
 */
export function useGetMenuByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMenuByIdQuery, GetMenuByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMenuByIdQuery, GetMenuByIdQueryVariables>(GetMenuByIdDocument, options);
      }
export function useGetMenuByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenuByIdQuery, GetMenuByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMenuByIdQuery, GetMenuByIdQueryVariables>(GetMenuByIdDocument, options);
        }
export type GetMenuByIdQueryHookResult = ReturnType<typeof useGetMenuByIdQuery>;
export type GetMenuByIdLazyQueryHookResult = ReturnType<typeof useGetMenuByIdLazyQuery>;
export type GetMenuByIdQueryResult = Apollo.QueryResult<GetMenuByIdQuery, GetMenuByIdQueryVariables>;
export const GetOrdersDocument = gql`
    query GetOrders {
  orders {
    _id
    orderNumber
    table {
      name
      tableNumber
    }
    items {
      _id
      dish {
        name
      }
      quantity
      status
    }
    start_time
    end_time
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetOrderByIdDocument = gql`
    query getOrderById($orderByIdId: String!) {
  orderById(id: $orderByIdId) {
    _id
    orderNumber
    table {
      _id
      tableNumber
      name
      token
      enabled
    }
    items {
      _id
      dish {
        description
        name
        price
        _id
      }
      quantity
      status
    }
    start_time
  }
}
    `;

/**
 * __useGetOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderByIdQuery({
 *   variables: {
 *      orderByIdId: // value for 'orderByIdId'
 *   },
 * });
 */
export function useGetOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
      }
export function useGetOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export type GetOrderByIdQueryHookResult = ReturnType<typeof useGetOrderByIdQuery>;
export type GetOrderByIdLazyQueryHookResult = ReturnType<typeof useGetOrderByIdLazyQuery>;
export type GetOrderByIdQueryResult = Apollo.QueryResult<GetOrderByIdQuery, GetOrderByIdQueryVariables>;
export const GetDishSalesDocument = gql`
    query getDishSales($dishSalesTimezone: String!, $dishSalesYear: Float!) {
  dishSales(timezone: $dishSalesTimezone, year: $dishSalesYear) {
    month
    year
    dishName
    totalUnits
    totalSales
  }
}
    `;

/**
 * __useGetDishSalesQuery__
 *
 * To run a query within a React component, call `useGetDishSalesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDishSalesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDishSalesQuery({
 *   variables: {
 *      dishSalesTimezone: // value for 'dishSalesTimezone'
 *      dishSalesYear: // value for 'dishSalesYear'
 *   },
 * });
 */
export function useGetDishSalesQuery(baseOptions: Apollo.QueryHookOptions<GetDishSalesQuery, GetDishSalesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDishSalesQuery, GetDishSalesQueryVariables>(GetDishSalesDocument, options);
      }
export function useGetDishSalesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDishSalesQuery, GetDishSalesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDishSalesQuery, GetDishSalesQueryVariables>(GetDishSalesDocument, options);
        }
export type GetDishSalesQueryHookResult = ReturnType<typeof useGetDishSalesQuery>;
export type GetDishSalesLazyQueryHookResult = ReturnType<typeof useGetDishSalesLazyQuery>;
export type GetDishSalesQueryResult = Apollo.QueryResult<GetDishSalesQuery, GetDishSalesQueryVariables>;
export const GetYearSalesDocument = gql`
    query getYearSales($yearSalesTimezone: String!, $yearSalesYear: Float!) {
  yearSales(timezone: $yearSalesTimezone, year: $yearSalesYear) {
    month
    year
    total
  }
}
    `;

/**
 * __useGetYearSalesQuery__
 *
 * To run a query within a React component, call `useGetYearSalesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetYearSalesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetYearSalesQuery({
 *   variables: {
 *      yearSalesTimezone: // value for 'yearSalesTimezone'
 *      yearSalesYear: // value for 'yearSalesYear'
 *   },
 * });
 */
export function useGetYearSalesQuery(baseOptions: Apollo.QueryHookOptions<GetYearSalesQuery, GetYearSalesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetYearSalesQuery, GetYearSalesQueryVariables>(GetYearSalesDocument, options);
      }
export function useGetYearSalesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetYearSalesQuery, GetYearSalesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetYearSalesQuery, GetYearSalesQueryVariables>(GetYearSalesDocument, options);
        }
export type GetYearSalesQueryHookResult = ReturnType<typeof useGetYearSalesQuery>;
export type GetYearSalesLazyQueryHookResult = ReturnType<typeof useGetYearSalesLazyQuery>;
export type GetYearSalesQueryResult = Apollo.QueryResult<GetYearSalesQuery, GetYearSalesQueryVariables>;
export const GetMonthSalesDocument = gql`
    query getMonthSales($monthSalesTimezone: String!, $monthSalesMonth: Float!, $monthSalesYear: Float!) {
  monthSales(
    timezone: $monthSalesTimezone
    month: $monthSalesMonth
    year: $monthSalesYear
  ) {
    year
    month
    dayOfMonth
    dayOfWeek
    total
  }
}
    `;

/**
 * __useGetMonthSalesQuery__
 *
 * To run a query within a React component, call `useGetMonthSalesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMonthSalesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMonthSalesQuery({
 *   variables: {
 *      monthSalesTimezone: // value for 'monthSalesTimezone'
 *      monthSalesMonth: // value for 'monthSalesMonth'
 *      monthSalesYear: // value for 'monthSalesYear'
 *   },
 * });
 */
export function useGetMonthSalesQuery(baseOptions: Apollo.QueryHookOptions<GetMonthSalesQuery, GetMonthSalesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMonthSalesQuery, GetMonthSalesQueryVariables>(GetMonthSalesDocument, options);
      }
export function useGetMonthSalesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMonthSalesQuery, GetMonthSalesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMonthSalesQuery, GetMonthSalesQueryVariables>(GetMonthSalesDocument, options);
        }
export type GetMonthSalesQueryHookResult = ReturnType<typeof useGetMonthSalesQuery>;
export type GetMonthSalesLazyQueryHookResult = ReturnType<typeof useGetMonthSalesLazyQuery>;
export type GetMonthSalesQueryResult = Apollo.QueryResult<GetMonthSalesQuery, GetMonthSalesQueryVariables>;
export const GetDailySalesDocument = gql`
    query getDailySales($daySalesTimezone: String!, $daySalesDay: Float!, $daySalesMonth: Float!, $daySalesYear: Float!) {
  daySales(
    timezone: $daySalesTimezone
    day: $daySalesDay
    month: $daySalesMonth
    year: $daySalesYear
  ) {
    year
    tableNumber
    tableName
    totalSum
    salesCount
    sales {
      total
      timestamp
    }
  }
}
    `;

/**
 * __useGetDailySalesQuery__
 *
 * To run a query within a React component, call `useGetDailySalesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDailySalesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDailySalesQuery({
 *   variables: {
 *      daySalesTimezone: // value for 'daySalesTimezone'
 *      daySalesDay: // value for 'daySalesDay'
 *      daySalesMonth: // value for 'daySalesMonth'
 *      daySalesYear: // value for 'daySalesYear'
 *   },
 * });
 */
export function useGetDailySalesQuery(baseOptions: Apollo.QueryHookOptions<GetDailySalesQuery, GetDailySalesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDailySalesQuery, GetDailySalesQueryVariables>(GetDailySalesDocument, options);
      }
export function useGetDailySalesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDailySalesQuery, GetDailySalesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDailySalesQuery, GetDailySalesQueryVariables>(GetDailySalesDocument, options);
        }
export type GetDailySalesQueryHookResult = ReturnType<typeof useGetDailySalesQuery>;
export type GetDailySalesLazyQueryHookResult = ReturnType<typeof useGetDailySalesLazyQuery>;
export type GetDailySalesQueryResult = Apollo.QueryResult<GetDailySalesQuery, GetDailySalesQueryVariables>;
export const GetTicketsDocument = gql`
    query getTickets {
  tickets {
    _id
    timestamp
    status
    paymentMethod
    tableName
    tableNumber
    total
    vat
    items {
      quantity
      dishName
      dishPrice
      amount
      _id
    }
  }
}
    `;

/**
 * __useGetTicketsQuery__
 *
 * To run a query within a React component, call `useGetTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTicketsQuery(baseOptions?: Apollo.QueryHookOptions<GetTicketsQuery, GetTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketsQuery, GetTicketsQueryVariables>(GetTicketsDocument, options);
      }
export function useGetTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketsQuery, GetTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketsQuery, GetTicketsQueryVariables>(GetTicketsDocument, options);
        }
export type GetTicketsQueryHookResult = ReturnType<typeof useGetTicketsQuery>;
export type GetTicketsLazyQueryHookResult = ReturnType<typeof useGetTicketsLazyQuery>;
export type GetTicketsQueryResult = Apollo.QueryResult<GetTicketsQuery, GetTicketsQueryVariables>;
export const GetTicketByIdDocument = gql`
    query getTicketById($ticketByIdId: String!) {
  ticketById(id: $ticketByIdId) {
    _id
    status
    orderId
    ticketNumber
    timestamp
    tableName
    tableNumber
    total
    paymentMethod
    vat
  }
}
    `;

/**
 * __useGetTicketByIdQuery__
 *
 * To run a query within a React component, call `useGetTicketByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketByIdQuery({
 *   variables: {
 *      ticketByIdId: // value for 'ticketByIdId'
 *   },
 * });
 */
export function useGetTicketByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTicketByIdQuery, GetTicketByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketByIdQuery, GetTicketByIdQueryVariables>(GetTicketByIdDocument, options);
      }
export function useGetTicketByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketByIdQuery, GetTicketByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketByIdQuery, GetTicketByIdQueryVariables>(GetTicketByIdDocument, options);
        }
export type GetTicketByIdQueryHookResult = ReturnType<typeof useGetTicketByIdQuery>;
export type GetTicketByIdLazyQueryHookResult = ReturnType<typeof useGetTicketByIdLazyQuery>;
export type GetTicketByIdQueryResult = Apollo.QueryResult<GetTicketByIdQuery, GetTicketByIdQueryVariables>;
export const OrderChangesDocument = gql`
    subscription OrderChanges {
  orderChanges {
    _id
    orderNumber
    table {
      name
      tableNumber
      _id
    }
    end_time
    start_time
    items {
      dish {
        name
      }
      _id
      quantity
      status
    }
  }
}
    `;

/**
 * __useOrderChangesSubscription__
 *
 * To run a query within a React component, call `useOrderChangesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOrderChangesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderChangesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOrderChangesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OrderChangesSubscription, OrderChangesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OrderChangesSubscription, OrderChangesSubscriptionVariables>(OrderChangesDocument, options);
      }
export type OrderChangesSubscriptionHookResult = ReturnType<typeof useOrderChangesSubscription>;
export type OrderChangesSubscriptionResult = Apollo.SubscriptionResult<OrderChangesSubscription>;
export const TicketChangesDocument = gql`
    subscription TicketChanges {
  ticketChanges {
    _id
    orderId
    ticketNumber
    timestamp
    tableName
    tableNumber
    total
    paymentMethod
    vat
    status
    items {
      _id
      quantity
      dishName
      dishPrice
      amount
    }
  }
}
    `;

/**
 * __useTicketChangesSubscription__
 *
 * To run a query within a React component, call `useTicketChangesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTicketChangesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTicketChangesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTicketChangesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TicketChangesSubscription, TicketChangesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TicketChangesSubscription, TicketChangesSubscriptionVariables>(TicketChangesDocument, options);
      }
export type TicketChangesSubscriptionHookResult = ReturnType<typeof useTicketChangesSubscription>;
export type TicketChangesSubscriptionResult = Apollo.SubscriptionResult<TicketChangesSubscription>;