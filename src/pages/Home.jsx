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
            {offerListings && offerListings.length > 0 && (
              <div className="m-2 mb-6">
                <div className="flex items-center  justify-center sm:gap-36 gap-14 pt-6">
                  <div>
                    <Link to="/furnished">
                      <p className="text-[11px] text-center sm:text-sm lg:text-[18px] font-semibold flex items-center bg-white px-2 py-3 rounded-lg shadow-lg hover:shadow-md hover:text-gray-500 duration-200 ease-in-out">
                        Furnished Houses
                        <MdHouse className="ml-1" size={20} />
                      </p>
                    </Link>
                  </div>

                  <div>
                    <Link to="/empty">
                      <p className="text-[11px] text-center sm:text-sm lg:text-[18px] font-semibold flex items-center bg-white px-2 py-3 rounded-lg shadow-lg hover:shadow-md hover:text-gray-500 duration-200 ease-in-out">
                        Empty Houses
                        <MdHouse className="ml-1" size={20} />
                      </p>
                    </Link>
                  </div>
                </div>

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
