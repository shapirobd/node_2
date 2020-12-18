### Conceptual Exercise

Answer the following questions below:

- What is a JWT?

   - Stands for JSON Web Token - a digitally signed token that represents json data and can be used to send the data securely.

- What is the signature portion of the JWT?  What does it do?
    - The signature is the third and last part of the JWT and represets a signature of the header, payload and a secret key

- If a JWT is intercepted, can the attacker see what's inside the payload?
    - If the intercepted JWT includes a valid signature then yes.

- How can you implement authentication with a JWT?  Describe how it works at a high level.
    - You can use JWT to sign and/or verify a token that represents a given user, and even include that token in future requests to signify that that user is currently logged in.

- Compare and contrast unit, integration and end-to-end tests.
    - UNIT: involves testing single functions to make sure they perform correctly by themselves
    - INTEGRATION: using network responses to see if functions you have written work correctly together
    - END-TO-END: involves testing an application's workflow from beginning to end in order to replicate real user scenarios so that the system can be validated for integration and data integrity
- What is a mock? What are some things you would mock?
    - A "dummy" function that will simulate a given behavior for testing purposes
- What is continuous integration?
	- The practice of merging in small code changes frequently, rather than merging in a large change at the end of a development cycle.
- What is an environment variable and what are they used for?
	- An environment variable is a variable whose value is set outside the program. They are primarily used to limit the need to modify and re-release an application due to changes in configuration data.
- What is TDD? What are some benefits and drawbacks?
    - TDD stands for Test Driven Development. This involves writing your tests before writing your code - they'll all fail, and then you write the code necessary to get them to pass.
    - BENEFITS: ensures that the code you write is testable and saves time in the long run
    - DRAWBACKS: it takes longer at the beginning
- What is the value of using JSONSchema for validation?
    - It allows you to not only easily ensure that JSON request bodies are in a valid format, but also allows you to easily throw descriptive errors in the event that a request contains invalid data.
- What are some ways to decide which code to test?
    - In general, it's better to test your routes as opposed to your database directly.
    - Your front-end may change a lot, so focus more heavily on testing backend functionality.
- What are some differences between Web Sockets and HTTP?
    - HTTP is heavy & stateless while web sockets are tiny & stateful.
    - With web sockets, data can be sent from server to client as well as client to server, all in real-time.
- Did you prefer using Flask over Express? Why or why not (there is no right 
  answer here --- we want to see how you think about technology)?
    - I at first I preferred Flask, but now I think I prefer Express. I find the syntax to be a bit more straight forward, and the overall flow of writing routes and installing dependencies more straight-forward.