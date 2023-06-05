import ListingCard from "../listing-components/ListingCard";
import Spinner from "../utilities/Spinner";

export default function AccountOrderHistory({ history }) {
  if (!history) {
    return <Spinner />;
  }

  return (
    <>
      <div className="m-auto p-4 flex flex-col px-4">
        {history.length > 0 ? (
          <div className="grid m-auto items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
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
