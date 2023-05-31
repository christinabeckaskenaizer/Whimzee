import ListingCard from "../listing-components/ListingCard";
import Spinner from "../utilities/Spinner";

export default function AccountOrderHistory({ history }) {
  if (!history) {
    return <Spinner />;
  }

  return (
    <>
      <div className="m-auto p-4 flex justify-center flex-col px-4 w-5/6">
        {history.length > 0 ? (
          <div className="grid items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {history.map((hist) => (
              <div key={hist.id} className="col-span-1">
                <ListingCard
                  id={hist.listing.id}
                  picture={hist.listing.picture}
                  name={hist.listing.name}
                  isNew={hist.new}
                  price={hist.listing.price}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl font-medium text-gray-500">
            No orders yet
          </p>
        )}
      </div>
    </>
  );
}
