import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCollections } from "../../redux/modules/collection/actions";
import { collectionsSelector } from "../../redux/modules/collection/selectors";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const all_collections = useSelector(collectionsSelector);
  const [query, setQuery] = useState("");
  const [start_year, setStartYear] = useState("");
  const [end_year, setEndYear] = useState("");
  const [queryValidation, setQueryValidation] = useState(false);
  const [collections, setCollections] = useState(all_collections);

  const handleQuery = (e) => {
    if (e.target.value === "") {
      setQueryValidation(true);
    }
    setQueryValidation(false);
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query === "") {
      setQueryValidation(true);
      return;
    }
    axios
      .get(
        `https://images-api.nasa.gov/search?q=${query}${
          start_year && `&year_start=${start_year}`
        }${end_year && `&year_end=${end_year}`}&media_type=image`
      )
      .then((res) => {
        setCollections(res.data.collection.items);
        dispath(
          setAllCollections({
            collections: res.data.collection.items,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen">
      <div className="w-full bg-blue-500 flex justify-between items-center px-20">
        <p className="text-white text-2xl font-bold">NASA Media Library</p>
        <div className="flex gap-5 p-2">
          <div>
            <p
              className={`text-sm text-white ${
                queryValidation && "text-rose-600"
              }`}
            >
              Search Query *
            </p>
            <input
              className={`border p-2 rounded-md ${
                queryValidation && "border-rose-600"
              }`}
              placeholder="Search Query..."
              value={query}
              onChange={handleQuery}
            />
            {queryValidation && (
              <p className="text-sm text-rose-600">This field is required</p>
            )}
          </div>
          <div>
            <p className="text-sm text-white">Start Year</p>
            <input
              className="border p-2 rounded-md mb-6"
              placeholder="Start Year"
              value={start_year}
              onChange={(e) => setStartYear(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm text-white">End Year</p>
            <input
              className="border p-2 rounded-md mb-6"
              placeholder="End Year"
              value={end_year}
              onChange={(e) => setEndYear(e.target.value)}
            />
          </div>
          <button
            className="bg-green-500 rounded-md px-4 mt-5 mb-6 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <p className="text-3xl text-green-500 py-2 text-center w-full">
          NASA Images
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, index) => (
            <div className="flex flex-col gap-3" key={index}>
              {collections &&
                collections.length > 0 &&
                collections.map(
                  (collection, collection_index) =>
                    collection_index % 3 === index && (
                      <div
                        key={`collection-${collection_index}`}
                        className="relative cursor-pointer"
                        onClick={() => navigate(`/show/${collection_index}`)}
                      >
                        <img
                          src={collection.links[0].href}
                          alt=""
                          loading="lazy"
                          className="w-full"
                        />
                        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 transition text-white opacity-0 hover:opacity-100">
                          <div className="flex flex-col gap-3 p-6">
                            {collection.data[0].title && (
                              <p className="text-lg font-bold">
                                Title: {collection.data[0].title}
                              </p>
                            )}
                            {collection.data[0].location && (
                              <p>Location: {collection.data[0].location}</p>
                            )}
                            {collection.data[0].photographer && (
                              <p>
                                Photographer: {collection.data[0].photographer}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
