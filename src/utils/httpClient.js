const BASE_URL = "http://localhost:3000";

// export async function post(path, body) {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   var raw = JSON.stringify(body);

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };


//   try {
//     const response = await fetch(`${BASE_URL}${path}`, requestOptions);
//     const data = await response.json(); // Extract JSON data from response
//     return data; // Return the response data
//   } catch (error) {
//     console.error("Error during POST request:", error);
//     return null; // Return null in case of error
//   }


//   // fetch(`${BASE_URL}${path}`, requestOptions)
//   //   .then((response) => response.json())
//   //   .catch((error) => console.log("error", error));
// };

export async function post(path, body) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(body);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${BASE_URL}${path}`, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};


export async function put(path, body) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(body);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${BASE_URL}${path}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

export async function get(path) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const data = await fetch(`${BASE_URL}${path}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));

  return data
}
