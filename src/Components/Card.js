import React from 'react';

const Card = (props) => {
  const { name, email, id} = props;
  return (
    <div className='tc bg-light-blue dib br3 pa3 ma2 grow bw shadow-5'>
      <img src={`https://robohash.org/${id}?200x200`} alt="avatar" />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default Card;