import { Product } from "../models/product";
import { IUser } from "../models/user";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic tomato sauce with mozzarella cheese and fresh basil",
    price: 14.99,
    image: "", //https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop&crop=center
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Spicy pepperoni with melted cheese on crispy crust",
    price: 16.99,
    image: "", //https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&crop=center
  },
  {
    id: "3",
    name: "Caesar Salad",
    description:
      "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 12.99,
    image: "", //https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop&crop=center
  },
  {
    id: "4",
    name: "Spaghetti Carbonara",
    description: "Pasta with eggs, cheese, pancetta, and black pepper",
    price: 18.99,
    image: "", //https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=100&h=100&fit=crop&crop=center
  },
  {
    id: "5",
    name: "Tiramisu",
    description:
      "Classic Italian dessert with coffee-flavored mascarpone cream",
    price: 8.99,
    image: "", //https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=100&h=100&fit=crop&crop=center
  },
];

export const mockUsers: IUser[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
  },
];
