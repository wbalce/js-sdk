## Fetching a Meeco User

User fetching makes use of the `@meeco/sdk`'s `UserService`:

```ts
const userService = new UserService({
  /* your environment config */
});
```

To fetch a Meeco user, we need the user to enter their passphrase and secret:

```html
<input id="passphrase" placeholder="Enter secret" />
<input id="secret" placeholder="Enter secret" />
```

<input id="passphrase" placeholder="Enter secret">
<input id="secret" placeholder="Enter secret">

Once we have these details we can try to login as the user:

```ts
const secret = document.getElementById('secret').value;
const passphrase = document.getElementById('passphrase').value;
try {
  const user = await userService.get(passphrase, secret);
} catch (err) {
  // Failed to login for some reason. Check the error message for details.
}
```

_Note:_ because the user fetch can take a little while, it's recommended to pass a logger into your `UserService`
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

<p style="color: blue; border: 1px solid grey;" id="status">Fetching user details</p>
