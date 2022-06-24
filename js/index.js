// Coding Challenge #1
// Mark and John are trying to compare their BMI (Body Mass Index), which is
// calculated using the formula:
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg
// and height in meter).
// Your tasks:
// 1. Store Mark's and John's mass and height in variables
// 2. Calculate both their BMIs using the formula (you can even implement both
// versions)
// 3. Create a Boolean variable 'markHigherBMI' containing information about
// whether Mark has a higher BMI than John.
// Test data:
// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
// m tall.
// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
// m tall.
// GOOD LUCK �
const marksMass = 78;
const jonhsMass = 92;
const marksHeight = 1.69;
const jonhsHeight = 1.95;

const marksBmi = +(marksMass / marksHeight).toFixed(2) * 2;
const jonhsBmi = +(jonhsMass / jonhsHeight).toFixed(2) * 2;
const markHigherBmi = marksBmi > jonhsBmi;
console.log(markHigherBmi);

const marksMass1 = 95;
const jonhsMass1 = 85;
const marksHeight1 = 1.88;
const jonhsHeight1 = 1.76;

const marksBmi1 = +(marksMass1 / marksHeight1).toFixed(2) * 2;
const jonhsBmi1 = +(jonhsMass1 / jonhsHeight1).toFixed(2) * 2;
const markHigherBmi1 = marksBmi1 > jonhsBmi1;
console.log(markHigherBmi1);

// Use the BMI example from Challenge #1, and the code you already wrote, and
// improve it.
// Your tasks:
// 1. Print a nice output to the console, saying who has the higher BMI. The message
// is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
// 2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
// BMI (28.3) is higher than John's (23.9)!"
// Hint: Use an if/else statement �

const bmi =
  marksBmi > jonhsBmi
    ? `Mark"s ${marksBmi} is hither than ${jonhsBmi}`
    : `Jonh"s BMI ${jonhsBmi} is higher than Mark"s Bmi ${marksBmi}`;
console.log(bmi);
const bmi1 =
  marksBmi1 > jonhsBmi1
    ? `Mark"s ${marksBmi1} BMI is higher than ${jonhsBmi1} BMI`
    : `Jonh"s BMI ${jonhsBmi1} is higher than Mark"s Bmi ${marksBmi1}`;
console.log(bmi1);

// Coding Challenge #3
// There are two gymnastics teams, Dolphins and Koalas. They compete against each
// other 3 times. The winner with the highest average score wins a trophy!
// Your tasks:
// 1. Calculate the average score for each team, using the test data below
// 2. Compare the team's average scores to determine the winner of the competition,
// and print it to the console. Don't forget that there can be a draw, so test for that
// as well (draw means they have the same average score)
// 3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
// team only wins if it has a higher score than the other team, and the same time a
// score of at least 100 points. Hint: Use a logical operator to test for minimum
// score, as well as multiple else-if blocks �
// 4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
// both teams have the same score and both have a score greater or equal 100
// points. Otherwise, no team wins the trophy
// Test data:
// § Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
// § Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
// § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
const dolphins = [91, 112, 101];
const koalas = [109, 95, 123];
const dolphinsAvg =
  +dolphins.reduce((a, b) => a + b) / dolphins.length.toFixed(2);
const koalasAvg = +koalas.reduce((a, b) => a + b) / koalas.length.toFixed(2);
console.log(dolphinsAvg, koalasAvg);

if (dolphinsAvg === koalasAvg && dolphinsAvg > 100 && koalasAvg > 100)
  console.log("Draw!");
else {
  console.log(
    dolphinsAvg > 100 && dolphinsAvg > koalasAvg
      ? `Dolphins is winner with avg ${dolphinsAvg}`
      : koalasAvg > 100
      ? `Koalas is winner with avg ${koalasAvg}`
      : "completed Bonus task's"
  );
}

// Coding Challenge #4
// Steven wants to build a very simple tip calculator for whenever he goes eating in a
// restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and
// 300. If the value is different, the tip is 20%.
// Your tasks:
// 1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for
// this. It's not allowed to use an if/else statement � (If it's easier for you, you can
// start with an if/else statement, and then try to convert it to a ternary
// operator!)
// 2. Print a string to the console containing the bill value, the tip, and the final value
// (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value
// 316.25”
// Test data:
// § Data 1: Test for bill values 275, 40 and 430
// Hints:
// § To calculate 20% of a value, simply multiply it by 20/100 = 0.2
// § Value X is between 50 and 300, if it's >= 50 && <= 300 �
// GOOD LUCK �

const bill = 40;
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
console.log(
  `The Bill was ${bill}, the tip was ${tip}, and the total value is ${
    tip + bill
  }`
);

// JavaScript Fundamentals – Part 2
// Coding Challenge #1
// Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new
// gymnastics discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores is calculated (so
// one average score per team).
// A team only wins if it has at least double the average score of the other team.
// Otherwise, no team wins!
// Your tasks:
// 1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
// 2. Use the function to calculate the average for both teams
// 3. Create a function 'checkWinner' that takes the average score of each team
// as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner
// to the console, together with the victory points, according to the rule above.
// Example: "Koalas win (30 vs. 13)"
// 4. Use the 'checkWinner' function to determine the winner for both Data 1 and
// Data 2
// 5. Ignore draws this time
// Test data:
// § Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
// § Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
// Hints:
// § To calculate average of 3 values, add them all together and divide by 3
// § To check if number A is at least double number B, check for A >= 2 * B.
// Apply this to the team's average scores �
// GOOD LUCK �

const dolphinsScore1 = [85, 54, 41];
const koalasScore1 = [23, 34, 27];
console.log(dolphinsScore1.length, koalasScore1.length);
const calcAvarage = (sumAvg) => sumAvg.reduce((a, b) => a + b) / sumAvg.length;

const avgDolphins1 = calcAvarage(dolphinsScore1);
const avgKoalas1 = calcAvarage(koalasScore1);
console.log(avgDolphins1, avgKoalas1);
const checkWinner = (avgDolphins1, avgKoalas1) =>
  console.log(
    avgDolphins1 > avgKoalas1 * 2
      ? `Dolphin"s is winner with${avgDolphins1} points`
      : avgKoalas1 > avgDolphins1 * 2
      ? `Koalas is winner with  ${avgKoalas1} points `
      : "No winner"
  );

checkWinner(avgDolphins1, avgKoalas1);

// Coding Challenge #2
// Steven is still building his tip calculator, using the same rules as before: Tip 15% of
// the bill if the bill value is between 50 and 300, and if the value is different, the tip is
// 20%.
// Your tasks:
// 1. Write a function 'calcTip' that takes any bill value as an input and returns
// the corresponding tip, calculated based on the rules above (you can check out
// the code from first tip calculator challenge if you need to). Use the function
// type you like the most. Test the function using a bill value of 100
// 2. And now let's use arrays! So create an array 'bills' containing the test data
// below
// 3. Create an array 'tips' containing the tip value for each bill, calculated from
// the function you created before
// 4. Bonus: Create an array 'total' containing the total values, so the bill + tip
// Test data: 125, 555 and 44
// Hint: Remember that an array needs a value in each position, and that value can
// actually be the returned value of a function! So you can just call a function as array
// values (so don't store the tip values in separate variables first, but right in the new
// array) �
// GOOD LUCK �

const calcTip = (anyBill) =>
  anyBill > 300 || anyBill < 50
    ? anyBill * 1.2 - anyBill
    : anyBill * 1.15 - anyBill;

const arrayBills = [125, 555, 44];
const arrayTips = [
  calcTip(arrayBills[0]),
  calcTip(arrayBills[1]),
  calcTip(arrayBills[2]),
];
calcTip(arrayBills);
console.log(arrayTips);
const arrayBillsAndTips = [
  arrayBills[0] + arrayTips[0],
  arrayBills[1] + arrayTips[1],
  arrayBills[2] + arrayTips[2],
];
console.log(arrayBillsAndTips);

// Coding Challenge #3
// Let's go back to Mark and John comparing their BMIs! This time, let's use objects to
// implement the calculations! Remember: BMI = mass / height ** 2 = mass
// / (height * height) (mass in kg and height in meter)
// Your tasks:
// 1. For each of them, create an object with properties for their full name, mass, and
// height (Mark Miller and John Smith)
// 2. Create a 'calcBMI' method on each object to calculate the BMI (the same
// method on both objects). Store the BMI value to a property, and also return it
// from the method
// 3. Log to the console who has the higher BMI, together with the full name and the
// respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
// Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m
// tall.
// GOOD LUCK �
const markObj = {
  fullname: "Mark Miller",
  mass: 78,
  height: 1.69,
  calcBmi: () => markObj.mass / markObj.height ** 2,
};
const johnObj = {
  fullname: "John Smith",
  mass: 92,
  height: 1.95,
  calcBmi: () => johnObj.mass / johnObj.height ** 2,
};
console.log(
  markObj.calcBmi() > johnObj.calcBmi()
    ? `${
        markObj.fullname
      } ${markObj.calcBmi()} 'is higher than' ${johnObj.calcBmi()} 'BMI"s' `
    : `${johnObj.fullname} ${johnObj.calcBmi()} 'BMI"s  is hither than' ${
        markObj.fullname
      } ${markObj.calcBmi()} BMI"s  `
);
