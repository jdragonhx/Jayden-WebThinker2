let base = 10;
let height = 5;
let area;

function setup() {
  console.log("my name is jayden");  //print statment
  new Canvas(800, 400);
  background(220);
  let base = 10;
  let height = 5;
  let area;
  area = 0.5 * base * height;
  console.log("Area of triangle is: " + area);
  text("Area of triangle is: " + area, 300, 100);

  // write your codes here

  // --- Exercise: Area of Triangle ---
  // write your codes here

  area = 0.5 * base * height;
  console.log("Area of triangle is: " + area);
  text("Area of triangle is: " + area, 300, 100);

  // --- Exercise: Sum of first 10 even numbers ---
  // write your codes here

  let sum = 0;
  let i = 2;
  while (i <= 20) {
    sum += i;
    i += 2;
  }
  console.log("Sum of first 10 even numbers is: " + sum);
  text("Sum of first 10 even numbers is: " + sum, 300, 150);

  //print the equasion of the sum of the first 10 even numbers

  console.log("Equation: 2 + 4 + 6 + 8 + 10 + 12 + 14 + 16 + 18 + 20 = " + sum);
  text("Equation: 2 + 4 + 6 + 8 + 10 + 12 + 14 + 16 + 18 + 20 = " + sum, 300, 200);


  // --- Exercise: Age category classification ---
  // write your codes here

  let score = 100;
  if (score >= 90) {
    console.log("Grade: A");
    text("Grade: A", 300, 250);
  }
  else if (score >= 80) {
    console.log("Grade: B");
    text("Grade: B", 300, 250);
  }
  else {
    console.log("Grade: C");
    text("Grade: C", 300, 250);
  }

  // --- Exercise: Display odd numbers backward using while loop ---
  // write your codes here

  let oddNum = 19;
  while (oddNum >= 1) {
    console.log(oddNum);
    text(oddNum, 300 + (19 - oddNum) * 20, 300);
    oddNum -= 2;
  }


  // --- Exercise: Array operations (groceries) ---
  // write your codes here

  let groceries = ["apple", "bread", "milk"];
  console.log(groceries);

  //add orange to list

  groceries.push("orange");
  console.log(groceries);

  //add butter to list

  groceries.push("butter");
  console.log(groceries);

  
}

// gambling game

