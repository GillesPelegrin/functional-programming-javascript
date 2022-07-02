Goal:

run migration to a db based on hashes and file name.

1. If script already has runned on db should be skipped
2. Should easily create a new file without any overhead
3. Should fail when a file is adapted while it already had runned as a script on the DB
4. Should do a rollback if something happend
5. Should have an easy way to reset / remove all shemas

Discussion:

TypeOrm and Prisma both are ORM wich use Typescript or classes.
Both have a migration tool embedded.

Because the landscape changes a lot and is not stable i would prefer a more basic approach.
And not use any migration tools from an ORM


