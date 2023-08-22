// import dotenv from "dotenv";
// dotenv.config();


const allPeople = async () => {
    try {
        let response = await fetch(`/api/people`, {
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
  allPeople,
  peopleSearchByName
};
