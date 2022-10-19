import Image from 'next/image';
import React from 'react';

const ViewFood = (props) => {
  return (
    <div className="mt-[100px]">
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>RID</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.data.res.map((item) => {
            return (
              <>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.Rid}</td>
                  <td>{item.category}</td>
                  <td></td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFood;
