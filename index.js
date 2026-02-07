// first statment
// console.log('Hello Asad')

let myName = "asad";

console.time()
console.log(myName);


let firstName = "asad";
// let lastName = 'mohammad'

const interestRate = 0.3;
// interestRate = 1;

let age = 30.5
let isApproved = true;

console.log(interestRate)

let person = {
    name: 'mosh',
    age: 30

};


console.log(person)



let selectedColors = ['red', 'blue']

console.log(selectedColors[0])


function greet(name, lastname) {
    console.log('HELLO ' + name + " " + lastname)
}

greet('asad', "lala");
greet('mary', "lala")



function square(number) {
    return number * number
}

let ans = square(4)

console.log(square(16))

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
for (let i = 0; i < 5; i++) {
    console.log(i);
}

for (let i = 1; i <= 5; i++) {
    if (i % 2 === 0) {
        console.log(i + " is even");
    } else {
        console.log(i + " is odd");
    }
}

for (let i = 1; i <= 10; i++) {
    if (i % 3 == 0) {
        console.log('FIZZ💦💦')
    }
    else {
        console.log(i)
    }
}

// Scenario: You’re building a simple system that checks user eligibility.

// Rules

// Loop through ages 16 to 25

// If age is 18 or above → print "Eligible"

// Otherwise → print "Not Eligible"



for (let i = 16; i <= 25; i++) {
    if (i >= 18) {
        console.log(i + ' → Eligible');
    }
    else {
        console.log(i + ' → Not Eligible');
    }

}