import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }

}



export { login };



// import { UserLogin } from "../interfaces/UserLogin";  // Import the UserLogin interface for typing userInfo

// Function to send a POST request to the '/auth/login' endpoint with user login information
// const login = async (userInfo: UserLogin) => {
//   try {
//     // Send a POST request to '/auth/login' with user login information in JSON format
//     const response = await fetch('/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userInfo)
//     });

//     // Throw error if response status is not OK (200-299)
//     if (!response.ok) {
//       const errorData = await response.json(); // Parse error response as JSON
//       throw new Error(`Error: ${errorData.message}`); // Throw a detailed error message    
//     }

//     // Parse the response body as JSON
//     const data = await response.json();

//     return data;  // Return the data received from the server
//   } catch (err) {
//     console.log('Error from user login: ', err);  // Log any errors that occur during fetch
//     return Promise.reject('Could not fetch user info');  // Return a rejected promise with an error message
//   }
// }

// export { login };  // Export the login function to be used elsewhere in the application
