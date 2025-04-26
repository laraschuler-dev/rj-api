
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.CategoryScalarFieldEnum = {
  idcategory: 'idcategory',
  nome: 'nome'
};

exports.Prisma.CommentScalarFieldEnum = {
  user_iduser: 'user_iduser',
  post_idpost: 'post_idpost',
  comment: 'comment',
  time: 'time'
};

exports.Prisma.ImageScalarFieldEnum = {
  idimage: 'idimage',
  image: 'image',
  post_idpost: 'post_idpost'
};

exports.Prisma.PostScalarFieldEnum = {
  idpost: 'idpost',
  content: 'content',
  user_iduser: 'user_iduser',
  categoria_idcategoria: 'categoria_idcategoria',
  time: 'time'
};

exports.Prisma.UserScalarFieldEnum = {
  iduser: 'iduser',
  name: 'name',
  e_mail: 'e_mail',
  pass: 'pass',
  fone: 'fone'
};

exports.Prisma.User_likeScalarFieldEnum = {
  user_iduser: 'user_iduser',
  post_idpost: 'post_idpost'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.categoryOrderByRelevanceFieldEnum = {
  nome: 'nome'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.commentOrderByRelevanceFieldEnum = {
  comment: 'comment'
};

exports.Prisma.imageOrderByRelevanceFieldEnum = {
  image: 'image'
};

exports.Prisma.postOrderByRelevanceFieldEnum = {
  content: 'content'
};

exports.Prisma.userOrderByRelevanceFieldEnum = {
  name: 'name',
  e_mail: 'e_mail',
  pass: 'pass',
  fone: 'fone'
};


exports.Prisma.ModelName = {
  category: 'category',
  comment: 'comment',
  image: 'image',
  post: 'post',
  user: 'user',
  user_like: 'user_like'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\rj-api\\src\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "C:\\rj-api\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel category {\n  idcategory Int    @id\n  nome       String @db.VarChar(45)\n  post       post[]\n}\n\nmodel comment {\n  user_iduser Int       @db.UnsignedInt\n  post_idpost Int       @db.UnsignedInt\n  comment     String    @db.TinyText\n  time        DateTime? @db.DateTime(0)\n  post        post      @relation(fields: [post_idpost], references: [idpost], onDelete: NoAction, onUpdate: NoAction, map: \"fk_user_has_post_post2\")\n  user        user      @relation(fields: [user_iduser], references: [iduser], onDelete: NoAction, onUpdate: NoAction, map: \"fk_user_has_post_user2\")\n\n  @@id([user_iduser, post_idpost])\n  @@index([post_idpost], map: \"fk_user_has_post_post2_idx\")\n  @@index([user_iduser], map: \"fk_user_has_post_user2_idx\")\n}\n\nmodel image {\n  idimage     Int    @id @unique(map: \"idimage_UNIQUE\") @default(autoincrement()) @db.UnsignedInt\n  image       String @db.VarChar(45)\n  post_idpost Int    @db.UnsignedInt\n  post        post   @relation(fields: [post_idpost], references: [idpost], onDelete: NoAction, onUpdate: NoAction, map: \"fk_image_post1\")\n\n  @@index([post_idpost], map: \"fk_image_post1_idx\")\n}\n\nmodel post {\n  idpost                Int         @id @unique(map: \"idpost_UNIQUE\") @default(autoincrement()) @db.UnsignedInt\n  content               String      @db.TinyText\n  user_iduser           Int         @db.UnsignedInt\n  categoria_idcategoria Int\n  time                  DateTime    @db.DateTime(0)\n  comment               comment[]\n  image                 image[]\n  category              category    @relation(fields: [categoria_idcategoria], references: [idcategory], onDelete: NoAction, onUpdate: NoAction, map: \"fk_post_categoria1\")\n  user                  user        @relation(fields: [user_iduser], references: [iduser], onDelete: NoAction, onUpdate: NoAction, map: \"fk_post_user\")\n  user_like             user_like[]\n\n  @@index([categoria_idcategoria], map: \"fk_post_categoria1_idx\")\n  @@index([user_iduser], map: \"fk_post_user_idx\")\n}\n\nmodel user {\n  iduser    Int         @id @unique(map: \"iduser_UNIQUE\") @default(autoincrement()) @db.UnsignedInt\n  name      String      @db.VarChar(45)\n  e_mail    String      @map(\"e-mail\") @db.VarChar(60)\n  pass      String      @db.VarChar(40)\n  fone      String?     @db.VarChar(12)\n  comment   comment[]\n  post      post[]\n  user_like user_like[]\n}\n\nmodel user_like {\n  user_iduser Int  @db.UnsignedInt\n  post_idpost Int  @db.UnsignedInt\n  post        post @relation(fields: [post_idpost], references: [idpost], onDelete: NoAction, onUpdate: NoAction, map: \"fk_user_has_post_post1\")\n  user        user @relation(fields: [user_iduser], references: [iduser], onDelete: NoAction, onUpdate: NoAction, map: \"fk_user_has_post_user1\")\n\n  @@id([user_iduser, post_idpost])\n  @@index([post_idpost], map: \"fk_user_has_post_post1_idx\")\n  @@index([user_iduser], map: \"fk_user_has_post_user1_idx\")\n}\n",
  "inlineSchemaHash": "b6417501b43a5a82f05eeb427a08679df15810f324f981a3f4a0b006ab82e61c",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/generated/prisma",
    "generated/prisma",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"category\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"idcategory\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nome\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"45\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"post\",\"nativeType\":null,\"relationName\":\"categoryTopost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"comment\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"user_iduser\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"UnsignedInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post_idpost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"UnsignedInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comment\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"TinyText\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"DateTime\",[\"0\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"post\",\"nativeType\":null,\"relationName\":\"commentTopost\",\"relationFromFields\":[\"post_idpost\"],\"relationToFields\":[\"idpost\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user\",\"nativeType\":null,\"relationName\":\"commentTouser\",\"relationFromFields\":[\"user_iduser\"],\"relationToFields\":[\"iduser\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"user_iduser\",\"post_idpost\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"image\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"idimage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":[\"UnsignedInt\",[]],\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"45\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post_idpost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"UnsignedInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"post\",\"nativeType\":null,\"relationName\":\"imageTopost\",\"relationFromFields\":[\"post_idpost\"],\"relationToFields\":[\"idpost\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"post\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"idpost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":[\"UnsignedInt\",[]],\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"TinyText\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_iduser\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"UnsignedInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoria_idcategoria\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"DateTime\",[\"0\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comment\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"comment\",\"nativeType\":null,\"relationName\":\"commentTopost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"image\",\"nativeType\":null,\"relationName\":\"imageTopost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"category\",\"nativeType\":null,\"relationName\":\"categoryTopost\",\"relationFromFields\":[\"categoria_idcategoria\"],\"relationToFields\":[\"idcategory\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user\",\"nativeType\":null,\"relationName\":\"postTouser\",\"relationFromFields\":[\"user_iduser\"],\"relationToFields\":[\"iduser\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_like\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user_like\",\"nativeType\":null,\"relationName\":\"postTouser_like\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"user\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"iduser\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":[\"UnsignedInt\",[]],\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"45\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"e_mail\",\"dbName\":\"e-mail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"60\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pass\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"40\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"12\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comment\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"comment\",\"nativeType\":null,\"relationName\":\"commentTouser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"post\",\"nativeType\":null,\"relationName\":\"postTouser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_like\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user_like\",\"nativeType\":null,\"relationName\":\"userTouser_like\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"user_like\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"user_iduser\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"UnsignedInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post_idpost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":[\"UnsignedInt\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"post\",\"nativeType\":null,\"relationName\":\"postTouser_like\",\"relationFromFields\":[\"post_idpost\"],\"relationToFields\":[\"idpost\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"user\",\"nativeType\":null,\"relationName\":\"userTouser_like\",\"relationFromFields\":[\"user_iduser\"],\"relationToFields\":[\"iduser\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"user_iduser\",\"post_idpost\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "src/generated/prisma/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/generated/prisma/schema.prisma")
