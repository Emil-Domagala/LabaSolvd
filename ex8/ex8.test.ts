import { Book, User, Cart, Order, FictionBook, NonFictionBook } from './Emil_Domagala_Homework8';
import { test, expect, vi } from 'vitest';

test('scome scenario works', async () => {
  // Creates 3 books
  const book1 = new FictionBook('The Hobbit', 'J.R.R. Tolkien', '978-0-00-745842-4', 15.0, true);
  const book2 = new NonFictionBook('Sapiens', 'Yuval Noah Harari', '978-0-06-231609-7', 22.5, false);
  const book3 = new FictionBook('1984', 'George Orwell', '978-0-452-28423-4', 12.0, true);

  //   Creates users
  const user1 = new User('Alice', 'alice@example.com');
  const user2 = new User('Bob', 'bob@example.com');

  // Creates orders

  const bobCart = new Cart();
  const aliceCart = new Cart();
  expect(aliceCart.addItem(book1)).toBe('Item added to cart');
  expect(aliceCart.addItem(book2)).toBe('This book is not available');
  aliceCart.addItem(book3);
  expect(aliceCart.getTotalPrice()).toBe(27.0);

  const aliceOrder = new Order(user1, aliceCart);
  expect(aliceOrder.getTotalPrice()).toBe(27.0);
  expect(aliceOrder.getUser()).toBe(user1);
  expect(aliceOrder.getCart()).toBe(aliceCart);

  expect(bobCart.addItem(book2)).toBe('This book is not available');
  book2.setAvailability(true);
  expect(bobCart.addItem(book2)).toBe('Item added to cart');
});
