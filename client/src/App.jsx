import { useEffect, useState } from "react";
import "./App.css";
import { peopleSearchByName } from "./api";
import Pagination from "@mui/material/Pagination";

function App() {
  const [people, setPeople] = useState();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [totalDataFound, setTotalDataFound] = useState(0);
  

  const searchData = (page) => {
    //search &&
    setLoading(true);
    // search &&
    peopleSearchByName(search, page).then((res) => {
      setPage(page)
      if (res.success) {
        setPeople(res.characters);
        setTotalPage(res.totalPage);
        setTotalDataFound(res.totalDataFound);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    searchData();
  }, []);

  return (
    <>
      <h2>The characters of the Star Wars universe</h2>

      <input
        name="search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Character name"
      />
      
      <button name="searchBtn" onClick={() => searchData()}>Search</button>
      <br />
      <h3>Total Data Found - {totalDataFound||0}</h3>
  
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
                <hr/>
                <div><b style={{textDecoration:'underline'}}>HomeWorld</b>
                  <div>Name: {elem.homeworld?.name}</div>
                  <div>Rotation period: {elem.homeworld?.rotation_period}</div>
                  <div>Gravity: {elem.homeworld?.gravity}</div>
                  <div>Terrain: {elem.homeworld?.terrain}</div>
                  <div>Population: {elem.homeworld?.population}</div>
                </div>
                <hr/>
                <hr/>
                {elem.films.length > 0 && (
                  <div>
                    <b style={{textDecoration:'underline'}}>Films</b>
                    
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
            name=""
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
