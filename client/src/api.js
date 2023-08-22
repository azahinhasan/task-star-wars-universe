
const peopleSearchByName = async (name,page) => {
  try {
      let response = await fetch(`${import.meta.env.VITE_SERVER}/api/people?name=${name}&page=${page}`, {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      });
      return await response.json();
  } catch (err) {
      console.log(err);
  }
};


export {
  peopleSearchByName
};
