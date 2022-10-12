import React from 'react';

const AddFood = () => {
  return (
    <div>
      <form action="/api/dashboard/add" method="post">
        <label>Food Name :</label>
        <input
          type="text"
          name="name"
          placeholder="Type your Food Name"
        ></input>
        <br />
        <label>Price :</label>
        <input
          type="number"
          name="price"
          placeholder="Type your Food Name"
        ></input>
        <br />
        <label>Description :</label>
        <input
          type="text"
          name="description"
          defaultValue="Dough, Mozzarella, Cheddar, Blue, Parmesan"
        ></input>
        <br />
        <label>RestroId :</label>
        <input
          type="number"
          name="Rid"
          placeholder="Type your Food Name"
        ></input>
        <br />
        <label>Category :</label>
        <input
          type="text"
          name="category"
          placeholder="Type your Food Name"
        ></input>
        <br />
        <label>Image Url :</label>
        <input type="text" name="img" placeholder="Type your Food Name"></input>
        <br />

        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default AddFood;
