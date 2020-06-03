export function LoginBackend() {
  let users = [{ id: 1, username: 'jogi', password: 'jogi@123', firstName: 'Joginder', lastName: 'Singh' }];
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    
    //getting token.
    const isLoggedIn = opts.headers['Authorization'] === 'Bearer auth-token';

      return new Promise((resolve, reject) => {

          // wrap in timeout to simulate server api call.
          setTimeout(() => {

              // authenticate
              if (url.endsWith('/users/authenticate') && opts.method === 'POST') {

                  // get parameters from post request
                  let params = JSON.parse(opts.body);

                  // find if any user matches login credentials
                  let filteredUsers = users.filter(user => {
                      return user.username === params.username && user.password === params.password;
                  });

                  if (filteredUsers.length) {

                      // if login details are valid return user details
                      let user = filteredUsers[0];
                      let responseJson = {
                          id: user.id,
                          username: user.username,
                          firstName: user.firstName,
                          lastName: user.lastName
                      };
                      resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                  } else {

                      // else return error
                      reject('Please check you Username and Password !');
                  }

                  return;
              }

              // get users
              if (url.endsWith('/users') && opts.method === 'GET') {
                
                  // check for auth token in header and return users if valid.
                  if (opts.headers && opts.headers.Authorization === `Basic ${window.btoa('jogi:jogi@123')}`) {
                      resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                  } else {
                      // return 401 not authorised if token is null or invalid
                      resolve({ status: 401, text: () => Promise.resolve() });
                  }

                  return;
              }

              // pass through any requests not handled above
              realFetch(url, opts).then(response => resolve(response));

          }, 500);
      });
  }
}