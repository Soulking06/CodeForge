import React from 'react';

export const TOPICS = [
  {
    id: 1,
    title: "1. Introduction to C",
    theory: (
      <>
        <h3>Welcome to C Programming!</h3>
        <p>C is a powerful, general-purpose programming language developed in 1972 by Dennis Ritchie. It is fast, highly portable, and used for operating systems, embedded systems, and high-performance computing.</p>
        <p>Before we dive deep, let's write the most famous program in the world.</p>
        <pre><code>{`#include <stdio.h>

int main() {
    printf("Welcome to C!");
    return 0;
}`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Write a program that prints exactly <strong>Hello, World!</strong> to the screen and then returns 0.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}`,
    validate: (output) => output.trim() === "Hello, World!",
    successMsg: "Excellent! You've written your first C program."
  },
  {
    id: 2,
    title: "2. Structure of a C Program",
    theory: (
      <>
        <h3>Anatomy of C</h3>
        <p>A C program consists of several parts:</p>
        <ul>
          <li><strong>Preprocessor Directives</strong>: like <code>#include &lt;stdio.h&gt;</code> to include libraries.</li>
          <li><strong>Main Function</strong>: <code>int main()</code> is where execution begins.</li>
          <li><strong>Statements</strong>: Instructions ending with a semicolon <code>;</code>.</li>
          <li><strong>Return Statement</strong>: <code>return 0;</code> to exit successfully.</li>
        </ul>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Create a valid structure with the <code>main</code> function, include <code>stdio.h</code>, print <strong>Structure Check</strong>, and return 0.</p>
      </>
    ),
    initialCode: `// Include the standard input/output library here\n\n// Define your main function here\n    // Print "Structure Check" here\n`,
    validate: (output) => output.trim() === "Structure Check",
    successMsg: "Perfect! You understand how a C file is put together."
  },
  {
    id: 3,
    title: "3. Tokens in C",
    theory: (
      <>
        <h3>Tokens</h3>
        <p>A C program consists of various tokens, which are the smallest individual units in a program. There are 6 types of tokens:</p>
        <ul>
          <li>Keywords (e.g., <code>int</code>)</li>
          <li>Identifiers (e.g., <code>main</code>)</li>
          <li>Constants (e.g., <code>10</code>)</li>
          <li>Strings (e.g., <code>"Hello"</code>)</li>
          <li>Special Symbols (e.g., <code>()</code>, <code>&lbrace;&rbrace;</code>)</li>
          <li>Operators (e.g., <code>+</code>)</li>
        </ul>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Print the string token <strong>Tokens are fundamental unit</strong> to the console.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    printf("Tokens are fundamental unit");\n    return 0;\n}`,
    validate: (output) => output.trim() === "Tokens are fundamental unit",
    successMsg: "Great! You understand the atomic elements of C."
  },
  {
    id: 4,
    title: "4. Keywords",
    theory: (
      <>
        <h3>Reserved Words</h3>
        <p>Keywords are reserved words in C that have a specific meaning to the compiler. You cannot use them as variable names.</p>
        <p>C has 32 standard keywords, such as <code>auto</code>, <code>break</code>, <code>int</code>, <code>if</code>, <code>for</code>, etc.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Use the keyword <code>int</code> to declare a variable <code>x</code> as 5, and print it.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    // Use the keyword 'int' to declare x = 5\n    \n    return 0;\n}`,
    validate: (output) => output.trim() === "5",
    successMsg: "Awesome! You safely used a reserved keyword."
  },
  {
    id: 5,
    title: "5. Identifiers",
    theory: (
      <>
        <h3>Naming Things</h3>
        <p>Identifiers refer to the names given to entities such as variables, functions, and structures.</p>
        <p>Rules: Must begin with a letter or underscore <code>_</code>. Can contain letters, digits, and underscores. Cannot be a keyword.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Create a valid identifier named <code>_studentCount</code>, set it to 42, and print it using <code>%d</code>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    int _studentCount = 42;\n    printf("%d", _studentCount);\n    return 0;\n}`,
    validate: (output) => output.trim() === "42",
    successMsg: "Nice! Valid identifiers are crucial for clean code."
  },
  {
    id: 6,
    title: "6. Variables",
    theory: (
      <>
        <h3>Containers for Data</h3>
        <p>A variable is a container for storing data values. In C, you must specify the type of variable when you declare it.</p>
        <pre><code>{`int age = 25;
printf("Age: %d", age); /* %d is for int */`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Declare an integer variable named <code>score</code> and assign it the value <code>100</code>. Print it.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    // Declare score and print it\n    \n    return 0;\n}`,
    validate: (output) => output.trim() === "100",
    successMsg: "Variables are the lifeblood of programs. Good job!"
  },
  {
    id: 7,
    title: "7. Data Types",
    theory: (
      <>
        <h3>Types of Information</h3>
        <p>C has different data types to store different kinds of data:</p>
        <ul>
          <li><code>int</code> - Size 2/4 bytes. Stores whole numbers. (%d)</li>
          <li><code>float</code> - Size 4 bytes. Stores fractional numbers up to 6 decimals. (%f)</li>
          <li><code>double</code> - Size 8 bytes. Stores fractional numbers up to 15 decimals. (%lf)</li>
          <li><code>char</code> - Size 1 byte. Stores a single character. (%c)</li>
        </ul>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Print a <code>char</code> variable with the letter <strong>Z</strong> using <code>%c</code>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    char letter = 'Z';\n    // Print the letter\n    \n    return 0;\n}`,
    validate: (output) => output.trim() === "Z",
    successMsg: "Types keep your data strictly organized."
  },
  {
    id: 8,
    title: "8. Constants",
    theory: (
      <>
        <h3>Unchangeable Values</h3>
        <p>When you want to define a variable whose value cannot be changed, you can use the <code>const</code> keyword. This makes the variable a constant.</p>
        <pre><code>{`const float PI = 3.14159;`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Define a <code>const int GRAVITY</code> as 9. Program should print it.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    // Define constant GRAVITY = 9\n    \n    return 0;\n}`,
    validate: (output) => output.trim() === "9",
    successMsg: "Constants ensure data integrity perfectly."
  },
  {
    id: 9,
    title: "9. Operators",
    theory: (
      <>
        <h3>Arithmetic and Logic</h3>
        <p>Operators are symbols that tell the compiler to perform specific mathematical or logical manipulations.</p>
        <p>Types: Arithmetic (<code>+, -, *, /, %</code>), Relational (<code>&gt;, &lt;, ==</code>), Logical (<code>&&, ||, !</code>).</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Calculate and print the remainder of 10 divided by 3 using the modulo operator <code>%</code>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    // Calculate 10 % 3 and print the result\n    \n    return 0;\n}`,
    validate: (output) => output.trim() === "1",
    successMsg: "Operators are the engines of computation."
  },
  {
    id: 10,
    title: "10. Expressions",
    theory: (
      <>
        <h3>Combining Operators</h3>
        <p>An expression is a combination of operators, constants, and variables evaluated per rules of precedence.</p>
        <pre><code>{`int y = 2 * (x + 3);`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Given <code>int x = 5;</code>, evaluate the expression <code>2 * x + 10</code> and print the result.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    int x = 5;\n    // Evaluate and print\n    \n    return 0;\n}`,
    validate: (output) => output.trim() === "20",
    successMsg: "Expressions compute the exact values you need."
  },
  {
    id: 11,
    title: "11. Input and Output (printf, scanf)",
    theory: (
      <>
        <h3>I/O Functions</h3>
        <p><code>printf()</code> is used to output data to the standard output (screen).</p>
        <p><code>scanf()</code> is used to read data from the standard input (keyboard) and store it in a variable at a specific memory address using <code>&</code>.</p>
        <p><em>(Note: Interactive typing isn't available in this simulation engine right now, so focus on understanding output format specifiers).</em></p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Print the phrase <strong>Input and Output</strong> using <code>printf</code>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    printf("Input and Output");\n    return 0;\n}`,
    validate: (output) => output.trim() === "Input and Output",
    successMsg: "I/O is how programs communicate with the world."
  },
  {
    id: 12,
    title: "12. Type Casting",
    theory: (
      <>
        <h3>Converting Types</h3>
        <p>Type casting is a way to convert a variable from one data type to another.</p>
        <ul>
          <li><strong>Implicit Casting</strong>: Done automatically by the compiler.</li>
          <li><strong>Explicit Casting</strong>: Forced by the programmer: <code>(type) value</code>.</li>
        </ul>
        <pre><code>{`int sum = 17, count = 5;
double mean = (double) sum / count;`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Divide 5 by 2. To get 2.5, explicitly cast 5 to a float and print it using <code>%f</code>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    float result = (float) 5 / 2;\n    printf("%.1f", result);\n    return 0;\n}`,
    validate: (output) => output.trim() === "2.5",
    successMsg: "Type casting prevents data loss."
  },
  {
    id: 13,
    title: "13. Decision Making (if, switch)",
    theory: (
      <>
        <h3>Branching Logic</h3>
        <p>C uses the <code>if</code> statement to execute logic based on a condition.</p>
        <p>The <code>switch</code> statement checks a variable against a list of values, executing the matching <code>case</code> block.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Create an if statement checking if 10 is greater than 5. If true, print <strong>Bigger</strong>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    if (10 > 5) {\n        // Print Bigger\n        \n    }\n    return 0;\n}`,
    validate: (output) => output.trim() === "Bigger",
    successMsg: "Decision statements make your code smart!"
  },
  {
    id: 14,
    title: "14. Loops (for, while, do-while)",
    theory: (
      <>
        <h3>Repetition</h3>
        <p>Loops can execute a block of code repeatedly.</p>
        <ul>
          <li><code>for</code> loop: Best when loops are known beforehand.</li>
          <li><code>while</code> loop: Executes as long as a condition is true.</li>
          <li><code>do-while</code> loop: Executes the block at least once.</li>
        </ul>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Write a while loop that prints numbers from 1 to 3 continuously (e.g., <strong>123</strong>).</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    int i = 1;\n    while (i <= 3) {\n        printf("%d", i);\n        i++;\n    }\n    return 0;\n}`,
    validate: (output) => output.trim() === "123",
    successMsg: "Loops handle repetitive tasks seamlessly."
  },
  {
    id: 15,
    title: "15. Break and Continue",
    theory: (
      <>
        <h3>Flow Control Modifiers</h3>
        <p>The <code>break</code> statement jumps out of a loop entirely.</p>
        <p>The <code>continue</code> statement skips the current iteration and goes to the next one.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>In a loop from 1 to 5, use <code>continue</code> on 3 so that only <strong>1245</strong> is printed.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    for(int i=1; i<=5; i++) {\n        if(i == 3) continue;\n        printf("%d", i);\n    }\n    return 0;\n}`,
    validate: (output) => output.trim() === "1245",
    successMsg: "Break and flow manipulation unlocked."
  },
  {
    id: 16,
    title: "16. Arrays (1D and 2D)",
    theory: (
      <>
        <h3>Groups of Data</h3>
        <p>An array is a collection of data of the same type stored in contiguous memory locations.</p>
        <pre><code>{`int numbers[5] = {10, 20, 30, 40, 50};
printf("%d", numbers[0]); // Outputs 10`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Create an array containing 7, 8, 9. Print the third element (index 2).</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    int arr[] = {7, 8, 9};\n    // print the 3rd element\n    \n    return 0;\n}`,
    validate: (output) => output.trim() === "9",
    successMsg: "Arrays keep multiple elements nicely packed."
  },
  {
    id: 17,
    title: "17. Strings",
    theory: (
      <>
        <h3>Text in C</h3>
        <p>C does not have a native string type. Strings are simply 1D arrays of characters terminating with a null character <code>\\0</code>.</p>
        <pre><code>{`char greeting[] = "Hello";
// Size is actually 6 because of '\\0'`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Print the string formatted from the array <code>char word[] = "Cipher";</code> using <code>%s</code>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    char word[] = "Cipher";\n    printf("%s", word);\n    return 0;\n}`,
    validate: (output) => output.trim() === "Cipher",
    successMsg: "Strings handled natively with arrays!"
  },
  {
    id: 18,
    title: "18. Functions",
    theory: (
      <>
        <h3>Modular Code</h3>
        <p>A function is a block of code that performs a specific task. They make code reusable and easier to understand.</p>
        <pre><code>{`void sayHello() {
    printf("Hello");
}`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Call the pre-written function <code>sayHello()</code> from within <code>main()</code>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nvoid sayHello() {\n    printf("Hello from Function!");\n}\n\nint main() {\n    // Call it here\n    \n    return 0;\n}`,
    validate: (output) => output.trim() === "Hello from Function!",
    successMsg: "Functions keep your programs modular!"
  },
  {
    id: 19,
    title: "19. Recursion",
    theory: (
      <>
        <h3>Functions calling themselves</h3>
        <p>Recursion is a technique where a function calls itself to solve a smaller instance of the same problem. Crucial rule: Always have a base case to avoid infinite loops!</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>The code computes the factorial of 4 recursively. Run it to see the magic. Output should be <strong>24</strong>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf("%d", factorial(4));\n    return 0;\n}`,
    validate: (output) => output.trim() === "24",
    successMsg: "Recursion is mind-bending but elegant!"
  },
  {
    id: 20,
    title: "20. Storage Classes",
    theory: (
      <>
        <h3>Variable Lifetimes</h3>
        <p>Storage classes determine the scope, visibility, and lifetime of variables.</p>
        <ul>
          <li><code>auto</code>: Default for local variables.</li>
          <li><code>static</code>: Preserves value between function calls.</li>
          <li><code>extern</code>: Gives reference to global variable in another file.</li>
          <li><code>register</code>: Requests variable to safely be kept in CPU registers.</li>
        </ul>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>The <code>static</code> variable <code>count</code> remembers its value. Call <code>increment()</code> twice and print it.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint increment() {\n    static int count = 0;\n    count++;\n    return count;\n}\n\nint main() {\n    increment();\n    printf("%d", increment());\n    return 0;\n}`,
    validate: (output) => output.trim() === "2",
    successMsg: "Static state successfully preserved."
  },
  {
    id: 21,
    title: "21. Pointers",
    theory: (
      <>
        <h3>Memory Addresses</h3>
        <p>A pointer is a variable that stores the memory address of another variable. The <code>*</code> operator dereferences it to get the value, while <code>&</code> gets the address.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Use dereferencing to print the value of <code>age</code> through <code>ptr</code>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    int age = 30;\n    int* ptr = &age;\n    // Print using *ptr\n    printf("%d", *ptr);\n    return 0;\n}`,
    validate: (output) => output.trim() === "30",
    successMsg: "You've touched raw memory!"
  },
  {
    id: 22,
    title: "22. Pointer Arithmetic",
    theory: (
      <>
        <h3>Navigating Memory</h3>
        <p>You can perform addition and subtraction on pointers. Adding `1` to an `int*` moves it forward by exactly the size of an integer (usually 4 bytes) to the next element!</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Use pointer arithmetic <code>*(ptr + 1)</code> to print the second element in the array.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n    int* ptr = arr;\n    printf("%d", *(ptr + 1));\n    return 0;\n}`,
    validate: (output) => output.trim() === "20",
    successMsg: "Pointer math is beautiful!"
  },
  {
    id: 23,
    title: "23. Pointers and Arrays",
    theory: (
      <>
        <h3>The Hidden Connection</h3>
        <p>In C, the name of an array is actually incredibly similar to a pointer that points to the first element's address! <code>arr</code> is equivalent to <code>&arr[0]</code>.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Print the first element by dereferencing the array name itself: <code>*arr</code>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    int arr[] = {55, 66, 77};\n    printf("%d", *arr);\n    return 0;\n}`,
    validate: (output) => output.trim() === "55",
    successMsg: "Arrays are just disguised pointers."
  },
  {
    id: 24,
    title: "24. Pointers and Functions",
    theory: (
      <>
        <h3>Pass by Reference</h3>
        <p>By passing pointers to functions, the function can directly modify the original variable, instead of working on a local copy. This is essential for functions that modify variables or handle large data.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Pass the address of <code>x</code> to <code>multiplyByTwo</code> using <code>&x</code> to let it be modified.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nvoid multiplyByTwo(int *val) {\n    *val = *val * 2;\n}\n\nint main() {\n    int x = 10;\n    multiplyByTwo(&x);\n    printf("%d", x);\n    return 0;\n}`,
    validate: (output) => output.trim() === "20",
    successMsg: "Pass-by-reference gives functions superpowers!"
  },
  {
    id: 25,
    title: "25. Structures",
    theory: (
      <>
        <h3>Custom Data Grouping</h3>
        <p>A <code>struct</code> is used to group items of possibly different types into a single type.</p>
        <pre><code>{`struct Car {
  char brand[50];
  int year;
};`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Create a struct <code>Point</code> with integers <code>x</code> and <code>y</code>. Set <code>x=5</code> and print it.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    struct Point p;\n    p.x = 5;\n    printf("%d", p.x);\n    return 0;\n}`,
    validate: (output) => output.trim() === "5",
    successMsg: "Structures map real world objects to data."
  },
  {
    id: 26,
    title: "26. Unions",
    theory: (
      <>
        <h3>Shared Memory</h3>
        <p>A <code>union</code> is similar to a struct, but all its members share the exact same memory location. The size of the union is the size of its largest member. You can only safely access one member at a time.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Print the integer <code>100</code> using the union's integer member.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nunion Data {\n    int i;\n    float f;\n};\n\nint main() {\n    union Data data;\n    data.i = 100;\n    printf("%d", data.i);\n    return 0;\n}`,
    validate: (output) => output.trim() === "100",
    successMsg: "Unions are a clever way to save memory."
  },
  {
    id: 27,
    title: "27. Enumerations (enum)",
    theory: (
      <>
        <h3>Named Integer Constants</h3>
        <p>An <code>enum</code> is a user-defined type consisting of a set of named integral constants. By default, the first name is 0, the second is 1, and so on.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Print the enum <code>WEDNESDAY</code>. It should output <code>3</code> (since MON=1, TUE=2, WED=3).</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nenum Day {MON=1, TUE, WED, THU, FRI, SAT, SUN};\n\nint main() {\n    enum Day today = WED;\n    printf("%d", today);\n    return 0;\n}`,
    validate: (output) => output.trim() === "3",
    successMsg: "Enums make code highly readable."
  },
  {
    id: 28,
    title: "28. Dynamic Memory (malloc, calloc)",
    theory: (
      <>
        <h3>Heap Allocation</h3>
        <p>Dynamic Memory Allocation lets you reserve memory at runtime.</p>
        <ul>
          <li><code>malloc(size)</code>: allocates raw memory block.</li>
          <li><code>calloc(num, size)</code>: allocates and initializes to 0.</li>
          <li><code>free(ptr)</code>: releases it back to the system!</li>
        </ul>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Allocate a single integer dynamically using <code>malloc</code>, store <code>42</code>, print it, and free it.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int* ptr = (int*)malloc(sizeof(int));\n    *ptr = 42;\n    printf("%d", *ptr);\n    free(ptr);\n    return 0;\n}`,
    validate: (output) => output.trim() === "42",
    successMsg: "You have successfully managed the heap!"
  },
  {
    id: 29,
    title: "29. File Handling",
    theory: (
      <>
        <h3>Reading and Writing Disks</h3>
        <p>C provides functions in <code>stdio.h</code> to interact with the file system. You use a <code>FILE</code> pointer to open, read, write, and close files.</p>
        <pre><code>{`FILE *fptr = fopen("filename.txt", "w");
fprintf(fptr, "Hello Disk");
fclose(fptr);`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Output <strong>File Ops Executed</strong>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    // Normally you'd open a file here\n    // Let's just print a success string to pass the level.\n    printf("File Ops Executed");\n    return 0;\n}`,
    validate: (output) => output.trim() === "File Ops Executed",
    successMsg: "File Handling unlocks permanent persistence."
  },
  {
    id: 30,
    title: "30. Command Line Arguments",
    theory: (
      <>
        <h3>Running with Input</h3>
        <p>The <code>main</code> function accepts arguments: <code>int argc</code> (argument count) and <code>char *argv[]</code> (argument vector array).</p>
        <p>When you run <code>./program hello</code>, <code>argv[1]</code> holds "hello"!</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Print the total number of arguments. Note: By default the program name itself is one argument.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n    printf("%d", argc);\n    return 0;\n}`,
    validate: (output) => parseInt(output.trim()) >= 1,
    successMsg: "Command line inputs make CLI tools powerful."
  },
  {
    id: 31,
    title: "31. Preprocessor Directives",
    theory: (
      <>
        <h3>Before Compilation</h3>
        <p>Lines starting with <code>#</code> are read by the preprocessor before the C compiler sees the code.</p>
        <p><code>#include</code> pulls in files. <code>#define</code> creates macros and constants. <code>#ifdef</code> allows conditional compilation.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Define a macro constant <code>MAX_USERS</code> as 100, and print it.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n#define MAX_USERS 100\n\nint main() {\n    printf("%d", MAX_USERS);\n    return 0;\n}`,
    validate: (output) => output.trim() === "100",
    successMsg: "Preprocessor directives set up your codebase correctly."
  },
  {
    id: 32,
    title: "32. Header Files",
    theory: (
      <>
        <h3>Sharing Declarations</h3>
        <p>Header files ending in <code>.h</code> contain function declarations, macros, and structures to be shared across multiple C files.</p>
        <p>You use <code>#include "myheader.h"</code> for your own files, and <code>#include &lt;stdio.h&gt;</code> for standard system libraries.</p>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Print <strong>Header OK</strong> to prove you understand.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    printf("Header OK");\n    return 0;\n}`,
    validate: (output) => output.trim() === "Header OK",
    successMsg: "Headers are vital for big codebases."
  },
  {
    id: 33,
    title: "33. Bitwise Operators",
    theory: (
      <>
        <h3>Operating on Binary</h3>
        <p>Bitwise operators work on bits and perform bit-by-bit operations. They are incredibly useful in embedded systems and low-level code.</p>
        <ul>
          <li><code>&amp;</code> : Bitwise AND</li>
          <li><code>|</code> : Bitwise OR</li>
          <li><code>^</code> : Bitwise XOR</li>
          <li><code>&lt;&lt;</code> : Left Shift</li>
        </ul>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Left shift the number 1 by 3 bits using <code>1 &lt;&lt; 3</code>. This multiplies 1 by 2^3 resulting in 8. Print it.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    int x = 1 << 3;\n    printf("%d", x);\n    return 0;\n}`,
    validate: (output) => output.trim() === "8",
    successMsg: "You've mastered bits and bytes!"
  },
  {
    id: 34,
    title: "34. Error Handling",
    theory: (
      <>
        <h3>Catching Mistakes</h3>
        <p>C does not provide direct support for exceptions (no try/catch block). Instead, error handling uses functions returning specific error codes (usually -1 or NULL) and the global integer variable <code>errno</code>.</p>
        <pre><code>{`#include <errno.h>
#include <string.h>
// Use strerror(errno) to print errors`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Print <strong>Error Code Checked</strong>.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n\nint main() {\n    printf("Error Code Checked");\n    return 0;\n}`,
    validate: (output) => output.trim() === "Error Code Checked",
    successMsg: "Checking error codes stops catastrophic failures."
  },
  {
    id: 35,
    title: "35. Macros",
    theory: (
      <>
        <h3>Code Templates</h3>
        <p>Macros are a fragment of code that has been given a name using <code>#define</code>. They can also take arguments to create flexible, fast inline code replacements before compilation.</p>
        <pre><code>{`#define SQUARE(x) (x * x)`}</code></pre>
      </>
    ),
    challenge: (
      <>
        <h4>Challenge:</h4>
        <p>Use the provided <code>SQUARE(x)</code> macro to square the number 6 and print output.</p>
      </>
    ),
    initialCode: `#include <stdio.h>\n#define SQUARE(x) ((x) * (x))\n\nint main() {\n    printf("%d", SQUARE(6));\n    return 0;\n}`,
    validate: (output) => output.trim() === "36",
    successMsg: "Macros make repeated complex operations fast and easy."
  }
];
