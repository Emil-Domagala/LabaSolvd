export class Book {
  private title: string;
  private author: string;
  private ISBN: string;
  private price: number;
  private availability: boolean;

  constructor(title: string, author: string, ISBN: string, price: number, availability: boolean) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.price = price;
    this.availability = availability;
  }
  getTitle(): string {
    return this.title;
  }
  getAuthor(): string {
    return this.author;
  }
  getISBN(): string {
    return this.ISBN;
  }
  getPrice(): number {
    return this.price;
  }
  getAvailability(): boolean {
    return this.availability;
  }
  setAvailability(availability: boolean): void {
    this.availability = availability;
  }

  // This will be overrided
  getDesc(): string {
    return `${this.title} has no genre`;
  }
}

export class FictionBook extends Book {
  private readonly genre: string = 'fiction';
  constructor(title: string, author: string, ISBN: string, price: number, availability: boolean) {
    super(title, author, ISBN, price, availability);
  }
  getGenre(): string {
    return this.genre;
  }
  override getDesc(): string {
    return `${super.getTitle()} is a ${this.genre} book`;
  }
}

export class NonFictionBook extends Book {
  private readonly genre: string = 'non-fiction';
  constructor(title: string, author: string, ISBN: string, price: number, availability: boolean) {
    super(title, author, ISBN, price, availability);
  }
  getGenre(): string {
    return this.genre;
  }
  override getDesc(): string {
    return `${super.getTitle()} is a ${this.genre} book`;
  }
}

export class User {
  private id: number;
  private name: string;
  private email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }
}

export class Cart {
  private items: Book[];
  constructor() {
    this.items = [];
  }
  addItem(item: Book): string {
    if (item.getAvailability() === false) {
      return 'This book is not available';
    }
    this.items.push(item);
    return 'Item added to cart';
  }
  removeItem(item: Book): void {
    this.items = this.items.filter((i) => i !== item);
  }
  getItems(): Book[] {
    return this.items;
  }
  getTotalPrice(): number {
    let totalPrice = 0;
    for (let item of this.items) {
      totalPrice += item.getPrice();
    }
    return totalPrice;
  }
}

export class Order {
  private totalPrice: number;
  private user: User;
  private cart: Cart;

  constructor(user: User, cart: Cart) {
    this.user = user;
    this.cart = cart;
    this.totalPrice = cart.getTotalPrice();
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }
  getUser(): User {
    return this.user;
  }
  getCart(): Cart {
    return this.cart;
  }
}
