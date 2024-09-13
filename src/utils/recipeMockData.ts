import mongoose from "mongoose";
import RecipeModel from "../models/recipe/recipe";

const mockRecipes = [
  {
    title: "Spaghetti Carbonara",
    imageURL:
      "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-threeByTwoMediumAt2X-v2.jpg",
    ownerId: "user1",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "A classic Italian pasta dish.",
    ingredients: [
      { name: "Spaghetti", quantity: "200g" },
      { name: "Eggs", quantity: "2" },
      { name: "Pancetta", quantity: "100g" },
      { name: "Parmesan Cheese", quantity: "50g" },
      { name: "Black Pepper", quantity: "to taste" },
    ],
    instructions: [
      { step: 1, description: "Boil the spaghetti." },
      { step: 2, description: "Cook the pancetta." },
      { step: 3, description: "Mix eggs and cheese." },
      { step: 4, description: "Combine all ingredients." },
    ],
    cookTime: 30,
    servings: 4,
    likes: 100,
    type: "Italian",
    nutritionalValue: {
      calories: 500,
      protein: 20,
      fat: 25,
      carbohydrates: 50,
    },
    user: {
      id: "user1",
      email: "user1@example.com",
      username: "user1",
      firstName: "John",
      lastName: "Doe",
      phone: "123-456-7890",
      dateOfBirth: new Date("1990-01-01"),
      profileImageURL:
        "https://media.licdn.com/dms/image/D5603AQGJkiUQqpEofQ/profile-displayphoto-shrink_200_200/0/1690938536648?e=2147483647&v=beta&t=dALDzpxmSKG8oVYbFFyHRcYhkDk37wY2z7st8xAYQs8",
      bio: "This is a bio",
      isFollowed: false,
      stats: {
        followers: 100,
        following: 50,
        posts: 10,
      },
      isCurrentUser: false,
    },
  },
  {
    title: "Chicken Tikka Masala",
    imageURL:
      "https://www.skinnytaste.com/wp-content/uploads/2011/06/Chicken-Tikka-Masala-15.jpg",
    ownerId: "user2",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "A popular Indian curry dish.",
    ingredients: [
      { name: "Chicken", quantity: "500g" },
      { name: "Yogurt", quantity: "200g" },
      { name: "Tomato Sauce", quantity: "300g" },
      { name: "Garlic", quantity: "3 cloves" },
      { name: "Ginger", quantity: "1 inch" },
      { name: "Spices", quantity: "to taste" },
    ],
    instructions: [
      { step: 1, description: "Marinate the chicken." },
      { step: 2, description: "Cook the chicken." },
      { step: 3, description: "Prepare the sauce." },
      { step: 4, description: "Combine chicken and sauce." },
    ],
    cookTime: 45,
    servings: 4,
    likes: 150,
    type: "Indian",
    nutritionalValue: {
      calories: 600,
      protein: 30,
      fat: 20,
      carbohydrates: 50,
    },
    user: {
      id: "user2",
      email: "user2@example.com",
      username: "user2",
      firstName: "Jane",
      lastName: "Smith",
      phone: "987-654-3210",
      dateOfBirth: new Date("1985-05-15"),
      profileImageURL: "",
      bio: "This is another bio",
      isFollowed: true,
      stats: {
        followers: 200,
        following: 100,
        posts: 20,
      },
      isCurrentUser: false,
    },
  },
  {
    title: "Sushi",
    imageURL:
      "https://norecipes.com/wp-content/uploads/2019/12/best-california-roll-004.jpg",
    ownerId: "user3",
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "A traditional Japanese dish.",
    ingredients: [
      { name: "Sushi Rice", quantity: "200g" },
      { name: "Nori", quantity: "5 sheets" },
      { name: "Fish", quantity: "200g" },
      { name: "Vegetables", quantity: "100g" },
      { name: "Soy Sauce", quantity: "to taste" },
    ],
    instructions: [
      { step: 1, description: "Prepare the rice." },
      { step: 2, description: "Cut the fish and vegetables." },
      { step: 3, description: "Assemble the sushi." },
      { step: 4, description: "Serve with soy sauce." },
    ],
    cookTime: 60,
    servings: 4,
    likes: 200,
    type: "Japanese",
    nutritionalValue: {
      calories: 400,
      protein: 25,
      fat: 10,
      carbohydrates: 60,
    },
    user: {
      id: "user3",
      email: "user3@example.com",
      username: "user3",
      firstName: "Alice",
      lastName: "Johnson",
      phone: "555-555-5555",
      dateOfBirth: new Date("1995-07-20"),
      profileImageURL: "",
      bio: "This is yet another bio",
      isFollowed: false,
      stats: {
        followers: 300,
        following: 150,
        posts: 30,
      },
      isCurrentUser: false,
    },
  },
];

export const insertMockData = async () => {
  try {
    await RecipeModel.insertMany(mockRecipes);
    console.log("Mock data inserted successfully");
  } catch (error) {
    console.error("Error inserting mock data:", error);
  }
};
