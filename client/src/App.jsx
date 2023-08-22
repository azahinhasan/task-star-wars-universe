import { useEffect, useState } from "react";
import "./App.css";
import { allPeople, peopleSearchByName } from "./api";
import Pagination from "@mui/material/Pagination";

function App() {
  const [people, setPeople] = useState();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);

  const searchData = (page) => {
    console.log("page");
    //search &&
    setLoading(true);
    // search &&
    peopleSearchByName(search, page).then((res) => {
      setPage(page)
      if (res.success) {
        setPeople(res.data);
        setTotalPage(res.totalPage);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    searchData();
    // setLoading(true);
    // peopleSearchByName("",1).then((res) => {
    //   console.log(res);
    //   if(res.success){
    //     setPeople(res.data);
    //     setTotalPage(res.totalPage)
    //     console.log(res)
    //   }
    //   setLoading(false);
    // });
  }, []);

  console.log(people);
  return (
    <>
      <h2>The characters of the Star Wars universe</h2>

      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Character name"
      />
      <button onClick={() => searchData()}>Search</button>
      <br />
      <div className="peopleList">
        {people?.length > 0 && !loading ? (
          people?.map((elem) => {
            return (
              <div key={elem.name} className="people">
                <div>Name: {elem.name}</div>
                <div>Gender: {elem.gender}</div>
                <div>Skin color: {elem.skin_color}</div>
                <div>Height: {elem.height}</div>
                <div>Eye color: {elem.eye_color}</div>
                {elem.films.length > 0 && (
                  <div>
                    <b>Films</b>
                    <hr/>
                    {elem.films?.map((el) => {
                      return <div key={el.title}>
                       <div>Title: {el?.title||"unknown"}</div>
                       <div>Producer: {el?.producer||"unknown"}</div>
                       <div>Release_date: {el?.release_date||"unknown"}</div>
                       <hr/>
                      </div>;
                    })}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <h3>{loading ? "loading........" : "No Match Found!"}</h3>
        )}
      </div>

      {!loading && (
        <div className="pageNumbers">
          <Pagination
            style={{ display: "inline-block" }}
            count={totalPage}
            page={page}
            onChange={(_, value) => searchData(value)}
            variant="outlined"
          />
        </div>
      )}
    </>
  );
}

export default App;
