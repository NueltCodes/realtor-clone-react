import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { MdClose, MdHouse, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

const Home = () => {
  // Offers
  const [offerListings, setOfferListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);
  const [saleListings, setSaleListings] = useState(null);
  const [premium, setPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      try {
        // We get the referrence here
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchListings();
  }, []);

  // Places for rent
  useEffect(() => {
    async function fetchListings() {
      try {
        // We get the referrence here
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }

    fetchListings();
  }, []);

  // Places for sale
  useEffect(() => {
    async function fetchListings() {
      try {
        // We get the referrence here
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }

    fetchListings();
  }, []);

  return (
    <div>
      <Slider />
      {loading ? (
        <Spinner />
      ) : offerListings && offerListings.length > 0 ? (
        <>
          <div className="max-w-6xl mx-auto pt-4 space-y-6">
            <div
              onClick={() => setPremium(true)}
              className="flex items-center bg-gray-200 w-[44%] mx-auto mt-4 rounded-3xl shadow-md hover:shadow-xl  overflow-hidden transition-shadow duration-200 cursor-pointer"
            >
              <div className="mt-4 flex px-2 py-4 rounded-3xl  bg-gray-200 w-full"></div>
              <div className="px-4 text-gray-400">
                <MdSearch className="text-3xl" />
              </div>
            </div>
            {premium && (
              <div className="flex items-center justify-center font-semibold">
                Upgrade to premium to use the search input{" "}
                <MdClose
                  className="cursor-pointer ml-1 bg-red-600 text-white flex items-center justify-center rounded-full m-3"
                  onClick={() => setPremium(false)}
                />
              </div>
            )}

            <div className="flex items-center justify-center gap-28 pt-6 pb-6">
              <div className="w-[165px]">
                <Link to="/furnished">
                  <p className="px-3 text-sm  flex justify-center items-center text-black bg-white font-bold hover:text-gray-500 shadow-md hover:shadow-sm py-3 rounded-full w-[165px] transition duration-300 ease-in-out">
                    Furnished Houses
                    <MdHouse className="ml-1" />
                  </p>
                </Link>
              </div>

              <div className="w-[165px] ">
                <Link to="/empty">
                  <p className="px-3 text-sm flex justify-center items-center text-black bg-white font-bold hover:text-gray-500 shadow-md hover:shadow-sm py-3 rounded-full w-[165px] transition duration-300 ease-in-out">
                    Empty Houses
                    <MdHouse className="ml-1" />
                  </p>
                </Link>
              </div>
            </div>

            {offerListings && offerListings.length > 0 && (
              <div className="m-2 mb-6">
                <h2 className="px-3 text-2xl mt-6 font-semibold">
                  Recent Offers
                </h2>
                <Link to="/offers">
                  <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                    Show more offers
                  </p>
                </Link>
                <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
                  {offerListings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      id={listing.id}
                      listing={listing.data}
                    />
                  ))}
                </ul>
              </div>
            )}

            {rentListings && rentListings.length > 0 && (
              <div className="m-2 mb-6">
                <h2 className="px-3 text-2xl mt-6 font-semibold">
                  Places for rent
                </h2>
                <Link to="/category/rent">
                  <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                    Show more places for rent
                  </p>
                </Link>
                <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
                  {rentListings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      id={listing.id}
                      listing={listing.data}
                    />
                  ))}
                </ul>
              </div>
            )}

            {saleListings && saleListings.length > 0 && (
              <div className="m-2 mb-6">
                <h2 className="px-3 text-2xl mt-6 font-semibold">
                  Places for sale
                </h2>
                <Link to="/category/sale">
                  <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                    Show more places for sale
                  </p>
                </Link>

                <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
                  {saleListings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      id={listing.id}
                      listing={listing.data}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>There are no current offers yet</p>
      )}
    </div>
  );
};

export default Home;
