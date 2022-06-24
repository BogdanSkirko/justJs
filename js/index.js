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

const marksBmi = (marksMass / marksHeight) * 2;
const jonhsBmi = (jonhsMass / jonhsHeight) * 2;
const markHigherBmi = marksBmi > jonhsBmi;
console.log(markHigherBmi);

const marksMass1 = 95;
const jonhsMass1 = 85;
const marksHeight1 = 1.88;
const jonhsHeight1 = 1.76;

const marksBmi1 = (marksMass1 / marksHeight1) * 2;
const jonhsBmi1 = (jonhsMass1 / jonhsHeight1) * 2;
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
