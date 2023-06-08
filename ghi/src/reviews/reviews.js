import { useState, useEffect } from "react"
import CreateReview from "./createReview"
import Error from "./Error"
import ReviewRating from "./reviewRating"


const Reviews = ({listing_id, token }) => {
    const [reviews, setReviews] = useState([])
    const reviewLength = reviews.length
    const [error, setError] = useState(false)

    const getReviews = async () => {
        if (listing_id) {
            try {
                const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/${listing_id}/reviews`;
                const response = await fetch(url);
                const data = await response.json();
                setReviews(data.reverse());
            }
            catch(error) {
                setError(true)
            }
        }

    }
    useEffect(() => {
        getReviews();
        // eslint-disable-next-line
    }, [listing_id, reviews]);

    return (
        <>
        <h1 className="text-2xl font-bold w-full px-6 py-6">{reviewLength} Reviews</h1>
        < CreateReview listing_id={listing_id} token={token}/>
        <Error error={error}/>
        {reviews.map((review) => {
            return (
        <div key={review.id} className="sm:grid flex flex-col items-center sm:grid-cols-2lg:grid-cols-4 gap-1">
            <div className="max-w-sm rounded overflow-hidden shadow-lg col-span-1">
            <div className="px-6 py-4">
                <ReviewRating rating={review.rating}/>
                <p className="text-gray-700 text-base">
                {review.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{review.created_on}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{review.author}</span>
            </div>
            </div>
            </div>
            )
        })}

        </>
    )
}
export default Reviews
