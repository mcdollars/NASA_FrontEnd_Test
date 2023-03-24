import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { collectionsSelector } from "../../redux/modules/collection/selectors";

const ShowPage = () => {
  const navigate = useNavigate();
  const collections = useSelector(collectionsSelector);
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (collections.length === 0) {
      navigate("/");
    }
    setCollection(collections.length > 0 && collections[id]);
  }, [collections, id, navigate]);

  useEffect(() => {
    if (!!collection) {
      const collection_name = collection.links[0].href.split("/")[4];
      axios.get(collection.href).then((res) => {
        setImages(res.data.filter((item) => !item.includes(collection_name)));
      });
    }
  }, [collection]);

  return (
    <div className="p-6">
      <button
        className="bg-green-500 rounded-md px-4 text-white py-2"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
      <div className="flex gap-10 pt-6">
        <img src={!!collection ? collection.links[0].href : ""} alt="" />
        <div className="flex flex-col gap-3 text-lg font-semibold">
          <p className="text-2xl font-extrabold">
            Title: {!!collection && collection?.data[0].title}
          </p>
          <p>
            Location:{" "}
            {!!collection && collection?.data[0].location
              ? collection?.data[0].location
              : "N/A"}
          </p>
          <p>
            Photographer:{" "}
            {!!collection && collection?.data[0].photographer
              ? collection?.data[0].photographer
              : "N/A"}
          </p>
          <p>
            Description:{" "}
            {!!collection && collection?.data[0].description
              ? collection?.data[0].description
              : "N/A"}
          </p>
          <p>
            Keywords:{" "}
            {!!collection && collection?.data[0].keywords
              ? collection?.data[0].keywords
              : "N/A"}
          </p>
          <p>
            Date:{" "}
            {!!collection && collection?.data[0].date_created
              ? collection?.data[0].date_created.slice(0, 10)
              : "N/A"}
          </p>
        </div>
      </div>
      <div className="pt-10 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold">Images from Collection</p>
          {images.length === 0 && (
            <p>There is no unique image in this collection</p>
          )}
        </div>
        {images.length > 0 &&
          images
            .slice(0, images.length - 1)
            .map((item, index) => (
              <img key={`image_${index}`} src={item} alt="" loading="lazy" />
            ))}
      </div>
    </div>
  );
};

export default ShowPage;
