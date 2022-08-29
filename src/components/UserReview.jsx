import React from 'react'
import StarRatings from 'react-star-ratings'
import './UserReview.css'

function UserReview({ username, score, text }) {

  return (
    <div id='content'>
      <div className='testimonial'>
        <blockquote>
          {text}
        </blockquote>
        <div id='arrow-user'></div>
        <div id='user-rating-container'>
          <p>{username} &mdash; </p>
          <StarRatings rating={score} starRatedColor="#C48900" starDimension="20px" starSpacing='1px' />
        </div>
      </div>
    </div>
  )
}

export default UserReview