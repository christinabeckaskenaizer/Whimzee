export default function ShopSalesList({ ids }) {
  if (!ids?.shop_id) {
    return;
  }

  return (
    <>
      <h1>Here is a list of the shop's sales.</h1>
    </>
  );
}
