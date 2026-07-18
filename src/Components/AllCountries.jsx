import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import NativeDropdown from './NativeDropdown';
import Card from './Card';
import useStore from './ZustandState';
import Footer from './Footer';
import ShimmerMain from './ShimmerMain';
import InputBySearch from './InputBySearch';
import { getAllCountriesPage } from "../Api/restCountries";
const LIMIT = 100;
const AllCountries = () => {
  const Mode = useStore((store) => store.Mode);
  const Input = useStore((state) => state.Input)
  const [Data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const offsetRef = useRef(0);
  const sentinelRef = useRef(null);

  const loadCountries = useCallback(async () => {
    try {
      setError(null);
      const result = await getAllCountriesPage({ limit: LIMIT, offset: 0 });
      setData(result.data);
      setHasMore(result.more);
      offsetRef.current = result.data.length;
      setLoader(false);
    } catch (error) {
      setError(error.message);
      setLoader(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const result = await getAllCountriesPage({ limit: LIMIT, offset: offsetRef.current });
      setData((prev) => [...prev, ...result.data]);
      setHasMore(result.more);
      offsetRef.current += result.data.length;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore]);

  useEffect(() => {
    loadCountries();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loader) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loader, loadMore]);

  if (error) {
    return (
      <div className={`${Mode ? 'bg-black text-white' : 'bg-white/35 text-black'} max-w-[1350px] mx-auto min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">Error loading countries</h1>
          <p className="opacity-60 mt-2">{error}</p>
          <button
            onClick={loadCountries}
            className="mt-4 px-6 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${Mode ? 'bg-black max-w-[1350px] mx-auto text-white' : 'bg-white/35 text-black  max-w-[1350px] mx-auto'}`}>
        <div
          className=' flex justify-between   mb-5 flex-wrap  gap-5 px-3   min-w-[220px]'>
          <InputBySearch />
          <div>
            <NativeDropdown />
          </div>
        </div>
        <div className=' flex flex-wrap flex-row gap-5 justify-around' >
          {loader && <ShimmerMain />}
          {Data[0] &&
            (() => {
              const search = Input.toString().toLowerCase();
              const filtered = Data.filter((country) => {
                if (search === country.cca3.toLowerCase()) return true
                if (search === country.name.common.toString().toLowerCase()) return true;
                return country.name.common.toString().toLowerCase().includes(search);
              });
              if (filtered.length > 0) {
                return filtered.map((country) => (
                  <Card key={country.cca3} country={country} />
                ));
              } else {
                return (
                  <h1 className='font-semibold text-2xl'>
                    No Country Name with
                    <span className='text-red-600'> {Input} </span> Found
                  </h1>
                );
              }
            })()
          }
        </div>
        {loadingMore && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {hasMore && !loader && <div ref={sentinelRef} className="h-4" />}
      </div>
      {Data[0] &&
        <Footer />
      }
    </>
  )
}
export default AllCountries