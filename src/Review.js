import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaRandom } from 'react-icons/fa';

const url = 'https://testing-people-api.herokuapp.com/data';
function Review() {
  //Initialize it with an empty array because of deconstruction problems
  const [people, setPeople] = useState([
    {
      id: 1,
      name: '',
      job: '',
      description: '',
      image: '',
    },
  ]);

  const [index, setIndex] = useState(0);
  //Fetching data
  const fetchPeople = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const person = data;
      setPeople(person);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPeople();
  }, []);

  //Array Deconstruction
  const { name, job, description, image } = people[index];

  //Check to see if the number its bigger or smaller than array.length
  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };

  //Previous and Next buttons functionality
  const prevClick = () => {
    setIndex((prevIndex) => {
      return checkNumber(prevIndex - 1);
    });
  };
  const nextClick = () => {
    setIndex((prevIndex) => {
      if (prevIndex > people.length) {
        return prevIndex[0];
      }
      return checkNumber(prevIndex + 1);
    });
    console.log(index);
  };

  //Function to get a random person when clicking the button
  const randomClick = () => {
    let randomNumber = Math.floor(Math.random() * people.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    setIndex(checkNumber(randomNumber));
  };
  return (
    <div className="review--section">
      <div className="review--img">
        <img src={image} alt={name} className="review--img--person" />
      </div>
      <h3 className="review--name">{name}</h3>
      <h4 className="review--job">{job}</h4>
      <p className="review--description">{description}</p>
      <div className="review--button--container">
        <button className="prev--button" onClick={() => prevClick()}>
          <FaChevronLeft />
        </button>
        <button className="random--button" onClick={() => randomClick()}>
          Random Person!
        </button>
        <button className="next--button" onClick={() => nextClick()}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Review;
