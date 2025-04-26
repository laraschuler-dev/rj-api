
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model category
 * 
 */
export type category = $Result.DefaultSelection<Prisma.$categoryPayload>
/**
 * Model comment
 * 
 */
export type comment = $Result.DefaultSelection<Prisma.$commentPayload>
/**
 * Model image
 * 
 */
export type image = $Result.DefaultSelection<Prisma.$imagePayload>
/**
 * Model post
 * 
 */
export type post = $Result.DefaultSelection<Prisma.$postPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model user_like
 * 
 */
export type user_like = $Result.DefaultSelection<Prisma.$user_likePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.category.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.category`: Exposes CRUD operations for the **category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.categoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.commentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.image`: Exposes CRUD operations for the **image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): Prisma.imageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.postDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_like`: Exposes CRUD operations for the **user_like** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_likes
    * const user_likes = await prisma.user_like.findMany()
    * ```
    */
  get user_like(): Prisma.user_likeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    category: 'category',
    comment: 'comment',
    image: 'image',
    post: 'post',
    user: 'user',
    user_like: 'user_like'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "category" | "comment" | "image" | "post" | "user" | "user_like"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      category: {
        payload: Prisma.$categoryPayload<ExtArgs>
        fields: Prisma.categoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findFirst: {
            args: Prisma.categoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findMany: {
            args: Prisma.categoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          create: {
            args: Prisma.categoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          createMany: {
            args: Prisma.categoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.categoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          update: {
            args: Prisma.categoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          deleteMany: {
            args: Prisma.categoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.categoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.categoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      comment: {
        payload: Prisma.$commentPayload<ExtArgs>
        fields: Prisma.commentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.commentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.commentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          findFirst: {
            args: Prisma.commentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.commentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          findMany: {
            args: Prisma.commentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>[]
          }
          create: {
            args: Prisma.commentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          createMany: {
            args: Prisma.commentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.commentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          update: {
            args: Prisma.commentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          deleteMany: {
            args: Prisma.commentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.commentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.commentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.commentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.commentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      image: {
        payload: Prisma.$imagePayload<ExtArgs>
        fields: Prisma.imageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.imageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.imageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          findFirst: {
            args: Prisma.imageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.imageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          findMany: {
            args: Prisma.imageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>[]
          }
          create: {
            args: Prisma.imageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          createMany: {
            args: Prisma.imageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.imageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          update: {
            args: Prisma.imageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          deleteMany: {
            args: Prisma.imageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.imageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.imageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagePayload>
          }
          aggregate: {
            args: Prisma.ImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImage>
          }
          groupBy: {
            args: Prisma.imageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.imageCountArgs<ExtArgs>
            result: $Utils.Optional<ImageCountAggregateOutputType> | number
          }
        }
      }
      post: {
        payload: Prisma.$postPayload<ExtArgs>
        fields: Prisma.postFieldRefs
        operations: {
          findUnique: {
            args: Prisma.postFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.postFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          findFirst: {
            args: Prisma.postFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.postFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          findMany: {
            args: Prisma.postFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>[]
          }
          create: {
            args: Prisma.postCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          createMany: {
            args: Prisma.postCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.postDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          update: {
            args: Prisma.postUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          deleteMany: {
            args: Prisma.postDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.postUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.postUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.postGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.postCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      user_like: {
        payload: Prisma.$user_likePayload<ExtArgs>
        fields: Prisma.user_likeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_likeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_likePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_likeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_likePayload>
          }
          findFirst: {
            args: Prisma.user_likeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_likePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_likeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_likePayload>
          }
          findMany: {
            args: Prisma.user_likeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_likePayload>[]
          }
          create: {
            args: Prisma.user_likeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_likePayload>
          }
          createMany: {
            args: Prisma.user_likeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.user_likeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_likePayload>
          }
          update: {
            args: Prisma.user_likeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_likePayload>
          }
          deleteMany: {
            args: Prisma.user_likeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_likeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.user_likeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_likePayload>
          }
          aggregate: {
            args: Prisma.User_likeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_like>
          }
          groupBy: {
            args: Prisma.user_likeGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_likeGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_likeCountArgs<ExtArgs>
            result: $Utils.Optional<User_likeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    category?: categoryOmit
    comment?: commentOmit
    image?: imageOmit
    post?: postOmit
    user?: userOmit
    user_like?: user_likeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    post: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | CategoryCountOutputTypeCountPostArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: postWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    comment: number
    image: number
    user_like: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comment?: boolean | PostCountOutputTypeCountCommentArgs
    image?: boolean | PostCountOutputTypeCountImageArgs
    user_like?: boolean | PostCountOutputTypeCountUser_likeArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountImageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: imageWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountUser_likeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_likeWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    comment: number
    post: number
    user_like: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comment?: boolean | UserCountOutputTypeCountCommentArgs
    post?: boolean | UserCountOutputTypeCountPostArgs
    user_like?: boolean | UserCountOutputTypeCountUser_likeArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: postWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUser_likeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_likeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    idcategory: number | null
  }

  export type CategorySumAggregateOutputType = {
    idcategory: number | null
  }

  export type CategoryMinAggregateOutputType = {
    idcategory: number | null
    nome: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    idcategory: number | null
    nome: string | null
  }

  export type CategoryCountAggregateOutputType = {
    idcategory: number
    nome: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    idcategory?: true
  }

  export type CategorySumAggregateInputType = {
    idcategory?: true
  }

  export type CategoryMinAggregateInputType = {
    idcategory?: true
    nome?: true
  }

  export type CategoryMaxAggregateInputType = {
    idcategory?: true
    nome?: true
  }

  export type CategoryCountAggregateInputType = {
    idcategory?: true
    nome?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which category to aggregate.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type categoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoryWhereInput
    orderBy?: categoryOrderByWithAggregationInput | categoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: categoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    idcategory: number
    nome: string
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends categoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type categorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idcategory?: boolean
    nome?: boolean
    post?: boolean | category$postArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>



  export type categorySelectScalar = {
    idcategory?: boolean
    nome?: boolean
  }

  export type categoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idcategory" | "nome", ExtArgs["result"]["category"]>
  export type categoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | category$postArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $categoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "category"
    objects: {
      post: Prisma.$postPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idcategory: number
      nome: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type categoryGetPayload<S extends boolean | null | undefined | categoryDefaultArgs> = $Result.GetResult<Prisma.$categoryPayload, S>

  type categoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface categoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['category'], meta: { name: 'category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {categoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoryFindUniqueArgs>(args: SelectSubset<T, categoryFindUniqueArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoryFindUniqueOrThrowArgs>(args: SelectSubset<T, categoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoryFindFirstArgs>(args?: SelectSubset<T, categoryFindFirstArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoryFindFirstOrThrowArgs>(args?: SelectSubset<T, categoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `idcategory`
     * const categoryWithIdcategoryOnly = await prisma.category.findMany({ select: { idcategory: true } })
     * 
     */
    findMany<T extends categoryFindManyArgs>(args?: SelectSubset<T, categoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {categoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends categoryCreateArgs>(args: SelectSubset<T, categoryCreateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {categoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoryCreateManyArgs>(args?: SelectSubset<T, categoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {categoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends categoryDeleteArgs>(args: SelectSubset<T, categoryDeleteArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {categoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoryUpdateArgs>(args: SelectSubset<T, categoryUpdateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {categoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoryDeleteManyArgs>(args?: SelectSubset<T, categoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoryUpdateManyArgs>(args: SelectSubset<T, categoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {categoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends categoryUpsertArgs>(args: SelectSubset<T, categoryUpsertArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoryCountArgs>(
      args?: Subset<T, categoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends categoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoryGroupByArgs['orderBy'] }
        : { orderBy?: categoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, categoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the category model
   */
  readonly fields: categoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends category$postArgs<ExtArgs> = {}>(args?: Subset<T, category$postArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the category model
   */
  interface categoryFieldRefs {
    readonly idcategory: FieldRef<"category", 'Int'>
    readonly nome: FieldRef<"category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * category findUnique
   */
  export type categoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findUniqueOrThrow
   */
  export type categoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findFirst
   */
  export type categoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findFirstOrThrow
   */
  export type categoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findMany
   */
  export type categoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category create
   */
  export type categoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The data needed to create a category.
     */
    data: XOR<categoryCreateInput, categoryUncheckedCreateInput>
  }

  /**
   * category createMany
   */
  export type categoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoryCreateManyInput | categoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * category update
   */
  export type categoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The data needed to update a category.
     */
    data: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
    /**
     * Choose, which category to update.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category updateMany
   */
  export type categoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * category upsert
   */
  export type categoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The filter to search for the category to update in case it exists.
     */
    where: categoryWhereUniqueInput
    /**
     * In case the category found by the `where` argument doesn't exist, create a new category with this data.
     */
    create: XOR<categoryCreateInput, categoryUncheckedCreateInput>
    /**
     * In case the category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
  }

  /**
   * category delete
   */
  export type categoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter which category to delete.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category deleteMany
   */
  export type categoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to delete.
     */
    limit?: number
  }

  /**
   * category.post
   */
  export type category$postArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    where?: postWhereInput
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    cursor?: postWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * category without action
   */
  export type categoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
  }


  /**
   * Model comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    user_iduser: number | null
    post_idpost: number | null
  }

  export type CommentSumAggregateOutputType = {
    user_iduser: number | null
    post_idpost: number | null
  }

  export type CommentMinAggregateOutputType = {
    user_iduser: number | null
    post_idpost: number | null
    comment: string | null
    time: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    user_iduser: number | null
    post_idpost: number | null
    comment: string | null
    time: Date | null
  }

  export type CommentCountAggregateOutputType = {
    user_iduser: number
    post_idpost: number
    comment: number
    time: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    user_iduser?: true
    post_idpost?: true
  }

  export type CommentSumAggregateInputType = {
    user_iduser?: true
    post_idpost?: true
  }

  export type CommentMinAggregateInputType = {
    user_iduser?: true
    post_idpost?: true
    comment?: true
    time?: true
  }

  export type CommentMaxAggregateInputType = {
    user_iduser?: true
    post_idpost?: true
    comment?: true
    time?: true
  }

  export type CommentCountAggregateInputType = {
    user_iduser?: true
    post_idpost?: true
    comment?: true
    time?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which comment to aggregate.
     */
    where?: commentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: commentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type commentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentWhereInput
    orderBy?: commentOrderByWithAggregationInput | commentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: commentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    user_iduser: number
    post_idpost: number
    comment: string
    time: Date | null
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends commentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type commentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_iduser?: boolean
    post_idpost?: boolean
    comment?: boolean
    time?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>



  export type commentSelectScalar = {
    user_iduser?: boolean
    post_idpost?: boolean
    comment?: boolean
    time?: boolean
  }

  export type commentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_iduser" | "post_idpost" | "comment" | "time", ExtArgs["result"]["comment"]>
  export type commentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $commentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "comment"
    objects: {
      post: Prisma.$postPayload<ExtArgs>
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_iduser: number
      post_idpost: number
      comment: string
      time: Date | null
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type commentGetPayload<S extends boolean | null | undefined | commentDefaultArgs> = $Result.GetResult<Prisma.$commentPayload, S>

  type commentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<commentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface commentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['comment'], meta: { name: 'comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {commentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends commentFindUniqueArgs>(args: SelectSubset<T, commentFindUniqueArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {commentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends commentFindUniqueOrThrowArgs>(args: SelectSubset<T, commentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends commentFindFirstArgs>(args?: SelectSubset<T, commentFindFirstArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends commentFindFirstOrThrowArgs>(args?: SelectSubset<T, commentFindFirstOrThrowArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `user_iduser`
     * const commentWithUser_iduserOnly = await prisma.comment.findMany({ select: { user_iduser: true } })
     * 
     */
    findMany<T extends commentFindManyArgs>(args?: SelectSubset<T, commentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {commentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends commentCreateArgs>(args: SelectSubset<T, commentCreateArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {commentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends commentCreateManyArgs>(args?: SelectSubset<T, commentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Comment.
     * @param {commentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends commentDeleteArgs>(args: SelectSubset<T, commentDeleteArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {commentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends commentUpdateArgs>(args: SelectSubset<T, commentUpdateArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {commentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends commentDeleteManyArgs>(args?: SelectSubset<T, commentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends commentUpdateManyArgs>(args: SelectSubset<T, commentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {commentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends commentUpsertArgs>(args: SelectSubset<T, commentUpsertArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends commentCountArgs>(
      args?: Subset<T, commentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends commentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: commentGroupByArgs['orderBy'] }
        : { orderBy?: commentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, commentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the comment model
   */
  readonly fields: commentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__commentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends postDefaultArgs<ExtArgs> = {}>(args?: Subset<T, postDefaultArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the comment model
   */
  interface commentFieldRefs {
    readonly user_iduser: FieldRef<"comment", 'Int'>
    readonly post_idpost: FieldRef<"comment", 'Int'>
    readonly comment: FieldRef<"comment", 'String'>
    readonly time: FieldRef<"comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * comment findUnique
   */
  export type commentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter, which comment to fetch.
     */
    where: commentWhereUniqueInput
  }

  /**
   * comment findUniqueOrThrow
   */
  export type commentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter, which comment to fetch.
     */
    where: commentWhereUniqueInput
  }

  /**
   * comment findFirst
   */
  export type commentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter, which comment to fetch.
     */
    where?: commentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for comments.
     */
    cursor?: commentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * comment findFirstOrThrow
   */
  export type commentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter, which comment to fetch.
     */
    where?: commentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for comments.
     */
    cursor?: commentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * comment findMany
   */
  export type commentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where?: commentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing comments.
     */
    cursor?: commentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * comment create
   */
  export type commentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * The data needed to create a comment.
     */
    data: XOR<commentCreateInput, commentUncheckedCreateInput>
  }

  /**
   * comment createMany
   */
  export type commentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many comments.
     */
    data: commentCreateManyInput | commentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * comment update
   */
  export type commentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * The data needed to update a comment.
     */
    data: XOR<commentUpdateInput, commentUncheckedUpdateInput>
    /**
     * Choose, which comment to update.
     */
    where: commentWhereUniqueInput
  }

  /**
   * comment updateMany
   */
  export type commentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update comments.
     */
    data: XOR<commentUpdateManyMutationInput, commentUncheckedUpdateManyInput>
    /**
     * Filter which comments to update
     */
    where?: commentWhereInput
    /**
     * Limit how many comments to update.
     */
    limit?: number
  }

  /**
   * comment upsert
   */
  export type commentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * The filter to search for the comment to update in case it exists.
     */
    where: commentWhereUniqueInput
    /**
     * In case the comment found by the `where` argument doesn't exist, create a new comment with this data.
     */
    create: XOR<commentCreateInput, commentUncheckedCreateInput>
    /**
     * In case the comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<commentUpdateInput, commentUncheckedUpdateInput>
  }

  /**
   * comment delete
   */
  export type commentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter which comment to delete.
     */
    where: commentWhereUniqueInput
  }

  /**
   * comment deleteMany
   */
  export type commentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which comments to delete
     */
    where?: commentWhereInput
    /**
     * Limit how many comments to delete.
     */
    limit?: number
  }

  /**
   * comment without action
   */
  export type commentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
  }


  /**
   * Model image
   */

  export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null
    _avg: ImageAvgAggregateOutputType | null
    _sum: ImageSumAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  export type ImageAvgAggregateOutputType = {
    idimage: number | null
    post_idpost: number | null
  }

  export type ImageSumAggregateOutputType = {
    idimage: number | null
    post_idpost: number | null
  }

  export type ImageMinAggregateOutputType = {
    idimage: number | null
    image: string | null
    post_idpost: number | null
  }

  export type ImageMaxAggregateOutputType = {
    idimage: number | null
    image: string | null
    post_idpost: number | null
  }

  export type ImageCountAggregateOutputType = {
    idimage: number
    image: number
    post_idpost: number
    _all: number
  }


  export type ImageAvgAggregateInputType = {
    idimage?: true
    post_idpost?: true
  }

  export type ImageSumAggregateInputType = {
    idimage?: true
    post_idpost?: true
  }

  export type ImageMinAggregateInputType = {
    idimage?: true
    image?: true
    post_idpost?: true
  }

  export type ImageMaxAggregateInputType = {
    idimage?: true
    image?: true
    post_idpost?: true
  }

  export type ImageCountAggregateInputType = {
    idimage?: true
    image?: true
    post_idpost?: true
    _all?: true
  }

  export type ImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which image to aggregate.
     */
    where?: imageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of images to fetch.
     */
    orderBy?: imageOrderByWithRelationInput | imageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: imageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned images
    **/
    _count?: true | ImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageMaxAggregateInputType
  }

  export type GetImageAggregateType<T extends ImageAggregateArgs> = {
        [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImage[P]>
      : GetScalarType<T[P], AggregateImage[P]>
  }




  export type imageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: imageWhereInput
    orderBy?: imageOrderByWithAggregationInput | imageOrderByWithAggregationInput[]
    by: ImageScalarFieldEnum[] | ImageScalarFieldEnum
    having?: imageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageCountAggregateInputType | true
    _avg?: ImageAvgAggregateInputType
    _sum?: ImageSumAggregateInputType
    _min?: ImageMinAggregateInputType
    _max?: ImageMaxAggregateInputType
  }

  export type ImageGroupByOutputType = {
    idimage: number
    image: string
    post_idpost: number
    _count: ImageCountAggregateOutputType | null
    _avg: ImageAvgAggregateOutputType | null
    _sum: ImageSumAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  type GetImageGroupByPayload<T extends imageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGroupByOutputType[P]>
        }
      >
    >


  export type imageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idimage?: boolean
    image?: boolean
    post_idpost?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["image"]>



  export type imageSelectScalar = {
    idimage?: boolean
    image?: boolean
    post_idpost?: boolean
  }

  export type imageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idimage" | "image" | "post_idpost", ExtArgs["result"]["image"]>
  export type imageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
  }

  export type $imagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "image"
    objects: {
      post: Prisma.$postPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      idimage: number
      image: string
      post_idpost: number
    }, ExtArgs["result"]["image"]>
    composites: {}
  }

  type imageGetPayload<S extends boolean | null | undefined | imageDefaultArgs> = $Result.GetResult<Prisma.$imagePayload, S>

  type imageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<imageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImageCountAggregateInputType | true
    }

  export interface imageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['image'], meta: { name: 'image' } }
    /**
     * Find zero or one Image that matches the filter.
     * @param {imageFindUniqueArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends imageFindUniqueArgs>(args: SelectSubset<T, imageFindUniqueArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Image that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {imageFindUniqueOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends imageFindUniqueOrThrowArgs>(args: SelectSubset<T, imageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageFindFirstArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends imageFindFirstArgs>(args?: SelectSubset<T, imageFindFirstArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageFindFirstOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends imageFindFirstOrThrowArgs>(args?: SelectSubset<T, imageFindFirstOrThrowArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.image.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.image.findMany({ take: 10 })
     * 
     * // Only select the `idimage`
     * const imageWithIdimageOnly = await prisma.image.findMany({ select: { idimage: true } })
     * 
     */
    findMany<T extends imageFindManyArgs>(args?: SelectSubset<T, imageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Image.
     * @param {imageCreateArgs} args - Arguments to create a Image.
     * @example
     * // Create one Image
     * const Image = await prisma.image.create({
     *   data: {
     *     // ... data to create a Image
     *   }
     * })
     * 
     */
    create<T extends imageCreateArgs>(args: SelectSubset<T, imageCreateArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Images.
     * @param {imageCreateManyArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends imageCreateManyArgs>(args?: SelectSubset<T, imageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Image.
     * @param {imageDeleteArgs} args - Arguments to delete one Image.
     * @example
     * // Delete one Image
     * const Image = await prisma.image.delete({
     *   where: {
     *     // ... filter to delete one Image
     *   }
     * })
     * 
     */
    delete<T extends imageDeleteArgs>(args: SelectSubset<T, imageDeleteArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Image.
     * @param {imageUpdateArgs} args - Arguments to update one Image.
     * @example
     * // Update one Image
     * const image = await prisma.image.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends imageUpdateArgs>(args: SelectSubset<T, imageUpdateArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Images.
     * @param {imageDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.image.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends imageDeleteManyArgs>(args?: SelectSubset<T, imageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends imageUpdateManyArgs>(args: SelectSubset<T, imageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Image.
     * @param {imageUpsertArgs} args - Arguments to update or create a Image.
     * @example
     * // Update or create a Image
     * const image = await prisma.image.upsert({
     *   create: {
     *     // ... data to create a Image
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Image we want to update
     *   }
     * })
     */
    upsert<T extends imageUpsertArgs>(args: SelectSubset<T, imageUpsertArgs<ExtArgs>>): Prisma__imageClient<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.image.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends imageCountArgs>(
      args?: Subset<T, imageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageAggregateArgs>(args: Subset<T, ImageAggregateArgs>): Prisma.PrismaPromise<GetImageAggregateType<T>>

    /**
     * Group by Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends imageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: imageGroupByArgs['orderBy'] }
        : { orderBy?: imageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, imageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the image model
   */
  readonly fields: imageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for image.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__imageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends postDefaultArgs<ExtArgs> = {}>(args?: Subset<T, postDefaultArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the image model
   */
  interface imageFieldRefs {
    readonly idimage: FieldRef<"image", 'Int'>
    readonly image: FieldRef<"image", 'String'>
    readonly post_idpost: FieldRef<"image", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * image findUnique
   */
  export type imageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
    /**
     * Filter, which image to fetch.
     */
    where: imageWhereUniqueInput
  }

  /**
   * image findUniqueOrThrow
   */
  export type imageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
    /**
     * Filter, which image to fetch.
     */
    where: imageWhereUniqueInput
  }

  /**
   * image findFirst
   */
  export type imageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
    /**
     * Filter, which image to fetch.
     */
    where?: imageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of images to fetch.
     */
    orderBy?: imageOrderByWithRelationInput | imageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for images.
     */
    cursor?: imageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * image findFirstOrThrow
   */
  export type imageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
    /**
     * Filter, which image to fetch.
     */
    where?: imageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of images to fetch.
     */
    orderBy?: imageOrderByWithRelationInput | imageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for images.
     */
    cursor?: imageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * image findMany
   */
  export type imageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
    /**
     * Filter, which images to fetch.
     */
    where?: imageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of images to fetch.
     */
    orderBy?: imageOrderByWithRelationInput | imageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing images.
     */
    cursor?: imageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` images.
     */
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * image create
   */
  export type imageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
    /**
     * The data needed to create a image.
     */
    data: XOR<imageCreateInput, imageUncheckedCreateInput>
  }

  /**
   * image createMany
   */
  export type imageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many images.
     */
    data: imageCreateManyInput | imageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * image update
   */
  export type imageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
    /**
     * The data needed to update a image.
     */
    data: XOR<imageUpdateInput, imageUncheckedUpdateInput>
    /**
     * Choose, which image to update.
     */
    where: imageWhereUniqueInput
  }

  /**
   * image updateMany
   */
  export type imageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update images.
     */
    data: XOR<imageUpdateManyMutationInput, imageUncheckedUpdateManyInput>
    /**
     * Filter which images to update
     */
    where?: imageWhereInput
    /**
     * Limit how many images to update.
     */
    limit?: number
  }

  /**
   * image upsert
   */
  export type imageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
    /**
     * The filter to search for the image to update in case it exists.
     */
    where: imageWhereUniqueInput
    /**
     * In case the image found by the `where` argument doesn't exist, create a new image with this data.
     */
    create: XOR<imageCreateInput, imageUncheckedCreateInput>
    /**
     * In case the image was found with the provided `where` argument, update it with this data.
     */
    update: XOR<imageUpdateInput, imageUncheckedUpdateInput>
  }

  /**
   * image delete
   */
  export type imageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
    /**
     * Filter which image to delete.
     */
    where: imageWhereUniqueInput
  }

  /**
   * image deleteMany
   */
  export type imageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which images to delete
     */
    where?: imageWhereInput
    /**
     * Limit how many images to delete.
     */
    limit?: number
  }

  /**
   * image without action
   */
  export type imageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
  }


  /**
   * Model post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    idpost: number | null
    user_iduser: number | null
    categoria_idcategoria: number | null
  }

  export type PostSumAggregateOutputType = {
    idpost: number | null
    user_iduser: number | null
    categoria_idcategoria: number | null
  }

  export type PostMinAggregateOutputType = {
    idpost: number | null
    content: string | null
    user_iduser: number | null
    categoria_idcategoria: number | null
    time: Date | null
  }

  export type PostMaxAggregateOutputType = {
    idpost: number | null
    content: string | null
    user_iduser: number | null
    categoria_idcategoria: number | null
    time: Date | null
  }

  export type PostCountAggregateOutputType = {
    idpost: number
    content: number
    user_iduser: number
    categoria_idcategoria: number
    time: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    idpost?: true
    user_iduser?: true
    categoria_idcategoria?: true
  }

  export type PostSumAggregateInputType = {
    idpost?: true
    user_iduser?: true
    categoria_idcategoria?: true
  }

  export type PostMinAggregateInputType = {
    idpost?: true
    content?: true
    user_iduser?: true
    categoria_idcategoria?: true
    time?: true
  }

  export type PostMaxAggregateInputType = {
    idpost?: true
    content?: true
    user_iduser?: true
    categoria_idcategoria?: true
    time?: true
  }

  export type PostCountAggregateInputType = {
    idpost?: true
    content?: true
    user_iduser?: true
    categoria_idcategoria?: true
    time?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which post to aggregate.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type postGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: postWhereInput
    orderBy?: postOrderByWithAggregationInput | postOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: postScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    idpost: number
    content: string
    user_iduser: number
    categoria_idcategoria: number
    time: Date
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends postGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type postSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idpost?: boolean
    content?: boolean
    user_iduser?: boolean
    categoria_idcategoria?: boolean
    time?: boolean
    comment?: boolean | post$commentArgs<ExtArgs>
    image?: boolean | post$imageArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
    user_like?: boolean | post$user_likeArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>



  export type postSelectScalar = {
    idpost?: boolean
    content?: boolean
    user_iduser?: boolean
    categoria_idcategoria?: boolean
    time?: boolean
  }

  export type postOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idpost" | "content" | "user_iduser" | "categoria_idcategoria" | "time", ExtArgs["result"]["post"]>
  export type postInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comment?: boolean | post$commentArgs<ExtArgs>
    image?: boolean | post$imageArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
    user_like?: boolean | post$user_likeArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $postPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "post"
    objects: {
      comment: Prisma.$commentPayload<ExtArgs>[]
      image: Prisma.$imagePayload<ExtArgs>[]
      category: Prisma.$categoryPayload<ExtArgs>
      user: Prisma.$userPayload<ExtArgs>
      user_like: Prisma.$user_likePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idpost: number
      content: string
      user_iduser: number
      categoria_idcategoria: number
      time: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type postGetPayload<S extends boolean | null | undefined | postDefaultArgs> = $Result.GetResult<Prisma.$postPayload, S>

  type postCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<postFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface postDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['post'], meta: { name: 'post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {postFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends postFindUniqueArgs>(args: SelectSubset<T, postFindUniqueArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {postFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends postFindUniqueOrThrowArgs>(args: SelectSubset<T, postFindUniqueOrThrowArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends postFindFirstArgs>(args?: SelectSubset<T, postFindFirstArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends postFindFirstOrThrowArgs>(args?: SelectSubset<T, postFindFirstOrThrowArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `idpost`
     * const postWithIdpostOnly = await prisma.post.findMany({ select: { idpost: true } })
     * 
     */
    findMany<T extends postFindManyArgs>(args?: SelectSubset<T, postFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {postCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends postCreateArgs>(args: SelectSubset<T, postCreateArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {postCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends postCreateManyArgs>(args?: SelectSubset<T, postCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Post.
     * @param {postDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends postDeleteArgs>(args: SelectSubset<T, postDeleteArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {postUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends postUpdateArgs>(args: SelectSubset<T, postUpdateArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {postDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends postDeleteManyArgs>(args?: SelectSubset<T, postDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends postUpdateManyArgs>(args: SelectSubset<T, postUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {postUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends postUpsertArgs>(args: SelectSubset<T, postUpsertArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends postCountArgs>(
      args?: Subset<T, postCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends postGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: postGroupByArgs['orderBy'] }
        : { orderBy?: postGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, postGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the post model
   */
  readonly fields: postFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__postClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comment<T extends post$commentArgs<ExtArgs> = {}>(args?: Subset<T, post$commentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    image<T extends post$imageArgs<ExtArgs> = {}>(args?: Subset<T, post$imageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$imagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    category<T extends categoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, categoryDefaultArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user_like<T extends post$user_likeArgs<ExtArgs> = {}>(args?: Subset<T, post$user_likeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the post model
   */
  interface postFieldRefs {
    readonly idpost: FieldRef<"post", 'Int'>
    readonly content: FieldRef<"post", 'String'>
    readonly user_iduser: FieldRef<"post", 'Int'>
    readonly categoria_idcategoria: FieldRef<"post", 'Int'>
    readonly time: FieldRef<"post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * post findUnique
   */
  export type postFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where: postWhereUniqueInput
  }

  /**
   * post findUniqueOrThrow
   */
  export type postFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where: postWhereUniqueInput
  }

  /**
   * post findFirst
   */
  export type postFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post findFirstOrThrow
   */
  export type postFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post findMany
   */
  export type postFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which posts to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post create
   */
  export type postCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * The data needed to create a post.
     */
    data: XOR<postCreateInput, postUncheckedCreateInput>
  }

  /**
   * post createMany
   */
  export type postCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many posts.
     */
    data: postCreateManyInput | postCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * post update
   */
  export type postUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * The data needed to update a post.
     */
    data: XOR<postUpdateInput, postUncheckedUpdateInput>
    /**
     * Choose, which post to update.
     */
    where: postWhereUniqueInput
  }

  /**
   * post updateMany
   */
  export type postUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update posts.
     */
    data: XOR<postUpdateManyMutationInput, postUncheckedUpdateManyInput>
    /**
     * Filter which posts to update
     */
    where?: postWhereInput
    /**
     * Limit how many posts to update.
     */
    limit?: number
  }

  /**
   * post upsert
   */
  export type postUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * The filter to search for the post to update in case it exists.
     */
    where: postWhereUniqueInput
    /**
     * In case the post found by the `where` argument doesn't exist, create a new post with this data.
     */
    create: XOR<postCreateInput, postUncheckedCreateInput>
    /**
     * In case the post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<postUpdateInput, postUncheckedUpdateInput>
  }

  /**
   * post delete
   */
  export type postDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter which post to delete.
     */
    where: postWhereUniqueInput
  }

  /**
   * post deleteMany
   */
  export type postDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which posts to delete
     */
    where?: postWhereInput
    /**
     * Limit how many posts to delete.
     */
    limit?: number
  }

  /**
   * post.comment
   */
  export type post$commentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    where?: commentWhereInput
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    cursor?: commentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * post.image
   */
  export type post$imageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the image
     */
    select?: imageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the image
     */
    omit?: imageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imageInclude<ExtArgs> | null
    where?: imageWhereInput
    orderBy?: imageOrderByWithRelationInput | imageOrderByWithRelationInput[]
    cursor?: imageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * post.user_like
   */
  export type post$user_likeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    where?: user_likeWhereInput
    orderBy?: user_likeOrderByWithRelationInput | user_likeOrderByWithRelationInput[]
    cursor?: user_likeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_likeScalarFieldEnum | User_likeScalarFieldEnum[]
  }

  /**
   * post without action
   */
  export type postDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    iduser: number | null
  }

  export type UserSumAggregateOutputType = {
    iduser: number | null
  }

  export type UserMinAggregateOutputType = {
    iduser: number | null
    name: string | null
    e_mail: string | null
    pass: string | null
    fone: string | null
  }

  export type UserMaxAggregateOutputType = {
    iduser: number | null
    name: string | null
    e_mail: string | null
    pass: string | null
    fone: string | null
  }

  export type UserCountAggregateOutputType = {
    iduser: number
    name: number
    e_mail: number
    pass: number
    fone: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    iduser?: true
  }

  export type UserSumAggregateInputType = {
    iduser?: true
  }

  export type UserMinAggregateInputType = {
    iduser?: true
    name?: true
    e_mail?: true
    pass?: true
    fone?: true
  }

  export type UserMaxAggregateInputType = {
    iduser?: true
    name?: true
    e_mail?: true
    pass?: true
    fone?: true
  }

  export type UserCountAggregateInputType = {
    iduser?: true
    name?: true
    e_mail?: true
    pass?: true
    fone?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    iduser: number
    name: string
    e_mail: string
    pass: string
    fone: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    iduser?: boolean
    name?: boolean
    e_mail?: boolean
    pass?: boolean
    fone?: boolean
    comment?: boolean | user$commentArgs<ExtArgs>
    post?: boolean | user$postArgs<ExtArgs>
    user_like?: boolean | user$user_likeArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type userSelectScalar = {
    iduser?: boolean
    name?: boolean
    e_mail?: boolean
    pass?: boolean
    fone?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"iduser" | "name" | "e_mail" | "pass" | "fone", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comment?: boolean | user$commentArgs<ExtArgs>
    post?: boolean | user$postArgs<ExtArgs>
    user_like?: boolean | user$user_likeArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      comment: Prisma.$commentPayload<ExtArgs>[]
      post: Prisma.$postPayload<ExtArgs>[]
      user_like: Prisma.$user_likePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      iduser: number
      name: string
      e_mail: string
      pass: string
      fone: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `iduser`
     * const userWithIduserOnly = await prisma.user.findMany({ select: { iduser: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comment<T extends user$commentArgs<ExtArgs> = {}>(args?: Subset<T, user$commentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    post<T extends user$postArgs<ExtArgs> = {}>(args?: Subset<T, user$postArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_like<T extends user$user_likeArgs<ExtArgs> = {}>(args?: Subset<T, user$user_likeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly iduser: FieldRef<"user", 'Int'>
    readonly name: FieldRef<"user", 'String'>
    readonly e_mail: FieldRef<"user", 'String'>
    readonly pass: FieldRef<"user", 'String'>
    readonly fone: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.comment
   */
  export type user$commentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    where?: commentWhereInput
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    cursor?: commentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * user.post
   */
  export type user$postArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    where?: postWhereInput
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    cursor?: postWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * user.user_like
   */
  export type user$user_likeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    where?: user_likeWhereInput
    orderBy?: user_likeOrderByWithRelationInput | user_likeOrderByWithRelationInput[]
    cursor?: user_likeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_likeScalarFieldEnum | User_likeScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Model user_like
   */

  export type AggregateUser_like = {
    _count: User_likeCountAggregateOutputType | null
    _avg: User_likeAvgAggregateOutputType | null
    _sum: User_likeSumAggregateOutputType | null
    _min: User_likeMinAggregateOutputType | null
    _max: User_likeMaxAggregateOutputType | null
  }

  export type User_likeAvgAggregateOutputType = {
    user_iduser: number | null
    post_idpost: number | null
  }

  export type User_likeSumAggregateOutputType = {
    user_iduser: number | null
    post_idpost: number | null
  }

  export type User_likeMinAggregateOutputType = {
    user_iduser: number | null
    post_idpost: number | null
  }

  export type User_likeMaxAggregateOutputType = {
    user_iduser: number | null
    post_idpost: number | null
  }

  export type User_likeCountAggregateOutputType = {
    user_iduser: number
    post_idpost: number
    _all: number
  }


  export type User_likeAvgAggregateInputType = {
    user_iduser?: true
    post_idpost?: true
  }

  export type User_likeSumAggregateInputType = {
    user_iduser?: true
    post_idpost?: true
  }

  export type User_likeMinAggregateInputType = {
    user_iduser?: true
    post_idpost?: true
  }

  export type User_likeMaxAggregateInputType = {
    user_iduser?: true
    post_idpost?: true
  }

  export type User_likeCountAggregateInputType = {
    user_iduser?: true
    post_idpost?: true
    _all?: true
  }

  export type User_likeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_like to aggregate.
     */
    where?: user_likeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_likes to fetch.
     */
    orderBy?: user_likeOrderByWithRelationInput | user_likeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_likeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_likes
    **/
    _count?: true | User_likeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_likeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_likeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_likeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_likeMaxAggregateInputType
  }

  export type GetUser_likeAggregateType<T extends User_likeAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_like]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_like[P]>
      : GetScalarType<T[P], AggregateUser_like[P]>
  }




  export type user_likeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_likeWhereInput
    orderBy?: user_likeOrderByWithAggregationInput | user_likeOrderByWithAggregationInput[]
    by: User_likeScalarFieldEnum[] | User_likeScalarFieldEnum
    having?: user_likeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_likeCountAggregateInputType | true
    _avg?: User_likeAvgAggregateInputType
    _sum?: User_likeSumAggregateInputType
    _min?: User_likeMinAggregateInputType
    _max?: User_likeMaxAggregateInputType
  }

  export type User_likeGroupByOutputType = {
    user_iduser: number
    post_idpost: number
    _count: User_likeCountAggregateOutputType | null
    _avg: User_likeAvgAggregateOutputType | null
    _sum: User_likeSumAggregateOutputType | null
    _min: User_likeMinAggregateOutputType | null
    _max: User_likeMaxAggregateOutputType | null
  }

  type GetUser_likeGroupByPayload<T extends user_likeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_likeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_likeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_likeGroupByOutputType[P]>
            : GetScalarType<T[P], User_likeGroupByOutputType[P]>
        }
      >
    >


  export type user_likeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_iduser?: boolean
    post_idpost?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_like"]>



  export type user_likeSelectScalar = {
    user_iduser?: boolean
    post_idpost?: boolean
  }

  export type user_likeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_iduser" | "post_idpost", ExtArgs["result"]["user_like"]>
  export type user_likeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $user_likePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_like"
    objects: {
      post: Prisma.$postPayload<ExtArgs>
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_iduser: number
      post_idpost: number
    }, ExtArgs["result"]["user_like"]>
    composites: {}
  }

  type user_likeGetPayload<S extends boolean | null | undefined | user_likeDefaultArgs> = $Result.GetResult<Prisma.$user_likePayload, S>

  type user_likeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_likeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_likeCountAggregateInputType | true
    }

  export interface user_likeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_like'], meta: { name: 'user_like' } }
    /**
     * Find zero or one User_like that matches the filter.
     * @param {user_likeFindUniqueArgs} args - Arguments to find a User_like
     * @example
     * // Get one User_like
     * const user_like = await prisma.user_like.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_likeFindUniqueArgs>(args: SelectSubset<T, user_likeFindUniqueArgs<ExtArgs>>): Prisma__user_likeClient<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_like that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_likeFindUniqueOrThrowArgs} args - Arguments to find a User_like
     * @example
     * // Get one User_like
     * const user_like = await prisma.user_like.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_likeFindUniqueOrThrowArgs>(args: SelectSubset<T, user_likeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_likeClient<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_like that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_likeFindFirstArgs} args - Arguments to find a User_like
     * @example
     * // Get one User_like
     * const user_like = await prisma.user_like.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_likeFindFirstArgs>(args?: SelectSubset<T, user_likeFindFirstArgs<ExtArgs>>): Prisma__user_likeClient<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_like that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_likeFindFirstOrThrowArgs} args - Arguments to find a User_like
     * @example
     * // Get one User_like
     * const user_like = await prisma.user_like.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_likeFindFirstOrThrowArgs>(args?: SelectSubset<T, user_likeFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_likeClient<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_likes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_likeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_likes
     * const user_likes = await prisma.user_like.findMany()
     * 
     * // Get first 10 User_likes
     * const user_likes = await prisma.user_like.findMany({ take: 10 })
     * 
     * // Only select the `user_iduser`
     * const user_likeWithUser_iduserOnly = await prisma.user_like.findMany({ select: { user_iduser: true } })
     * 
     */
    findMany<T extends user_likeFindManyArgs>(args?: SelectSubset<T, user_likeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_like.
     * @param {user_likeCreateArgs} args - Arguments to create a User_like.
     * @example
     * // Create one User_like
     * const User_like = await prisma.user_like.create({
     *   data: {
     *     // ... data to create a User_like
     *   }
     * })
     * 
     */
    create<T extends user_likeCreateArgs>(args: SelectSubset<T, user_likeCreateArgs<ExtArgs>>): Prisma__user_likeClient<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_likes.
     * @param {user_likeCreateManyArgs} args - Arguments to create many User_likes.
     * @example
     * // Create many User_likes
     * const user_like = await prisma.user_like.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_likeCreateManyArgs>(args?: SelectSubset<T, user_likeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User_like.
     * @param {user_likeDeleteArgs} args - Arguments to delete one User_like.
     * @example
     * // Delete one User_like
     * const User_like = await prisma.user_like.delete({
     *   where: {
     *     // ... filter to delete one User_like
     *   }
     * })
     * 
     */
    delete<T extends user_likeDeleteArgs>(args: SelectSubset<T, user_likeDeleteArgs<ExtArgs>>): Prisma__user_likeClient<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_like.
     * @param {user_likeUpdateArgs} args - Arguments to update one User_like.
     * @example
     * // Update one User_like
     * const user_like = await prisma.user_like.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_likeUpdateArgs>(args: SelectSubset<T, user_likeUpdateArgs<ExtArgs>>): Prisma__user_likeClient<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_likes.
     * @param {user_likeDeleteManyArgs} args - Arguments to filter User_likes to delete.
     * @example
     * // Delete a few User_likes
     * const { count } = await prisma.user_like.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_likeDeleteManyArgs>(args?: SelectSubset<T, user_likeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_likeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_likes
     * const user_like = await prisma.user_like.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_likeUpdateManyArgs>(args: SelectSubset<T, user_likeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User_like.
     * @param {user_likeUpsertArgs} args - Arguments to update or create a User_like.
     * @example
     * // Update or create a User_like
     * const user_like = await prisma.user_like.upsert({
     *   create: {
     *     // ... data to create a User_like
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_like we want to update
     *   }
     * })
     */
    upsert<T extends user_likeUpsertArgs>(args: SelectSubset<T, user_likeUpsertArgs<ExtArgs>>): Prisma__user_likeClient<$Result.GetResult<Prisma.$user_likePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_likeCountArgs} args - Arguments to filter User_likes to count.
     * @example
     * // Count the number of User_likes
     * const count = await prisma.user_like.count({
     *   where: {
     *     // ... the filter for the User_likes we want to count
     *   }
     * })
    **/
    count<T extends user_likeCountArgs>(
      args?: Subset<T, user_likeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_likeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_likeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_likeAggregateArgs>(args: Subset<T, User_likeAggregateArgs>): Prisma.PrismaPromise<GetUser_likeAggregateType<T>>

    /**
     * Group by User_like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_likeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_likeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_likeGroupByArgs['orderBy'] }
        : { orderBy?: user_likeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_likeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_likeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_like model
   */
  readonly fields: user_likeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_like.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_likeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends postDefaultArgs<ExtArgs> = {}>(args?: Subset<T, postDefaultArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_like model
   */
  interface user_likeFieldRefs {
    readonly user_iduser: FieldRef<"user_like", 'Int'>
    readonly post_idpost: FieldRef<"user_like", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * user_like findUnique
   */
  export type user_likeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    /**
     * Filter, which user_like to fetch.
     */
    where: user_likeWhereUniqueInput
  }

  /**
   * user_like findUniqueOrThrow
   */
  export type user_likeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    /**
     * Filter, which user_like to fetch.
     */
    where: user_likeWhereUniqueInput
  }

  /**
   * user_like findFirst
   */
  export type user_likeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    /**
     * Filter, which user_like to fetch.
     */
    where?: user_likeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_likes to fetch.
     */
    orderBy?: user_likeOrderByWithRelationInput | user_likeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_likes.
     */
    cursor?: user_likeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_likes.
     */
    distinct?: User_likeScalarFieldEnum | User_likeScalarFieldEnum[]
  }

  /**
   * user_like findFirstOrThrow
   */
  export type user_likeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    /**
     * Filter, which user_like to fetch.
     */
    where?: user_likeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_likes to fetch.
     */
    orderBy?: user_likeOrderByWithRelationInput | user_likeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_likes.
     */
    cursor?: user_likeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_likes.
     */
    distinct?: User_likeScalarFieldEnum | User_likeScalarFieldEnum[]
  }

  /**
   * user_like findMany
   */
  export type user_likeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    /**
     * Filter, which user_likes to fetch.
     */
    where?: user_likeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_likes to fetch.
     */
    orderBy?: user_likeOrderByWithRelationInput | user_likeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_likes.
     */
    cursor?: user_likeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_likes.
     */
    skip?: number
    distinct?: User_likeScalarFieldEnum | User_likeScalarFieldEnum[]
  }

  /**
   * user_like create
   */
  export type user_likeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    /**
     * The data needed to create a user_like.
     */
    data: XOR<user_likeCreateInput, user_likeUncheckedCreateInput>
  }

  /**
   * user_like createMany
   */
  export type user_likeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_likes.
     */
    data: user_likeCreateManyInput | user_likeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_like update
   */
  export type user_likeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    /**
     * The data needed to update a user_like.
     */
    data: XOR<user_likeUpdateInput, user_likeUncheckedUpdateInput>
    /**
     * Choose, which user_like to update.
     */
    where: user_likeWhereUniqueInput
  }

  /**
   * user_like updateMany
   */
  export type user_likeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_likes.
     */
    data: XOR<user_likeUpdateManyMutationInput, user_likeUncheckedUpdateManyInput>
    /**
     * Filter which user_likes to update
     */
    where?: user_likeWhereInput
    /**
     * Limit how many user_likes to update.
     */
    limit?: number
  }

  /**
   * user_like upsert
   */
  export type user_likeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    /**
     * The filter to search for the user_like to update in case it exists.
     */
    where: user_likeWhereUniqueInput
    /**
     * In case the user_like found by the `where` argument doesn't exist, create a new user_like with this data.
     */
    create: XOR<user_likeCreateInput, user_likeUncheckedCreateInput>
    /**
     * In case the user_like was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_likeUpdateInput, user_likeUncheckedUpdateInput>
  }

  /**
   * user_like delete
   */
  export type user_likeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
    /**
     * Filter which user_like to delete.
     */
    where: user_likeWhereUniqueInput
  }

  /**
   * user_like deleteMany
   */
  export type user_likeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_likes to delete
     */
    where?: user_likeWhereInput
    /**
     * Limit how many user_likes to delete.
     */
    limit?: number
  }

  /**
   * user_like without action
   */
  export type user_likeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_like
     */
    select?: user_likeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_like
     */
    omit?: user_likeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_likeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CategoryScalarFieldEnum: {
    idcategory: 'idcategory',
    nome: 'nome'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    user_iduser: 'user_iduser',
    post_idpost: 'post_idpost',
    comment: 'comment',
    time: 'time'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const ImageScalarFieldEnum: {
    idimage: 'idimage',
    image: 'image',
    post_idpost: 'post_idpost'
  };

  export type ImageScalarFieldEnum = (typeof ImageScalarFieldEnum)[keyof typeof ImageScalarFieldEnum]


  export const PostScalarFieldEnum: {
    idpost: 'idpost',
    content: 'content',
    user_iduser: 'user_iduser',
    categoria_idcategoria: 'categoria_idcategoria',
    time: 'time'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const UserScalarFieldEnum: {
    iduser: 'iduser',
    name: 'name',
    e_mail: 'e_mail',
    pass: 'pass',
    fone: 'fone'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const User_likeScalarFieldEnum: {
    user_iduser: 'user_iduser',
    post_idpost: 'post_idpost'
  };

  export type User_likeScalarFieldEnum = (typeof User_likeScalarFieldEnum)[keyof typeof User_likeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const categoryOrderByRelevanceFieldEnum: {
    nome: 'nome'
  };

  export type categoryOrderByRelevanceFieldEnum = (typeof categoryOrderByRelevanceFieldEnum)[keyof typeof categoryOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const commentOrderByRelevanceFieldEnum: {
    comment: 'comment'
  };

  export type commentOrderByRelevanceFieldEnum = (typeof commentOrderByRelevanceFieldEnum)[keyof typeof commentOrderByRelevanceFieldEnum]


  export const imageOrderByRelevanceFieldEnum: {
    image: 'image'
  };

  export type imageOrderByRelevanceFieldEnum = (typeof imageOrderByRelevanceFieldEnum)[keyof typeof imageOrderByRelevanceFieldEnum]


  export const postOrderByRelevanceFieldEnum: {
    content: 'content'
  };

  export type postOrderByRelevanceFieldEnum = (typeof postOrderByRelevanceFieldEnum)[keyof typeof postOrderByRelevanceFieldEnum]


  export const userOrderByRelevanceFieldEnum: {
    name: 'name',
    e_mail: 'e_mail',
    pass: 'pass',
    fone: 'fone'
  };

  export type userOrderByRelevanceFieldEnum = (typeof userOrderByRelevanceFieldEnum)[keyof typeof userOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type categoryWhereInput = {
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    idcategory?: IntFilter<"category"> | number
    nome?: StringFilter<"category"> | string
    post?: PostListRelationFilter
  }

  export type categoryOrderByWithRelationInput = {
    idcategory?: SortOrder
    nome?: SortOrder
    post?: postOrderByRelationAggregateInput
    _relevance?: categoryOrderByRelevanceInput
  }

  export type categoryWhereUniqueInput = Prisma.AtLeast<{
    idcategory?: number
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    nome?: StringFilter<"category"> | string
    post?: PostListRelationFilter
  }, "idcategory">

  export type categoryOrderByWithAggregationInput = {
    idcategory?: SortOrder
    nome?: SortOrder
    _count?: categoryCountOrderByAggregateInput
    _avg?: categoryAvgOrderByAggregateInput
    _max?: categoryMaxOrderByAggregateInput
    _min?: categoryMinOrderByAggregateInput
    _sum?: categorySumOrderByAggregateInput
  }

  export type categoryScalarWhereWithAggregatesInput = {
    AND?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    OR?: categoryScalarWhereWithAggregatesInput[]
    NOT?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    idcategory?: IntWithAggregatesFilter<"category"> | number
    nome?: StringWithAggregatesFilter<"category"> | string
  }

  export type commentWhereInput = {
    AND?: commentWhereInput | commentWhereInput[]
    OR?: commentWhereInput[]
    NOT?: commentWhereInput | commentWhereInput[]
    user_iduser?: IntFilter<"comment"> | number
    post_idpost?: IntFilter<"comment"> | number
    comment?: StringFilter<"comment"> | string
    time?: DateTimeNullableFilter<"comment"> | Date | string | null
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type commentOrderByWithRelationInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
    comment?: SortOrder
    time?: SortOrderInput | SortOrder
    post?: postOrderByWithRelationInput
    user?: userOrderByWithRelationInput
    _relevance?: commentOrderByRelevanceInput
  }

  export type commentWhereUniqueInput = Prisma.AtLeast<{
    user_iduser_post_idpost?: commentUser_iduserPost_idpostCompoundUniqueInput
    AND?: commentWhereInput | commentWhereInput[]
    OR?: commentWhereInput[]
    NOT?: commentWhereInput | commentWhereInput[]
    user_iduser?: IntFilter<"comment"> | number
    post_idpost?: IntFilter<"comment"> | number
    comment?: StringFilter<"comment"> | string
    time?: DateTimeNullableFilter<"comment"> | Date | string | null
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "user_iduser_post_idpost">

  export type commentOrderByWithAggregationInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
    comment?: SortOrder
    time?: SortOrderInput | SortOrder
    _count?: commentCountOrderByAggregateInput
    _avg?: commentAvgOrderByAggregateInput
    _max?: commentMaxOrderByAggregateInput
    _min?: commentMinOrderByAggregateInput
    _sum?: commentSumOrderByAggregateInput
  }

  export type commentScalarWhereWithAggregatesInput = {
    AND?: commentScalarWhereWithAggregatesInput | commentScalarWhereWithAggregatesInput[]
    OR?: commentScalarWhereWithAggregatesInput[]
    NOT?: commentScalarWhereWithAggregatesInput | commentScalarWhereWithAggregatesInput[]
    user_iduser?: IntWithAggregatesFilter<"comment"> | number
    post_idpost?: IntWithAggregatesFilter<"comment"> | number
    comment?: StringWithAggregatesFilter<"comment"> | string
    time?: DateTimeNullableWithAggregatesFilter<"comment"> | Date | string | null
  }

  export type imageWhereInput = {
    AND?: imageWhereInput | imageWhereInput[]
    OR?: imageWhereInput[]
    NOT?: imageWhereInput | imageWhereInput[]
    idimage?: IntFilter<"image"> | number
    image?: StringFilter<"image"> | string
    post_idpost?: IntFilter<"image"> | number
    post?: XOR<PostScalarRelationFilter, postWhereInput>
  }

  export type imageOrderByWithRelationInput = {
    idimage?: SortOrder
    image?: SortOrder
    post_idpost?: SortOrder
    post?: postOrderByWithRelationInput
    _relevance?: imageOrderByRelevanceInput
  }

  export type imageWhereUniqueInput = Prisma.AtLeast<{
    idimage?: number
    AND?: imageWhereInput | imageWhereInput[]
    OR?: imageWhereInput[]
    NOT?: imageWhereInput | imageWhereInput[]
    image?: StringFilter<"image"> | string
    post_idpost?: IntFilter<"image"> | number
    post?: XOR<PostScalarRelationFilter, postWhereInput>
  }, "idimage" | "idimage">

  export type imageOrderByWithAggregationInput = {
    idimage?: SortOrder
    image?: SortOrder
    post_idpost?: SortOrder
    _count?: imageCountOrderByAggregateInput
    _avg?: imageAvgOrderByAggregateInput
    _max?: imageMaxOrderByAggregateInput
    _min?: imageMinOrderByAggregateInput
    _sum?: imageSumOrderByAggregateInput
  }

  export type imageScalarWhereWithAggregatesInput = {
    AND?: imageScalarWhereWithAggregatesInput | imageScalarWhereWithAggregatesInput[]
    OR?: imageScalarWhereWithAggregatesInput[]
    NOT?: imageScalarWhereWithAggregatesInput | imageScalarWhereWithAggregatesInput[]
    idimage?: IntWithAggregatesFilter<"image"> | number
    image?: StringWithAggregatesFilter<"image"> | string
    post_idpost?: IntWithAggregatesFilter<"image"> | number
  }

  export type postWhereInput = {
    AND?: postWhereInput | postWhereInput[]
    OR?: postWhereInput[]
    NOT?: postWhereInput | postWhereInput[]
    idpost?: IntFilter<"post"> | number
    content?: StringFilter<"post"> | string
    user_iduser?: IntFilter<"post"> | number
    categoria_idcategoria?: IntFilter<"post"> | number
    time?: DateTimeFilter<"post"> | Date | string
    comment?: CommentListRelationFilter
    image?: ImageListRelationFilter
    category?: XOR<CategoryScalarRelationFilter, categoryWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    user_like?: User_likeListRelationFilter
  }

  export type postOrderByWithRelationInput = {
    idpost?: SortOrder
    content?: SortOrder
    user_iduser?: SortOrder
    categoria_idcategoria?: SortOrder
    time?: SortOrder
    comment?: commentOrderByRelationAggregateInput
    image?: imageOrderByRelationAggregateInput
    category?: categoryOrderByWithRelationInput
    user?: userOrderByWithRelationInput
    user_like?: user_likeOrderByRelationAggregateInput
    _relevance?: postOrderByRelevanceInput
  }

  export type postWhereUniqueInput = Prisma.AtLeast<{
    idpost?: number
    AND?: postWhereInput | postWhereInput[]
    OR?: postWhereInput[]
    NOT?: postWhereInput | postWhereInput[]
    content?: StringFilter<"post"> | string
    user_iduser?: IntFilter<"post"> | number
    categoria_idcategoria?: IntFilter<"post"> | number
    time?: DateTimeFilter<"post"> | Date | string
    comment?: CommentListRelationFilter
    image?: ImageListRelationFilter
    category?: XOR<CategoryScalarRelationFilter, categoryWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    user_like?: User_likeListRelationFilter
  }, "idpost" | "idpost">

  export type postOrderByWithAggregationInput = {
    idpost?: SortOrder
    content?: SortOrder
    user_iduser?: SortOrder
    categoria_idcategoria?: SortOrder
    time?: SortOrder
    _count?: postCountOrderByAggregateInput
    _avg?: postAvgOrderByAggregateInput
    _max?: postMaxOrderByAggregateInput
    _min?: postMinOrderByAggregateInput
    _sum?: postSumOrderByAggregateInput
  }

  export type postScalarWhereWithAggregatesInput = {
    AND?: postScalarWhereWithAggregatesInput | postScalarWhereWithAggregatesInput[]
    OR?: postScalarWhereWithAggregatesInput[]
    NOT?: postScalarWhereWithAggregatesInput | postScalarWhereWithAggregatesInput[]
    idpost?: IntWithAggregatesFilter<"post"> | number
    content?: StringWithAggregatesFilter<"post"> | string
    user_iduser?: IntWithAggregatesFilter<"post"> | number
    categoria_idcategoria?: IntWithAggregatesFilter<"post"> | number
    time?: DateTimeWithAggregatesFilter<"post"> | Date | string
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    iduser?: IntFilter<"user"> | number
    name?: StringFilter<"user"> | string
    e_mail?: StringFilter<"user"> | string
    pass?: StringFilter<"user"> | string
    fone?: StringNullableFilter<"user"> | string | null
    comment?: CommentListRelationFilter
    post?: PostListRelationFilter
    user_like?: User_likeListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    iduser?: SortOrder
    name?: SortOrder
    e_mail?: SortOrder
    pass?: SortOrder
    fone?: SortOrderInput | SortOrder
    comment?: commentOrderByRelationAggregateInput
    post?: postOrderByRelationAggregateInput
    user_like?: user_likeOrderByRelationAggregateInput
    _relevance?: userOrderByRelevanceInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    iduser?: number
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    name?: StringFilter<"user"> | string
    e_mail?: StringFilter<"user"> | string
    pass?: StringFilter<"user"> | string
    fone?: StringNullableFilter<"user"> | string | null
    comment?: CommentListRelationFilter
    post?: PostListRelationFilter
    user_like?: User_likeListRelationFilter
  }, "iduser" | "iduser">

  export type userOrderByWithAggregationInput = {
    iduser?: SortOrder
    name?: SortOrder
    e_mail?: SortOrder
    pass?: SortOrder
    fone?: SortOrderInput | SortOrder
    _count?: userCountOrderByAggregateInput
    _avg?: userAvgOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
    _sum?: userSumOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    iduser?: IntWithAggregatesFilter<"user"> | number
    name?: StringWithAggregatesFilter<"user"> | string
    e_mail?: StringWithAggregatesFilter<"user"> | string
    pass?: StringWithAggregatesFilter<"user"> | string
    fone?: StringNullableWithAggregatesFilter<"user"> | string | null
  }

  export type user_likeWhereInput = {
    AND?: user_likeWhereInput | user_likeWhereInput[]
    OR?: user_likeWhereInput[]
    NOT?: user_likeWhereInput | user_likeWhereInput[]
    user_iduser?: IntFilter<"user_like"> | number
    post_idpost?: IntFilter<"user_like"> | number
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type user_likeOrderByWithRelationInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
    post?: postOrderByWithRelationInput
    user?: userOrderByWithRelationInput
  }

  export type user_likeWhereUniqueInput = Prisma.AtLeast<{
    user_iduser_post_idpost?: user_likeUser_iduserPost_idpostCompoundUniqueInput
    AND?: user_likeWhereInput | user_likeWhereInput[]
    OR?: user_likeWhereInput[]
    NOT?: user_likeWhereInput | user_likeWhereInput[]
    user_iduser?: IntFilter<"user_like"> | number
    post_idpost?: IntFilter<"user_like"> | number
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "user_iduser_post_idpost">

  export type user_likeOrderByWithAggregationInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
    _count?: user_likeCountOrderByAggregateInput
    _avg?: user_likeAvgOrderByAggregateInput
    _max?: user_likeMaxOrderByAggregateInput
    _min?: user_likeMinOrderByAggregateInput
    _sum?: user_likeSumOrderByAggregateInput
  }

  export type user_likeScalarWhereWithAggregatesInput = {
    AND?: user_likeScalarWhereWithAggregatesInput | user_likeScalarWhereWithAggregatesInput[]
    OR?: user_likeScalarWhereWithAggregatesInput[]
    NOT?: user_likeScalarWhereWithAggregatesInput | user_likeScalarWhereWithAggregatesInput[]
    user_iduser?: IntWithAggregatesFilter<"user_like"> | number
    post_idpost?: IntWithAggregatesFilter<"user_like"> | number
  }

  export type categoryCreateInput = {
    idcategory: number
    nome: string
    post?: postCreateNestedManyWithoutCategoryInput
  }

  export type categoryUncheckedCreateInput = {
    idcategory: number
    nome: string
    post?: postUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoryUpdateInput = {
    idcategory?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    post?: postUpdateManyWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateInput = {
    idcategory?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    post?: postUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoryCreateManyInput = {
    idcategory: number
    nome: string
  }

  export type categoryUpdateManyMutationInput = {
    idcategory?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type categoryUncheckedUpdateManyInput = {
    idcategory?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type commentCreateInput = {
    comment: string
    time?: Date | string | null
    post: postCreateNestedOneWithoutCommentInput
    user: userCreateNestedOneWithoutCommentInput
  }

  export type commentUncheckedCreateInput = {
    user_iduser: number
    post_idpost: number
    comment: string
    time?: Date | string | null
  }

  export type commentUpdateInput = {
    comment?: StringFieldUpdateOperationsInput | string
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post?: postUpdateOneRequiredWithoutCommentNestedInput
    user?: userUpdateOneRequiredWithoutCommentNestedInput
  }

  export type commentUncheckedUpdateInput = {
    user_iduser?: IntFieldUpdateOperationsInput | number
    post_idpost?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type commentCreateManyInput = {
    user_iduser: number
    post_idpost: number
    comment: string
    time?: Date | string | null
  }

  export type commentUpdateManyMutationInput = {
    comment?: StringFieldUpdateOperationsInput | string
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type commentUncheckedUpdateManyInput = {
    user_iduser?: IntFieldUpdateOperationsInput | number
    post_idpost?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type imageCreateInput = {
    image: string
    post: postCreateNestedOneWithoutImageInput
  }

  export type imageUncheckedCreateInput = {
    idimage?: number
    image: string
    post_idpost: number
  }

  export type imageUpdateInput = {
    image?: StringFieldUpdateOperationsInput | string
    post?: postUpdateOneRequiredWithoutImageNestedInput
  }

  export type imageUncheckedUpdateInput = {
    idimage?: IntFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    post_idpost?: IntFieldUpdateOperationsInput | number
  }

  export type imageCreateManyInput = {
    idimage?: number
    image: string
    post_idpost: number
  }

  export type imageUpdateManyMutationInput = {
    image?: StringFieldUpdateOperationsInput | string
  }

  export type imageUncheckedUpdateManyInput = {
    idimage?: IntFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    post_idpost?: IntFieldUpdateOperationsInput | number
  }

  export type postCreateInput = {
    content: string
    time: Date | string
    comment?: commentCreateNestedManyWithoutPostInput
    image?: imageCreateNestedManyWithoutPostInput
    category: categoryCreateNestedOneWithoutPostInput
    user: userCreateNestedOneWithoutPostInput
    user_like?: user_likeCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateInput = {
    idpost?: number
    content: string
    user_iduser: number
    categoria_idcategoria: number
    time: Date | string
    comment?: commentUncheckedCreateNestedManyWithoutPostInput
    image?: imageUncheckedCreateNestedManyWithoutPostInput
    user_like?: user_likeUncheckedCreateNestedManyWithoutPostInput
  }

  export type postUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: commentUpdateManyWithoutPostNestedInput
    image?: imageUpdateManyWithoutPostNestedInput
    category?: categoryUpdateOneRequiredWithoutPostNestedInput
    user?: userUpdateOneRequiredWithoutPostNestedInput
    user_like?: user_likeUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateInput = {
    idpost?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    user_iduser?: IntFieldUpdateOperationsInput | number
    categoria_idcategoria?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: commentUncheckedUpdateManyWithoutPostNestedInput
    image?: imageUncheckedUpdateManyWithoutPostNestedInput
    user_like?: user_likeUncheckedUpdateManyWithoutPostNestedInput
  }

  export type postCreateManyInput = {
    idpost?: number
    content: string
    user_iduser: number
    categoria_idcategoria: number
    time: Date | string
  }

  export type postUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type postUncheckedUpdateManyInput = {
    idpost?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    user_iduser?: IntFieldUpdateOperationsInput | number
    categoria_idcategoria?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userCreateInput = {
    name: string
    e_mail: string
    pass: string
    fone?: string | null
    comment?: commentCreateNestedManyWithoutUserInput
    post?: postCreateNestedManyWithoutUserInput
    user_like?: user_likeCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    iduser?: number
    name: string
    e_mail: string
    pass: string
    fone?: string | null
    comment?: commentUncheckedCreateNestedManyWithoutUserInput
    post?: postUncheckedCreateNestedManyWithoutUserInput
    user_like?: user_likeUncheckedCreateNestedManyWithoutUserInput
  }

  export type userUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    e_mail?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: commentUpdateManyWithoutUserNestedInput
    post?: postUpdateManyWithoutUserNestedInput
    user_like?: user_likeUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    iduser?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    e_mail?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: commentUncheckedUpdateManyWithoutUserNestedInput
    post?: postUncheckedUpdateManyWithoutUserNestedInput
    user_like?: user_likeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateManyInput = {
    iduser?: number
    name: string
    e_mail: string
    pass: string
    fone?: string | null
  }

  export type userUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    e_mail?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    fone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type userUncheckedUpdateManyInput = {
    iduser?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    e_mail?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    fone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_likeCreateInput = {
    post: postCreateNestedOneWithoutUser_likeInput
    user: userCreateNestedOneWithoutUser_likeInput
  }

  export type user_likeUncheckedCreateInput = {
    user_iduser: number
    post_idpost: number
  }

  export type user_likeUpdateInput = {
    post?: postUpdateOneRequiredWithoutUser_likeNestedInput
    user?: userUpdateOneRequiredWithoutUser_likeNestedInput
  }

  export type user_likeUncheckedUpdateInput = {
    user_iduser?: IntFieldUpdateOperationsInput | number
    post_idpost?: IntFieldUpdateOperationsInput | number
  }

  export type user_likeCreateManyInput = {
    user_iduser: number
    post_idpost: number
  }

  export type user_likeUpdateManyMutationInput = {

  }

  export type user_likeUncheckedUpdateManyInput = {
    user_iduser?: IntFieldUpdateOperationsInput | number
    post_idpost?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type PostListRelationFilter = {
    every?: postWhereInput
    some?: postWhereInput
    none?: postWhereInput
  }

  export type postOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type categoryOrderByRelevanceInput = {
    fields: categoryOrderByRelevanceFieldEnum | categoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type categoryCountOrderByAggregateInput = {
    idcategory?: SortOrder
    nome?: SortOrder
  }

  export type categoryAvgOrderByAggregateInput = {
    idcategory?: SortOrder
  }

  export type categoryMaxOrderByAggregateInput = {
    idcategory?: SortOrder
    nome?: SortOrder
  }

  export type categoryMinOrderByAggregateInput = {
    idcategory?: SortOrder
    nome?: SortOrder
  }

  export type categorySumOrderByAggregateInput = {
    idcategory?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PostScalarRelationFilter = {
    is?: postWhereInput
    isNot?: postWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type commentOrderByRelevanceInput = {
    fields: commentOrderByRelevanceFieldEnum | commentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type commentUser_iduserPost_idpostCompoundUniqueInput = {
    user_iduser: number
    post_idpost: number
  }

  export type commentCountOrderByAggregateInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
    comment?: SortOrder
    time?: SortOrder
  }

  export type commentAvgOrderByAggregateInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
  }

  export type commentMaxOrderByAggregateInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
    comment?: SortOrder
    time?: SortOrder
  }

  export type commentMinOrderByAggregateInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
    comment?: SortOrder
    time?: SortOrder
  }

  export type commentSumOrderByAggregateInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type imageOrderByRelevanceInput = {
    fields: imageOrderByRelevanceFieldEnum | imageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type imageCountOrderByAggregateInput = {
    idimage?: SortOrder
    image?: SortOrder
    post_idpost?: SortOrder
  }

  export type imageAvgOrderByAggregateInput = {
    idimage?: SortOrder
    post_idpost?: SortOrder
  }

  export type imageMaxOrderByAggregateInput = {
    idimage?: SortOrder
    image?: SortOrder
    post_idpost?: SortOrder
  }

  export type imageMinOrderByAggregateInput = {
    idimage?: SortOrder
    image?: SortOrder
    post_idpost?: SortOrder
  }

  export type imageSumOrderByAggregateInput = {
    idimage?: SortOrder
    post_idpost?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CommentListRelationFilter = {
    every?: commentWhereInput
    some?: commentWhereInput
    none?: commentWhereInput
  }

  export type ImageListRelationFilter = {
    every?: imageWhereInput
    some?: imageWhereInput
    none?: imageWhereInput
  }

  export type CategoryScalarRelationFilter = {
    is?: categoryWhereInput
    isNot?: categoryWhereInput
  }

  export type User_likeListRelationFilter = {
    every?: user_likeWhereInput
    some?: user_likeWhereInput
    none?: user_likeWhereInput
  }

  export type commentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type imageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type user_likeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type postOrderByRelevanceInput = {
    fields: postOrderByRelevanceFieldEnum | postOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type postCountOrderByAggregateInput = {
    idpost?: SortOrder
    content?: SortOrder
    user_iduser?: SortOrder
    categoria_idcategoria?: SortOrder
    time?: SortOrder
  }

  export type postAvgOrderByAggregateInput = {
    idpost?: SortOrder
    user_iduser?: SortOrder
    categoria_idcategoria?: SortOrder
  }

  export type postMaxOrderByAggregateInput = {
    idpost?: SortOrder
    content?: SortOrder
    user_iduser?: SortOrder
    categoria_idcategoria?: SortOrder
    time?: SortOrder
  }

  export type postMinOrderByAggregateInput = {
    idpost?: SortOrder
    content?: SortOrder
    user_iduser?: SortOrder
    categoria_idcategoria?: SortOrder
    time?: SortOrder
  }

  export type postSumOrderByAggregateInput = {
    idpost?: SortOrder
    user_iduser?: SortOrder
    categoria_idcategoria?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type userOrderByRelevanceInput = {
    fields: userOrderByRelevanceFieldEnum | userOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type userCountOrderByAggregateInput = {
    iduser?: SortOrder
    name?: SortOrder
    e_mail?: SortOrder
    pass?: SortOrder
    fone?: SortOrder
  }

  export type userAvgOrderByAggregateInput = {
    iduser?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    iduser?: SortOrder
    name?: SortOrder
    e_mail?: SortOrder
    pass?: SortOrder
    fone?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    iduser?: SortOrder
    name?: SortOrder
    e_mail?: SortOrder
    pass?: SortOrder
    fone?: SortOrder
  }

  export type userSumOrderByAggregateInput = {
    iduser?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type user_likeUser_iduserPost_idpostCompoundUniqueInput = {
    user_iduser: number
    post_idpost: number
  }

  export type user_likeCountOrderByAggregateInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
  }

  export type user_likeAvgOrderByAggregateInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
  }

  export type user_likeMaxOrderByAggregateInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
  }

  export type user_likeMinOrderByAggregateInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
  }

  export type user_likeSumOrderByAggregateInput = {
    user_iduser?: SortOrder
    post_idpost?: SortOrder
  }

  export type postCreateNestedManyWithoutCategoryInput = {
    create?: XOR<postCreateWithoutCategoryInput, postUncheckedCreateWithoutCategoryInput> | postCreateWithoutCategoryInput[] | postUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: postCreateOrConnectWithoutCategoryInput | postCreateOrConnectWithoutCategoryInput[]
    createMany?: postCreateManyCategoryInputEnvelope
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
  }

  export type postUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<postCreateWithoutCategoryInput, postUncheckedCreateWithoutCategoryInput> | postCreateWithoutCategoryInput[] | postUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: postCreateOrConnectWithoutCategoryInput | postCreateOrConnectWithoutCategoryInput[]
    createMany?: postCreateManyCategoryInputEnvelope
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type postUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<postCreateWithoutCategoryInput, postUncheckedCreateWithoutCategoryInput> | postCreateWithoutCategoryInput[] | postUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: postCreateOrConnectWithoutCategoryInput | postCreateOrConnectWithoutCategoryInput[]
    upsert?: postUpsertWithWhereUniqueWithoutCategoryInput | postUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: postCreateManyCategoryInputEnvelope
    set?: postWhereUniqueInput | postWhereUniqueInput[]
    disconnect?: postWhereUniqueInput | postWhereUniqueInput[]
    delete?: postWhereUniqueInput | postWhereUniqueInput[]
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
    update?: postUpdateWithWhereUniqueWithoutCategoryInput | postUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: postUpdateManyWithWhereWithoutCategoryInput | postUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: postScalarWhereInput | postScalarWhereInput[]
  }

  export type postUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<postCreateWithoutCategoryInput, postUncheckedCreateWithoutCategoryInput> | postCreateWithoutCategoryInput[] | postUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: postCreateOrConnectWithoutCategoryInput | postCreateOrConnectWithoutCategoryInput[]
    upsert?: postUpsertWithWhereUniqueWithoutCategoryInput | postUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: postCreateManyCategoryInputEnvelope
    set?: postWhereUniqueInput | postWhereUniqueInput[]
    disconnect?: postWhereUniqueInput | postWhereUniqueInput[]
    delete?: postWhereUniqueInput | postWhereUniqueInput[]
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
    update?: postUpdateWithWhereUniqueWithoutCategoryInput | postUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: postUpdateManyWithWhereWithoutCategoryInput | postUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: postScalarWhereInput | postScalarWhereInput[]
  }

  export type postCreateNestedOneWithoutCommentInput = {
    create?: XOR<postCreateWithoutCommentInput, postUncheckedCreateWithoutCommentInput>
    connectOrCreate?: postCreateOrConnectWithoutCommentInput
    connect?: postWhereUniqueInput
  }

  export type userCreateNestedOneWithoutCommentInput = {
    create?: XOR<userCreateWithoutCommentInput, userUncheckedCreateWithoutCommentInput>
    connectOrCreate?: userCreateOrConnectWithoutCommentInput
    connect?: userWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type postUpdateOneRequiredWithoutCommentNestedInput = {
    create?: XOR<postCreateWithoutCommentInput, postUncheckedCreateWithoutCommentInput>
    connectOrCreate?: postCreateOrConnectWithoutCommentInput
    upsert?: postUpsertWithoutCommentInput
    connect?: postWhereUniqueInput
    update?: XOR<XOR<postUpdateToOneWithWhereWithoutCommentInput, postUpdateWithoutCommentInput>, postUncheckedUpdateWithoutCommentInput>
  }

  export type userUpdateOneRequiredWithoutCommentNestedInput = {
    create?: XOR<userCreateWithoutCommentInput, userUncheckedCreateWithoutCommentInput>
    connectOrCreate?: userCreateOrConnectWithoutCommentInput
    upsert?: userUpsertWithoutCommentInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutCommentInput, userUpdateWithoutCommentInput>, userUncheckedUpdateWithoutCommentInput>
  }

  export type postCreateNestedOneWithoutImageInput = {
    create?: XOR<postCreateWithoutImageInput, postUncheckedCreateWithoutImageInput>
    connectOrCreate?: postCreateOrConnectWithoutImageInput
    connect?: postWhereUniqueInput
  }

  export type postUpdateOneRequiredWithoutImageNestedInput = {
    create?: XOR<postCreateWithoutImageInput, postUncheckedCreateWithoutImageInput>
    connectOrCreate?: postCreateOrConnectWithoutImageInput
    upsert?: postUpsertWithoutImageInput
    connect?: postWhereUniqueInput
    update?: XOR<XOR<postUpdateToOneWithWhereWithoutImageInput, postUpdateWithoutImageInput>, postUncheckedUpdateWithoutImageInput>
  }

  export type commentCreateNestedManyWithoutPostInput = {
    create?: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput> | commentCreateWithoutPostInput[] | commentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: commentCreateOrConnectWithoutPostInput | commentCreateOrConnectWithoutPostInput[]
    createMany?: commentCreateManyPostInputEnvelope
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
  }

  export type imageCreateNestedManyWithoutPostInput = {
    create?: XOR<imageCreateWithoutPostInput, imageUncheckedCreateWithoutPostInput> | imageCreateWithoutPostInput[] | imageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: imageCreateOrConnectWithoutPostInput | imageCreateOrConnectWithoutPostInput[]
    createMany?: imageCreateManyPostInputEnvelope
    connect?: imageWhereUniqueInput | imageWhereUniqueInput[]
  }

  export type categoryCreateNestedOneWithoutPostInput = {
    create?: XOR<categoryCreateWithoutPostInput, categoryUncheckedCreateWithoutPostInput>
    connectOrCreate?: categoryCreateOrConnectWithoutPostInput
    connect?: categoryWhereUniqueInput
  }

  export type userCreateNestedOneWithoutPostInput = {
    create?: XOR<userCreateWithoutPostInput, userUncheckedCreateWithoutPostInput>
    connectOrCreate?: userCreateOrConnectWithoutPostInput
    connect?: userWhereUniqueInput
  }

  export type user_likeCreateNestedManyWithoutPostInput = {
    create?: XOR<user_likeCreateWithoutPostInput, user_likeUncheckedCreateWithoutPostInput> | user_likeCreateWithoutPostInput[] | user_likeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: user_likeCreateOrConnectWithoutPostInput | user_likeCreateOrConnectWithoutPostInput[]
    createMany?: user_likeCreateManyPostInputEnvelope
    connect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
  }

  export type commentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput> | commentCreateWithoutPostInput[] | commentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: commentCreateOrConnectWithoutPostInput | commentCreateOrConnectWithoutPostInput[]
    createMany?: commentCreateManyPostInputEnvelope
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
  }

  export type imageUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<imageCreateWithoutPostInput, imageUncheckedCreateWithoutPostInput> | imageCreateWithoutPostInput[] | imageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: imageCreateOrConnectWithoutPostInput | imageCreateOrConnectWithoutPostInput[]
    createMany?: imageCreateManyPostInputEnvelope
    connect?: imageWhereUniqueInput | imageWhereUniqueInput[]
  }

  export type user_likeUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<user_likeCreateWithoutPostInput, user_likeUncheckedCreateWithoutPostInput> | user_likeCreateWithoutPostInput[] | user_likeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: user_likeCreateOrConnectWithoutPostInput | user_likeCreateOrConnectWithoutPostInput[]
    createMany?: user_likeCreateManyPostInputEnvelope
    connect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type commentUpdateManyWithoutPostNestedInput = {
    create?: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput> | commentCreateWithoutPostInput[] | commentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: commentCreateOrConnectWithoutPostInput | commentCreateOrConnectWithoutPostInput[]
    upsert?: commentUpsertWithWhereUniqueWithoutPostInput | commentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: commentCreateManyPostInputEnvelope
    set?: commentWhereUniqueInput | commentWhereUniqueInput[]
    disconnect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    delete?: commentWhereUniqueInput | commentWhereUniqueInput[]
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    update?: commentUpdateWithWhereUniqueWithoutPostInput | commentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: commentUpdateManyWithWhereWithoutPostInput | commentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: commentScalarWhereInput | commentScalarWhereInput[]
  }

  export type imageUpdateManyWithoutPostNestedInput = {
    create?: XOR<imageCreateWithoutPostInput, imageUncheckedCreateWithoutPostInput> | imageCreateWithoutPostInput[] | imageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: imageCreateOrConnectWithoutPostInput | imageCreateOrConnectWithoutPostInput[]
    upsert?: imageUpsertWithWhereUniqueWithoutPostInput | imageUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: imageCreateManyPostInputEnvelope
    set?: imageWhereUniqueInput | imageWhereUniqueInput[]
    disconnect?: imageWhereUniqueInput | imageWhereUniqueInput[]
    delete?: imageWhereUniqueInput | imageWhereUniqueInput[]
    connect?: imageWhereUniqueInput | imageWhereUniqueInput[]
    update?: imageUpdateWithWhereUniqueWithoutPostInput | imageUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: imageUpdateManyWithWhereWithoutPostInput | imageUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: imageScalarWhereInput | imageScalarWhereInput[]
  }

  export type categoryUpdateOneRequiredWithoutPostNestedInput = {
    create?: XOR<categoryCreateWithoutPostInput, categoryUncheckedCreateWithoutPostInput>
    connectOrCreate?: categoryCreateOrConnectWithoutPostInput
    upsert?: categoryUpsertWithoutPostInput
    connect?: categoryWhereUniqueInput
    update?: XOR<XOR<categoryUpdateToOneWithWhereWithoutPostInput, categoryUpdateWithoutPostInput>, categoryUncheckedUpdateWithoutPostInput>
  }

  export type userUpdateOneRequiredWithoutPostNestedInput = {
    create?: XOR<userCreateWithoutPostInput, userUncheckedCreateWithoutPostInput>
    connectOrCreate?: userCreateOrConnectWithoutPostInput
    upsert?: userUpsertWithoutPostInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutPostInput, userUpdateWithoutPostInput>, userUncheckedUpdateWithoutPostInput>
  }

  export type user_likeUpdateManyWithoutPostNestedInput = {
    create?: XOR<user_likeCreateWithoutPostInput, user_likeUncheckedCreateWithoutPostInput> | user_likeCreateWithoutPostInput[] | user_likeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: user_likeCreateOrConnectWithoutPostInput | user_likeCreateOrConnectWithoutPostInput[]
    upsert?: user_likeUpsertWithWhereUniqueWithoutPostInput | user_likeUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: user_likeCreateManyPostInputEnvelope
    set?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    disconnect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    delete?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    connect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    update?: user_likeUpdateWithWhereUniqueWithoutPostInput | user_likeUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: user_likeUpdateManyWithWhereWithoutPostInput | user_likeUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: user_likeScalarWhereInput | user_likeScalarWhereInput[]
  }

  export type commentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput> | commentCreateWithoutPostInput[] | commentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: commentCreateOrConnectWithoutPostInput | commentCreateOrConnectWithoutPostInput[]
    upsert?: commentUpsertWithWhereUniqueWithoutPostInput | commentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: commentCreateManyPostInputEnvelope
    set?: commentWhereUniqueInput | commentWhereUniqueInput[]
    disconnect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    delete?: commentWhereUniqueInput | commentWhereUniqueInput[]
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    update?: commentUpdateWithWhereUniqueWithoutPostInput | commentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: commentUpdateManyWithWhereWithoutPostInput | commentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: commentScalarWhereInput | commentScalarWhereInput[]
  }

  export type imageUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<imageCreateWithoutPostInput, imageUncheckedCreateWithoutPostInput> | imageCreateWithoutPostInput[] | imageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: imageCreateOrConnectWithoutPostInput | imageCreateOrConnectWithoutPostInput[]
    upsert?: imageUpsertWithWhereUniqueWithoutPostInput | imageUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: imageCreateManyPostInputEnvelope
    set?: imageWhereUniqueInput | imageWhereUniqueInput[]
    disconnect?: imageWhereUniqueInput | imageWhereUniqueInput[]
    delete?: imageWhereUniqueInput | imageWhereUniqueInput[]
    connect?: imageWhereUniqueInput | imageWhereUniqueInput[]
    update?: imageUpdateWithWhereUniqueWithoutPostInput | imageUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: imageUpdateManyWithWhereWithoutPostInput | imageUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: imageScalarWhereInput | imageScalarWhereInput[]
  }

  export type user_likeUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<user_likeCreateWithoutPostInput, user_likeUncheckedCreateWithoutPostInput> | user_likeCreateWithoutPostInput[] | user_likeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: user_likeCreateOrConnectWithoutPostInput | user_likeCreateOrConnectWithoutPostInput[]
    upsert?: user_likeUpsertWithWhereUniqueWithoutPostInput | user_likeUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: user_likeCreateManyPostInputEnvelope
    set?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    disconnect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    delete?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    connect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    update?: user_likeUpdateWithWhereUniqueWithoutPostInput | user_likeUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: user_likeUpdateManyWithWhereWithoutPostInput | user_likeUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: user_likeScalarWhereInput | user_likeScalarWhereInput[]
  }

  export type commentCreateNestedManyWithoutUserInput = {
    create?: XOR<commentCreateWithoutUserInput, commentUncheckedCreateWithoutUserInput> | commentCreateWithoutUserInput[] | commentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: commentCreateOrConnectWithoutUserInput | commentCreateOrConnectWithoutUserInput[]
    createMany?: commentCreateManyUserInputEnvelope
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
  }

  export type postCreateNestedManyWithoutUserInput = {
    create?: XOR<postCreateWithoutUserInput, postUncheckedCreateWithoutUserInput> | postCreateWithoutUserInput[] | postUncheckedCreateWithoutUserInput[]
    connectOrCreate?: postCreateOrConnectWithoutUserInput | postCreateOrConnectWithoutUserInput[]
    createMany?: postCreateManyUserInputEnvelope
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
  }

  export type user_likeCreateNestedManyWithoutUserInput = {
    create?: XOR<user_likeCreateWithoutUserInput, user_likeUncheckedCreateWithoutUserInput> | user_likeCreateWithoutUserInput[] | user_likeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: user_likeCreateOrConnectWithoutUserInput | user_likeCreateOrConnectWithoutUserInput[]
    createMany?: user_likeCreateManyUserInputEnvelope
    connect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
  }

  export type commentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<commentCreateWithoutUserInput, commentUncheckedCreateWithoutUserInput> | commentCreateWithoutUserInput[] | commentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: commentCreateOrConnectWithoutUserInput | commentCreateOrConnectWithoutUserInput[]
    createMany?: commentCreateManyUserInputEnvelope
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
  }

  export type postUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<postCreateWithoutUserInput, postUncheckedCreateWithoutUserInput> | postCreateWithoutUserInput[] | postUncheckedCreateWithoutUserInput[]
    connectOrCreate?: postCreateOrConnectWithoutUserInput | postCreateOrConnectWithoutUserInput[]
    createMany?: postCreateManyUserInputEnvelope
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
  }

  export type user_likeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<user_likeCreateWithoutUserInput, user_likeUncheckedCreateWithoutUserInput> | user_likeCreateWithoutUserInput[] | user_likeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: user_likeCreateOrConnectWithoutUserInput | user_likeCreateOrConnectWithoutUserInput[]
    createMany?: user_likeCreateManyUserInputEnvelope
    connect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type commentUpdateManyWithoutUserNestedInput = {
    create?: XOR<commentCreateWithoutUserInput, commentUncheckedCreateWithoutUserInput> | commentCreateWithoutUserInput[] | commentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: commentCreateOrConnectWithoutUserInput | commentCreateOrConnectWithoutUserInput[]
    upsert?: commentUpsertWithWhereUniqueWithoutUserInput | commentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: commentCreateManyUserInputEnvelope
    set?: commentWhereUniqueInput | commentWhereUniqueInput[]
    disconnect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    delete?: commentWhereUniqueInput | commentWhereUniqueInput[]
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    update?: commentUpdateWithWhereUniqueWithoutUserInput | commentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: commentUpdateManyWithWhereWithoutUserInput | commentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: commentScalarWhereInput | commentScalarWhereInput[]
  }

  export type postUpdateManyWithoutUserNestedInput = {
    create?: XOR<postCreateWithoutUserInput, postUncheckedCreateWithoutUserInput> | postCreateWithoutUserInput[] | postUncheckedCreateWithoutUserInput[]
    connectOrCreate?: postCreateOrConnectWithoutUserInput | postCreateOrConnectWithoutUserInput[]
    upsert?: postUpsertWithWhereUniqueWithoutUserInput | postUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: postCreateManyUserInputEnvelope
    set?: postWhereUniqueInput | postWhereUniqueInput[]
    disconnect?: postWhereUniqueInput | postWhereUniqueInput[]
    delete?: postWhereUniqueInput | postWhereUniqueInput[]
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
    update?: postUpdateWithWhereUniqueWithoutUserInput | postUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: postUpdateManyWithWhereWithoutUserInput | postUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: postScalarWhereInput | postScalarWhereInput[]
  }

  export type user_likeUpdateManyWithoutUserNestedInput = {
    create?: XOR<user_likeCreateWithoutUserInput, user_likeUncheckedCreateWithoutUserInput> | user_likeCreateWithoutUserInput[] | user_likeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: user_likeCreateOrConnectWithoutUserInput | user_likeCreateOrConnectWithoutUserInput[]
    upsert?: user_likeUpsertWithWhereUniqueWithoutUserInput | user_likeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: user_likeCreateManyUserInputEnvelope
    set?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    disconnect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    delete?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    connect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    update?: user_likeUpdateWithWhereUniqueWithoutUserInput | user_likeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: user_likeUpdateManyWithWhereWithoutUserInput | user_likeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: user_likeScalarWhereInput | user_likeScalarWhereInput[]
  }

  export type commentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<commentCreateWithoutUserInput, commentUncheckedCreateWithoutUserInput> | commentCreateWithoutUserInput[] | commentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: commentCreateOrConnectWithoutUserInput | commentCreateOrConnectWithoutUserInput[]
    upsert?: commentUpsertWithWhereUniqueWithoutUserInput | commentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: commentCreateManyUserInputEnvelope
    set?: commentWhereUniqueInput | commentWhereUniqueInput[]
    disconnect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    delete?: commentWhereUniqueInput | commentWhereUniqueInput[]
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    update?: commentUpdateWithWhereUniqueWithoutUserInput | commentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: commentUpdateManyWithWhereWithoutUserInput | commentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: commentScalarWhereInput | commentScalarWhereInput[]
  }

  export type postUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<postCreateWithoutUserInput, postUncheckedCreateWithoutUserInput> | postCreateWithoutUserInput[] | postUncheckedCreateWithoutUserInput[]
    connectOrCreate?: postCreateOrConnectWithoutUserInput | postCreateOrConnectWithoutUserInput[]
    upsert?: postUpsertWithWhereUniqueWithoutUserInput | postUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: postCreateManyUserInputEnvelope
    set?: postWhereUniqueInput | postWhereUniqueInput[]
    disconnect?: postWhereUniqueInput | postWhereUniqueInput[]
    delete?: postWhereUniqueInput | postWhereUniqueInput[]
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
    update?: postUpdateWithWhereUniqueWithoutUserInput | postUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: postUpdateManyWithWhereWithoutUserInput | postUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: postScalarWhereInput | postScalarWhereInput[]
  }

  export type user_likeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<user_likeCreateWithoutUserInput, user_likeUncheckedCreateWithoutUserInput> | user_likeCreateWithoutUserInput[] | user_likeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: user_likeCreateOrConnectWithoutUserInput | user_likeCreateOrConnectWithoutUserInput[]
    upsert?: user_likeUpsertWithWhereUniqueWithoutUserInput | user_likeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: user_likeCreateManyUserInputEnvelope
    set?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    disconnect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    delete?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    connect?: user_likeWhereUniqueInput | user_likeWhereUniqueInput[]
    update?: user_likeUpdateWithWhereUniqueWithoutUserInput | user_likeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: user_likeUpdateManyWithWhereWithoutUserInput | user_likeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: user_likeScalarWhereInput | user_likeScalarWhereInput[]
  }

  export type postCreateNestedOneWithoutUser_likeInput = {
    create?: XOR<postCreateWithoutUser_likeInput, postUncheckedCreateWithoutUser_likeInput>
    connectOrCreate?: postCreateOrConnectWithoutUser_likeInput
    connect?: postWhereUniqueInput
  }

  export type userCreateNestedOneWithoutUser_likeInput = {
    create?: XOR<userCreateWithoutUser_likeInput, userUncheckedCreateWithoutUser_likeInput>
    connectOrCreate?: userCreateOrConnectWithoutUser_likeInput
    connect?: userWhereUniqueInput
  }

  export type postUpdateOneRequiredWithoutUser_likeNestedInput = {
    create?: XOR<postCreateWithoutUser_likeInput, postUncheckedCreateWithoutUser_likeInput>
    connectOrCreate?: postCreateOrConnectWithoutUser_likeInput
    upsert?: postUpsertWithoutUser_likeInput
    connect?: postWhereUniqueInput
    update?: XOR<XOR<postUpdateToOneWithWhereWithoutUser_likeInput, postUpdateWithoutUser_likeInput>, postUncheckedUpdateWithoutUser_likeInput>
  }

  export type userUpdateOneRequiredWithoutUser_likeNestedInput = {
    create?: XOR<userCreateWithoutUser_likeInput, userUncheckedCreateWithoutUser_likeInput>
    connectOrCreate?: userCreateOrConnectWithoutUser_likeInput
    upsert?: userUpsertWithoutUser_likeInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutUser_likeInput, userUpdateWithoutUser_likeInput>, userUncheckedUpdateWithoutUser_likeInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type postCreateWithoutCategoryInput = {
    content: string
    time: Date | string
    comment?: commentCreateNestedManyWithoutPostInput
    image?: imageCreateNestedManyWithoutPostInput
    user: userCreateNestedOneWithoutPostInput
    user_like?: user_likeCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateWithoutCategoryInput = {
    idpost?: number
    content: string
    user_iduser: number
    time: Date | string
    comment?: commentUncheckedCreateNestedManyWithoutPostInput
    image?: imageUncheckedCreateNestedManyWithoutPostInput
    user_like?: user_likeUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutCategoryInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutCategoryInput, postUncheckedCreateWithoutCategoryInput>
  }

  export type postCreateManyCategoryInputEnvelope = {
    data: postCreateManyCategoryInput | postCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type postUpsertWithWhereUniqueWithoutCategoryInput = {
    where: postWhereUniqueInput
    update: XOR<postUpdateWithoutCategoryInput, postUncheckedUpdateWithoutCategoryInput>
    create: XOR<postCreateWithoutCategoryInput, postUncheckedCreateWithoutCategoryInput>
  }

  export type postUpdateWithWhereUniqueWithoutCategoryInput = {
    where: postWhereUniqueInput
    data: XOR<postUpdateWithoutCategoryInput, postUncheckedUpdateWithoutCategoryInput>
  }

  export type postUpdateManyWithWhereWithoutCategoryInput = {
    where: postScalarWhereInput
    data: XOR<postUpdateManyMutationInput, postUncheckedUpdateManyWithoutCategoryInput>
  }

  export type postScalarWhereInput = {
    AND?: postScalarWhereInput | postScalarWhereInput[]
    OR?: postScalarWhereInput[]
    NOT?: postScalarWhereInput | postScalarWhereInput[]
    idpost?: IntFilter<"post"> | number
    content?: StringFilter<"post"> | string
    user_iduser?: IntFilter<"post"> | number
    categoria_idcategoria?: IntFilter<"post"> | number
    time?: DateTimeFilter<"post"> | Date | string
  }

  export type postCreateWithoutCommentInput = {
    content: string
    time: Date | string
    image?: imageCreateNestedManyWithoutPostInput
    category: categoryCreateNestedOneWithoutPostInput
    user: userCreateNestedOneWithoutPostInput
    user_like?: user_likeCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateWithoutCommentInput = {
    idpost?: number
    content: string
    user_iduser: number
    categoria_idcategoria: number
    time: Date | string
    image?: imageUncheckedCreateNestedManyWithoutPostInput
    user_like?: user_likeUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutCommentInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutCommentInput, postUncheckedCreateWithoutCommentInput>
  }

  export type userCreateWithoutCommentInput = {
    name: string
    e_mail: string
    pass: string
    fone?: string | null
    post?: postCreateNestedManyWithoutUserInput
    user_like?: user_likeCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutCommentInput = {
    iduser?: number
    name: string
    e_mail: string
    pass: string
    fone?: string | null
    post?: postUncheckedCreateNestedManyWithoutUserInput
    user_like?: user_likeUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutCommentInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutCommentInput, userUncheckedCreateWithoutCommentInput>
  }

  export type postUpsertWithoutCommentInput = {
    update: XOR<postUpdateWithoutCommentInput, postUncheckedUpdateWithoutCommentInput>
    create: XOR<postCreateWithoutCommentInput, postUncheckedCreateWithoutCommentInput>
    where?: postWhereInput
  }

  export type postUpdateToOneWithWhereWithoutCommentInput = {
    where?: postWhereInput
    data: XOR<postUpdateWithoutCommentInput, postUncheckedUpdateWithoutCommentInput>
  }

  export type postUpdateWithoutCommentInput = {
    content?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: imageUpdateManyWithoutPostNestedInput
    category?: categoryUpdateOneRequiredWithoutPostNestedInput
    user?: userUpdateOneRequiredWithoutPostNestedInput
    user_like?: user_likeUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutCommentInput = {
    idpost?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    user_iduser?: IntFieldUpdateOperationsInput | number
    categoria_idcategoria?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: imageUncheckedUpdateManyWithoutPostNestedInput
    user_like?: user_likeUncheckedUpdateManyWithoutPostNestedInput
  }

  export type userUpsertWithoutCommentInput = {
    update: XOR<userUpdateWithoutCommentInput, userUncheckedUpdateWithoutCommentInput>
    create: XOR<userCreateWithoutCommentInput, userUncheckedCreateWithoutCommentInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutCommentInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutCommentInput, userUncheckedUpdateWithoutCommentInput>
  }

  export type userUpdateWithoutCommentInput = {
    name?: StringFieldUpdateOperationsInput | string
    e_mail?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    post?: postUpdateManyWithoutUserNestedInput
    user_like?: user_likeUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutCommentInput = {
    iduser?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    e_mail?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    post?: postUncheckedUpdateManyWithoutUserNestedInput
    user_like?: user_likeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type postCreateWithoutImageInput = {
    content: string
    time: Date | string
    comment?: commentCreateNestedManyWithoutPostInput
    category: categoryCreateNestedOneWithoutPostInput
    user: userCreateNestedOneWithoutPostInput
    user_like?: user_likeCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateWithoutImageInput = {
    idpost?: number
    content: string
    user_iduser: number
    categoria_idcategoria: number
    time: Date | string
    comment?: commentUncheckedCreateNestedManyWithoutPostInput
    user_like?: user_likeUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutImageInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutImageInput, postUncheckedCreateWithoutImageInput>
  }

  export type postUpsertWithoutImageInput = {
    update: XOR<postUpdateWithoutImageInput, postUncheckedUpdateWithoutImageInput>
    create: XOR<postCreateWithoutImageInput, postUncheckedCreateWithoutImageInput>
    where?: postWhereInput
  }

  export type postUpdateToOneWithWhereWithoutImageInput = {
    where?: postWhereInput
    data: XOR<postUpdateWithoutImageInput, postUncheckedUpdateWithoutImageInput>
  }

  export type postUpdateWithoutImageInput = {
    content?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: commentUpdateManyWithoutPostNestedInput
    category?: categoryUpdateOneRequiredWithoutPostNestedInput
    user?: userUpdateOneRequiredWithoutPostNestedInput
    user_like?: user_likeUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutImageInput = {
    idpost?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    user_iduser?: IntFieldUpdateOperationsInput | number
    categoria_idcategoria?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: commentUncheckedUpdateManyWithoutPostNestedInput
    user_like?: user_likeUncheckedUpdateManyWithoutPostNestedInput
  }

  export type commentCreateWithoutPostInput = {
    comment: string
    time?: Date | string | null
    user: userCreateNestedOneWithoutCommentInput
  }

  export type commentUncheckedCreateWithoutPostInput = {
    user_iduser: number
    comment: string
    time?: Date | string | null
  }

  export type commentCreateOrConnectWithoutPostInput = {
    where: commentWhereUniqueInput
    create: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput>
  }

  export type commentCreateManyPostInputEnvelope = {
    data: commentCreateManyPostInput | commentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type imageCreateWithoutPostInput = {
    image: string
  }

  export type imageUncheckedCreateWithoutPostInput = {
    idimage?: number
    image: string
  }

  export type imageCreateOrConnectWithoutPostInput = {
    where: imageWhereUniqueInput
    create: XOR<imageCreateWithoutPostInput, imageUncheckedCreateWithoutPostInput>
  }

  export type imageCreateManyPostInputEnvelope = {
    data: imageCreateManyPostInput | imageCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type categoryCreateWithoutPostInput = {
    idcategory: number
    nome: string
  }

  export type categoryUncheckedCreateWithoutPostInput = {
    idcategory: number
    nome: string
  }

  export type categoryCreateOrConnectWithoutPostInput = {
    where: categoryWhereUniqueInput
    create: XOR<categoryCreateWithoutPostInput, categoryUncheckedCreateWithoutPostInput>
  }

  export type userCreateWithoutPostInput = {
    name: string
    e_mail: string
    pass: string
    fone?: string | null
    comment?: commentCreateNestedManyWithoutUserInput
    user_like?: user_likeCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutPostInput = {
    iduser?: number
    name: string
    e_mail: string
    pass: string
    fone?: string | null
    comment?: commentUncheckedCreateNestedManyWithoutUserInput
    user_like?: user_likeUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutPostInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutPostInput, userUncheckedCreateWithoutPostInput>
  }

  export type user_likeCreateWithoutPostInput = {
    user: userCreateNestedOneWithoutUser_likeInput
  }

  export type user_likeUncheckedCreateWithoutPostInput = {
    user_iduser: number
  }

  export type user_likeCreateOrConnectWithoutPostInput = {
    where: user_likeWhereUniqueInput
    create: XOR<user_likeCreateWithoutPostInput, user_likeUncheckedCreateWithoutPostInput>
  }

  export type user_likeCreateManyPostInputEnvelope = {
    data: user_likeCreateManyPostInput | user_likeCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type commentUpsertWithWhereUniqueWithoutPostInput = {
    where: commentWhereUniqueInput
    update: XOR<commentUpdateWithoutPostInput, commentUncheckedUpdateWithoutPostInput>
    create: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput>
  }

  export type commentUpdateWithWhereUniqueWithoutPostInput = {
    where: commentWhereUniqueInput
    data: XOR<commentUpdateWithoutPostInput, commentUncheckedUpdateWithoutPostInput>
  }

  export type commentUpdateManyWithWhereWithoutPostInput = {
    where: commentScalarWhereInput
    data: XOR<commentUpdateManyMutationInput, commentUncheckedUpdateManyWithoutPostInput>
  }

  export type commentScalarWhereInput = {
    AND?: commentScalarWhereInput | commentScalarWhereInput[]
    OR?: commentScalarWhereInput[]
    NOT?: commentScalarWhereInput | commentScalarWhereInput[]
    user_iduser?: IntFilter<"comment"> | number
    post_idpost?: IntFilter<"comment"> | number
    comment?: StringFilter<"comment"> | string
    time?: DateTimeNullableFilter<"comment"> | Date | string | null
  }

  export type imageUpsertWithWhereUniqueWithoutPostInput = {
    where: imageWhereUniqueInput
    update: XOR<imageUpdateWithoutPostInput, imageUncheckedUpdateWithoutPostInput>
    create: XOR<imageCreateWithoutPostInput, imageUncheckedCreateWithoutPostInput>
  }

  export type imageUpdateWithWhereUniqueWithoutPostInput = {
    where: imageWhereUniqueInput
    data: XOR<imageUpdateWithoutPostInput, imageUncheckedUpdateWithoutPostInput>
  }

  export type imageUpdateManyWithWhereWithoutPostInput = {
    where: imageScalarWhereInput
    data: XOR<imageUpdateManyMutationInput, imageUncheckedUpdateManyWithoutPostInput>
  }

  export type imageScalarWhereInput = {
    AND?: imageScalarWhereInput | imageScalarWhereInput[]
    OR?: imageScalarWhereInput[]
    NOT?: imageScalarWhereInput | imageScalarWhereInput[]
    idimage?: IntFilter<"image"> | number
    image?: StringFilter<"image"> | string
    post_idpost?: IntFilter<"image"> | number
  }

  export type categoryUpsertWithoutPostInput = {
    update: XOR<categoryUpdateWithoutPostInput, categoryUncheckedUpdateWithoutPostInput>
    create: XOR<categoryCreateWithoutPostInput, categoryUncheckedCreateWithoutPostInput>
    where?: categoryWhereInput
  }

  export type categoryUpdateToOneWithWhereWithoutPostInput = {
    where?: categoryWhereInput
    data: XOR<categoryUpdateWithoutPostInput, categoryUncheckedUpdateWithoutPostInput>
  }

  export type categoryUpdateWithoutPostInput = {
    idcategory?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type categoryUncheckedUpdateWithoutPostInput = {
    idcategory?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
  }

  export type userUpsertWithoutPostInput = {
    update: XOR<userUpdateWithoutPostInput, userUncheckedUpdateWithoutPostInput>
    create: XOR<userCreateWithoutPostInput, userUncheckedCreateWithoutPostInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutPostInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutPostInput, userUncheckedUpdateWithoutPostInput>
  }

  export type userUpdateWithoutPostInput = {
    name?: StringFieldUpdateOperationsInput | string
    e_mail?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: commentUpdateManyWithoutUserNestedInput
    user_like?: user_likeUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutPostInput = {
    iduser?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    e_mail?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: commentUncheckedUpdateManyWithoutUserNestedInput
    user_like?: user_likeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type user_likeUpsertWithWhereUniqueWithoutPostInput = {
    where: user_likeWhereUniqueInput
    update: XOR<user_likeUpdateWithoutPostInput, user_likeUncheckedUpdateWithoutPostInput>
    create: XOR<user_likeCreateWithoutPostInput, user_likeUncheckedCreateWithoutPostInput>
  }

  export type user_likeUpdateWithWhereUniqueWithoutPostInput = {
    where: user_likeWhereUniqueInput
    data: XOR<user_likeUpdateWithoutPostInput, user_likeUncheckedUpdateWithoutPostInput>
  }

  export type user_likeUpdateManyWithWhereWithoutPostInput = {
    where: user_likeScalarWhereInput
    data: XOR<user_likeUpdateManyMutationInput, user_likeUncheckedUpdateManyWithoutPostInput>
  }

  export type user_likeScalarWhereInput = {
    AND?: user_likeScalarWhereInput | user_likeScalarWhereInput[]
    OR?: user_likeScalarWhereInput[]
    NOT?: user_likeScalarWhereInput | user_likeScalarWhereInput[]
    user_iduser?: IntFilter<"user_like"> | number
    post_idpost?: IntFilter<"user_like"> | number
  }

  export type commentCreateWithoutUserInput = {
    comment: string
    time?: Date | string | null
    post: postCreateNestedOneWithoutCommentInput
  }

  export type commentUncheckedCreateWithoutUserInput = {
    post_idpost: number
    comment: string
    time?: Date | string | null
  }

  export type commentCreateOrConnectWithoutUserInput = {
    where: commentWhereUniqueInput
    create: XOR<commentCreateWithoutUserInput, commentUncheckedCreateWithoutUserInput>
  }

  export type commentCreateManyUserInputEnvelope = {
    data: commentCreateManyUserInput | commentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type postCreateWithoutUserInput = {
    content: string
    time: Date | string
    comment?: commentCreateNestedManyWithoutPostInput
    image?: imageCreateNestedManyWithoutPostInput
    category: categoryCreateNestedOneWithoutPostInput
    user_like?: user_likeCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateWithoutUserInput = {
    idpost?: number
    content: string
    categoria_idcategoria: number
    time: Date | string
    comment?: commentUncheckedCreateNestedManyWithoutPostInput
    image?: imageUncheckedCreateNestedManyWithoutPostInput
    user_like?: user_likeUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutUserInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutUserInput, postUncheckedCreateWithoutUserInput>
  }

  export type postCreateManyUserInputEnvelope = {
    data: postCreateManyUserInput | postCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type user_likeCreateWithoutUserInput = {
    post: postCreateNestedOneWithoutUser_likeInput
  }

  export type user_likeUncheckedCreateWithoutUserInput = {
    post_idpost: number
  }

  export type user_likeCreateOrConnectWithoutUserInput = {
    where: user_likeWhereUniqueInput
    create: XOR<user_likeCreateWithoutUserInput, user_likeUncheckedCreateWithoutUserInput>
  }

  export type user_likeCreateManyUserInputEnvelope = {
    data: user_likeCreateManyUserInput | user_likeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type commentUpsertWithWhereUniqueWithoutUserInput = {
    where: commentWhereUniqueInput
    update: XOR<commentUpdateWithoutUserInput, commentUncheckedUpdateWithoutUserInput>
    create: XOR<commentCreateWithoutUserInput, commentUncheckedCreateWithoutUserInput>
  }

  export type commentUpdateWithWhereUniqueWithoutUserInput = {
    where: commentWhereUniqueInput
    data: XOR<commentUpdateWithoutUserInput, commentUncheckedUpdateWithoutUserInput>
  }

  export type commentUpdateManyWithWhereWithoutUserInput = {
    where: commentScalarWhereInput
    data: XOR<commentUpdateManyMutationInput, commentUncheckedUpdateManyWithoutUserInput>
  }

  export type postUpsertWithWhereUniqueWithoutUserInput = {
    where: postWhereUniqueInput
    update: XOR<postUpdateWithoutUserInput, postUncheckedUpdateWithoutUserInput>
    create: XOR<postCreateWithoutUserInput, postUncheckedCreateWithoutUserInput>
  }

  export type postUpdateWithWhereUniqueWithoutUserInput = {
    where: postWhereUniqueInput
    data: XOR<postUpdateWithoutUserInput, postUncheckedUpdateWithoutUserInput>
  }

  export type postUpdateManyWithWhereWithoutUserInput = {
    where: postScalarWhereInput
    data: XOR<postUpdateManyMutationInput, postUncheckedUpdateManyWithoutUserInput>
  }

  export type user_likeUpsertWithWhereUniqueWithoutUserInput = {
    where: user_likeWhereUniqueInput
    update: XOR<user_likeUpdateWithoutUserInput, user_likeUncheckedUpdateWithoutUserInput>
    create: XOR<user_likeCreateWithoutUserInput, user_likeUncheckedCreateWithoutUserInput>
  }

  export type user_likeUpdateWithWhereUniqueWithoutUserInput = {
    where: user_likeWhereUniqueInput
    data: XOR<user_likeUpdateWithoutUserInput, user_likeUncheckedUpdateWithoutUserInput>
  }

  export type user_likeUpdateManyWithWhereWithoutUserInput = {
    where: user_likeScalarWhereInput
    data: XOR<user_likeUpdateManyMutationInput, user_likeUncheckedUpdateManyWithoutUserInput>
  }

  export type postCreateWithoutUser_likeInput = {
    content: string
    time: Date | string
    comment?: commentCreateNestedManyWithoutPostInput
    image?: imageCreateNestedManyWithoutPostInput
    category: categoryCreateNestedOneWithoutPostInput
    user: userCreateNestedOneWithoutPostInput
  }

  export type postUncheckedCreateWithoutUser_likeInput = {
    idpost?: number
    content: string
    user_iduser: number
    categoria_idcategoria: number
    time: Date | string
    comment?: commentUncheckedCreateNestedManyWithoutPostInput
    image?: imageUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutUser_likeInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutUser_likeInput, postUncheckedCreateWithoutUser_likeInput>
  }

  export type userCreateWithoutUser_likeInput = {
    name: string
    e_mail: string
    pass: string
    fone?: string | null
    comment?: commentCreateNestedManyWithoutUserInput
    post?: postCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutUser_likeInput = {
    iduser?: number
    name: string
    e_mail: string
    pass: string
    fone?: string | null
    comment?: commentUncheckedCreateNestedManyWithoutUserInput
    post?: postUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutUser_likeInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutUser_likeInput, userUncheckedCreateWithoutUser_likeInput>
  }

  export type postUpsertWithoutUser_likeInput = {
    update: XOR<postUpdateWithoutUser_likeInput, postUncheckedUpdateWithoutUser_likeInput>
    create: XOR<postCreateWithoutUser_likeInput, postUncheckedCreateWithoutUser_likeInput>
    where?: postWhereInput
  }

  export type postUpdateToOneWithWhereWithoutUser_likeInput = {
    where?: postWhereInput
    data: XOR<postUpdateWithoutUser_likeInput, postUncheckedUpdateWithoutUser_likeInput>
  }

  export type postUpdateWithoutUser_likeInput = {
    content?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: commentUpdateManyWithoutPostNestedInput
    image?: imageUpdateManyWithoutPostNestedInput
    category?: categoryUpdateOneRequiredWithoutPostNestedInput
    user?: userUpdateOneRequiredWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutUser_likeInput = {
    idpost?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    user_iduser?: IntFieldUpdateOperationsInput | number
    categoria_idcategoria?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: commentUncheckedUpdateManyWithoutPostNestedInput
    image?: imageUncheckedUpdateManyWithoutPostNestedInput
  }

  export type userUpsertWithoutUser_likeInput = {
    update: XOR<userUpdateWithoutUser_likeInput, userUncheckedUpdateWithoutUser_likeInput>
    create: XOR<userCreateWithoutUser_likeInput, userUncheckedCreateWithoutUser_likeInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutUser_likeInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutUser_likeInput, userUncheckedUpdateWithoutUser_likeInput>
  }

  export type userUpdateWithoutUser_likeInput = {
    name?: StringFieldUpdateOperationsInput | string
    e_mail?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: commentUpdateManyWithoutUserNestedInput
    post?: postUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutUser_likeInput = {
    iduser?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    e_mail?: StringFieldUpdateOperationsInput | string
    pass?: StringFieldUpdateOperationsInput | string
    fone?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: commentUncheckedUpdateManyWithoutUserNestedInput
    post?: postUncheckedUpdateManyWithoutUserNestedInput
  }

  export type postCreateManyCategoryInput = {
    idpost?: number
    content: string
    user_iduser: number
    time: Date | string
  }

  export type postUpdateWithoutCategoryInput = {
    content?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: commentUpdateManyWithoutPostNestedInput
    image?: imageUpdateManyWithoutPostNestedInput
    user?: userUpdateOneRequiredWithoutPostNestedInput
    user_like?: user_likeUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutCategoryInput = {
    idpost?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    user_iduser?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: commentUncheckedUpdateManyWithoutPostNestedInput
    image?: imageUncheckedUpdateManyWithoutPostNestedInput
    user_like?: user_likeUncheckedUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateManyWithoutCategoryInput = {
    idpost?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    user_iduser?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentCreateManyPostInput = {
    user_iduser: number
    comment: string
    time?: Date | string | null
  }

  export type imageCreateManyPostInput = {
    idimage?: number
    image: string
  }

  export type user_likeCreateManyPostInput = {
    user_iduser: number
  }

  export type commentUpdateWithoutPostInput = {
    comment?: StringFieldUpdateOperationsInput | string
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: userUpdateOneRequiredWithoutCommentNestedInput
  }

  export type commentUncheckedUpdateWithoutPostInput = {
    user_iduser?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type commentUncheckedUpdateManyWithoutPostInput = {
    user_iduser?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type imageUpdateWithoutPostInput = {
    image?: StringFieldUpdateOperationsInput | string
  }

  export type imageUncheckedUpdateWithoutPostInput = {
    idimage?: IntFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
  }

  export type imageUncheckedUpdateManyWithoutPostInput = {
    idimage?: IntFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
  }

  export type user_likeUpdateWithoutPostInput = {
    user?: userUpdateOneRequiredWithoutUser_likeNestedInput
  }

  export type user_likeUncheckedUpdateWithoutPostInput = {
    user_iduser?: IntFieldUpdateOperationsInput | number
  }

  export type user_likeUncheckedUpdateManyWithoutPostInput = {
    user_iduser?: IntFieldUpdateOperationsInput | number
  }

  export type commentCreateManyUserInput = {
    post_idpost: number
    comment: string
    time?: Date | string | null
  }

  export type postCreateManyUserInput = {
    idpost?: number
    content: string
    categoria_idcategoria: number
    time: Date | string
  }

  export type user_likeCreateManyUserInput = {
    post_idpost: number
  }

  export type commentUpdateWithoutUserInput = {
    comment?: StringFieldUpdateOperationsInput | string
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post?: postUpdateOneRequiredWithoutCommentNestedInput
  }

  export type commentUncheckedUpdateWithoutUserInput = {
    post_idpost?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type commentUncheckedUpdateManyWithoutUserInput = {
    post_idpost?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type postUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: commentUpdateManyWithoutPostNestedInput
    image?: imageUpdateManyWithoutPostNestedInput
    category?: categoryUpdateOneRequiredWithoutPostNestedInput
    user_like?: user_likeUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutUserInput = {
    idpost?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    categoria_idcategoria?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: commentUncheckedUpdateManyWithoutPostNestedInput
    image?: imageUncheckedUpdateManyWithoutPostNestedInput
    user_like?: user_likeUncheckedUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateManyWithoutUserInput = {
    idpost?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    categoria_idcategoria?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_likeUpdateWithoutUserInput = {
    post?: postUpdateOneRequiredWithoutUser_likeNestedInput
  }

  export type user_likeUncheckedUpdateWithoutUserInput = {
    post_idpost?: IntFieldUpdateOperationsInput | number
  }

  export type user_likeUncheckedUpdateManyWithoutUserInput = {
    post_idpost?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}