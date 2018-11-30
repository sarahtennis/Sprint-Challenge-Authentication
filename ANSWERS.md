<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
used to store information about a client on the server, can be used to persist authentication data across requests

2. What does bcrypt do to help us store passwords in a secure manner.
password hashing

3. What does bcrypt do to slow down attackers?
adds salting and multiple rounds of hashing

4. What are the three parts of the JSON Web Token?
header-information about token creation, payload-information stored in token, signature-encode header and payload and sign with secret
