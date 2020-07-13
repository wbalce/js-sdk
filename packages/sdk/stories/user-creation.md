## Creating a Meeco User

User creation makes use of the `@meeco/sdk`'s `UserService` and `SecretService`:

```ts
const userService = new UserService({
  /* your environment config */
});
const secretService = new SecretService();
```

To create a Meeco user, we first need to request a new random username from the server:

```ts
const username = await userService.generateUsername();
```

Once we have this, we can generate a new secret using the `SecretService`

```ts
const secret = await secretService.generateSecret(username);
```

**Important:** The user needs this secret to login. It should be displayed to the user so they can record it.

We also need to prompt the user for a new passphrase:

```html
<input id="username" placeholder="Enter passphrase" />
```

<input id="username" placeholder="Enter passphrase">

Once we have the passphrase and secret, we can create the user

```ts
try {
  // This will take a bit of time.
  const user = await userService.create(passphrase, secret);
} catch (err) {
  // Failed to create user for some reason. Check the error message for details.
}
```

_Note:_ because the user creation can take a little while, it's recommended to pass a logger into your `UserService`
which will receive status message updates when a new step in the user creation process starts.

```ts
function myLogger(message) {
  document.getElementById('status').innerHTML = message;
}
const userService = new UserService(
  {
    /* your environment config */
  },
  myLogger
);
```

```html
<p style="color: blue; border: 1px solid grey;" id="status"></p>
```

<p style="color: blue; border: 1px solid grey;" id="status">Generating Username</p>
