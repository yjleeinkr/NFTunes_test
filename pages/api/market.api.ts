// import fetch from "isomorphic-unfetch";

const API_URL = "https://api.upbit.com/v1/market/all?istDetails=false";

export async function getMarkets() {
  const req = await fetch(`${API_URL}`);
  const markets = await req.json();
  return {
    markets
  };
}

export function getOne( param:string ):string {
  console.log('getOne: ',param)
  return(
    param
  )
}
