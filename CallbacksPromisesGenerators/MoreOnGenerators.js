var login = async(function* (username, password, session) {
  var user = yield getUser(username);
  var hash = yield crypto.hashAsync(password + user.salt);
  if (user.hash !== hash) {
    throw new Error('Incorrect password');
  }
  session.setUser(user);
});

//What are Gens?

//Browser behaviour

//The reason this is so exciting, is that we can exploit the ability to pause a function in order to help us write asynchronous code.
//Specifically, this will allow us to do asynchronous things inside our existing control flow structures, such as loops, conditionals and try/catch blocks.
//What generators do not do is give us a way of representing the result of an asynchronous operation. For that, we need a promise.