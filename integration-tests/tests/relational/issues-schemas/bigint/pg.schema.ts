import { relations } from 'drizzle-orm';
import { bigint, bigserial, pgTable } from 'drizzle-orm/pg-core';

export const TestBigint = pgTable('test_bigint', {
  serialBigintId: bigserial({ mode: 'bigint' }).notNull(),
  nonSerialBigint: bigint({ mode: 'bigint' }).notNull(),
});

export const TestBigintChild = pgTable('test_bigint_child', {
  childSerialBigintId: bigserial({ mode: 'bigint' }).notNull(),
  childNonSerialBigint: bigint({ mode: 'bigint' }).notNull(),
  parentBigintId: bigint({ mode: 'bigint' }).notNull()
});

export const testBigintRelations = relations(TestBigint, ({ many }) => ({
  children: many(TestBigintChild),
}));

export const TestBigintChildRelations = relations(
  TestBigintChild,
  ({ one }) => ({
    parent: one(TestBigint, {
      fields: [TestBigintChild.parentBigintId],
      references: [TestBigint.serialBigintId],
    }),
  }),
);
