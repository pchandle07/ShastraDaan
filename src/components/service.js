export async function getSchoolInfo({ post, response }, placeid, placeName, address) {
    const schoolInfo = await post("/place/info", {
      address,
      description: "string",
      id: placeid,
      name: placeName,
    });
    if (response.ok) {
      return schoolInfo;
    }
  }



  export async function createRazorpayOrder({ post, response }, amount, placeId) {
    const schoolInfo = await post("/order/order", {
      amount,
      placeId
    });
    if (response.ok) {
      return schoolInfo;
    }
  }