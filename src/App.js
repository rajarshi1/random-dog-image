import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [value, setValue] = useState("Random");
  const [image, setImage] = useState("https:\/\/images.dog.ceo\/breeds\/bulldog-boston\/n02096585_10823.jpg");

 
  const randomImage = async () => {
    const res = await axios.get("https://dog.ceo/api/breeds/image/random");
    const data = res.data;
    if (data.status === "success") {
      setImage(data.message);
    } else {
      setImage("");
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    let res = await axios.get("https://dog.ceo/api/breeds/image/random");
    if (value !== "Random") {
      res = await axios.get(
        "https://dog.ceo/api/breed/" + value + "/images/random"
      );
    }
    const data = res.data;
    setImage(data.message);
  };


  const selectBreed = async (e) => {
    setValue(e.target.value);
    var breedtype = e.target.value;
    var res = await axios.get("https://dog.ceo/api/breeds/image/random");
    if(breedtype !== "Random") {
      res = await axios.get(
        "https://dog.ceo/api/breed/" + breedtype + "/images/random"
      );
    }

    const data = res.data;
    setImage(data.message);
  };

  
  useEffect(() => {
    randomImage();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <select value={value} onChange={selectBreed}>
              <option value="Random">Random</option>
              <option value="beagle">Beagle</option>
              <option value="boxer">Boxer</option>
              <option value="dalmatian">Dalmation</option>
              <option value="husky">Husky</option>
          </select>
          <input type="submit" value="Next" />
      </form>
      <Image val={image}/>

      <p>{`You selected ${value}`}</p>
    </div>
  );
}

function Image(props){
  const image= props.val;
  return <>
    <img src={image} style={{ width: 150, height: 150 }} alt="image" />
  </>
}


export default App;
