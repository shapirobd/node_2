# Bankly Bugs
---
# BUG NO. 1

## Description

Not receiving 401 error when typing incorrect password at login

## Test

```JavaScript
test("should throw 401 error if invalid password", async () => {
	const response = await request(app).post("/auth/login").send({
		username: "u1",
		password: "INVALIDPASSWORD",
	});
	expect(response.statusCode).toBe(401);
	expect(response.body).toEqual({
		status: 401,
		message: "Cannot authenticate",
	});
});
```

## Code Fix

### Bad Lines

`user.js <line 65>`

```JavaScript
if (user && (await bcrypt.compare(password, user.password))) {
	return user;
} else {
	throw new ExpressError("Cannot authenticate", 401);
}
```

`routes/auth.js <line 56>`

```JavaScript
let user = User.authenticate(username, password);
```

### Corrections

`user.js <line 74>`

```JavaScript
if (user && (await bcrypt.compare(password, user.password))) {
   return user;
}
throw new ExpressError("Cannot authenticate", 401);
```

`routes/auth.js <line 61>`

```JavaScript
let user = await User.authenticate(username, password);
```

---

# BUG NO. 2

## Description

Receiving email & phone for users when running GET /users route.

## Test

```JavaScript
expect(response.body).toEqual({
	users: [
		{
			username: "u1",
			first_name: "fn1",
			last_name: "ln1",
		},
		{
			username: "u2",
			first_name: "fn2",
			last_name: "ln2",
		},
		{
			username: "u3",
			first_name: "fn3",
			last_name: "ln3",
		},
	],
});
```

## Code Fix

### Bad Lines

`user.js <line 90>`

```JavaScript
const result = await db.query(
	       `SELECT username,
		           first_name,
		           last_name,
		           email,
		           phone
		    FROM users
		    ORDER BY username`
);
```

### Corrections

`user.js <line 103>`

```JavaScript
const result = await db.query(
		`SELECT username,
                first_name,
                last_name
         FROM users
         ORDER BY username`
);
```

---

# BUG NO. 3

## Description

Receiving empty object instead of 404 error when requesting /users/:username with username that is not in database

## Test

```JavaScript
test.only("should throw 404 if username not found", async () => {
	const response = await request(app)
		.get("/users/NONEXISTANTUSERNAME")
		.send({ _token: tokens.u1 });
	expect(response.statusCode).toBe(404);
	expect(response.body).toEqual({
		status: 404,
		message: "No such user",
	});
});
```

## Code Fix

### Bad Lines

`user.js <line 136>`

```JavaScript
new ExpressError("No such user", 404);
```

### Corrections

`user.js <line 141>`

```JavaScript
throw new ExpressError("No such user", 404);
```

---

# BUG NO. 4

## Description

Receiving 401 error because I'm not an admin, even though I'm logged in as the same user being patched

## Test

```JavaScript
test("should patch data if right user but not admin", async () => {
	const response = await request(app)
		.patch("/users/u1")
		.send({ _token: tokens.u1, first_name: "new-fn1" });
	expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
		username: "u1",
		first_name: "new-fn1",
		last_name: "ln1",
		email: "email1",
		phone: "phone1",
		admin: false,
		password: expect.any(String),
	});
});
```

## Code Fix

### Bad Lines

`users.js <line 80>`

```JavaScript
router.patch("/:username", authUser, requireLogin, requireAdmin,
    async function (req, res, next) { ...
```

### Corrections

`users.js <line 80>`

```JavaScript
router.patch("/:username", authUser, requireLogin,
    async function (req, res, next) { ...
```

---

# BUG NO. 5

## Description

Now that PATCH route is working, I'm not receiving 401 error when including invalid fields in the request body.

## Test

```JavaScript
//  (was already written, but was passing due to BUG NO. 4)
test("should disallowing patching not-allowed-fields", async function () {
	const response = await request(app)
		.patch("/users/u1")
		.send({ _token: tokens.u1, admin: true });
	expect(response.statusCode).toBe(401);
});
```

## Code Fix

### Bad Lines

No bad lines, just need to create additional code

### Corrections

`users.js <line 12>`

```JavaScript
const jsonschema = require("jsonschema"); // <-- MAKE SURE TO INSTALL (npm i jsonschema)
const updateUserSchema = require("../schemas/updateUserSchema.json");
```

`users.js <line 101>`

```JavaScript
const result = jsonschema.validate(fields, updateUserSchema);
if (!result.valid) {
	const errorList = result.errors.map((error) => error.stack);
	const error = new ExpressError(errorList, 401);
	return next(error);
}
```

---

# BUG NO. 6

## Description

Using jwt.decode(token) in authUser() middleware does not verify if the signature of the token is valid.

## Test

```JavaScript
describe("MIDDLEWARE authUser()", () => {
	test("should claim token invalid if signature invalid", async () => {
		tokens.u1 = tokens.u1.slice(0, -1);
		const response = await request(app)
			.get("/users")
			.send({ _token: tokens.u1 });
		expect(response.statusCode).toBe(401);
	});
});
```

## Code Fix

### Bad Lines

`middleware/auth.js <line 51>`

```JavaScript
let payload = jwt.decode(token);
```

### Corrections

`middleware/auth.js <line 56>`

```JavaScript
let payload = jwt.verify(token, SECRET_KEY);
```

# \*Additional Bug

## Description

Based on the documentation & code for the POST /auth/register route, it is impossible for a user to be an admin:

```
/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */
router.post("/register", async function (req, res, next) {
	try {
		const {
			username,
			password,
			first_name,
			last_name,
			email,
			phone,
		} = req.body;
		let user = await User.register({
			username,
			password,
			first_name,
			last_name,
			email,
			phone,
		});
		const token = createTokenForUser(username, user.admin);
		return res.status(201).json({ token });
	} catch (err) {
		return next(err);
	}
});
```

The documentation says to include all fields except for admin, and the code says the same as well. The test suite bypasses this issue by including admin in the request body when creating sample users:

```JavaScript
let sampleUsers = [
		["u1", "fn1", "ln1", "email1", "phone1", await _pwd("pwd1"), false],
		["u2", "fn2", "ln2", "email2", "phone2", await _pwd("pwd2"), false],
		["u3", "fn3", "ln3", "email3", "phone3", await _pwd("pwd3"), true],
];
for (let user of sampleUsers) {
	await db.query(
		`INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)`,
		user
    );
    tokens[user[0]] = createToken(user[0], user[6]);
}
```

I would have considered this to be one of the main bugs, however the directions for the assessment say:

`"Read the docstrings for the routes carefully. Treat these as your “source of truth” for what the function is supposed to do."`

If this is truly how registering a user is supposed to work, then this is definitely a bug considering the DELETE route would never work and the PATCH route would also never work if your only access privilege was being an admin.
