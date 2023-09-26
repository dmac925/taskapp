import React, { useState, useEffect } from 'react'
import axios from "axios"

function Home() {

  const [categories, setCategories] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/category/categories"
        );
        setCategories(response);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories()
  }, [] )


  return (

    <div>
      <h3>All Categories</h3>

      <ul>
  {categories?.data?.map((category, index) => (
    <li key={index}>{category}</li>
  ))}
</ul>
     
    </div>
  )

}

export default Home